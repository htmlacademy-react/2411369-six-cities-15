import { Link } from 'react-router-dom';
import style from './not-found-screen.module.css';
import { useDocumentTitle } from '../../hooks/document-title';
import HeaderComponent from '../../components/header-component/header-component';


function NotFoundScreen(): JSX.Element {
  useDocumentTitle('Not found');

  return (
    <div className="page">
      <HeaderComponent />

      <main className="page__main page__main--index">
        <h1 className={style.container}>
          Error 404 - page not found.
        </h1>
        <div className={style.container}>
          <Link to='/' className={style.link}>Go back to main page</Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
