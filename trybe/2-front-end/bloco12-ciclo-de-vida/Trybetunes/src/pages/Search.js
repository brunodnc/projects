import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const MAX_SEARCH_LENGTH = 2;

class Search extends React.Component {
  state = {
    search: '',
    searchResult: '',
    loading: false,
    apiObj: false,
  }

  handleChange = (e) => this.setState({ search: e.target.value })

  searchFunc = (e) => {
    this.setState(
      { loading: true }, () => {
        searchAlbumsAPI(e.target.value).then(
          (obj) => this.setState(
            { apiObj: obj, search: '', loading: false, searchResult: e.target.value },
          ),
        );
      },
    );
  }

  render() {
    const { search, loading, apiObj, searchResult } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <h2>Search</h2>
        {loading ? <Loading /> : (
          <div>
            <input
              data-testid="search-artist-input"
              value={ search }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ search.length < MAX_SEARCH_LENGTH }
              onClick={ this.searchFunc }
              value={ search }
            >
              Pesquisar
            </button>
          </div>)}
        {apiObj ? (
          <div>
            <p>
              {`Resultado de álbuns de: ${searchResult}`}
            </p>
            {apiObj.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}
            <ul>
              {apiObj.map((item) => (
                <div key={ item.collectionId } className="cd">
                  <Link
                    data-testid={ `link-to-album-${item.collectionId}` }
                    to={ `/album/${item.collectionId}` }
                  >
                    <img src={ item.artworkUrl100 } alt={ item.collectionName } />
                    <p>{item.collectionName}</p>
                  </Link>
                </div>))}
            </ul>
          </div>) : null}
      </div>);
  }
}

export default Search;
