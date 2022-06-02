import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useState, useEffect } from 'react';
import axios from "axios"

const Home = ({type}) => {
  const [lists, setLists] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    const getRandomLists = async () => {
      try {
       axios.get(`/lists${type ? "?type="+type : ""}${genre ? "&genre="+genre : ""}`, {
         headers: {
           token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTYwNjdhNjViMjcyMDJjYjY0ODNlYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDA4NTMzNiwiZXhwIjoxNjU0NTE3MzM2fQ.Yapi5S5049fmZOzDRDBiZJr9T07mR_ZLobffFCBJiOU"
         }
       })
       .then((res) => {
         console.log(res);
         setLists(res.data)
       })
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists()
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      {lists.map((value, index) => {
        return (<div key={index}>
          <List list={value}/>
        </div>)
      })}
    </div>
  );
};

export default Home;