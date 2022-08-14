import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
    state = { user: 'primeiro', loading: true }

    async componentDidMount() {
      const userObj = await getUser();
      this.setState({ user: userObj }, () => {
        this.setState({ loading: false });
      });
    }

    render() {
      const { user } = this.state;
      const { loading } = this.state;
      return (
        <header data-testid="header-component">
          <h1>
            TrybeTunes
          </h1>
          <nav>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            <div className="userName">
              { loading ? <Loading />
                : (
                  <p data-testid="header-user-name">
                    {`User: ${user.name}`}
                  </p>) }
            </div>
          </nav>
        </header>);
    }
}

export default Header;
