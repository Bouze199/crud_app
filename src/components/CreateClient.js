import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateClient = () => {
  const [client, setClient] = useState({ nom: '', adresse: '', tel: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/clients', client);
      navigate('/clients', { replace: true });
    } catch (error) {
      setError('Une erreur est survenue lors de la création du client. Réessayer SVP.');
    }
  };

  return (
    <div className="container mt-5">
      <center>
        <h1>Créer un nouveau client</h1>
        {error && <p className="alert alert-danger">{error}</p>}
        <form onSubmit={handleCreate} className="w-50 mx-auto">
          <div className="mb-3">
            <label className="form-label">Nom</label>
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
          <button type="submit" className="btn btn-success">Créer</button>
        </form>
      </center>
    </div>
  );
};

export default CreateClient;
