import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateClient = () => {
  const [client, setClient] = useState({ nom: '', adresse: '', tel: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/clients/${client.id}`, client);
      navigate('/clients', { replace: true });
    } catch (error) {
      if (error.response) {
        console.error('Erreur de réponse du serveur:', error.response.data);
        console.error('Statut de la réponse:', error.response.status);
        console.error('Headers de la réponse:', error.response.headers);
      } else if (error.request) {
        console.error('La requête a été faite mais aucune réponse n\'a été reçue:', error.request);
      } else {
        console.error('Erreur', error.message);
      }
      setError('Une erreur est survenue lors de la mise à jour du client. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Mettre à jour le client</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      <form onSubmit={handleUpdate} className="w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Nom du client</label>
          <input
            type="text"
            className="form-control"
            value={client.nom}
            onChange={(e) => setClient({ ...client, nom: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Adresse</label>
          <input
            type="text"
            className="form-control"
            value={client.adresse}
            onChange={(e) => setClient({ ...client, adresse: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <input
            type="text"
            className="form-control"
            value={client.tel}
            onChange={(e) => setClient({ ...client, tel: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateClient;
