import React from "react";


export default function PopupWithForm(props) {

  return (
      <section
        className={`popup popup_use_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__wrapper">
          <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
            <h3 className="popup__title">{props.title}</h3>
            {props.children}
            <button type="submit" className="popup__save-button">
              {props.buttonText}
            </button>
          </form>
          <button
            aria-label="Закрыть всплывающее окно"
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
          />
        </div>
      </section>
    )

}