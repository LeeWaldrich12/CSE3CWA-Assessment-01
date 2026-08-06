import { useEffect, useState } from "react";

function EditQuote() {
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/quotes/1")
            .then((response) => response.json())
            .then((data) => {
                setCustomerName(data.customer_name);
            });
    }, []);

    const handleUpdate = () => {
        fetch("http://localhost:5000/quotes/1", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerName
            })
        })
            .then((response) => response.json())
            .then((data) => {
                alert("Quote updated successfully");
                console.log(data);
            });
    };

    return (
        <div>
            <h2>Edit Quote</h2>

            <label>Customer Name</label>
            <br />

            <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
            />

            <br />
            <br />

            <button onClick={handleUpdate}>
                Update Quote
            </button>
        </div>
    );
}

export default EditQuote;