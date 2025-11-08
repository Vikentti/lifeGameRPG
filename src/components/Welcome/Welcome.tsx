import './Welcome.scss'
import classNames from 'classnames'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../states/store";
import {setUserName} from "../../states/User/userSlice";
import ThemeChangeButton from "../ThemeChangeButton/ThemeChangeButton";

interface WelcomeProps {
  className?: string
}

interface FormattedDate {
  day: string;
  month: string;
  year: number;
  hours: string;
  minutes: string;
  seconds: string;
}

const Welcome = ({className}: WelcomeProps) => {

  const user = useSelector((state: RootState) => state.user.user)

  const bosses = useSelector((state: RootState) => state.bosses)
  const miniBosses = useSelector((state:RootState) => state.miniBosses)
  const mobs = useSelector((state: RootState) => state.mobs)

  const formatDate = (date = new Date()) => {
    const formatNumber = (num: number): string => num.toString().padStart(2, '0');

    return {
      day: formatNumber(date.getDate()),
      month: formatNumber(date.getMonth() + 1),
      year: date.getFullYear(),
      hours: formatNumber(date.getHours()),
      minutes: formatNumber(date.getMinutes()),
      seconds: formatNumber(date.getSeconds())
    };
  };

  const date: FormattedDate = formatDate();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setUserName("User"))
  }, []);

  const statsArr = [
    {
      title: 'str',
      number: `${user.str}`
    }
    ,
    {
      title: 'agi',
      number: `${user.agi}`
    }
    ,
    {
      title: 'luck',
      number: `${user.luck}`
    }
    ,
    {
      title: 'int',
      number: `${user.int}`
    }
  ]

  const bossesComplited = Object.keys(bosses.totalBosses).length - bosses.bosses.length

  const miniBossesComplited = Object.keys(miniBosses.totalMiniBosses).length - miniBosses.miniBosses.length


  console.log(bossesComplited)


  const toDoArr = [
    {
      title: 'Bosses',
      complited: `${(bosses.totalBosses.length) - (bosses.bosses.length)}`

    },
  ]


  return (
    <div
      className={classNames(className, 'welcome')}
    >
      <h1 className="welcome__title">Welcome <span className="welcome__title-name">{user.name}</span>
      </h1>
      <div className="welcome__body">
        <div className="welcome__stats">
          <p className="welcome__level">Your current lvl is <span className="welcome__level-span">{user.lvl}</span>
          </p>
          <ul className="welcome__list">
            {statsArr.map(({title, number}, index) => (
              <li
                className="welcome__item"
                key={index}
              >
                <div className="welcome__item-name">{title}</div>
                <div className="welcome__item-number">{number}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="welcome__info">
          <div className="welcome__time">Today is {date.day}.{date.month}.{date.year}</div>
          <div className="welcome__to-do">
            <h2 className="welcome__to-do__title">Your task stats</h2>
            <ul className="welcome-to-do__list">
              {toDoArr.map(({title, complited}, index) => (
                <li className="welcome-to-do__item" key={index}>
                  {title} : {complited}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome