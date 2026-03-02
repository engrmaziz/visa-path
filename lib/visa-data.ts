import { COUNTRIES } from "./countries"

type VisaStatus = 'visa-free' | 'evisa' | 'visa-required' | 'unknown'

// Base data for 30 major passports against all 195 countries.
// In a real production app this would query a backend database, but for this MVP
// we provide a realistic baseline matrix built around Henley index rules and general conventions.
// Rules: 
// 1. EU/Schengen are usually visa-free to each other and USA/CAN/AUS.
// 2. USA/CAN/AUS/GBR/NZL have very high access worldwide (mostly visa-free or evisa).
// 3. JPN/SGP/KOR have the highest access globally.
// 4. BRICS and emerging markets have mixed access, leaning evisa.
// This is an illustrative robust dataset for the 30 requested passports:
// USA, CAN, GBR, AUS, NZL, DEU, FRA, ITA, ESP, JPN, 
// KOR, SGP, UAE, SAU, IND, PAK, BGD, TUR, BRA, MEX,
// ZAF, NGA, KEN, EGY, MAR, CHN, RUS, UKR, POL, NLD

const MAJOR_PASSPORTS = [
    "USA", "CAN", "GBR", "AUS", "NZL", "DEU", "FRA", "ITA", "ESP", "JPN",
    "KOR", "SGP", "ARE", "SAU", "IND", "PAK", "BGD", "TUR", "BRA", "MEX",
    "ZAF", "NGA", "KEN", "EGY", "MAR", "CHN", "RUS", "UKR", "POL", "NLD"
]

// To avoid writing 30 x 195 rows manually, we use regional grouping logic to generate realistic data.
const SCHENGEN_CODES = ["AUT", "BEL", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "NLD", "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE"]
const FIVE_EYES_CODES = ["USA", "CAN", "GBR", "AUS", "NZL"]
const LATAM_CODES = ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN", "MEX", "CRI", "PAN"]
const ASEAN_CODES = ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "VNM"]

function generateRealisticData(): Record<string, Record<string, VisaStatus>> {
    const data: Record<string, Record<string, VisaStatus>> = {}

    for (const passport of MAJOR_PASSPORTS) {
        data[passport] = {}
        for (const dest of COUNTRIES) {
            const d = dest.code
            let status: VisaStatus = 'visa-required'

            if (passport === d) {
                status = 'visa-free' // Home country
            } else if (SCHENGEN_CODES.includes(passport) && SCHENGEN_CODES.includes(d)) {
                status = 'visa-free' // Freedom of movement
            } else if (ASEAN_CODES.includes(passport) && ASEAN_CODES.includes(d)) {
                status = 'visa-free'
            } else if (LATAM_CODES.includes(passport) && LATAM_CODES.includes(d)) {
                status = 'visa-free'
            } else if (['JPN', 'SGP', 'KOR', 'DEU', 'ESP', 'FRA', 'ITA', 'NLD'].includes(passport)) {
                // Tier 1 Passports: basically free everywhere except a few strict countries
                status = ['PRK', 'AFG', 'SYR', 'YEM', 'SOM', 'ERI', 'TKM'].includes(d) ? 'visa-required' :
                    ['RUS', 'CHN', 'IND', 'AUS', 'USA'].includes(d) && !SCHENGEN_CODES.includes(passport) && passport !== 'JPN' && passport !== 'SGP' && passport !== 'KOR' ? 'evisa' : 'visa-free'
            } else if (FIVE_EYES_CODES.includes(passport)) {
                // Tier 1.5
                status = ['PRK', 'AFG', 'SYR', 'YEM', 'RUS', 'CHN', 'IRN', 'VEN', 'CUB'].includes(d) ? 'visa-required' :
                    ['IND', 'AUS', 'KEN', 'EGY', 'TUR'].includes(d) ? 'evisa' : 'visa-free'
            } else if (['ARE', 'BRA', 'MEX', 'UKR', 'POL'].includes(passport)) {
                // Tier 2
                status = SCHENGEN_CODES.includes(d) || LATAM_CODES.includes(d) ? 'visa-free' :
                    ['USA', 'CAN', 'AUS', 'JPN', 'GBR'].includes(d) ? 'visa-required' : 'evisa'
            } else if (['CHN', 'RUS', 'TUR', 'ZAF', 'SAU', 'MAR'].includes(passport)) {
                // Tier 3
                status = ['USA', 'CAN', 'AUS', 'GBR', ...SCHENGEN_CODES].includes(d) ? 'visa-required' :
                    ['KEN', 'EGY', 'IRQ', 'IRN', 'PAK', 'LKA'].includes(d) ? 'evisa' : 'visa-required'

                // Specific overrides
                if (passport === 'CHN' && ['THA', 'MYS', 'SGP', 'ARE', 'MDV'].includes(d)) status = 'visa-free'
                if (passport === 'RUS' && ['TUR', 'BRA', 'CUB', 'VNM', 'THA'].includes(d)) status = 'visa-free'
                if (passport === 'TUR' && ['JPN', 'KOR', 'ZAF', 'ARG', 'BRA'].includes(d)) status = 'visa-free'
            } else {
                // Tier 4 (IND, PAK, BGD, NGA, KEN, EGY)
                status = ['MDV', 'SEY', 'HTI', 'VUT'].includes(d) ? 'visa-free' :
                    ['KEN', 'RWA', 'UGA', 'BOL', 'KHM'].includes(d) ? 'evisa' : 'visa-required'
            }

            data[passport][d] = status
        }
    }

    return data
}

export const visaData = generateRealisticData()

export function getCombinedVisaStatus(passports: string[], destination: string): { status: VisaStatus, breakdown: Record<string, VisaStatus> } {
    if (!passports || passports.length === 0) {
        return { status: 'unknown', breakdown: {} }
    }

    // Rank from best to worst
    const rank = { 'visa-free': 1, 'evisa': 2, 'visa-required': 3, 'unknown': 4 }
    let bestStatus: VisaStatus = 'unknown'
    const breakdown: Record<string, VisaStatus> = {}

    for (const p of passports) {
        // Extract ISO code securely
        const codeMatch = COUNTRIES.find(c => c.name === p || c.code === p)
        const code = codeMatch ? codeMatch.code : p.substring(0, 3).toUpperCase()

        // Lookup generated data
        const passportData = visaData[code] || {}
        let status = passportData[destination]

        // If not in our 30 mapped passports, default to required
        if (!status) status = 'visa-required'

        breakdown[p] = status

        if (rank[status] < rank[bestStatus]) {
            bestStatus = status
        }
    }

    return { status: bestStatus, breakdown }
}
