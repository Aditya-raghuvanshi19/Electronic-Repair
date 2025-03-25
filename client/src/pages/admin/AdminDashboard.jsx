import React from 'react';

const AdminDashboard = () => {

  // Function to handle the click event for adding services
  const handleAddServices = () => {
    alert('Add Services clicked');
  };

  // Function to handle the click event for removing services
  const handleRemoveServices = () => {
    alert('Remove Services clicked');
  };

  // Function to handle the click event for checking service requests
  const handleCheckServiceRequests = () => {
    alert('Check Service Requests clicked');
  };

  return (
    <div className="admin-dashboard p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="button-tile space-y-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddServices}>Add Services</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleRemoveServices}>Remove Services</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCheckServiceRequests}>Check Service Requests</button>
      </div>
    </div>
  );
};

export default AdminDashboard;