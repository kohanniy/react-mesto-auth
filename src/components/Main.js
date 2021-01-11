import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddCard, onCardClick, cards, onCardLike, onConfirmDeletionPopupOpen } = props;
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__img-container">
          <img
            className="profile__img"
            src={currentUser.avatar}
            alt="аватар пользователя"
          />
          <button
            onClick={onEditAvatar}
            className="profile__avatar-btn"
            type="button"
            aria-label="Редактировать аватар"
          />
        </div>
        <div className="profile__data">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            type="button"
            aria-label="Изменить информацию о себе"
            className="profile__edit-btn"
          />
        </div>
        <button
          onClick={onAddCard}
          type="button"
          aria-label="Добавить фото"
          className="profile__add-btn"
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map(card =>
            <Card
              onConfirmDeletionPopupOpen={onConfirmDeletionPopupOpen}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              key={card._id.toString()}
              cardData={card}
            />
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
