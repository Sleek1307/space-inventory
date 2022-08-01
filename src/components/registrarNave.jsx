import React, { useEffect, useState } from "react";
import { setNewShip } from "../services/ShipInventory";
import { Link } from 'react-router-dom'

//Este modulo permite registrar una nave espacial
const RegistrarNave = () => {

  //Este estado permite guardar los datos de las habilidades particulares de una nave
  const [capacidadesDeNave, setCapacidadDeNave] = useState([]);
  const [ability, setAbility] = useState({
    name: '',
    description: ''
  });

  //Recibe los datos del formulario y hace la consulta a la API
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const shipData = {
      ship:
      {
        name: form.name.value,
        description: form.description.value,
        peso: form.peso.value,
        empuje: form.empuje.value,
        capacidadesDeNave: capacidadesDeNave
      },
      type: form.tipo.value
    }

    const response = await setNewShip(shipData);

    console.log(response);

  }

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <div className="p-4 w-50 bg-light border rounded rounded-3 shadow-sm px-4" >
          <form onSubmit={handleSubmit}>
            <label className="form-label">Nombre</label>
            <input className="form-control" type="text" name="name" />

            <label className="form-label">Descripcion</label>
            <input className="form-control" type="text" name="description" />

            <label className="form-label">Peso</label>
            <input className="form-control" type="number" name="peso" />

            <label className="form-label">Empuje</label>
            <input className="form-control" type="number" name="empuje" />

            <label htmlFor="" className="form-label">Capacidadaes</label>
            <div className="w-100 d-flex">
              <input type="text" placeholder="nombre" className="w-75 form-control" value={ability.name} onChange={(e) => { setAbility({ ...ability, name: e.target.value }) }} /> {/*Este input ingresa el nombre de la habilidad*/}
              <input type="text" placeholder="descripcion" className="w-75 form-control" value={ability.description} onChange={(e) => { setAbility({ ...ability, description: e.target.value }) }} />{/*Este input ingresa la descripcion de la habilidad*/}
              <button type="button" className="btn btn-primary w-25" onClick={(e) => {
                setCapacidadDeNave([
                  ...capacidadesDeNave,
                  {
                    name: ability.name,
                    description: ability.description
                  }
                ])
              }}>Agregar</button> {/*Este boton permite agregar los datos de los inputs de arriba a un array*/}
            </div>

            <label className="form-label">Tipo de nave</label>
            <select name="tipo" className="form-select">
              <option value="62e4b820755a9c856f18b7c7">Vehiculo no tripulado</option>
              <option value="62e4b8ee330a33239f5bf25c">Lanzadera</option>
              <option value="62e681238b06943fb94e9cbd">Vehiculo tripulado</option>
            </select>
            <input type={'submit'} text={'Enviar'} className='btn btn-primary mt-3' />
          </form>
          <Link className="btn btn-outline-dark mt-2" to={'/'}>Inicio</Link> {/*Redirige al home*/}
        </div>
      </div>
    </>
  )
}

export default RegistrarNave;