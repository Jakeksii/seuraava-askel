import Header from "../assets/components/Header";
import OrganizationUsers from "../assets/components/organizationUsers";

export default function Subscription() {
    return (
        <>
        <Header />
        <main>
        <h2 className="text-center p-2">Tilauksen ja tiimin hallinnointi sivu</h2>
        <OrganizationUsers />
        </main>
        </>
    )
}