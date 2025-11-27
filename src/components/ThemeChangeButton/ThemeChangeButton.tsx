import './ThemeChangeButton.scss';

import classNames from 'classnames';
import React, {useEffect, useMemo,useState} from "react";

interface ThemeChangeButtonProps {
  className?: string;
}

const ThemeChangeButton = ({className}: ThemeChangeButtonProps) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem("theme")
      return theme ? JSON.parse(theme) : false
    }
    return false
  });

  const value = useMemo(() =>
    ({theme, setTheme}), [theme])

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(value.theme))
  }, [value]);


  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
  }, [theme]);

  return (
    <button
      className={classNames(className, 'theme-change-button')}
      onClick={() => setTheme(!theme)}
      type="button"
    >
      <div
        className={classNames("theme-change-button__icon", "theme-change-button__icon-light", {
          "is-active": !theme
        })}
      >
        <img
          className="theme-change-button__img-sun"
          alt="Light theme"
          src="/src/assets/icons/Sun-icon.svg"
          width="36"
          height="36"
          loading="lazy"
        />
      </div>

      <div
        className={classNames("theme-change-button__icon", "theme-change-button__icon-dark", {
          "is-active": theme
        })}
      >
        <img
          className="theme-change-button__img-moon"
          alt="Dark theme"
          src="/src/assets/icons/Monn-icon.svg"
          width="36"
          height="36"
          loading="lazy"
        />
      </div>
    </button>
  );
};

export default ThemeChangeButton;