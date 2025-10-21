import './Header.scss'
import classNames from 'classnames'
import BurgerButton from "../../components/BurgerButton/BurgerButton";
import {Link, useLocation} from "react-router";
import {useEffect, useState} from "react";
import UserMini from "../../components/UserMini/UserMini";

interface props {
  className?: string,
  url?: string
}

interface linkInter {
  title: string,
  link: string,
}

export default function Header(props: props) {
  const {
    className,
    url,
  } = props

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
      link: '/friends',
    },
    {
      title: 'Daily Quest',
      link: '/daily',
    },
    {
      title: 'Settings',
      link: '/settings',
    },
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('is-lock');
    } else {
      document.documentElement.classList.remove('is-lock');
    }
  }, [isMenuOpen]);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // console.log()


  return (
    <header
      className={classNames('header')}
    >
      <div className={classNames("header__inner", 'container')}>
        <div className="header__menu">
          <BurgerButton
            handleClick={handleClick}
            isMenuOpen={isMenuOpen}
          />
          <Link className="header__link" to={'/'}>
            <h1 className="header__title">Life Game RPG</h1>
          </Link>
        </div>
        <ul
          className={classNames('header__list', {
            'is-active': isMenuOpen
          })}
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
  )
}
