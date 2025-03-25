import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '' });
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchPendingRequests();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get('/api/services');
    setServices(response.data);
  };

  const fetchPendingRequests = async () => {
    const response = await axios.get('/api/pending-requests');
    setPendingRequests(response.data);
  };

  const addService = async () => {
    await axios.post('/api/services', newService);
    fetchServices();
    setNewService({ name: '', description: '' });
  };

  const markAsCompleted = async (id) => {
    await axios.put(`/api/pending-requests/${id}`, { status: 'completed' });
    fetchPendingRequests();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Add New Service</h2>
        <input
          type="text"
          placeholder="Service Name"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Service Description"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        />
        <button onClick={addService}>Add Service</button>
      </div>
      <div>
        <h2>Pending Service Requests</h2>
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>
              {request.name} - {request.description}
              <button onClick={() => markAsCompleted(request.id)}>Mark as Completed</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;