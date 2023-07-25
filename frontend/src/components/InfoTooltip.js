import React from "react";

export default function InfoTooltip (props) {
  return (
    <section
      className={`popup popup_use_${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__wrapper popup__wrapper_use_info">
        <div className="popup__icon" style={{
          backgroundImage: `url(${props.icon})`,
        }}/>
        <div className="popup__title popup__title_use_info">{props.title}</div>
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