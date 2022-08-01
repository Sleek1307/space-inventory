import React, { useEffect, useState } from "react";
import { getShipByType, getShipByName, getShipByTag } from "../services/ShipInventory";
import { Link } from "react-router-dom"

const StarShip = () => {
  //Este modulo centraliza las peticiones de las busquedas y las muestra al usuario para que este puede escoger la nave que está buscando
  const [starShips, setStarShip] = useState([]);

  useEffect(() => {
    //Este useEffect busca en la ruta de la pagina un tipo de busqueda(hay tres: tipo de nave -- capacidad de nave -- nombre de la nave)
    const query = window.location.pathname.split('/')[1];
    const id = window.location.pathname.split('/')[2];
    let getStarShip;

    console.log(query);


    if (query === 'typeship') {
      //Consulta de tipo de nave
      getStarShip = async () => {
        const data = await getShipByType(id);

        setStarShip(data.data.result);
      }
    } else if (query === 'ability') {
      //Consulta de capacidad de nave
      getStarShip = async () => {
        const data = await getShipByTag(id);

        setStarShip(data.data.result);
      }
    } else if (query === 'name') {
      //Consulta de nombre de nave
      getStarShip = async () => {
        const data = await getShipByName(id);

        setStarShip(...starShips, data.data.result);
      }
    }

    getStarShip()
  }, [])

  return (
    <>

      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="h-75 w-75 bg-light border rounded rounded-3 shadow-sm">
          <div className="w-100 h-100 row d-flex justify-content-center py-3 m-0" style={{ overflowY: 'auto', overflowX: 'hidden' }}>

            {starShips.map((ship) => {
              return (
                <div class="card col-12 col-md-5 col-lg-4 mx-1 d-flex justify-content-center my-1 h-75">
                  <div className="card-body">
                    <h5 className="card-title">{ship.name}</h5>
                    <p className="card-text">{ship.description}</p>
                    <h5>Particularidades de la nave</h5>
                    <div style={{ height: '50px' }} className="overflow-auto">
                      {ship.capacidadesDeNave.map((capacidad) => {
                        return (
                          <span class="badge bg-secondary mx-1">{capacidad.name}</span>
                        )
                      })}
                    </div>
                    <h5>Capacidades de la nave</h5>
                    <div style={{ height: '50px' }} className="overflow-auto">
                      {ship.capacidadesDeTipo.map((capacidad) => {
                        return (
                          <span class="badge bg-secondary mx-1">{capacidad}</span>
                        )
                      })}
                    </div>

                  </div>
                  <Link to={`/starship/${ship._id}`} className="btn btn-primary mb-3">Usar Nave</Link>
                </div>
              )
            })}

          </div>
          <Link className="btn btn-outline-dark mt-2" to={'/'}>Inicio</Link>
        </div>
      </div>

    </>
  )
}

export default StarShip