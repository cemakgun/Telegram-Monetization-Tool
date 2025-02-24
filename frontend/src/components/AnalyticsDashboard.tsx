'use client';

import React, { useEffect } from 'react';
import { fetchAnalytics } from '@/lib/store/slices/analyticsSlice';
import { useAppDispatch, useAnalytics } from '@/lib/hooks/redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalyticsDashboard: React.FC<{ channelId: string }> = ({ channelId }) => {
  const dispatch = useAppDispatch();
  const { data, status, error } = useAnalytics();

  useEffect(() => {
    dispatch(fetchAnalytics({ channelId, period: '7d' }));
  }, [dispatch, channelId]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">Error loading analytics: {error}</p>
      </div>
    );
  }

  const channelData = data.find((item) => item.channelId === channelId);

  if (!channelData) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">No analytics data available for this channel.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Views</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{channelData.views.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total channel views</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{channelData.subscribers.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total subscribers</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">${channelData.revenue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}</p>
          <p className="text-sm text-gray-500">Total revenue</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
