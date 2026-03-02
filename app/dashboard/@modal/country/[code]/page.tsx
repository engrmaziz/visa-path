import { CountryDetailDrawer } from "@/components/visa/country-detail-drawer"

export default async function CountryModal({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params

    // Here we would fetch data from the API Route or Server Action
    // For now, we mock it.
    const mockData = { destinationCountry: code.toUpperCase() }

    return <CountryDetailDrawer code={code} data={mockData} />
}
