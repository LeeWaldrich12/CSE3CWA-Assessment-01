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

            <h3>Premium Breakdown</h3>
            <p>
                Applicant 1 Loading:
                {(quote.calculation.applicant1Loading * 100).toFixed(0)}%
            </p>

            <p>
                Applicant 2 Loading:
                {(quote.calculation.applicant2Loading * 100).toFixed(0)}%
            </p>

            <p>
                Hospital Premium:
                ${quote.calculation.hospitalTotal.toFixed(2)}
            </p>

            <p>
                Extras Premium:
                ${quote.calculation.extrasTotal.toFixed(2)}
            </p>

            <p>
                Family Fee:
                ${quote.calculation.familyFee.toFixed(2)}
            </p>

            <p>
                Monthly Premium:
                ${quote.calculation.monthlyPremium.toFixed(2)}
            </p>

            <p>
                Yearly Premium Before Discount:
                ${quote.calculation.yearlyBeforeDiscount.toFixed(2)}
            </p>

            <p>
                Yearly Premium After Discount:
                ${quote.calculation.yearlyAfterDiscount.toFixed(2)}
            </p>

            <h3>Important Information</h3>
            <p>
                Lifetime Health Cover loading applies only to hospital cover. It does not apply to extras cover.
            </p>
        </div>
    );
}

export default QuoteDetail;