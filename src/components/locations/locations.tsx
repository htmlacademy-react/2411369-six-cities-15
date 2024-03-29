import { Link } from 'react-router-dom';
import { CITIES } from '../../const';

function Locations(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city.name}>
          <Link className="locations__item-link tabs__item" to="#">
            <span>{city.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Locations;
