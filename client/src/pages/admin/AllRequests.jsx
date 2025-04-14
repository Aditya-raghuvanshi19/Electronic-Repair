import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '@/components/ui/AdminHeader';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const { token } = useAuth();

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}api/repairs/admin/all-repairs`, {
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

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const updateRequestStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const handleAccept = async (requestId) => {
    const request = requests.find((r) => r._id === requestId);
    const serviceId = request?.serviceId?._id;

    if (!serviceId) {
      toast({
        title: "❌ Error",
        description: "Service ID missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}api/services/authorize`,
        {
          isAccepted: true,
          serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateRequestStatus(requestId, 'accepted');
      toast({
        title: "✅ Service Accepted",
        description: "The service has been accepted.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "❌ Error",
        description: "Failed to accept the request.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId) => {
    const request = requests.find((r) => r._id === requestId);
    const serviceId = request?.serviceId?._id;

    if (!serviceId) {
      toast({
        title: "❌ Error",
        description: "Service ID missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}api/services/authorize`,
        {
          isAccepted: false,
          serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      updateRequestStatus(requestId, 'rejected');
      toast({
        title: "🚫 Service Rejected",
        description: "The service request has been rejected.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "❌ Error",
        description: "Failed to reject the request.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Service Requests</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b">Request ID</th>
              <th className="py-2 px-4 border-b">User</th>
              <th className="py-2 px-4 border-b">Service Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Estimated Cost</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{request._id}</td>
                <td className="py-2 px-4 border-b">{request.userId?.email}</td>
                <td className="py-2 px-4 border-b">{request.serviceId?.name}</td>
                <td className="py-2 px-4 border-b capitalize">{request.status}</td>
                <td className="py-2 px-4 border-b">{request.description}</td>
                <td className="py-2 px-4 border-b font-bold">₹{request.estimatedCost.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-center">
                  {request.status === 'pending' ? (
                    <>
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
                    </>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded text-white text-sm font-medium ${
                        request.status === 'accepted'
                          ? 'bg-green-600'
                          : request.status === 'rejected'
                          ? 'bg-red-600'
                          : 'bg-gray-500'
                      }`}
                    >
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default AllRequests;
