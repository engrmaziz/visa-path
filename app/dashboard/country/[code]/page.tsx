import DashboardPage from "@/app/dashboard/page"
import CountryModal from "@/app/dashboard/@modal/country/[code]/page"

export default async function Page(props: { params: Promise<{ code: string }> }) {
    return (
        <>
            <DashboardPage />
            <CountryModal {...props} />
        </>
    )
}
