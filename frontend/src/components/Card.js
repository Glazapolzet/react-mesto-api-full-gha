import React, {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser['_id'];
  const isLiked = props.card['likes'].some(i => i['_id'] === currentUser['_id']);

  const cardLikeButtonClassName = (
    `cards__like-button ${isLiked && 'cards__like-button_active'}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li
      className="cards__item"
    >
      <img
        className="cards__image"
        src={props.card['link']}
        alt={props.card['name']}
        onClick={handleClick}
      />
      <div className="cards__caption">
        <h3 className="cards__title">{props.card['name']}</h3>
        <div className="cards__like-wrapper">
          <button aria-label="Оценить" type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
          <p className="cards__like-counter">{props.card['likes'].length}</p>
        </div>
      </div>
      {isOwn &&
        <button
          aria-label="Удалить изображение"
          className="cards__trash-button"
          onClick={handleDeleteClick}
        />}
    </li>
  );

}