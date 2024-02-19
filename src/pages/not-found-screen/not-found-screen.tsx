// import { Link } from 'react-router-dom';

import LogoComponent from '../../components/logo-component/logo-component';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <LogoComponent />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px'
        }}
        >
          Error 404 - page not found.
        </h1>
        {/* <Link to='/'>Вернуться на главную страницу</Link> */}
      </main>
    </div>
  );
}

export default NotFoundScreen;
