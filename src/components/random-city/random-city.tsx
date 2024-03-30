import { faker } from '@faker-js/faker';
import { CITIES } from '../../const';
import { Link } from 'react-router-dom';

export function RandomCity() {
  const {id, name} = faker.helpers.arrayElement(CITIES);
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
