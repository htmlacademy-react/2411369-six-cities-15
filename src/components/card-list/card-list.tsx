import classNames from 'classnames';
import { ServerOffer } from '../../types/offer';
import Card from '../card/card';
import Sort from '../sort/sort';
import CardListEmpty from '../card-list-empty/card-list-empty';
import Map from '../map/map';
import { CityName, RequestStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offersActions, offersSelectors } from '../../store/slice/offers';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { SortOption } from '../sort';
import { sortOffers } from '../../utils';
import Loading from '../loading/loading';

type CardListProps = {
  currentCity: CityName;
  currentOffers: ServerOffer[];
  hasOffers: boolean;
}

function CardList({ currentCity, currentOffers, hasOffers }: CardListProps) {
  const status = useAppSelector(offersSelectors.status);
  const isLoading = status === RequestStatus.Loading;

  const { setActiveId } = useActionCreators(offersActions);
  const [ activeSort, setActiveSort ] = useState(SortOption.Popular);
  const sortedOffers = useMemo(() => sortOffers(currentOffers, activeSort), [currentOffers, activeSort]);

  const handleMouseEnter = useCallback((evt: MouseEvent<HTMLElement>) => {
    const target = evt.currentTarget as HTMLElement;
    const id = target.dataset.id;
    setActiveId(id);
  }, [setActiveId]);
  const handleMouseLeave = useCallback(() => {
    setActiveId(undefined);
  }, [setActiveId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className= {classNames('container', 'cities__places-container', {'cities__places-container--empty': !hasOffers})}>
      {!hasOffers ? <CardListEmpty city={currentCity} /> : (
        <>
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{currentOffers.length} place{currentOffers.length > 1 && 's'} to stay in {currentCity} </b>
            <Sort current={activeSort} setter={setActiveSort} />
            <div className="cities__places-list places__list tabs__content">
              {sortedOffers.map((offer) => (
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
