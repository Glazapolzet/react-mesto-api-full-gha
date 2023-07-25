import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useState} from "react";

export default function AddPlacePopup(props) {

  const [cardName, setCardName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setCardName('');
    setLink('');
  }, [props.isOpen]);

  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: cardName,
      link
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Новое место"}
      name={"add-place"}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <fieldset className="popup__input-container">
        <input
          id="title-input"
          name="name"
          type="text"
          className="popup__input popup__input_content_place-title"
          placeholder="Название"
          minLength="2" maxLength="30"
          value={cardName}
          onChange={handleCardNameChange}
          required
        />
        <span className="title-input-error popup__input-error"></span>
        <input
          id="link-input"
          name="link"
          type="url"
          className="popup__input popup__input_content_place-link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
          required
        />
        <span className="link-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}