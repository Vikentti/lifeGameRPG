import { NavLink } from "react-router";
import type {Route} from "./+types/home";
import HeroPage from "../../src/sections/HeroPage/HeroPage";




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
      <HeroPage/>
    </>
  )
}
