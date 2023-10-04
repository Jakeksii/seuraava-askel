import { useEffect, useState } from "react";
import Header from "../assets/components/Header";
import { Organization } from "../assets/types";

export default function CreateOrganization() {

    const [organizations, setOrganizations] = useState<Organization[]>([]);

    useEffect(()=> {

        
        const usefetch = async() => {

            try {
                const response = await fetch('/api/organizations/organizations/');
        
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }

                const data: Organization[] = await response.json()

                setOrganizations(data)

            } catch (error) {
                console.log(error)
            }

        }

        usefetch()


    }, [])

    return (
        <>
        <Header />
        <main>
        <ul>
        {organizations.map((org) => (
          <li key={org._id}>
            {org.name} (ID: {org._id})
            {/* Render additional organization fields as needed */}
          </li>
        ))}
      </ul>
        <h2 className="text-center p-2">Valitse seurakunta / Liity seurakuntaan / Listaa uusi seurakunta</h2>
        </main>
        </>
    )
}