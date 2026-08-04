import { useEffect, useState } from "react";

function QuoteDetail() {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/quotes/1")
            .then((response) => response.json())
            .then((data) => setQuote(data))
            .catch((error) => console.error(error));
    }, []);

    if (!quote) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Quote Detail</h2>

            <p>Name: {quote.customer_name}</p>
            <p>Cover Type: {quote.cover_type}</p>
            <p>Applicant 1 Age: {quote.applicant1_age}</p>
            <p>Hospital Cover: {quote.hospital_cover}</p>
            <p>Extras Cover: {quote.extras_cover}</p>
        </div>
    );
}

export default QuoteDetail;