import './Welcome.scss'

import classNames from 'classnames'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import type {RootState} from "../../states/store";
import {setUserName} from "../../states/User/userSlice";
import type {User} from "../../types/useTypes";

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
    dispatch(setUserName("Vikentii Bocharov"))
  }, []);

  const getStatsArr = (user : User)  => [
    { title: 'str', number: `${user?.str || 0}` },
    { title: 'agi', number: `${user?.agi || 0}` },
    { title: 'luck', number: `${user?.luck || 0}` },
    { title: 'int', number: `${user?.int || 0}` }
  ];

  const statsArr = getStatsArr(user)



  return (
    <div
      className={classNames(className, 'welcome')}
    >
      <div className="welcome__body">
        <h1 className="welcome__title">Welcome <span className="welcome__title-name">{user.name}</span>
        </h1>
        <div className="welcome__statistic">
          <div className="welcome__time">Today is <h2 className="welcome__time-numbers">{date.day}.{date.month}.{date.year}</h2>
          </div>
          <div className="welcome__user-info">
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
        </div>
      </div>
    </div>
  )
}

export default Welcome