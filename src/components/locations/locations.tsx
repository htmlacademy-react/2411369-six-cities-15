import { Link } from 'react-router-dom';
import { CITIES } from '../../const';

function Locations(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li className="locations__item" key={city}>
          <Link className="locations__item-link tabs__item" to="#">
            <span>{city}</span>
          </Link>
        </li>
      ))}

      {/* {CITIES.map((city) => (
        <li className="locations__item" key={city.name}>
          <NavLink
            className={({ isActive }) =>
              classNames('locations__item-link tabs__item', {
                'tabs__item--active': isActive
              })}
            to={`/${city.slug}`}
          >
            <span>{city.name}</span>
          </NavLink>
        </li> */}
    </ul>
  );
}

export default Locations;
