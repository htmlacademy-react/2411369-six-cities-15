import { Link } from 'react-router-dom';
import LogoComponent from '../../components/logo-component/logo-component';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px'
};

function NotFoundScreen(): JSX.Element {
  const homeLink = <Link to='/'>Вернуться на главную страницу</Link>;

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
        <h1 style={containerStyle}>
          Error 404 - page not found.
        </h1>
        <div style={containerStyle}>{homeLink}</div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
