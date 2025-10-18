import { NavLink } from "react-router";
import type {Route} from "./+types/home";


// const arr = [
//   {id: 1},
//   {id: 2},
//   {id: 3},
//   {id: 4},
//   {id: 5},
//   {id: 6},
// ]

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
      <h1 className={'some'}>Header</h1>
      <p className={'p'}>some text</p>
      {/*{arr.map(({id}, index) => (*/}
      {/*  <NavLink to="" end>*/}
      {/*    {id}*/}
      {/*  </NavLink>*/}
      {/*))}*/}
      <NavLink to="bosses">Bosses</NavLink>
    </>
  )
}
