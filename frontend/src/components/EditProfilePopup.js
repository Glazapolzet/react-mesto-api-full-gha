import PopupWithForm from "./PopupWithForm";
import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      title={"Редактировать профиль"}
      name={"edit-profile"}
      buttonText={"Сохранить"}
    >
      <fieldset className="popup__input-container">
        <input
          id="name-input"
          name="name"
          type="text"
          className="popup__input popup__input_content_user-name"
          minLength="2" maxLength="40"
          value={name}
          onChange={handleNameChange}
          required
        />
        <span className="name-input-error popup__input-error"></span>
        <input
          id="desc-input"
          name="desc"
          type="text"
          className="popup__input popup__input_content_user-desc"
          minLength="2" maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <span className="desc-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}