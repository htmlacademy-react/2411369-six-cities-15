import { CITIES } from '../../const';
import { Link } from 'react-router-dom';
import { getRandomArrayElement } from '../../utils';
import { memo } from 'react';

function RandomCity_(): JSX.Element {
  const {id, name} = getRandomArrayElement(CITIES);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={`/${id}`}>
          <span>{name}</span>
        </Link>
      </div>
    </section>
  );
}

const RandomCity = memo(RandomCity_);

export default RandomCity;
