import { useEffect, useState } from "react";

function QuoteList() {
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/quotes")
            .then((response) => response.json())
            .then((data) => setQuotes(data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Saved Quotes</h2>

            {quotes.map((quote) => (
                <div key={quote.id}>
                    <p>
                        {quote.customer_name} - {quote.cover_type}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default QuoteList;