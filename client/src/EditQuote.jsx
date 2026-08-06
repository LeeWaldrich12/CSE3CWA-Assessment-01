import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EditQuote() {
    const [customerName, setCustomerName] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/quotes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCustomerName(data.customer_name);
            });
    }, []);

    const handleUpdate = () => {
        fetch(`http://localhost:5000/quotes/${id}`, {
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

    const handleDelete = () => {
    fetch(`http://localhost:5000/quotes/${id}`, {
        method: "DELETE"
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
        })
        .catch((error) => {
            console.error(error);
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
            <button onClick={handleDelete}>
                Delete Quote
            </button>
        </div>
    );
}

export default EditQuote;