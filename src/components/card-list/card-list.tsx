import classNames from 'classnames';
import { Offer } from '../../types/offer';
import Card from '../card/card';
import Sort from '../sort/sort';
import CardListEmpty from '../card-list-empty/card-list-empty';
import Map from '../map/map';
import { CityName } from '../../const';
import { useActionCreators } from '../../hooks/store';
import { offersActions } from '../../store/slice/offers';
import { MouseEvent } from 'react';

type CardListProps = {
  currentCity: CityName;
  currentOffers: Offer[];
  isEmpty: boolean;
}

function CardList({currentCity, currentOffers, isEmpty}: CardListProps) {
  const { setActiveId } = useActionCreators(offersActions);

  const handleMouseEnter = (evt: MouseEvent<HTMLElement>) => {
    const target = evt.currentTarget as HTMLElement;
    const id = target.dataset.id;
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(undefined);
  };

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': isEmpty})}>
      {isEmpty ? <CardListEmpty city={currentCity} /> : (
        <>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} place{currentOffers.length > 1 && 's'} to stay in {currentCity} </b>
            <Sort />
            <div className="cities__places-list places__list tabs__content">
              {currentOffers.map((offer) => (
                <Card key={offer.id} {...offer} environment="cities" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              ))}
            </div>
          </section>
          <div className='cities__right-section'>
            <Map city={currentCity} offers={currentOffers} />
          </div>
        </>
      )}
    </div>
  );
}

export default CardList;
