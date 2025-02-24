'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PaymentForm from '@/components/PaymentForm';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    features: [
      'Up to 3 channels',
      'Basic analytics',
      'Standard support',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29.99,
    features: [
      'Up to 10 channels',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: [
      'Unlimited channels',
      'Real-time analytics',
      '24/7 Premium support',
      'Custom branding',
      'API access',
    ],
  },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const handleSuccess = () => {
    alert('Payment successful!');
    setShowPayment(false);
    // Here you would typically update the user's subscription status
  };

  const handleError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>
      
      {!showPayment ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`cursor-pointer transition-all ${
                selectedPlan?.id === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <p className="text-3xl font-bold">${plan.price}/mo</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => setShowPayment(true)}
                >
                  Select Plan
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Complete Your Purchase</CardTitle>
            <p className="text-gray-600">
              {selectedPlan?.name} Plan - ${selectedPlan?.price}/mo
            </p>
          </CardHeader>
          <CardContent>
            <PaymentForm
              amount={selectedPlan?.price || 0}
              onSuccess={handleSuccess}
              onError={handleError}
            />
            <button
              className="mt-4 w-full text-gray-600 hover:text-gray-800"
              onClick={() => setShowPayment(false)}
            >
              Back to Plans
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
