import React, { useEffect, useState } from "react";
import { getAllTypeShips, getShipByName } from "../services/ShipInventory.js";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const [typeShips, setTypeShip] = useState([]);
  const [name, setName] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    const funcionAsync = async () => {
      const types = await getAllTypeShips();
      setTypeShip(types.data.result)
    }
    funcionAsync()

  }, [])

  useEffect(() => {
    console.log(typeShips);
  }, [typeShips])

  const handleTag = (e) => {
    const ability = e.target.title;

    navigate(`/ability/${ability}`);
  }

  const handleSubmit = async (e) => {
    if (name != '') {
      const response = await getShipByName(name)
      console.log(response.data.result);
      navigate(`/starship/${response.data.result._id}`)
    }
  }

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="h-75 w-75 row bg-light border rounded rounded-3 shadow-sm" >
          <div className="col-12 col-lg-9 py-2 h-100 m-0 row justify-content-around align-items-center" style={{ overflowY: 'auto', overflowX: 'hidden' }}>

            {typeShips.map((type) => {
              return (
                <div class="card col-12 col-lg-5 mx-1 my-1" style={{ height: '320px' }}>
                  <div className="card-body d-flex flex-column justify-content-around">
                    <h5 className="card-title">{type.nameType}</h5>
                    <p className="card-text" style={{ height: '160px', overflowY: 'auto' }}>{type.description}</p>
                    <Link to={`/typeship/${type._id}`} className="btn btn-primary">Ir al inventario</Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col-lg-3 h-100 border d-flex">
            <div className="d-flex flex-column h-100" style={{ width: '90%' }}>
              <h4 className="text-center mt-2">Busqueda de naves</h4>

              <div>
                <label htmlFor="" className="form-label fw-bold">Nombre de la nave:</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <button className="btn btn-primary mt-2" onClick={handleSubmit}>Buscar</button>

              <hr />
              <div>
                <h4>Tags</h4>
                <span className="badge bg-secondary m-1" title="CARGAR" onClick={handleTag}>CARGAR</span>
                <span className="badge bg-secondary m-1" title="ORBITAR" onClick={handleTag}>ORBITAR</span>
                <span className="badge bg-secondary m-1" title="DESPEGAR" onClick={handleTag}>DESPEGAR DESDE TIERRA</span>
                <span className="badge bg-secondary m-1" title="ATERRIZAR" onClick={handleTag}>ATERRIZAR</span>
                <span className="badge bg-secondary m-1" title="PERSONAL" onClick={handleTag}>TRIPULACION</span>
                <span className="badge bg-secondary m-1" title="ACOPLAR" onClick={handleTag}>ACOPLARSE</span>
              </div>
              <Link to={'/starship/add'} className="btn btn-primary">Registrar nave</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
