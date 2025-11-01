import './UserMini.scss'
import classNames from 'classnames'
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../states/store";
import Button from "../Button/Button";
import {resetUser} from "../../states/User/userSlice";
import ThemeChangeButton from "../ThemeChangeButton/ThemeChangeButton";

interface userMiniProps {
  className?: string,
}

const UserMini = ({className}: userMiniProps) => {


  const [isOpen, setIsOpen] = useState(false)

  const listRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const xp = useSelector((state: RootState) => state.user.user.xp)


  const lvl = useSelector((state: RootState) => state.user.user.lvl)
  const dispatch: AppDispatch = useDispatch()

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
      }
      if (!isOpen && buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        setIsOpen(true)
      }
    }

    document.addEventListener('mousedown', closeList)

    return () => {
      document.removeEventListener('mousedown', closeList)
    }
  }, [isOpen]);

  const handlerClick = () => {
    dispatch(resetUser(0))
  }


  return (
    <div
      className={classNames(className, 'user-mini')}
    >
      <div className="user-mini__stats">
        <ThemeChangeButton />
        <p className="user-mini_name">Бочаров Викентий</p>
        <div className="user-mini_lvl">
          <p className="user-mini_lvl-title">LVL</p>
          <p className="puser-mini_lvl-level">{lvl}</p>
        </div>
        <Button
          type={"button"}
          onClick={handlerClick}
          title="reset"
        />
      </div>
      <button
        className="user-mini__button"
        type="button"
        ref={buttonRef}
      > click
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

export default UserMini