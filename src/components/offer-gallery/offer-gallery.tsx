import { memo } from 'react';
import { FullOffer } from '../../types/offer';

type OfferGalleryProps = {
  images: FullOffer['images'];
}

const MAX_COUNT_IMAGES = 6;

function OfferGallery_({images}: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image) => (
          <div className="offer__image-wrapper" key={image}>
            <img className="offer__image" src={image} alt="Photo studio" />
          </div>
        )).slice(0, MAX_COUNT_IMAGES)}
      </div>
    </div>
  );
}

const OfferGallery = memo(OfferGallery_);

export default OfferGallery;
