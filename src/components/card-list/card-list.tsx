import classNames from 'classnames';
import { Offer } from '../../types/offer';
import Card from '../card/card';
import Sort from '../sort/sort';
import CardListEmpty from '../card-list-empty/card-list-empty';
import { useState } from 'react';
import Map from '../map/map';
import { CityName } from '../../const';

type CardListProps = {
  currentCity: CityName;
  currentOffers: Offer[];
  isEmpty: boolean;
}

function CardList({currentCity, currentOffers, isEmpty}: CardListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const handleMouseHover = (id?: string) => {
    setActiveOfferId(id || null);
  };

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': isEmpty})}>
      {isEmpty ? <CardListEmpty city={currentCity} /> : (
        <>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentCity} </b>
            <Sort />
            <div className="cities__places-list places__list tabs__content">
              {currentOffers.map((offer) => (
                <Card key={offer.id} {...offer} environment="cities" handleMouseHover={handleMouseHover} />
              ))}
            </div>
          </section>
          <div className='cities__right-section'>
            <Map offers={currentOffers} activeOfferId={activeOfferId} />
          </div>
        </>
      )}
    </div>
  );
}

export default CardList;
