import classNames from 'classnames';
import { City, Offers } from '../../types/offer';
import Card from '../card/card';
import Sort from '../sort/sort';
import CardListEmpty from '../card-list-empty/card-list-empty';
import { useState } from 'react';
import Map from '../map/map';

type CardListProps = {
  currentLocation: City;
  currentOffers: Offers[];
  isEmpty: boolean;
}

function CardList({currentLocation, currentOffers, isEmpty}: CardListProps) {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const handleMouseHover = (id?: string) => {
    setActiveOfferId(id || null);
  };

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': isEmpty})}>
      {isEmpty ? <CardListEmpty city={currentLocation.name} /> : (
        <>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} places to stay in {currentLocation.name} </b>
            <Sort />
            <div className="cities__places-list places__list tabs__content">
              {currentOffers.map((offer) => (
                <Card key={offer.id} {...offer} environment="cities" handleMouseHover={handleMouseHover} />
              ))}
            </div>
          </section>
          <div className='cities__right-section'>
            <Map city={currentLocation} offers={currentOffers} activeOfferId={activeOfferId} />
            {/* <section className='cities__map map'></section> */}
          </div>
        </>
      )}
    </div>
  );
}

export default CardList;
