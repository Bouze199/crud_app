import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

const ClientList = () => { 
    const [clients, setClients] = useState([]); 
    const navigate = useNavigate(); 

    const fetchData = async () => { 
        try {
            const response = await axios.get('http://localhost:3001/clients/'); 
            setClients(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des clients:', error);
        }
        //chargement du résultat de la requête 
    }; 

    useEffect(() => { 
        fetchData(); 
    }, []);
    //lancer la fonction fetchData une seule fois au premier render 

    const handleDelete = async (id) => { 
        try {
            await axios.delete(`http://localhost:3001/clients/${id}`); 
            fetchData(); 
        } catch (error) {
            console.error('Erreur lors de la suppression du client:', error);
        }
    };
    //axios.delete pour supprimer le client identifié par id 

    return ( 
        <div> 
            <center> 
                <h1>Liste des clients</h1> 
                <Link to={'/clients/create'}>
                <button className="btn btn-success">Ajouter</button>
                </Link>
                <br/><br/>
                <table className="table table-striped"> 
                    <thead> 
                        <tr> 
                            <th>Nom</th> 
                            <th>Adresse</th> 
                            <th>Tel</th> 
                            <th>Opérations</th> 
                        </tr> 
                    </thead> 
                    <tbody>
                        {clients.map(client => ( 
                            //pour chaque client 
                            <tr key={client.id}> 
                                <td><Link to={`/clients/${client.id}`}>{client.nom}</Link></td> 
                                <td>{client.adresse}</td> 
                                <td>{client.tel}</td> 
                                <td>
                                    {/*colonne opérations (modifier, supprimer)*/} 
                                    <Link to={`/clients/${client.id}/update`}> 
                                        <button className="btn btn-warning">Modifier</button>
                                    </Link> 
                                    <button className="btn btn-danger" onClick={() => handleDelete(client.id)}>Supprimer</button> 
                                </td> 
                            </tr> 
                        ))} 
                    </tbody> 
                </table> 
            </center> 
        </div> 
    ); 
}; 

export default ClientList;
