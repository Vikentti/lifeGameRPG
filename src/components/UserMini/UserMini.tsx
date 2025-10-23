import './UserMini.scss'
import classNames from 'classnames'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router";

interface props {
  className?: string,
}

export default function UserMini(props: props) {
  const {
    className,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const menuItems = [
    {
      title: 'User profile',
      link: '/userProfile'
    },
    {
      title: 'Personalization ',
      link: '/personalization '
    },
    {
      title: 'Collection',
      link: '/collection '
    },
    {
      title: 'Inventory',
      link: '/inventory'
    },
    {
      title: 'Log out',
      link: '/logout'
    },
  ]

  useEffect(() => {
    const closeList = (event: MouseEvent) => {
      if (isOpen &&
        listRef.current &&
        !listRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      } if (!isOpen && buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        setIsOpen(true)
      }
    }

    document.addEventListener('mousedown', closeList)

    return () => {
      document.removeEventListener('mousedown', closeList)
    }
  }, [isOpen]);

  return (
    <div
      className={classNames(className, 'user-mini')}
    >
      <div className="user-mini__stats">
        <p className="user-mini_name">Бочаров Викентий</p>
        <div className="user-mini_lvl">
          <p className="user-mini_lvl-title">LVL</p>
          <p className="puser-mini_lvl-level">19</p>
        </div>
      </div>
      <button
        className="user-mini__button"
        type="button"
        ref={buttonRef}
      >
        {/*<img*/}
        {/*  className="user-mini__img"*/}
        {/*  src=""*/}
        {/*  alt=""*/}
        {/*  width=""*/}
        {/*  height=""*/}
        {/*  loading="lazy"*/}
        {/*/>*/}
      </button>
      <ul
        className={classNames("user-mini__list", {
          'is-open': isOpen
        })}
        ref={listRef}
      >
        {menuItems.map(({title, link}, index) => (
          <li
            className="user-mini__item "
            key={index}
          >
            <Link
              className="user-mini__link button"
              to={link}
            >{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}