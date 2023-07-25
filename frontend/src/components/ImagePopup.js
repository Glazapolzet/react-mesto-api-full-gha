export default function ImagePopup(props) {

  return (
    <section className={`popup picture-modal ${
      Object.keys(props.card).length !== 0 
        ? "popup_opened" 
        : ""}`}
    >
      <div className="picture-modal__container">
        <figure className="picture-modal__picture-wrapper">
          <img
            src={
            Object.keys(props.card).length !== 0
              ? props.card['link']
              : ""}
            alt={props.card['name']}
            className="picture-modal__picture"
          />
          <figcaption className="picture-modal__caption">{props.card['name']}</figcaption>
        </figure>
        <button
          aria-label="Выйти из режима просмотра"
          type="button"
          className="popup__close-button picture-modal__close-button"
          onClick={props.onClose}
        />
      </div>
    </section>
  );

}
