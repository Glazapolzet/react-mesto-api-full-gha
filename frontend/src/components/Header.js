import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

export default function Header(props) {

  const [isMobileContentVisible, setMobileContentVisible] = useState(false);

  function handleMenuClick () {
    setMobileContentVisible(!isMobileContentVisible);
  }

  return(
    <>
      {props.isMain && (
        <div
          className={`header__mobile-content ${isMobileContentVisible ? "header__mobile-content_visible" : ""}`}
        >
          <p className="header__mail">
            {props.children}
          </p>
          <NavLink
            to={props.linkTo}
            onClick={props.onSignOut}
            className="header__link header__link_use_main"
          >
            {props.linkName}
          </NavLink>
        </div>
      )}
      <header className="header">
        <div className="header__logo"/>
        {props.isMain ? (
          <>
            <button
              type="button"
              className="header__menu"
              onClick={handleMenuClick}
            />
            <div className="header__content header__content_use_menu">
              <p className="header__mail">
                {props.children}
              </p>
              <NavLink
                to={props.linkTo}
                onClick={props.onSignOut}
                className="header__link header__link_use_main"
              >
                {props.linkName}
              </NavLink>
            </div>
          </>
        ) : (
          <div className="header__content">
            <NavLink
              to={props.linkTo}
              className="header__link"
            >
              {props.linkName}
            </NavLink>
          </div>
        )}
      </header>
    </>
  );

}

