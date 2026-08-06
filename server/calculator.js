const hospitalPrices = {
    None: 0,
    Basic: 90,
    Bronze: 120,
    Silver: 160,
    Gold: 220
};

const extrasPrices = {
    None: 0,
    Basic: 25,
    Standard: 45,
    Premium: 70
};

function calculateLHC(age, history, hospitalCover) {

    if (hospitalCover === "None") {
        return 0;
    }

    if (history === "Yes") {
        return 0;
    }

    if (history === "Not sure") {
        return 0;
    }

    if (age <= 30) {
        return 0;
    }

    return ((age - 30) * 2) / 100;
}

function calculateQuote(quote) {

    const adultCount =
        quote.cover_type === "Single" ? 1 : 2;

    const hospitalPrice =
        hospitalPrices[quote.hospital_cover];

    const extrasPrice =
        extrasPrices[quote.extras_cover];

    const applicant1Loading = calculateLHC(
        quote.applicant1_age,
        quote.applicant1_cover_history,
        quote.hospital_cover
    );

    const applicant1Hospital =
        hospitalPrice * (1 + applicant1Loading);

    let applicant2Loading = 0;
    let applicant2Hospital = 0;

    if (adultCount === 2) {

        applicant2Loading = calculateLHC(
            quote.applicant2_age,
            quote.applicant2_cover_history,
            quote.hospital_cover
        );

        applicant2Hospital =
            hospitalPrice * (1 + applicant2Loading);
    }

    const hospitalTotal =
        applicant1Hospital + applicant2Hospital;

    const extrasTotal =
        extrasPrice * adultCount;

    const familyFee =
        quote.cover_type === "Family"
            ? 30
            : 0;

    const monthlyPremium =
        hospitalTotal +
        extrasTotal +
        familyFee;

    const yearlyBeforeDiscount =
        monthlyPremium * 12;

    const yearlyAfterDiscount =
        yearlyBeforeDiscount *
        (1 - quote.annual_discount / 100);

    return {
        applicant1Loading,
        applicant2Loading,
        hospitalTotal,
        extrasTotal,
        familyFee,
        monthlyPremium,
        yearlyBeforeDiscount,
        yearlyAfterDiscount
    };
}

module.exports = {
    calculateQuote
};