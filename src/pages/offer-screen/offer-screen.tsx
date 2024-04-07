import { useDocumentTitle } from '../../hooks/document-title';
import Card from '../../components/card/card';
import { useParams } from 'react-router-dom';
import { getNearOffers } from '../../utils';
import Map from '../../components/map/map';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offerActions, offerSelector } from '../../store/slice/offer';
import { reviewsActions } from '../../store/slice/review';
import { useEffect } from 'react';
import { RequestStatus } from '../../const';
import Loading from '../../components/loading/loading';
import useScrollToTop from '../../hooks/use-scroll-to-top';
import { offersActions } from '../../store/slice/offers';
import OfferContainer from '../../components/offer-container/offer-container';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import Header from '../../components/header/header';

const allActions = {
  ...offerActions,
  ...reviewsActions,
  ...offersActions,
};

function OfferScreen(): JSX.Element {
  useDocumentTitle('Offer');
  useScrollToTop();

  const offerPage = useAppSelector(offerSelector.offer);
  const status = useAppSelector(offerSelector.offerStatus);
  const nearByOffers = useAppSelector(offerSelector.nearByOffers);

  const { fetchNearBy, fetchOffer, setActiveId, fetchReviews, clearOffer } =
    useActionCreators(allActions);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      setActiveId(id);
      Promise.all([fetchOffer(id), fetchNearBy(id), fetchReviews(id)]);
    }
  }, [fetchOffer, fetchNearBy, fetchReviews, setActiveId, id, status]);

  useEffect(() => {
    clearOffer();
  }, [id, clearOffer]);

  if (status === RequestStatus.Failed) {
    return <NotFoundScreen />;
  }

  if (status === RequestStatus.Loading || !offerPage) {
    return <Loading />;
  }

  const nearbyOffers = getNearOffers(nearByOffers, id, offerPage.city.name) ;
  const nearOffersPlusCurrent = [offerPage, ...nearbyOffers];

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offerPage.images} />
          <OfferContainer offer={offerPage} offerId={id} />
          <Map
            city={offerPage.city.name}
            offers={nearOffersPlusCurrent}
            place="offer"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) =>
                <Card key={offer.id} environment="near-places" {...offer} />)}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
