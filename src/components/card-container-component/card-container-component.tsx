import { ListOffers } from '../../types/offer';
import CardComponent from '../card-component/card-component';

type CardComponentProps = {
  offers: ListOffers[];
}

function CardContainerComponent({offers}: CardComponentProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <CardComponent key={item.id} environment="cities" {...item} />
      ))}
    </div>
  );
}

export default CardContainerComponent;
