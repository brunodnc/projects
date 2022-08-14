import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    favorites: [],
    loading: true,
    favLoading: false,
  }

  componentDidMount() {
    getFavoriteSongs().then((arr) => this.setState({ favorites: arr, loading: false }));
  }

  favFunction = (e, music) => {
    if (e.target.checked) {
      this.setState({ favLoading: true }, () => {
        addSong(music)
          .then(() => {
            this.setState({ favLoading: false });
            getFavoriteSongs()
              .then((arr) => this.setState({ favorites: arr }));
          });
      });
    } if (!e.target.checked) {
      this.setState({ favLoading: true }, () => {
        removeSong(music)
          .then(() => {
            this.setState({ favLoading: false });
            getFavoriteSongs()
              .then((arr2) => this.setState({ favorites: arr2 }));
          });
      });
    }
  }

  render() {
    const { loading, favorites, favLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h2>My Favorites</h2>
        <div className="musicList">
          {loading ? <Loading /> : favorites.map(
            (music) => (
              <div key={ music.previewUrl } className="music">
                <p>{music.trackName}</p>
                <strong><p>{music.artistName}</p></strong>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code> audio </code>
                  .
                </audio>
                <label htmlFor={ music.trackId }>
                  <input
                    type="checkbox"
                    name="fav"
                    id={ music.trackId }
                    data-testid={ `checkbox-music-${music.trackId}` }
                    onChange={ (e) => this.favFunction(e, music) }
                    checked={ favorites.some(
                      (fav) => fav.trackId === music.trackId,
                    ) }
                    value={ music.trackId }
                  />
                  Favorita
                </label>

              </div>
            ),
          )}
        </div>
        {favLoading ? <Loading /> : null}
      </div>);
  }
}

export default Favorites;
