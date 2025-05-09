import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AdminHeader from '@/components/ui/AdminHeader';
import Footer from '@/components/Footer';
import AllServiceCard from '@/components/ui/allservicecard';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // ✅ Make sure this path is correct

// ✅ Updated fetchServices to take userId
const fetchServices = async (userId) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}api/services/vendor/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  return response.json();
};

const AllVendorServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth(); // ✅ Access current user

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services', user?._id],
    queryFn: () => fetchServices(user._id),
    enabled: !!user, // ✅ wait for user to load
  });

  const filteredServices = services?.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">List of All Repair Services</h1>
        </div>

        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <Skeleton className="h-[250px]" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center bg-muted rounded-lg">
            <p className="text-lg font-medium">Failed to load services</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        ) : filteredServices?.length === 0 ? (
          <div className="p-8 text-center bg-muted rounded-lg">
            <p className="text-lg font-medium">No services found</p>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices?.map((service) => (
              <AllServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllVendorServices;
