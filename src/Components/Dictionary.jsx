import { React, useState } from 'react';
import axios from 'axios';
import image from '../image/Windows Purple Abstract Background Wallpaper 4K HD PC 5510i.jpg';
import './Dictionary.css';

const Dictionary = () => {
  const [userInput, setUserInput] = useState('');
  const [word, setWord] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWord([]);
    try {
      if (userInput.length > 0) {
        const response = await axios.get(`${url}/${userInput}`);
        if (response) {
          setWord(response.data);
          setLoading(false);
        }
      }

      return;
    } catch (error) {
      setLoading(false);
      if (error) setError('Please input a valid English word');
    }
  };

  return (
    <div className='contains'>
      <section>
        <img src={image} alt='' />
        <h3>DICTIONARY APP</h3>

        <main>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={userInput}
              placeholder='Search word'
              onInput={handleChange}
            />
            <button type='submit'>Check word</button>
          </form>
        </main>
      </section>
      <div className='contain'>
        {loading && <p style={{fontFamily:'Georgia,Times New Roman, Times, serif',fontSize:'20px',textAlign:'center',color:'blue'}}>Loading...</p>}
        {word.length === 0 && !loading && (
          <p style={{color:'darkred',fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'20px'}}>Please search for an English word</p>
        )}
        {word.length > 0 ? (
          word.map((item) => (
            <>
              <h4 className='word-heading'>
                <a
                  href={item.sourceUrls[0]}
                  target='_blank'
                  style={{ textDecoration: 'none' }}>
                  {item.word}
                </a>
              </h4>
              <p style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'darkblue'}}>Phonetic: {item.phonetic}</p>
              {item.meanings.map((item) => (
                <>
                  <div className='meaning'>
                    <p style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'darkgreen'}}>Part Of Speech: {item.partOfSpeech}</p>
                  </div>
                  <div>
                    {item.definitions.map((meaning) => (
                      <ul>
                        <li style={{color:'purple'}}>
                          <p style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'purple'}}>Definition: {meaning.definition}</p>
                        </li>
                      </ul>
                    ))}
                  </div>

                  {item.synonyms.length > 0 && <h5 style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'red'}}>Synonyms</h5>}
                  <div>
                    {item.synonyms.length > 0 &&
                      item.synonyms.map((synonyms) => (
                        <ul>
                          <li style={{color:'red'}}>
                            <p style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'red'}}>{synonyms}</p>
                          </li>
                        </ul>
                      ))}
                  </div>

                  {item.antonyms.length > 0 && <h5 style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'blue'}}>Antonyms</h5>}
                  {item.antonyms.length > 0 &&
                    item.antonyms.map((antonyms) => (
                      <>
                        <ul>
                          <li style={{color:'blue'}}>
                            <p style={{fontFamily:'Georgia,Times New Roman,Times, serif',fontSize:'18px',fontWeight:'bold',color:'blue'}}>{antonyms}</p>
                          </li>
                        </ul>
                      </>
                    ))}
                </>
              ))}
            </>
          ))
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
