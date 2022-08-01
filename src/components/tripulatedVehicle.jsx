import React, { useEffect, useState } from "react";

const TripulatedVehicle = ({ ship }) => {

  const [embarque, setEmbarque] = useState(false);
  const [orbita, setOrbita] = useState({
    state: false,
    orbitando: ''
  });
  const [acople, setAcople] = useState({
    state: false,
    acoplado: ''
  })
  const [speed, setSpeed] = useState(null)

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

  const Embarcar = () => {
    if (embarque) {
      alert('Ya has embarcado a la tripulacion')
    } else {
      const person = prompt('Ingresa la cantidad de personas que van a subir')
      let flag = true;
      do {
        if (person > 5) {
          alert('No puedes tener una tripulacion de mas de cinco personas')
        } else {
          alert('El personal ha sido enbarcado en el vehiculo')
          setEmbarque(true)
          flag = false
        }
      } while (flag);
    }

  }

  const Aterrizar = () => {
    if (speed > 0) {
      let newSpeed = speed - 1
      setSpeed(newSpeed)
    }
  }


  const Acoplar = () => {
    if (acople.state) {
      alert('Ya estas acoplado a ' + acople.acoplado)
    } else {
      const acople = prompt('Ingresa a que estructura te quieres acoplar');
      let flag = false;
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
        <button className="btn btn-primary mx-1" onClick={Embarcar}>Embarcar</button>
        <button className="btn btn-primary mx-1" onClick={() => setSpeed(5000)}>Aterrizar</button>
        <button className="btn btn-primary mx-1" onClick={Acoplar}>Acoplar</button>
        <button className="btn btn-primary mx-1" onClick={Orbitar}>Orbitar</button>
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

export default TripulatedVehicle;