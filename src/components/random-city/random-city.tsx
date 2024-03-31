import { CITIES } from '../../const';
import { Link } from 'react-router-dom';
import { getRandomArrayElement } from '../../utils';

export function RandomCity(): JSX.Element {
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
