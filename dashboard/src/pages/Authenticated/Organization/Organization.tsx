import OrganizationPreview from "../../../assets/components/OrganizationPreview";
import Loading from "../../../assets/components/partials/Loading";
import useInitPage from "../../../assets/hooks/useInitPage";
import NotFound from "../../NotFound";

export default function Organization() {
  // Initialize
  const { useQueryResults: { data: organization, isLoading, isError } } = useInitPage()
  if (isLoading) return <main><Loading /></main>
  if (!organization || isError) return <NotFound />

  return (
    <main className="w-full m-auto mt-6 text-center">
      <OrganizationPreview
        name={organization.name} />
    </main>
  )
}