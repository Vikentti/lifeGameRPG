import type {Route} from "./+types/home";


// import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "Life Game RPG || Home"},
    {
      name: "description",
      content: "app that makes your tasks management easer and fun!"
    },
  ];
}

export default function Home() {
  return (
    <>
      <h1>Header</h1>
      <p>some text</p>
    </>
  )
}
