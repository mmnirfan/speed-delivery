// app/privacy-policy/page.tsx

import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At Speed Delivery, your privacy is very important to us. This policy explains how we collect, use, and protect your personal information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>Your name, email, address, and payment details when placing an order</li>
        <li>Cookies and tracking data via tools like Google Analytics</li>
        <li>Device information (browser, OS, IP address)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li>To process and fulfill orders</li>
        <li>To communicate with you (order updates, customer support)</li>
        <li>To improve our website experience and performance</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Third-Party Services</h2>
      <p className="mb-4">
        We use Shopify to power our e-commerce platform and may share limited data with them to complete orders. Analytics tools like Google Analytics may also track your usage anonymously.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Retention</h2>
      <p className="mb-4">
        We retain your information for as long as necessary to fulfill orders and comply with legal obligations.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your personal data by contacting us at <a href="mailto:support@speeddelivery.com" className="text-blue-600 underline">support@speeddelivery.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Contact Us</h2>
      <p className="mb-4">
        If you have questions about this Privacy Policy, please contact us at <a href="mailto:support@speeddelivery.com" className="text-blue-600 underline">support@speeddelivery.com</a>.
      </p>

      <p className="text-sm text-gray-500 mt-8">
        Last updated: May 15, 2025
      </p>
    </div>
  );
}
