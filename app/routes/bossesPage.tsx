import type {Route} from "./+types/home";
import {Link} from "react-router";
import TasksColumns from "../../src/sections/TasksColumns/TasksColumns";


export function meta({}: Route.MetaArgs) {
  return [
    {title: "Life Game RPG || Bosses"},
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

export default function Bosses() {
  return (
    <>
     <TasksColumns />
    </>
  )
}
