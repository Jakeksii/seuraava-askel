import { Tab, TabPanel, Tabs, TabsList } from "@mui/base"
import { CircularProgress } from "@mui/material"
import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"
import Events from "../assets/components/Feed/Events"
import Header from "../assets/components/Header"
import { PageImage } from "../assets/components/PageImage"
import useGetOrganizationPage from "../assets/hooks/api-hooks/useGetOrganizationPage"
import NotFound from "./NotFound"
import getSearchQuery from "../assets/functions/getSearchQuery"

const contactInfo = (phone: string, email: string) => {
    return (
        (phone.length === 0 && email.length === 0) ? <> </> :
            <div className="pb-4 grid">
                <h4>Ota yhteyttä</h4>
                {phone.length === 0 ? <> </> : <Link to={"tel:" + phone}>{phone}</Link>}
                {email.length === 0 ? <> </> : <Link to={"mailto:" + email}>{email}</Link>}
            </div>
    )
}

const skeleton = (
    <main className="grid h-screen place-items-center text-white" aria-busy={true}>
        <CircularProgress color="inherit" />
    </main>
)

export default function OrganizationPage() {
    const { organization_name } = useParams()
    if (!organization_name) return <Suspense><NotFound /></Suspense>
    const { data, isLoading, isError } = useGetOrganizationPage({ query: decodeURI(organization_name.replace(/-/g, ' ')) })
    if (isLoading) return skeleton
    if (!data || isError) return <Suspense><NotFound /></Suspense>

    const mapsLink = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURI(`${data.organization.address.street} ${data.organization.address.zipcode} ${data.organization.address.city} ${data.organization.address.state} ${data.organization.address.country}`)
    const contactInfoElement = contactInfo(data.organization.contact_info.phone, data.organization.contact_info.email)

    const query = getSearchQuery({type:"organization", search:organization_name.replace(/-/g, ' ')})
    
    return (
        <>
            <Header />
            <main className="max-w-4xl m-auto pb-10">
                <div className="p-2">
                    <PageImage className="rounded-2xl" image_id={data.image_id} width={820} height={312} />
                </div>
                <div className="text-white m-4 min-h-screen">
                    <h1 className=" text-center">{data.organization.name}</h1>
                    <Tabs defaultValue={1} className=" m-2">
                        <TabsList className="flex justify-evenly gap-2 md:gap-4">
                            <Tab value={1} className="w-[100%] p-1 bg-primary-main rounded-lg">Yleistä</Tab>
                            <Tab value={2} className="w-[100%] p-1 bg-primary-main rounded-lg">Tapahtumat</Tab>
                            <Tab value={3} className="w-[100%] p-1 bg-primary-main rounded-lg">Yhteystiedot</Tab>
                        </TabsList>
                        <TabPanel value={1}>
                            <section className="mt-8 bg-white text-black p-4 rounded-2xl" >
                                <div className="w-fit m-auto" dangerouslySetInnerHTML={{ __html: data.data }} />
                            </section>
                        </TabPanel>
                        <TabPanel value={2}>
                            <section className="mt-8">
                                <Events query={query} />
                            </section>
                        </TabPanel>
                        <TabPanel value={3}>
                            <section className="mt-8 bg-white text-black p-4 rounded-2xl">
                                <div className="w-fit m-auto">
                                    {contactInfoElement}
                                    <h4>{data.organization.address.street}, {data.organization.address.zipcode} {data.organization.address.city}</h4>
                                    <p>{data.organization.address.state}, {data.organization.address.country}</p>
                                    <Link to={mapsLink}>Reittiohjeet</Link>
                                </div>
                            </section>
                        </TabPanel>
                    </Tabs>
                </div>
            </main>
        </>
    )
}