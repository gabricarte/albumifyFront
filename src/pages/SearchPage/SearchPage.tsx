import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import styles from './styles.module.scss';
import { ApiResponse } from '../../utils/interfaces';
import { getIdFromTokenOnSessionStorage } from '../../utils/sessionStorage';
import { jwtDecode } from 'jwt-decode';

interface FormData {
  name: string;
  artist: string;
}

const SearchPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    artist: '',
  });

  const [searchResults, setSearchResults] = useState<ApiResponse | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const apiKey = 'fbb6863a69641c4bfef033a9002e3276'; 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, artist } = formData;
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${encodeURIComponent(
      artist
    )}&album=${encodeURIComponent(name)}&format=json`;

    try {
      const response = await fetch(url, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data as ApiResponse);
      } else {
        console.error('Erro ao enviar dados:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };


  const handleSaveAlbum = async() => {
    if(searchResults != null && searchResults.album) { // Verifica se searchResults e searchResults.album são diferentes de null

      const album = {
        name: searchResults.album.name,
        artist: searchResults.album.artist,
        summary: searchResults.album.wiki?.summary || '' // Acessa summary com segurança usando optional chaining
      };
    
      const userId = getIdFromTokenOnSessionStorage(); 
      console.log(userId);

      const url = `http://localhost:8080/albumify/${userId}`; 

      try{
        const response = await fetch(url, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(album)
        });
    
        if (response.ok) {
          console.log('Álbum salvo com sucesso!');
        } else {
          console.log(response);
          console.error('Erro ao salvar álbum:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao salvar álbum:', error);
      }
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.division}>
        <div className={styles.formContainer}>
          <h1>Search an album!</h1>
          <form onSubmit={handleSubmit} className={styles.albumForm}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="artist">Artist:</label>
              <input
                type="text"
                id="artist"
                name="artist"
                value={formData.artist}
                required
                onChange={handleChange}
              />
            </div>
            <Button label="Search" />
          </form>
        </div>
        <div className={styles.searchResults}>
          {searchResults && searchResults.album && ( 
            <div className={styles.searchResultsContainer}>
              <h1>Search Results</h1>
              <h2>{searchResults.album.name}</h2>
              <p>Artist: {searchResults.album.artist}</p>
              <p>Listeners: {searchResults.album.listeners}</p>
              <p>Playcount: {searchResults.album.playcount}</p>
              <p>Tags:</p>
              <ul>
                {searchResults.album.tags.tag.map(tag => (
                  <li key={tag.name}>
                    <a href={tag.url}>{tag.name}</a>
                  </li>
                ))}
              </ul>
              <p>Tracks:</p>
              <ol>
                {searchResults.album.tracks.track.map(track => (
                  <li key={track.name}>
                    <a href={track.url}>{track.name}</a>
                  </li>
                ))}
              </ol>
              <p>
              Summary: {searchResults.album.wiki?.summary}
              </p>

              <Button label='Save album' onClick={handleSaveAlbum}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
