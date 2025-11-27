import DailyQuest from "../../src/sections/DailyQuest/DailyQuest";
import type {Route} from "./+types/home";


// eslint-disable-next-line no-empty-pattern
export function meta({}: Route.MetaArgs) {
  return [
    {title: "Life Game RPG || All-tasks"},
    {
      name: "description",
      content: "app that makes your tasks management easer and fun!"
    },
  ];
}

function AllTasksPage() {
  return (

    <DailyQuest />
  )
}

export default AllTasksPage