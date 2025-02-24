import { auth } from '@clerk/nextjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

async function fetchWithAuth(endpoint: string, options: ApiOptions = {}) {
  const { getToken } = auth();
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // User endpoints
  getUserProfile: () => fetchWithAuth('/user/profile'),
  updateUserSettings: (settings: any) => 
    fetchWithAuth('/user/settings', { method: 'PUT', body: settings }),

  // Telegram endpoints
  getChannels: () => fetchWithAuth('/telegram/channels'),
  addChannel: (channelData: any) => 
    fetchWithAuth('/telegram/channels', { method: 'POST', body: channelData }),
  sendMessage: (chatId: string, message: string) => 
    fetchWithAuth('/telegram/send', { method: 'POST', body: { chatId, message } }),

  // Analytics endpoints
  getAnalytics: (channelId: string, period: string) => 
    fetchWithAuth(`/analytics/${channelId}?period=${period}`),
  
  // Subscription endpoints
  getSubscriptions: () => fetchWithAuth('/subscriptions'),
  createSubscription: (planData: any) => 
    fetchWithAuth('/subscriptions', { method: 'POST', body: planData }),
};

export default api;
