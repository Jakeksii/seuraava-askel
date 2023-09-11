import Events from "../assets/components/Feed/Events";
import Header from "../assets/components/Header";

export default function Home() {
  return (
    <>
      <Header home />
      <main>
        <section className={"pt-6"}>
          <Events />
        </section>
      </main>
      <footer>
        <div className="pb-16" />
      </footer>
    </>
  )
}