import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    userObj: {},
    loading: true }

  componentDidMount() {
    getUser().then((obj) => {
      this.setState({ userObj: obj, loading: false });
    });
  }

  render() {
    const { userObj, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div className="profile">
            <p>{`Name: ${userObj.name}`}</p>
            <p>{`Description: ${userObj.description}`}</p>
            <p>
              {`E-mail: ${userObj.email}`}
            </p>
            <img
              data-testid="profile-image"
              src={ userObj.image }
              alt={ userObj.description }
            />
            <button type="button"><Link to="/profile/edit">Editar perfil</Link></button>
          </div>)}

      </div>);
  }
}

export default Profile;
