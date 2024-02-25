import { useEffect } from 'react';
import { APP_NAME } from '../const';

const restoreOriginalTitle = () => {
  const initialTitle = document.title;

  return () => {
    document.title = initialTitle;
  };
};

export function useDocumentTitle(title: string) {
  useEffect(restoreOriginalTitle, []);

  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
}
