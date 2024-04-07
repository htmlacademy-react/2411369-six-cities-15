import { Link } from 'react-router-dom';
import style from './not-found-screen.module.css';
import { useDocumentTitle } from '../../hooks/use-document-title';
import Header from '../../components/header/header';


function NotFoundScreen(): JSX.Element {
  useDocumentTitle('Not found');

  return (
    <div className="page">
      <Header />
      <main className="page__main">
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
