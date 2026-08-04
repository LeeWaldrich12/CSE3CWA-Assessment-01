import {useState} from 'react';


function CreateQuote() {

    const [customerName, setCustomerName] = useState("");
    const [coverType, setCoverType] = useState("Single");
    const [applicant1Age, setApplicant1Age] = useState("");
    const [applicant1History, setApplicant1History] = useState("Yes");
    const [hospitalCoverLevel, setHospitalCoverLevel] = useState("None");
    const [extrasCoverLevel, setExtrasCoverLevel] = useState("None");
    const [paymentFrequency, setPaymentFrequency] = useState("Monthly");
    const [annualDiscount, setAnnualDiscount] = useState(0);
    const [notes, setNotes] = useState("");
    const [applicant2Age, setApplicant2Age] = useState("");
    const [applicant2History, setApplicant2History] = useState("Yes");

    // submit button
    const handleSubmit = (e) => {
        if (!customerName.trim()){
            alert("Customer name is required");
            return;
        }

        if (applicant1Age < 18 || applicant1Age > 100) {
            alert("Applicant 1 age must be between 18 and 100");
            return;
        }

        if ((coverType === "Couple" || coverType === "Family") && !applicant2Age) {
            alert("Applicant 2 age is required");
            return;
        }

        if ((coverType === "Couple" || coverType === "Family") && (applicant2Age < 18 || applicant2Age > 100)) {
            alert("Applicant 2 age must be between 18 and 100");
            return;
        }

        if (annualDiscount < 0 || annualDiscount > 10) {
            alert("Annual discount must be between 0 and 10%");
            return;
        }

        if (paymentFrequency === "Yearly" && annualDiscount === "") {
            alert("Please enter an annual discount");
            return;
        }

        if(applicant1History === "Not Sure") {
            alert("Applicant 1: Cover history is unknown. LHC loading has not been applied. This quote may be inaccurate");
            return;
        }

        if ((coverType === "Couple" || coverType === "Family") && applicant2History === "Not Sure") {
            alert("Applicant 2: Cover history is unknown. LHC loading has not been applied. This quote may be inaccurate");
            return;
        }

    fetch("http://localhost:5000/quotes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        })
    })
    .then(response => response.json())
    .then(data => {
        alert("Quote created successfully!");
        console.log(data);
    })
    .catch(error => {
        console.error(error);
        alert("Error creating quote");
    });
};

    return (
    <div>
        <h2>Create Quote</h2>

        <label>Customer Name</label>
        <br />
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
        />
        <br />
        <br />
{/* //Cover Type */}
        <label>Cover Type</label>
        <br />
        <select value={coverType} onChange={(e) => setCoverType(e.target.value)}>
            <option>Single</option>
            <option>Couple</option>
            <option>Family</option>
        </select>
        <br />
        <br />
{/* applicants */}
        <label> Applicant 1 age</label>
        <br />
        <input type="number" min="18" max = "100" value={applicant1Age} onChange={(e) => setApplicant1Age(e.target.value)} />
        <br />
        <label> Applicant 1 Hospital Cover History</label>
        <br />
        <select value={applicant1History} onChange={(e) => setApplicant1History(e.target.value)}>
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
        </select>
    {coverType !== "Single" && (
        <div>
        <br />
        <label> Applicant 2 age</label>
        <br />
        <input type="number" min="18" max = "100" value={applicant2Age} onChange={(e) => setApplicant2Age(e.target.value)} />

        <br />
        <label> Applicant 2 Hospital Cover History</label>
        <br />
        <select value={applicant2History} onChange={(e) => setApplicant2History(e.target.value)}>
            <option>Yes</option>
            <option>No</option>
            <option>Not Sure</option>
        </select>
        </div>
    )}

{/* // Hospital Cover Level */}
        <br />
        <br />
        <label>Hospital Cover Level</label>
        <br />
        <select value={hospitalCoverLevel} onChange={(e) => setHospitalCoverLevel(e.target.value)}>
            <option>None</option>
            <option>Basic</option>
            <option>Bronze</option>
            <option>Silver</option>
            <option>Gold</option>
        </select>
        <br />
        <br />

        {/* Extras cover */}
        <label>Extras Cover Level</label>
        <br />
        <select value={extrasCoverLevel} onChange={(e) => setExtrasCoverLevel(e.target.value)}>
            <option>None</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
        </select>
        <br />
        <br />

    {/* frequency */}
        <label>Payment Frequency</label>
        <br />
        <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
            <option>Monthly</option>
            <option>Yearly</option>
        </select>
        <br />
        <br />

        {/* discounts */}
        <label>Annual Discount (%)</label>
        <br />
        <input type="number" min="0" max="10" value={annualDiscount} onChange={(e) => setAnnualDiscount(e.target.value)} />
        <br />
        <br />

        {/* notes */}
        <label>Notes</label>
        <br />
        <textarea rows="4" cols="50" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        <br />
        <br />


        <button onClick={handleSubmit}>Save Quote</button>
    </div>
    );
}

export default CreateQuote;