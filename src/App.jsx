import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import StarShip from './components/starShip';
import Station from './components/station';
import RegistrarNave from './components/registrarNave';
import Home from './components/home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/starship/add' element={<RegistrarNave />} />
        <Route path='/starship/:id' element={<Station />} />
        <Route path='/typeship/:type' element={<StarShip />} />
        <Route path='/ability/:ability' element={<StarShip />} />
        <Route path='/name/:name' element={<StarShip />} />
      </Routes>
    </>

  );
}

export default App;
