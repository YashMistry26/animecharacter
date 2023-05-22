import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import "../src/index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [searchString, setSearchString] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.jikan.moe/v4/characters?page=0&limit=15&q=&order_by=favorites&sort=desc"
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `https://api.jikan.moe/v4/characters?page=0&limit=15&q=${searchString}&order_by=favorites&sort=desc`;
    axios.get(url).then((res) => {
      setData(res.data.data);
    });
    console.log(data);
  };
  return (
    <>
      <Search
        searchString={searchString}
        setSearchString={setSearchString}
        handleSubmit={handleSubmit}
      />
      <Display data={data} />
    </>
  );
}

const Search = ({ searchString, setSearchString, handleSubmit }) => {
  return (
    <>
    
    
    <h1>Search Anime Characters</h1>
      <div className="search-bar">
        <input className="search-input"
          type="text"
          placeholder= "Enter Your Favorite Anime"
          value={searchString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        /> 
        <br />
        &nbsp;
        <button className="search-button" type="submit" onClick={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} className="search-icon" />&nbsp; Search
        </button>
      </div>
    </>
  );
};

const Display = ({ data }) => {
  return (
    <>
      <div>
        <h2>Searched Anime Charectrs</h2>

        {data && data.length > 0
          ? data.map((item) => {
              return (
                <section style={{display:'flex', marginBottom:'1rem'}}>
                <div style={{height:'200px'}}>
                  <img src={item.images.jpg.image_url} style={{height:'100%'}} alt="" />
                </div>
                <div style={{marginLeft:'20px'}}>
                  <p style={{marginBottom:'10px'}}>{item.name}</p>
                  <article style={{display:'flex',gap:'1rem'}}>
                  {item.nicknames.map(nickname=>{
                    return <h6>{nickname}</h6>;
                  })}
                  </article>

                </div>
                <div style={{marginLeft:'2rem'}}>
                  <p>< FontAwesomeIcon icon={faHeart} style={{color: "#e31616",}} />{item.favorites}</p>
                </div>
                </section>
              );
            })
          : "No Results Found "}
      </div>
    </>
  );
};

export default App;
