import React, { useState, useEffect } from "react";
import { getShipById } from "../services/ShipInventory";
import TripulatedVehicle from "./tripulatedVehicle";
import NonTripulatedVehicle from "./nonTripulatedVehicle";
import Lanzadera from "./shuttle";
import {Link} from 'react-router-dom'

//Station trae la nave que hayamos escogido y nos muestra sus correspondientes metodos
const Station = () => {
  const [starShip, setStarShip] = useState({});
  const [element, setElement] = useState(null)

  //Este useEffect trae la nave de acuerdo a su Id
  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    const getShip = async () => {
      const data = await getShipById(id)
      setStarShip(data.data.result);
    }

    getShip()
  }, []);


  //Este useEffect asigna el tipo de nave que se va a mostrar segun lo traido del API
  useEffect(() => {
    console.log(starShip);
    if (starShip._id) {
      const tipo = starShip.typeStarShip[0].nameType;
      if (tipo.toLowerCase() == 'lanzadera') {
        setElement(<Lanzadera ship={starShip} />);
      } else if (tipo.toLowerCase() == 'vehiculo tripulado') {
        setElement(<TripulatedVehicle ship={starShip} />);
      } else if (tipo.toLowerCase() == 'vehiculo no tripulado') {
        setElement(<NonTripulatedVehicle ship={starShip}/>);
      }
    }
  }, [starShip])

  return (
    <>
      <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center my-2">Bienvenido a la estacion de mando</h1>
        <div className="h-75 w-75 bg-light border rounded rounded-3 shadow-sm">
          <div className="w-100 h-100 m-0 py-3 row justify-content-center">
            {element}
          </div>
        </div>
      </div >
    </>)
}

export default Station;