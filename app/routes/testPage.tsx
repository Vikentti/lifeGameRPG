import type {Route} from "./+types/home";
import {Link} from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    {title: "Life Game RPG || test"},
    {
      name: "description",
      content: "app that makes your tasks management easer and fun!"
    },
  ];
}

// export async function loader({ params } : Route.LoaderArgs) {
//   let pageId = await fetch(params.bossID)
//   return {id: pageId.id}
// }

export default function Home() {
  return (
    <>
      <h1 className={'h1-second'}>Test Page</h1>
      <p className={'p'}>test page text</p>
      <Link to="/">Home</Link>
    </>
  )
}
