import { auth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const { userId } = auth();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Quick Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Total Channels</h3>
        <p className="text-3xl font-bold">0</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Active Subscribers</h3>
        <p className="text-3xl font-bold">0</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Monthly Revenue</h3>
        <p className="text-3xl font-bold">$0</p>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 md:col-span-2 lg:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <p className="text-gray-500">No recent activity</p>
        </div>
      </Card>
    </div>
  );
}
