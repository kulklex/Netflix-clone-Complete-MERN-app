import "./listitem.scss";
import { useEffect } from "react";
import axios from "axios"
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({}) 
  useEffect(() => {
   const getMovie = () => {
    axios.get(`movies/find/${item}`,
    { headers: {
      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTYwNjdhNjViMjcyMDJjYjY0ODNlYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDA4NTMzNiwiZXhwIjoxNjU0NTE3MzM2fQ.Yapi5S5049fmZOzDRDBiZJr9T07mR_ZLobffFCBJiOU"
    }}
    )
    .then( (res) => {
      const data = res.data
      setMovie(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }
    getMovie()
  }, [item]);

return (
  <Link to={"/watch"} state={{movie: movie}}>
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.image}  alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre} </div>
          </div>
        </>
      )}
    </div>
    </Link>
  );
}