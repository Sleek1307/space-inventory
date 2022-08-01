import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//En esta pagina se definen los metodos que pueden realizar las naves de tipo No tripulada
const NonTripulatedVehicle = ({ ship }) => {
  //Estos son los estados y variables del modulo
  const [orbita, setOrbita] = useState({
    state: false,
    orbitando: ''
  });
  const [acople, setAcople] = useState({
    state: false,
    acoplado: ''
  })
  const [speed, setSpeed] = useState(null)
  const [carga, setCarga] = useState(false)

  //La funcion Orbitar permite poner indicarle a la nave un objeto para que lo orbite
  const Orbitar = () => {
    if (orbita.state) {
      alert('Ya te encuentras orbitando ' + orbita.orbitando)
    } else {
      const orbita = prompt('Que cuerpo deseas Orbitar?')

      setOrbita({
        ...orbita,
        state: true,
        orbitando: orbita
      })
    }
  }

  //La funcion cargar le indica a una cantidad de masa que será cargada en la nave 
  const Cargar = () => {
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

  //La funcion aterriza reduce un numero que representa la velocidad de la nave hasta llegar a cero
  const Aterrizar = () => {
    if (speed > 0) {
      let newSpeed = speed - 1
      setSpeed(newSpeed)
    }
  }

  //La funcion Acoplar le indica una cadena que representa una estructura a la que la nave sepuede acoplar
  const Acoplar = () => {
    if (acople.state) {
      alert('Ya estas acoplado a ' + acople.acoplado)
    } else {
      const acople = prompt('Ingresa a que estructura te quieres acoplar');
      setAcople({
        ...acople,
        state: true,
        acoplado: acople
      })
    }

  }

  useEffect(() => {
    if (orbita.state) {
      alert('En este momento estas orbitando ' + orbita.orbitando)
    }
  }, [orbita])

  useEffect(() => {
    if (acople.state) {
      alert('En este momento estas acoplado a ' + acople.acoplado)
    }
  }, [acople])

  useEffect(
    () => {
      if (speed != null) {
        setTimeout(Aterrizar, 10)
      }
    }, [speed])

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
        <button className="btn btn-primary mx-1" onClick={Cargar}>Cargar</button>
        <button className="btn btn-primary mx-1" onClick={() => setSpeed(5000)}>Aterrizar</button>
        <button className="btn btn-primary mx-1" onClick={Acoplar}>Acoplar</button>
        <button className="btn btn-primary mx-1" onClick={Orbitar}>Orbitar</button>
        <Link className="btn btn-outline-dark " to={'/'}>Inicio</Link>
      </div>
      <div className="col-12 col-md-6">
        <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
          <p className="fs-1">{speed > 0 && 'Desacelerando'}</p>
          <p className="fs-1">{speed} </p>
          <p className="fs-1">{speed == 0 && 'Aterrizaje exitoso'}</p>
        </div>
      </div>
    </>)
}

export default NonTripulatedVehicle;