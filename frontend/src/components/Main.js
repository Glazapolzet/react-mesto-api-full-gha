import React, {useContext} from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


export default function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={props.onEditAvatar}>
          <div className="profile__avatar" style={{backgroundImage: `url(${currentUser['avatar']})`}}></div>
        </div>
        <div className="profile__info">
          <div className="profile__name-wrapper">
            <h1 className="profile__name">{currentUser['name']}</h1>
            <p className="profile__desc">{currentUser['about']}</p>
          </div>
          <button
            aria-label="Изменить данные профиля"
            type="button"
            className="profile__edit-user-button"
            onClick={props.onEditProfile}
          />
        </div>
        <button
          aria-label="Добавить изображение"
          type="button"
          className="profile__add-place-button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="cards">
        <ul className="cards__list">
          {props.cards.map((card, i) => (
              <Card
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
                key={card['_id']}
              />
            ))}
        </ul>
      </section>

    </main>
  );

}
