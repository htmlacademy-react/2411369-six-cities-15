import classNames from 'classnames';
import { ListOffers } from '../../types/offer';
import CardComponent from '../card-component/card-component';
import SortComponent from '../sort-component/sort-component';
import EmptyCityComponent from '../empty-city-component/empty-city-component';
import { useState } from 'react';

type CardComponentProps = {
  offersCount: number;
  offers: ListOffers[];
}

function CardContainerComponent({offers, offersCount}: CardComponentProps) {
  const isEmpty = offers.length === 0;
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const handleMouseEnter = (id: string | null) => setActiveOffer(id);
  const handleMouseLeave = (null);

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': isEmpty})}>
      {isEmpty ? <EmptyCityComponent /> : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersCount} places to stay in Amsterdam </b>
          <p>Current ID: {activeOffer}</p>
          <SortComponent />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <CardComponent key={offer.id} {...offer} environment="cities" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            ))}
          </div>
        </section>
      )}
      <div className="cities__right-section">
        <section className="cities__map map"></section>
      </div>
    </div>

  );
}

export default CardContainerComponent;
