import "./app.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";

const App = () => {
  const user = true;
  return(<>
  <BrowserRouter>
    <Routes>
      <Route exact path="/"  element={ user ? <Home/> : <Register/>}/>
      <Route path="/register" element={user ? <Register/> : <Home/>}/>
      <Route path="/login" element={user ? <Login/> : <Register/>}/>
      {
        user && (<>
      <Route path="/movies" element={<Home type="movies"/>}/>
      <Route path="/series" element={<Home type="series"/>}/>
      <Route path="/watch" element={<Watch/>}/>
      </>)
      }
    </Routes>
  </BrowserRouter>

  </>)
};

export default App;