import Feed from "../assets/components/Feed/Feed";
import HeaderBanner from "../assets/components/HeaderBanner/HeaderBanner";

export default function Home() {
  return (
    <>
    <main>
      <HeaderBanner />
      <Feed />
    </main>
    <footer>
      <div className=" pb-16"/>
    </footer>
    </>
  )
}