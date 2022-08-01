import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

{/*Este modulo controla los metodos de las naves de tipo lanzadera */}
const Lanzadera = ({ ship }) => {

  const [clock, setClock] = useState(null)
  const [launch, setLaunch] = useState(false);
  const [carga, setCarga] = useState(false)

  /*Este useEffect permite crear una cuenta regresiva que simula el despegue de la nave espacial*/
  useEffect(() => {
    if (clock != null) {
      if (carga === false) {
        alert('Carga antes de despegar')
        setClock(null)
      } else {
        setTimeout(() => {
          if (clock > 0) {
            let newClock = clock - 1
            setClock(newClock)
          } else {
            setLaunch(true)
          }
        }, 1000)
      }
    }
  }, [clock])

  //La funcion cargar le indica a una cantidad de masa que será cargada en la nave
  const cargar = () => {
    console.log(carga);
    if (carga === true) {
      alert('Ya Cargaste')
    } else {
      let flag = false
      do {
        const carga = prompt('Ingresa el peso de carga que va a transportar tu nave')
        console.log(ship.empuje);
        if (parseInt(carga) <= ship.empuje) {
          flag = true;
          setCarga(true)
        } else {
          alert('Tu cohete no es capaz de llevar tanta carga')
        }
      } while (!flag);
    }
  }


  return (
    <>
      <div className="col-12 col-md-6">
        <div class="card d-flex justify-content-center h-75 mb-2">
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
        </div>
        <button className="btn btn-primary mx-1" onClick={() => setClock(10)}>Despegar</button>
        <button className="btn btn-primary mx-1" onClick={cargar}>Cargar</button>
        <Link className="btn btn-outline-dark mt-2" to={'/'}>Inicio</Link>{/*retornar al home */}
      </div>
      <div className="col-12 col-md-6">
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <p className="fs-1">Cuenta regresiva</p>
          <p className="fs-1">{clock}</p>
          {clock === 0 && <p className="fs-1 text-center">Felicidades, tu cohete ha despegado y se dirige a las estrellas</p>}
        </div>
      </div>
    </>
  )
}

export default Lanzadera;