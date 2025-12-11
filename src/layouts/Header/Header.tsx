import './Header.scss'

import classNames from 'classnames'
import {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router";

import BurgerButton from "../../components/BurgerButton/BurgerButton";
import HydrationTasks from "../../components/HydrationTasks/HydrationTasks";
import UserMini from "../../components/UserMini/UserMini";


interface linkInter {
  title: string,
  link: string,
}

const Header = () => {


  const links: linkInter[] = [
    {
      title: 'Main menu',
      link: '/',
    },
    {
      title: 'All tasks',
      link: '/allTasks',
    },
    {
      title: 'Statistic and analytics',
      link: '/statistic',
    },
    {
      title: 'Achievements',
      link: '/achievements',
    },
    {
      title: 'Friend list',
      link: '/rules',
    },
    {
      title: 'Daily Quest',
      link: '/dailyQuests',
    },
    {
      title: 'Settings',
      link: '/settings',
    },
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()

  const sideMenu = useRef<HTMLUListElement>(null)

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('is-lock');
    } else {
      document.documentElement.classList.remove('is-lock');
    }
  }, [isMenuOpen]);



  useEffect(() => {
    const closeSideMenu = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        sideMenu.current &&
        !sideMenu.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
      if (
        !isMenuOpen &&
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(true)
      }
    }

    document.addEventListener("mousedown", closeSideMenu)

    return () => {
      document.removeEventListener("mousedown", closeSideMenu)
    }
  }, [isMenuOpen]);


  return (
    <HydrationTasks>
      <header
        className={classNames('header')}
      >
        <div className={classNames("header__inner", 'container')}>
          <div className="header__menu">
            <BurgerButton
              // handleClick={handleClick}
              isMenuOpen={isMenuOpen}
              ref={buttonRef}
            />
            <Link
              className="header__link"
              to={'/'}
              onClick={() => setIsMenuOpen(false)}
            >
              <h1
                className="header__title"

              >Life Game RPG
              </h1>
            </Link>
          </div>
          <ul
            className={classNames('header__list', {
              'is-active': isMenuOpen
            })}
            ref={sideMenu}
          >
            {links.map(({title, link}, index) => (
              <li
                className="header__item"
                key={index}
              >
                <Link
                  className={classNames("header__item-link", {
                    'is-active': location.pathname === link
                  })}
                  to={link}
                  onClick={() => setIsMenuOpen(false)}
                >{title}</Link>
              </li>
            ))}
          </ul>
          <UserMini />
        </div>
      </header>
    </HydrationTasks>
  )
}

export default Header
