import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
state = {
  musicArray: [],
  loading: true,
  loading2: true,
  favLoading: false,
  favorites: [],
}

componentDidMount() {
  const { match: { params: { id } } } = this.props;
  getMusics(id)
    .then((arr) => this.setState({ musicArray: arr, loading: false }));
  getFavoriteSongs().then((arr) => this.setState({ favorites: arr, loading2: false }));
}

componentWillUnmount() {
  this.setState({ loading: true, loading2: true });
}

favFunction = (e, music) => {
  if (e.target.checked) {
    this.setState({ favLoading: true }, () => {
      addSong(music)
        .then(() => {
          this.setState({ favLoading: false });
        });
      const arr = getFavoriteSongs();
      this.setState({ favorites: arr, loading2: false });
    });
  } if (!e.target.checked) {
    this.setState({ favLoading: true }, () => {
      removeSong(music)
        .then(() => {
          this.setState({ favLoading: false });
          getFavoriteSongs()
            .then((arr2) => this.setState({ favorites: arr2, loading2: false }));
        });
    });
  }
}

asyncFavFunction = (e, music) => {
  if (e.target.checked) {
    this.setState({ favLoading: true }, async () => {
      await addSong(music);
      const arr = await getFavoriteSongs();
      this.setState({ favorites: arr, favLoading: false });
    });
  } if (!e.target.checked) {
    this.setState({ favLoading: true }, async () => {
      await removeSong(music);
      const arr2 = await getFavoriteSongs();
      this.setState({ favLoading: false, favorites: arr2 });
    });
  }
}

render() {
  const { musicArray, loading, loading2, favLoading, favorites } = this.state;
  return (
    <div data-testid="page-album">
      <Header />
      {(loading || loading2) ? <Loading /> : (
        <div>
          <h3 data-testid="artist-name">{musicArray[0].artistName}</h3>
          <h4 data-testid="album-name">{musicArray[0].collectionName}</h4>
          <div className="musicList">
            {musicArray
              .filter((music) => music !== musicArray[0])
              .map((music) => (
                <div key={ music.previewUrl } className="music">
                  <p>{music.trackName}</p>
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
                      onChange={ (e) => this.asyncFavFunction(e, music) }
                      checked={ favorites.some(
                        (fav) => fav.trackId === music.trackId,
                      ) }
                      value={ music.trackId }
                    />
                    Favorita
                  </label>
                </div>))}
          </div>
          {favLoading ? <Loading /> : null }
        </div>)}
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
