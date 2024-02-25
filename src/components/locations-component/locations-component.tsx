import { NavLink } from 'react-router-dom';
import { CITIES } from '../../const';
import classNames from 'classnames';

function LocationsComponent(): JSX.Element {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationsComponent;
