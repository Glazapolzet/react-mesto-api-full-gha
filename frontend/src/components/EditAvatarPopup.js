import PopupWithForm from "./PopupWithForm";
import React, {useEffect, useRef} from "react";

export default function EditAvatarPopup(props) {

  const linkInput = useRef();

  useEffect(() => {
    linkInput.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(linkInput.current.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={"Обновить аватар"}
      name={"edit-avatar"}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <fieldset className="popup__input-container">
        <input
          id="avatar-link-input"
          name="link"
          type="url"
          className="popup__input popup__input_content_avatar-link"
          ref={linkInput}
          required
        />
        <span className="avatar-link-input-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  )
}