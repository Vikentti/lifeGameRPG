import './AllTasksPage.scss'
import type {Route} from "../+types/home";
import AllTasks from "../../../src/sections/AllTasks/AllTasks";


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

    <AllTasks />
  )
}

export default AllTasksPage