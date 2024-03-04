import classNames from 'classnames';
import { Offers } from '../../types/offer';
import Card from '../card/card';
import Sort from '../sort/sort';
import CardListEmpty from '../card-list-empty/card-list-empty';
import { useState } from 'react';

type CardListProps = {
  offersCount: number;
  offers: Offers[];
}

function CardList({offers, offersCount}: CardListProps) {
  const isEmpty = offers.length === 0;
  const [activeOffer, setActiveOffer] = useState<string | null>(null);
  const handleMouseHover = (id?: string) => {
    setActiveOffer(id || null);
  };

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': isEmpty})}>
      {isEmpty ? <CardListEmpty /> : (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offersCount} places to stay in Amsterdam </b>
          <p>Current ID: {activeOffer}</p>
          <Sort />
          <div className="cities__places-list places__list tabs__content">
            {offers.map((offer) => (
              <Card key={offer.id} {...offer} environment="cities" handleMouseHover={handleMouseHover} />
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

export default CardList;
