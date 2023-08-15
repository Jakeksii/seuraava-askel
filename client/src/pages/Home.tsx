import Events from "../assets/components/Feed/Events";
import Header from "../assets/components/Header";
import { LocationContextProvider } from "../assets/context/locationContext";
import { SearchContextProvider } from "../assets/context/searchContext";

export default function Home() {
  return (
    <SearchContextProvider>
    <LocationContextProvider>
      <Header home />
      <main>
        <section className={"pt-6"}>
          <Events />
        </section>
      </main>
      <footer>
        <div className=" pb-16" />
      </footer>
    </ LocationContextProvider>
    </ SearchContextProvider>
  )
}