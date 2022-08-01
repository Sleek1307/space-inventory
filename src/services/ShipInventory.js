import axios from "axios";


const getAllTypeShips = () => {
    return axios.get('http://localhost:4000/api/types')
}

const getShipByType = (idType) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    };
    return axios.get(`http://localhost:4000/api/starship/typeship/${idType}`, {
        headers
    });
}

const getShipById = (idShip) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    };
    return axios.get(`http://localhost:4000/api/starship/${idShip}`, {
        headers
    });
}

const getShipByTag = (tag) => {

    console.log(tag);
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    };
    return axios.get(`http://localhost:4000/api/starship/ability/${tag}`, {
        headers
    });
}

const getShipByName = (name) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    };
    return axios.get(`http://localhost:4000/api/starship/name/${name}`, {
        headers
    });
}

const setNewShip = (shipData) => {
    let capacidadesDeTipo = []
    if (shipData.type === '62e4b820755a9c856f18b7c7') {
        capacidadesDeTipo = ['ATERRIZAR', 'ORBITAR', 'ACOPLAR', 'CARGAR']
    } else if (shipData.type === '62e4b8ee330a33239f5bf25c') {
        capacidadesDeTipo = ['DESPEGAR', 'CARGAR']
    } else if (shipData.type === '62e681238b06943fb94e9cbd') {
        capacidadesDeTipo = ['ATERRIZAR', 'ORBITAR', 'PERSONAL', 'ACOPLAR']
    }

    let data = {
        ...shipData.ship,
        capacidadesDeTipo: capacidadesDeTipo,
    }
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
    };
    return axios.post('http://localhost:4000/api/starship', { headers, starship: { ...data }, type: shipData.type })
}

export { getAllTypeShips, getShipByType, getShipById, getShipByTag, getShipByName, setNewShip };