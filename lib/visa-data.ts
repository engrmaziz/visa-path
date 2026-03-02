export const visaData: Record<string, Record<string, 'visa-free' | 'evisa' | 'visa-required'>> = {
    USA: {
        GBR: 'visa-free',
        FRA: 'visa-free',
        DEU: 'visa-free',
        CAN: 'visa-free',
        MEX: 'visa-free',
        JPN: 'visa-free',
        AUS: 'evisa',
        IND: 'evisa',
        CHN: 'visa-required',
        RUS: 'visa-required',
        BRA: 'visa-free',
        ZAF: 'visa-free',
    },
    CAN: {
        GBR: 'visa-free',
        FRA: 'visa-free',
        DEU: 'visa-free',
        USA: 'visa-free',
        MEX: 'visa-free',
        JPN: 'visa-free',
        AUS: 'evisa',
        IND: 'evisa',
        CHN: 'visa-required',
        RUS: 'visa-required',
        BRA: 'visa-free',
        ZAF: 'visa-free',
    },
    GBR: {
        FRA: 'visa-free',
        DEU: 'visa-free',
        USA: 'evisa',
        CAN: 'evisa',
        MEX: 'visa-free',
        JPN: 'visa-free',
        AUS: 'evisa',
        IND: 'evisa',
        CHN: 'visa-required',
        RUS: 'visa-required',
        BRA: 'visa-free',
        ZAF: 'visa-free',
    },
    DEFAULT: {
        // Fallback defaults for missing
        USA: 'visa-required',
        CAN: 'visa-required',
        GBR: 'visa-required',
    }
}

export function getCombinedVisaStatus(passports: string[], destination: string): 'visa-free' | 'evisa' | 'visa-required' | 'unknown' {
    if (!passports || passports.length === 0) return 'unknown';

    // Rank from best to worst
    const rank = { 'visa-free': 1, 'evisa': 2, 'visa-required': 3, 'unknown': 4 };
    let bestStatus: 'visa-free' | 'evisa' | 'visa-required' | 'unknown' = 'unknown';

    for (const p of passports) {
        // If we have ISO 3-letter codes
        const passportData = visaData[p] || visaData[p.substring(0, 3)] || {};
        const status = passportData[destination] || 'visa-required'; // Assume required if not explicitly free/evisa in our dummy data
        if (rank[status] < rank[bestStatus]) {
            bestStatus = status;
        }
    }

    return bestStatus;
}
