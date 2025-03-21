import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Total Entries</h2>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Active Users</h2>
            <p className="text-3xl font-bold text-green-600">0</p>
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
            <p className="text-3xl font-bold text-purple-600">0%</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 