import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser } from '../services/userAPI';


class ProfileEdit extends React.Component {
  state = {
    loading: true,
    img: '',
    des: '',
    name: '',
    email: '',
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading, img, des, name, email } = this.state;
    const { editedProfile } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <div className="profile">
            <label htmlFor="inputName">
              Name:
              {' '}
              <input
                onChange={ this.handleChange }
                value={ name }
                name="name"
                id="inputName"
                type="text"
                data-testid="edit-input-name"
              />
            </label>
            <label htmlFor="inputDes">
              Description:
              {' '}
              <input
                onChange={ this.handleChange }
                value={ des }
                name="des"
                id="inputDes"
                type="text"
                data-testid="edit-input-description"
              />
            </label>
            <label htmlFor="inputEmail">
              E-mail:
              {' '}
              <input
                onChange={ this.handleChange }
                value={ email }
                name="email"
                id="inputEmail"
                type="email"
                data-testid="edit-input-email"
              />
            </label>
            <label htmlFor="inputImg">
              Image URL:
              {' '}
              <input
                onChange={ this.handleChange }
                value={ img }
                name="img"
                id="inputImg"
                type="text"
                data-testid="edit-input-image"
              />
            </label>
            <button
              type="button"
              onClick={ () => {
                updateUser({ name, email, image: img, description: des });
                editedProfile();
              } }
            >
              Save info
            </button>
          </div>
        )}
      </div>);
  }
}

ProfileEdit.propTypes = {
  editedProfile: propTypes.func.isRequired,
}
export default ProfileEdit;
