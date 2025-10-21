import './UserMini.scss'
import classNames from 'classnames'
import {useState} from "react";
import {Link} from "react-router";

interface props {
  className?: string,
}

function UserMini(props: props) {
  const {
    className,
  } = props

  const [isOpen, setIsOpen] = useState(false)

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
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          className="user-mini__img"
          src=""
          alt=""
          width=""
          height=""
          loading="lazy"
        />
      </button>
      <ul className={classNames("user-mini__list", {
        'is-open': isOpen
      })}>
        {menuItems.map(({title, link}, index) => (
          <li
            className="user-mini__item"
            key={index}
          >
            <Link className="user-mini__link" to={link}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserMini