import style from './loading.module.css';

function Loading(): JSX.Element {
  return (
    <div className={style['loading-container']}>
      <div className={style['loading-spinner']}></div>
      {/* <div className={style['loading-text']}>Loading...</div> */}
    </div>
  );
}

export default Loading;
