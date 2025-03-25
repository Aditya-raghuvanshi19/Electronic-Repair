// AllRequests.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/ui/AdminHeader';
import Footer from '@/components/Footer';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();
  const server = `https://electronic-repair-server.vercel.app/api`;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${server}/repairs/admin/all-repairs`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [token]);

  const handleAccept = async (id) => {
    // Implement the accept logic here
    console.log(`Accepted request with ID: ${id}`);
  };

  const handleReject = async (id) => {
    // Implement the reject logic here
    console.log(`Rejected request with ID: ${id}`);
  };

  return (
    <> 
    <AdminHeader/>

    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Service Requests</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">User  ID</th>
            <th className="py-2 px-4 border-b">Service ID</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Estimated Cost</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{request.userId}</td>
              <td className="py-2 px-4 border-b">{request.serviceId}</td>
              <td className="py-2 px-4 border-b">{request.status}</td>
              <td className="py-2 px-4 border-b">{request.description}</td>
              <td className="py-2 px-4 border-b">${request.estimatedCost.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default AllRequests;