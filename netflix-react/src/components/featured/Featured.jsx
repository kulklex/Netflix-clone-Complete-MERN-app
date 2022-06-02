import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

export default function Featured({ type }) {
  const [content, setContent] = useState({})


  useEffect(()=>{
    const getRandomContent =  () => {
      axios.get(`/movies/random?type=${type}`,
      { headers: {
        token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTYwNjdhNjViMjcyMDJjYjY0ODNlYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDA4NTMzNiwiZXhwIjoxNjU0NTE3MzM2fQ.Yapi5S5049fmZOzDRDBiZJr9T07mR_ZLobffFCBJiOU"
      }}
      )
      .then((res) => {
        setContent(res.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
    }
    getRandomContent()
  }, [content, type])
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.img} alt=""
      />
      <div className="info">
        <img
          src={content.imgTitle}  alt=""
        />
        <span className="desc">
         {content.desc}
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}