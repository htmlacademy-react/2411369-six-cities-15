import { Link } from 'react-router-dom';
import style from './not-found-screen.module.css';
import { useDocumentTitle } from '../../hooks/document-title';


function NotFoundScreen(): JSX.Element {
  useDocumentTitle('Not found');

  return (
    <main className="page__main page__main--index">
      <h1 className={style.container}>
        Error 404 - page not found.
      </h1>
      <div className={style.container}>
        <Link to='/' className={style.link}>Go back to main page</Link>
      </div>
    </main>
  );
}

export default NotFoundScreen;
