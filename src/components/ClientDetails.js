import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate,Link } from 'react-router-dom'; 
import axios from 'axios';

const ClientDetails = () => { const { id } = useParams(); 
const [client, setClient] = useState({}); 
const history = useNavigate();

useEffect(() => { 
const fetchClient = async () => { const response = await axios.get(`http://localhost:3001/clients/${id}`); 
setClient(response.data); 
};

fetchClient(); 
}, [id]); 
    return ( 
            <div> 
            <h1>Détails du client</h1> 
            <p>Nom du client: {client.nom}</p> 
            <p>Adresse: {client.adresse}</p> 
            <p>Téléphone: {client.tel}</p> 
            <Link to={`/clients`}>
            <button>Retour</button></Link> 
            </div> ); 
}; 
export default ClientDetails;