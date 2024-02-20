import LogoComponent from '../logo-component/logo-component';
import UserProfileComponent from '../user-profile-component/user-profile-component';

function HeaderComponent(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <LogoComponent />
          </div>
          <nav className="header__nav">
            <UserProfileComponent />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
