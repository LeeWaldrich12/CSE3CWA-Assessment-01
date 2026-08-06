const express = require("express");
const db = require("./db");
const fs = require("fs");
const cors = require("cors");
const { calculateQuote } = require("./calculator");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

const initSQL= fs.readFileSync("./init.sql", "utf8");

db.exec(initSQL, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Quotes table ready");
    }
});

// POST
app.post("/quotes", (req, res) => {
    const {
        customerName,
        coverType,
        applicant1Age,
        applicant1History,
        applicant2Age,
        applicant2History,
        hospitalCoverLevel,
        extrasCoverLevel,
        paymentFrequency,
        annualDiscount,
        notes
} = req.body;

const sql = `INSERT INTO quotes (
    customer_name,
    cover_type,
    applicant1_age,
    applicant1_cover_history,
    applicant2_age,
    applicant2_cover_history,
    hospital_cover,
    extras_cover,
    payment_frequency,
    annual_discount,
    notes
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

    db.run(sql, [
        customerName,
        coverType,
        applicant1Age,
        applicant1History,
        applicant2Age || null,
        applicant2History || null,
        hospitalCoverLevel,
        extrasCoverLevel,
        paymentFrequency,
        annualDiscount,
        notes
    ], 
    function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 
        
        return res.json({ message: "Quote created successfully", quoteId: this.lastID });
    });
});

app.put("/quotes/:id", (req, res) => {
    const { id } = req.params;

    const {
        customerName,
        coverType,
        applicant1Age,
        applicant1History,
        applicant2Age,
        applicant2History,
        hospitalCoverLevel,
        extrasCoverLevel,
        paymentFrequency,
        annualDiscount,
        notes
    } = req.body;

    console.log(req.body);

    const sql = `
    UPDATE quotes
    SET customer_name = ?
    WHERE id = ?
    `;

    db.run(
        sql,
        [
            customerName,
            id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            return res.json({
                message: "Quote updated successfully"
            });
        }
    );
});


//GET
app.get("/quotes", (req, res) => {
    const sql = "SELECT * FROM quotes";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

app.get("/quotes/:id", (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM quotes WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        if (!row) {
            return res.status(404).json({
                error: "Quote not found"
            });
        }
        const calculation = calculateQuote(row);

        return res.json({
            ...row,
            calculation
        });
    });
});

//DELETE
app.delete("/quotes/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM quotes WHERE id = ?";

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        return res.json({
            message: "Quote deleted successfully",
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});