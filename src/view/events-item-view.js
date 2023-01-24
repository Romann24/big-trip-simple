import AbstractView from '../framework/view/abstract-view';
import { humanizeEventDate, humanizeEventTime } from '../utils/event-utils';
import { offersByType, Destinations} from '../mock/event-mock.js';

function createTemplateEventsItem(event) {

  const {type, basePrice, destination, offers, dateFrom, dateTo} = event;
  const dateFirst = humanizeEventTime(dateFrom);
  const dateSecond = humanizeEventTime(dateTo);
  const date = humanizeEventDate(dateFrom);
  const offerByType = offersByType.find((offer) => offer.type === type);
  const eventDestination = Destinations.find((item) => destination === item.id);
  const checkedOffers = offerByType.offers
    .filter((offer) => offers.includes(offer.id));
  const offersTemplate = () => {
    if (!checkedOffers.length) {
      return `<li class="event__offer">
    <span class="event__offer-title">No additional offers</span>
    </li>`;
    } else {
      const template = checkedOffers.map((offer) => `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');
      return template;
    }
  };
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${eventDestination.name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T12:25">${dateFirst}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T13:35">${dateSecond}</time>
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${offersTemplate()}
    </ul>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}
export default class EventsItemView extends AbstractView{
  #event = null;
  #handleEditClick = null;

  constructor ({event, onEditClick}) {
    super();
    this.#event = event;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createTemplateEventsItem(this.#event);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
