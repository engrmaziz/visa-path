import { COUNTRIES } from "./countries"

type VisaStatus = 'visa-free' | 'evisa' | 'visa-required' | 'unknown'

// Visa access matrix for 30 major passports against all 195 countries.
// Based on Henley Passport Index real-world data and general visa policy conventions.
// Passports covered: USA, CAN, GBR, AUS, NZL, DEU, FRA, ITA, ESP, JPN,
//                    KOR, SGP, ARE(UAE), SAU, IND, PAK, BGD, TUR, BRA, MEX,
//                    ZAF, NGA, KEN, EGY, MAR, CHN, RUS, UKR, POL, NLD

const MAJOR_PASSPORTS = [
    "USA", "CAN", "GBR", "AUS", "NZL", "DEU", "FRA", "ITA", "ESP", "JPN",
    "KOR", "SGP", "ARE", "SAU", "IND", "PAK", "BGD", "TUR", "BRA", "MEX",
    "ZAF", "NGA", "KEN", "EGY", "MAR", "CHN", "RUS", "UKR", "POL", "NLD"
]

// ── Regional Blocs ──────────────────────────────────────────────────────────
const SCHENGEN_CODES = ["AUT", "BEL", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "NLD", "NOR", "POL", "PRT", "SVK", "SVN", "ESP", "SWE", "CHE"]
const EU_EXTRA_CODES = ["GBR", "IRL", "HRV", "ROU", "BGR", "CYP", "AND", "MCO", "SMR", "VAT"]
const ALL_EUROPE_CODES = [...SCHENGEN_CODES, ...EU_EXTRA_CODES, "ALB", "MKD", "MNE", "SRB", "BIH", "XKX", "MDA", "GEO", "ARM", "AZE", "UKR", "BLR"]
const FIVE_EYES_CODES = ["USA", "CAN", "GBR", "AUS", "NZL"]
const LATAM_CODES = ["ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN", "MEX", "CRI", "PAN", "GTM", "HND", "SLV", "NIC", "DOM", "HTI", "JAM", "TTO", "BHS", "BRB", "ATG", "DMA", "GRD", "KNA", "LCA", "VCT", "CUB"]
const ASEAN_CODES = ["BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "VNM"]
const PACIFIC_ISLAND_CODES = ["FJI", "KIR", "MHL", "FSM", "NRU", "PLW", "PNG", "WSM", "SLB", "TON", "TUV", "VUT"]
const SADC_CODES = ["AGO", "BWA", "COM", "COD", "SWZ", "LSO", "MDG", "MWI", "MUS", "MOZ", "NAM", "ZAF", "SYC", "TZA", "ZMB", "ZWE"]
const CIS_CODES = ["ARM", "AZE", "BLR", "KAZ", "KGZ", "MDA", "RUS", "TJK", "TKM", "UKR", "UZB", "GEO"]
const ARAB_LEAGUE_CODES = ["DZA", "BHR", "DJI", "EGY", "IRQ", "JOR", "KWT", "LBN", "LBY", "MRT", "MAR", "OMN", "PSE", "QAT", "SAU", "SOM", "SDN", "SYR", "TUN", "ARE", "YEM"]
const EAST_AFRICA_CODES = ["KEN", "UGA", "TZA", "RWA", "ETH", "DJI", "ERI", "SOM", "BDI"]
const WEST_AFRICA_CODES = ["NGA", "GHA", "SEN", "CIV", "MLI", "BFA", "NER", "TGO", "BEN", "GIN", "GNB", "SLE", "LBR", "GMB", "CPV", "MRT"]
const ISLAND_NATIONS_CODES = [...PACIFIC_ISLAND_CODES, "MDV", "SYC", "MUS", "COM", "CPV", "STP", "BHS", "BRB", "ATG", "DMA", "GRD", "KNA", "LCA", "VCT", "TTO", "JAM", "HTI", "CUB", "DOM"]

// Countries very difficult/restricted for most passports
const CONFLICT_RESTRICTED = ["PRK", "AFG", "SYR", "YEM", "SOM", "ERI"]

function generateRealisticData(): Record<string, Record<string, VisaStatus>> {
    const data: Record<string, Record<string, VisaStatus>> = {}

    for (const passport of MAJOR_PASSPORTS) {
        data[passport] = {}
        for (const dest of COUNTRIES) {
            data[passport][dest.code] = getVisaStatus(passport, dest.code)
        }
    }

    return data
}

function getVisaStatus(passport: string, dest: string): VisaStatus {
    // Home country - always visa-free
    if (passport === dest) return 'visa-free'

    // Conflict/failed states - visa-required for everyone
    if (CONFLICT_RESTRICTED.includes(dest)) return 'visa-required'

    // ── Tier 1: 190+ visa-free (JPN, SGP, DEU, FRA, ITA, KOR, NZL, NLD + Schengen)
    // Strongest passports per Henley Index
    const TIER1 = ["JPN", "SGP", "DEU", "FRA", "ITA", "KOR", "NZL", "NLD", "ESP", ...SCHENGEN_CODES.filter(c => !["DEU", "FRA", "ITA", "NLD", "ESP"].includes(c))]
    if (TIER1.includes(passport)) {
        // Only a small set of countries require visas
        const visaRequired = ["PRK", "AFG", "SYR", "YEM", "SOM", "ERI", "IRN", "IRQ", "LBY", "SDN"]
        if (visaRequired.includes(dest)) return 'visa-required'
        // A few countries require evisa even for top passports
        if (["IND", "ETH", "RWA", "TZA"].includes(dest) && !["JPN", "SGP", "KOR"].includes(passport)) return 'evisa'
        if (passport === "JPN" && ["CHN"].includes(dest)) return 'evisa'
        return 'visa-free'
    }

    // ── Tier 1.5: 175-185 visa-free (USA, CAN, AUS, GBR, ARE/UAE)
    // ARE (UAE) is the strongest Arab passport per Henley Index
    const TIER1_5 = ["USA", "CAN", "AUS", "GBR", "ARE"]
    if (TIER1_5.includes(passport)) {
        const visaRequired = ["PRK", "AFG", "SYR", "YEM", "SOM", "ERI", "IRN", "LBY", "SDN", "IRQ"]
        if (visaRequired.includes(dest)) return 'visa-required'
        // USA also requires visa for Cuba
        if (passport === "USA" && dest === "CUB") return 'visa-required'
        // Russia and Belarus require visa for Western passports
        if (["RUS", "BLR"].includes(dest) && ["USA", "CAN", "GBR", "AUS"].includes(passport)) return 'visa-required'
        // E-visa destinations for these strong passports
        const evisaNeeded = ["IND", "KEN", "EGY", "TUR", "LKA", "KHM", "ETH", "RWA", "TZA", "UGA", "BOL", "AZE", "PAK", "BGD"]
        if (evisaNeeded.includes(dest)) return 'evisa'
        return 'visa-free'
    }

    // ── Tier 2: ~160-175 visa-free (BRA, MEX, UKR, POL, ARG)
    // Brazil/Mexico are visa-free to Schengen + most of Latin America + many others
    const TIER2 = ["BRA", "MEX", "UKR", "POL"]
    if (TIER2.includes(passport)) {
        // Free in Schengen and all of Latin America
        if (SCHENGEN_CODES.includes(dest) || LATAM_CODES.includes(dest)) return 'visa-free'
        if ([...EU_EXTRA_CODES, "GBR", "USA", "CAN", "AUS", "NZL"].includes(dest)) return 'visa-free'
        if (ASEAN_CODES.includes(dest) || PACIFIC_ISLAND_CODES.includes(dest)) return 'visa-free'
        if (["ARE", "TUR", "ZAF", "MAR", "TUN", "EGY", "JOR", "GEO", "ARM", "AZE"].includes(dest)) return 'visa-free'
        if (["KEN", "TZA", "UGA", "ETH", "RWA", "GHA", "SEN"].includes(dest)) return 'evisa'
        if (["CHN", "IND", "SAU", "IRN", "IRQ", "PAK", "BGD"].includes(dest)) return 'visa-required'
        // Most African, Middle East, Central Asia = evisa
        if (ARAB_LEAGUE_CODES.includes(dest)) return 'evisa'
        if (EAST_AFRICA_CODES.includes(dest) || WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        return 'evisa'
    }

    // ── Tier 3: ~110-130 visa-free (RUS, TUR)
    if (passport === "RUS") {
        // Russia is visa-free within CIS + many LATAM + some Asian + Turkey, Cuba, Thailand, etc.
        if (CIS_CODES.includes(dest)) return 'visa-free'
        if (LATAM_CODES.includes(dest) && !["MEX"].includes(dest)) return 'visa-free'
        if (["TUR", "CUB", "VNM", "THA", "EGY", "MAR", "TUN", "ARE", "MNE", "SRB"].includes(dest)) return 'visa-free'
        if (["NAM", "ZAF", "ZWE", "BWA", "MOZ", "TZA"].includes(dest)) return 'visa-free'
        if (["IND", "CHN", "IDN", "MYS", "PHL", "KHM", "MDV", "NPL"].includes(dest)) return 'evisa'
        if (["KEN", "UGA", "ETH", "RWA", "GHA", "SEN", "NGA", "AGO"].includes(dest)) return 'evisa'
        // Western countries require visa for Russian passport
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "JPN", "KOR", "SGP"].includes(dest)) return 'visa-required'
        if (["GBR", "IRN", "IRQ", "PAK", "BGD", "LBY", "SDN"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    if (passport === "TUR") {
        // Turkey is visa-free to most of LATAM, some CIS, some African, Japan, Korea
        if (LATAM_CODES.includes(dest)) return 'visa-free'
        if (["JPN", "KOR", "ZAF", "MAR", "TUN", "ARE", "JOR", "AZE", "GEO", "UKR", "MDA"].includes(dest)) return 'visa-free'
        if (CIS_CODES.filter(c => !["RUS", "BLR", "UZB", "TJK"].includes(c)).includes(dest)) return 'visa-free'
        if (PACIFIC_ISLAND_CODES.includes(dest) || ISLAND_NATIONS_CODES.includes(dest)) return 'visa-free'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR"].includes(dest)) return 'visa-required'
        if (["CHN", "IND", "PAK", "BGD", "IRN", "IRQ", "SAU", "EGY"].includes(dest)) return 'evisa'
        if (ASEAN_CODES.includes(dest)) return 'evisa'
        if (EAST_AFRICA_CODES.includes(dest) || WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        return 'evisa'
    }

    // ── Tier 4: ~95-110 visa-free (ZAF, SAU, MAR)
    if (passport === "ZAF") {
        // South Africa is visa-free within SADC + some LATAM + some others ~100
        if (SADC_CODES.includes(dest)) return 'visa-free'
        if (["ARG", "BRA", "CHL", "URY", "PER", "COL", "CUB", "JAM", "BHS", "BRB"].includes(dest)) return 'visa-free'
        if (["SGP", "THA", "MYS", "IDN", "PHL", "HKG", "ARE", "TUR", "MUS"].includes(dest)) return 'visa-free'
        if (["MAR", "TUN", "EGY", "GHA", "SEN", "NGA", "KEN"].includes(dest)) return 'evisa'
        if (PACIFIC_ISLAND_CODES.includes(dest)) return 'visa-free'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "CHN", "IND", "PAK"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    if (passport === "SAU") {
        // Saudi Arabia is visa-free to Arab League + some Asian ~80
        if (ARAB_LEAGUE_CODES.includes(dest) && !CONFLICT_RESTRICTED.includes(dest)) return 'visa-free'
        if (["TUR", "IDN", "MYS", "THA", "MDV", "AZE", "KAZ", "PAK", "BGD"].includes(dest)) return 'visa-free'
        if (["CHN", "RUS", "IND", "ZAF", "ETH", "KEN"].includes(dest)) return 'evisa'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "SGP"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    if (passport === "MAR") {
        // Morocco visa-free to Arab League, ECOWAS, some LATAM ~75
        if (ARAB_LEAGUE_CODES.includes(dest) && !CONFLICT_RESTRICTED.includes(dest)) return 'visa-free'
        if (WEST_AFRICA_CODES.includes(dest)) return 'visa-free'
        if (["TUR", "BRA", "ARG", "CHL", "PRY", "URY"].includes(dest)) return 'visa-free'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "SGP", "CHN", "RUS"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    // ── Tier 5: ~75-90 visa-free (CHN)
    if (passport === "CHN") {
        // China ~80 visa-free since its 2023 agreements with several countries
        if (["THA", "MYS", "SGP", "ARE", "MDV", "MUS", "SYC", "BHS"].includes(dest)) return 'visa-free'
        if (LATAM_CODES.filter(c => !["CUB"].includes(c)).includes(dest)) return 'visa-free'
        if (["SRB", "MNE", "BIH", "BLR", "RUS", "KAZ", "KGZ", "TJK", "UZB", "TKM", "AZE", "ARM", "GEO"].includes(dest)) return 'visa-free'
        if (["ZAF", "MAR", "TUN", "EGY", "KEN", "ETH", "TZA", "UGA", "RWA"].includes(dest)) return 'evisa'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "IND", "PAK", "BGD"].includes(dest)) return 'visa-required'
        if (ASEAN_CODES.filter(c => !["THA", "MYS", "SGP"].includes(c)).includes(dest)) return 'evisa'
        return 'evisa'
    }

    // ── Tier 6: ~55-70 visa-free (IND, EGY)
    if (passport === "IND") {
        // India is visa-free to ~60 countries, mostly neighboring + some island/African
        if (["NPL", "BTN", "MDV", "MUS", "SYC", "HTI", "JAM", "DOM", "BLZ", "VUT", "SWZ", "LSO", "BWA"].includes(dest)) return 'visa-free'
        if (EAST_AFRICA_CODES.includes(dest) && !["SOM", "ERI"].includes(dest)) return 'evisa'
        if (WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        if (SADC_CODES.includes(dest)) return 'evisa'
        if (PACIFIC_ISLAND_CODES.includes(dest)) return 'evisa'
        if (ISLAND_NATIONS_CODES.includes(dest) && !["CUB", "DOM"].includes(dest)) return 'evisa'
        if (["KHM", "VNM", "IDN", "THA", "LKA", "MMR"].includes(dest)) return 'evisa'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "SGP", "CHN", "RUS", "TUR", "ARE", "SAU"].includes(dest)) return 'visa-required'
        return 'visa-required'
    }

    if (passport === "EGY") {
        // Egypt ~65 visa-free, mainly Arab world + some African + Turkey
        if (ARAB_LEAGUE_CODES.includes(dest) && !CONFLICT_RESTRICTED.includes(dest)) return 'visa-free'
        if (EAST_AFRICA_CODES.includes(dest) && !["SOM", "ERI"].includes(dest)) return 'evisa'
        if (WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        if (["TUR", "BRA", "MYS"].includes(dest)) return 'visa-free'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "SGP", "CHN"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    // ── Tier 7: ~35-55 visa-free (BGD, KEN, NGA)
    if (passport === "BGD") {
        // Bangladesh ~40 visa-free - mostly island nations + some African
        if (["MDV", "SYC", "MUS", "SLB", "VUT", "FJI", "WSM", "TON", "TUV", "KIR", "FSM", "NRU", "PLW", "PNG"].includes(dest)) return 'visa-free'
        if (["HTI", "JAM", "DOM", "BRB", "ATG", "DMA", "GRD", "KNA", "LCA", "VCT"].includes(dest)) return 'visa-free'
        if (["KEN", "UGA", "TZA", "RWA", "ETH"].includes(dest)) return 'evisa'
        if (WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        if (SADC_CODES.filter(c => !["ZAF", "NAM"].includes(c)).includes(dest)) return 'evisa'
        return 'visa-required'
    }

    if (passport === "KEN") {
        // Kenya ~60 visa-free, strong within Africa + some others
        if (EAST_AFRICA_CODES.includes(dest) && !["SOM", "ERI"].includes(dest)) return 'visa-free'
        if (SADC_CODES.includes(dest)) return 'visa-free'
        if (WEST_AFRICA_CODES.includes(dest)) return 'visa-free'
        if (["SGP", "MYS", "THA", "MDV", "MUS", "SYC"].includes(dest)) return 'visa-free'
        if (LATAM_CODES.filter(c => !["CUB", "VEN"].includes(c)).includes(dest)) return 'evisa'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "SGP", "CHN", "IND"].includes(dest)) return 'visa-required'
        return 'evisa'
    }

    if (passport === "NGA") {
        // Nigeria ~55 visa-free, strong within ECOWAS + some others
        if (WEST_AFRICA_CODES.includes(dest)) return 'visa-free'
        if (EAST_AFRICA_CODES.includes(dest) && !["SOM", "ERI"].includes(dest)) return 'evisa'
        if (SADC_CODES.includes(dest)) return 'evisa'
        if (["SGP", "MYS", "THA", "MDV"].includes(dest)) return 'visa-free'
        if (["BRA", "ARG", "COL"].includes(dest)) return 'evisa'
        if ([...SCHENGEN_CODES, ...EU_EXTRA_CODES, "USA", "CAN", "AUS", "NZL", "GBR", "JPN", "KOR", "CHN", "IND"].includes(dest)) return 'visa-required'
        return 'visa-required'
    }

    // ── Tier 8: ~25-35 visa-free (PAK)
    if (passport === "PAK") {
        // Pakistan ~30 visa-free - among the weakest passports globally
        if (["MDV", "SYC", "MUS", "HTI", "VUT", "SLB", "WSM", "TON", "TUV"].includes(dest)) return 'visa-free'
        if (["KHM", "ETH", "KEN", "UGA", "TZA", "RWA", "MWI", "ZMB"].includes(dest)) return 'evisa'
        if (WEST_AFRICA_CODES.includes(dest)) return 'evisa'
        return 'visa-required'
    }

    return 'visa-required'
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
