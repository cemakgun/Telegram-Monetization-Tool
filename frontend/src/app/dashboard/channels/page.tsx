import { auth } from "@clerk/nextjs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ChannelsPage() {
  const { userId } = auth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Channels</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Channel
        </button>
      </div>

      {/* Channel List */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>No Channels Added</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              You haven&apos;t added any Telegram channels yet. Click the "Add Channel" button to get started.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Add a Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Add our bot (@your_bot_name) as an admin to your channel</li>
            <li>Click the "Add Channel" button above</li>
            <li>Enter your channel&apos;s username or ID</li>
            <li>Configure monetization settings</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
