"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, MapPin, Phone, Mail, Globe, ExternalLink, Clock, Building2, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const regions = ["All", "Americas", "Europe", "Asia", "Middle East", "Africa", "Oceania"]

const embassies = [
    {
        id: "usa",
        country: "United States",
        flag: "🇺🇸",
        region: "Americas",
        address: "Diplomatic Enclave, Ramna 5, Islamabad",
        phone: "+92 51 201 4000",
        email: "islamabadvisa@state.gov",
        website: "pk.usembassy.gov",
        bookingUrl: "https://cgifederal.secure.force.com/",
        hours: "Mon-Fri: 08:00 - 16:30",
        delayText: "High Volume"
    },
    {
        id: "gbr",
        country: "United Kingdom",
        flag: "🇬🇧",
        region: "Europe",
        address: "Ramna 5, Diplomatic Enclave, Islamabad",
        phone: "+92 51 201 2000",
        email: "ukinvpmb@fcdo.gov.uk",
        website: "gov.uk/world/pakistan",
        bookingUrl: "https://visa.vfsglobal.com/pak/en/gbr/",
        hours: "Mon-Thu: 08:00 - 16:15",
        delayText: "Processing: 3 Weeks"
    },
    {
        id: "can",
        country: "Canada",
        flag: "🇨🇦",
        region: "Americas",
        address: "Sector G-5, Diplomatic Enclave, Islamabad",
        phone: "+92 51 208 6000",
        email: "isbad-im-enquiry@international.gc.ca",
        website: "canadainternational.gc.ca/pakistan",
        bookingUrl: "https://visa.vfsglobal.ca/pak/en/can/",
        hours: "Mon-Thu: 08:00 - 17:00",
        delayText: "Processing: 40 Days"
    },
    {
        id: "aus",
        country: "Australia",
        flag: "🇦🇺",
        region: "Oceania",
        address: "Constitution Ave and Ispahani Rd, Diplomatic Enclave 1, Islamabad",
        phone: "+92 51 835 5500",
        email: "islamabad.visas@dfat.gov.au",
        website: "pakistan.embassy.gov.au",
        bookingUrl: "https://visa.vfsglobal.com/pak/en/aus/",
        hours: "Mon-Fri: 08:00 - 16:15",
        delayText: "Standard"
    },
    {
        id: "deu",
        country: "Germany",
        flag: "🇩🇪",
        region: "Europe",
        address: "Ramna 5, Diplomatic Enclave, Islamabad",
        phone: "+92 51 227 3269",
        email: "info@islamabad.diplo.de",
        website: "pakistan.diplo.de",
        bookingUrl: "https://pakistan.diplo.de/pk-en/service/05-VisaEinreise",
        hours: "Mon-Fri: 08:00 - 13:00",
        delayText: "High Volume"
    },
    {
        id: "fra",
        country: "France",
        flag: "🇫🇷",
        region: "Europe",
        address: "Diplomatic Enclave G-5, Islamabad",
        phone: "+92 51 201 1414",
        email: "visas.islamabad-amba@diplomatie.gouv.fr",
        website: "pk.ambafrance.org",
        bookingUrl: "https://france-visas.gouv.fr/",
        hours: "Mon-Fri: 08:30 - 13:00",
        delayText: "Standard"
    },
    {
        id: "are",
        country: "UAE",
        flag: "🇦🇪",
        region: "Middle East",
        address: "Plot No. 1-22, University Road, Diplomatic Enclave, Islamabad",
        phone: "+92 51 209 9999",
        email: "islamabademb@mofaic.gov.ae",
        website: "mofaic.gov.ae/en/missions/islamabad",
        bookingUrl: "https://smartservices.icp.gov.ae/",
        hours: "Mon-Fri: 09:00 - 16:00",
        delayText: "Fast Track Available"
    },
    {
        id: "sau",
        country: "Saudi Arabia",
        flag: "🇸🇦",
        region: "Middle East",
        address: "House 14, Street 2, F-6/3, Islamabad",
        phone: "+92 51 282 0159",
        email: "pkemb@mofa.gov.sa",
        website: "embassies.mofa.gov.sa/sites/pakistan",
        bookingUrl: "https://visa.visitsaudi.com/",
        hours: "Mon-Fri: 09:00 - 15:00",
        delayText: "Standard"
    },
    {
        id: "chn",
        country: "China",
        flag: "🇨🇳",
        region: "Asia",
        address: "No.1, Zhou-Enlai Avenue, Diplomatic Enclave, Islamabad",
        phone: "+92 51 201 2801",
        email: "islamabad@csm.mfa.gov.cn",
        website: "pk.chineseembassy.org",
        bookingUrl: "https://www.visaforchina.cn/",
        hours: "Mon-Fri: 08:30 - 16:30",
        delayText: "Document Review: 5 Days"
    },
    {
        id: "jpn",
        country: "Japan",
        flag: "🇯🇵",
        region: "Asia",
        address: "53-70, Ramna 5/4, Diplomatic Enclave 1, Islamabad",
        phone: "+92 51 907 2500",
        email: "ryoji@ib.mofa.go.jp",
        website: "pk.emb-japan.go.jp",
        bookingUrl: "https://visa.vfsglobal.com/pak/en/jpn/",
        hours: "Mon-Fri: 09:00 - 12:00",
        delayText: "Processing: 10 Days"
    },
    {
        id: "sgp",
        country: "Singapore",
        flag: "🇸🇬",
        region: "Asia",
        address: "No. 6, Street 3, Sector F-8/3, Islamabad",
        phone: "+92 51 285 3698",
        email: "singhc_isb@mfa.sg",
        website: "mfa.gov.sg/islamabad",
        bookingUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
        hours: "Mon-Fri: 08:30 - 16:30",
        delayText: "E-Visa Available"
    },
    {
        id: "tur",
        country: "Turkey",
        flag: "🇹🇷",
        region: "Europe",
        address: "Street 1, Diplomatic Enclave, Islamabad",
        phone: "+92 51 831 9800",
        email: "embassy.islamabad@mfa.gov.tr",
        website: "islamabad.emb.mfa.gov.tr",
        bookingUrl: "https://anatoliaexpress.com/",
        hours: "Mon-Fri: 09:00 - 17:00",
        delayText: "Standard"
    },
    {
        id: "ita",
        country: "Italy",
        flag: "🇮🇹",
        region: "Europe",
        address: "Plot 196/208, Street 16, Diplomatic Enclave, Islamabad",
        phone: "+92 51 283 3183",
        email: "visti.islamabad@esteri.it",
        website: "ambislamabad.esteri.it",
        bookingUrl: "https://prenotami.esteri.it/",
        hours: "Mon-Fri: 09:00 - 13:00",
        delayText: "Appointments Limited"
    },
    {
        id: "esp",
        country: "Spain",
        flag: "🇪🇸",
        region: "Europe",
        address: "Street 6, Ramna 5, Diplomatic Enclave I, Islamabad",
        phone: "+92 51 208 8777",
        email: "emb.islamabad.vis@maec.es",
        website: "exteriores.gob.es/Embajadas/Islamabad",
        bookingUrl: "https://blsspainvisa.com/pakistan/",
        hours: "Mon-Thu: 09:00 - 13:00",
        delayText: "Standard"
    },
    {
        id: "nld",
        country: "Netherlands",
        flag: "🇳🇱",
        region: "Europe",
        address: "167, Street 15, Sector G-5, Diplomatic Enclave, Islamabad",
        phone: "+92 51 200 4444",
        email: "isl@minbuza.nl",
        website: "netherlandsandyou.nl/your-country-and-the-netherlands/pakistan",
        bookingUrl: "https://visa.vfsglobal.com/pak/en/nld/",
        hours: "Mon-Thu: 08:00 - 16:00",
        delayText: "High Volume"
    },
    {
        id: "che",
        country: "Switzerland",
        flag: "🇨🇭",
        region: "Europe",
        address: "Street 6, Diplomatic Enclave, Islamabad",
        phone: "+92 51 227 9291",
        email: "islamabad.visa@eda.admin.ch",
        website: "eda.admin.ch/islamabad",
        bookingUrl: "https://visa.vfsglobal.com/pak/en/che/",
        hours: "Mon-Thu: 08:30 - 12:30",
        delayText: "Standard"
    },
    {
        id: "nzl",
        country: "New Zealand",
        flag: "🇳🇿",
        region: "Oceania",
        address: "Handled through VFS / Online",
        phone: "+64 9 914 4100",
        email: "info@immigration.govt.nz",
        website: "immigration.govt.nz",
        bookingUrl: "https://www.immigration.govt.nz/new-zealand-visas",
        hours: "Online 24/7",
        delayText: "E-Visa Processing"
    },
    {
        id: "kor",
        country: "South Korea",
        flag: "🇰🇷",
        region: "Asia",
        address: "Block 13, Street 29, Diplomatic Enclave II, G-5/4, Islamabad",
        phone: "+92 51 227 9380",
        email: "pakistan@mofa.go.kr",
        website: "overseas.mofa.go.kr/pk-en/index.do",
        bookingUrl: "https://visa.go.kr/",
        hours: "Mon-Fri: 09:00 - 12:00",
        delayText: "Standard"
    },
    {
        id: "mys",
        country: "Malaysia",
        flag: "🇲🇾",
        region: "Asia",
        address: "Plot No. 144-150, Street No. 17, Sector G-5, Diplomatic Enclave, Islamabad",
        phone: "+92 51 207 2900",
        email: "mwislamabad@kln.gov.my",
        website: "kln.gov.my/web/pak_islamabad",
        bookingUrl: "https://malaysiavisa.imi.gov.my/evisa/",
        hours: "Mon-Fri: 08:30 - 16:30",
        delayText: "E-Visa Available"
    },
    {
        id: "tha",
        country: "Thailand",
        flag: "🇹🇭",
        region: "Asia",
        address: "Plot No. 1 - 20, Diplomatic Enclave-I, Sector G-5/4, Islamabad",
        phone: "+92 51 843 1270",
        email: "thaiembassy.isl@mfa.go.th",
        website: "islamabad.thaiembassy.org",
        bookingUrl: "https://thaievisa.go.th/",
        hours: "Mon-Fri: 09:00 - 11:30",
        delayText: "E-Visa Strongly Recommended"
    }
]

export default function EmbassyTracker() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedRegion, setSelectedRegion] = useState("All")

    const filteredEmbassies = embassies.filter(embassy => {
        const matchesSearch = embassy.country.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRegion = selectedRegion === "All" || embassy.region === selectedRegion
        return matchesSearch && matchesRegion
    })

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0D1627] min-h-full" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 text-[#4F8EF7] text-xs font-bold uppercase tracking-wider">
                            <Building2 className="w-4 h-4" /> Global Directory
                        </div>
                        <h1 className="text-3xl font-bold font-display tracking-tight text-white">Embassy Tracker</h1>
                        <p className="text-sm text-[#8892A4] max-w-xl">
                            Locate official diplomatic missions, check operating hours, and jump directly into the visa appointment portals for your target destinations.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A4]" />
                            <Input
                                placeholder="Search countries..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-[#161B27] border-white/10 text-sm h-10 w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Region Filters */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    <Filter className="w-4 h-4 text-[#8892A4] mr-2 shrink-0" />
                    {regions.map((region) => (
                        <button
                            key={region}
                            onClick={() => setSelectedRegion(region)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${selectedRegion === region
                                ? 'bg-[#A78BFA] text-white shadow-lg shadow-[#A78BFA]/20'
                                : 'bg-white/5 text-[#8892A4] hover:bg-white/10 hover:text-white border border-white/5'
                                }`}
                        >
                            {region}
                        </button>
                    ))}
                </div>

                {/* Embassy Grid */}
                {filteredEmbassies.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredEmbassies.map((embassy, i) => (
                                <motion.div
                                    key={embassy.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2, delay: i * 0.05 }}
                                    className="glass rounded-2xl p-6 border border-white/10 flex flex-col hover:border-white/20 transition-all group"
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="text-4xl filter drop-shadow-md">{embassy.flag}</div>
                                            <div>
                                                <h3 className="font-bold text-lg text-white group-hover:text-[#4F8EF7] transition-colors">{embassy.country}</h3>
                                                <span className="text-xs text-[#8892A4] uppercase tracking-wider font-semibold">{embassy.region}</span>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md ${embassy.delayText.includes('Fast') || embassy.delayText.includes('E-Visa') ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
                                            : embassy.delayText.includes('High') || embassy.delayText.includes('Limited') ? 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20'
                                                : 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20'
                                            }`}>
                                            {embassy.delayText}
                                        </span>
                                    </div>

                                    {/* Card Body Components */}
                                    <div className="space-y-4 mb-8 flex-1">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-[#8892A4] mt-0.5 shrink-0" />
                                            <span className="text-sm text-white/90 leading-snug">{embassy.address}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 text-[#8892A4] shrink-0" />
                                            <span className="text-sm text-white/90">{embassy.hours}</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs text-[#8892A4]"><Phone className="w-3 h-3" /> Phone</div>
                                                <span className="text-sm font-medium">{embassy.phone}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-xs text-[#8892A4]"><Globe className="w-3 h-3" /> Web</div>
                                                <a href={`https://${embassy.website}`} target="_blank" rel="noreferrer" className="text-sm font-medium text-[#4F8EF7] hover:underline truncate">
                                                    {embassy.website}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Button */}
                                    <div className="pt-4 border-t border-white/5 mt-auto">
                                        <Button
                                            className="w-full bg-[#080B14] hover:bg-[#161B27] border border-white/10 hover:border-[#4F8EF7]/50 transition-colors text-white"
                                            asChild
                                        >
                                            <a href={embassy.bookingUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                                                Book Appointment <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 glass rounded-2xl border-dashed border-white/10">
                        <Building2 className="w-12 h-12 text-[#8892A4] mb-4 opacity-50" />
                        <h3 className="text-lg font-bold text-white mb-2">No embassies found</h3>
                        <p className="text-[#8892A4] text-sm">We couldn't find any embassies matching "{searchQuery}" in {selectedRegion}.</p>
                        <Button variant="ghost" onClick={() => { setSearchQuery(""); setSelectedRegion("All") }} className="mt-6">Clear Filters</Button>
                    </div>
                )}
            </div>
        </div>
    )
}
