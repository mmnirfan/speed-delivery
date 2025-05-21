'use client';

import { useState } from 'react';
import { sendContactEmail } from '@/actions/sendContactEmail';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await sendContactEmail(formData);
    if (res.success) {
      setSubmitted(true);
      setError(null);
      form.reset();
    } else {
      setError(res.error ?? 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* Left Content */}
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold text-primary">Get in Touch</h1>
        <p className="text-gray-600 text-base">
          Have questions about your order, our services, or anything else? We're here to help! Fill out the form and we’ll respond within 24 hours.
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="h-5 w-5 text-primary" />
            <span><strong>Office:</strong> Dubai, UAE</span>
          </div>
          <div className="flex items-center space-x-2">
            <EnvelopeIcon className="h-5 w-5 text-primary" />
            <span><strong>Email:</strong> support@speeddelivery.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <PhoneIcon className="h-5 w-5 text-primary" />
            <span><strong>Phone:</strong> +971 50 123 4567</span>
          </div>
        </div>

        <div className="pt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Quick Help Links</h2>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li><a href="/faq" className="text-primary hover:underline">Delivery & Shipping</a></li>
            <li><a href="/returns" className="text-primary hover:underline">Returns & Refunds</a></li>
            <li><a href="/support" className="text-primary hover:underline">Customer Support</a></li>
          </ul>
        </div>
      </div>

      {/* Right Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-8 shadow-lg space-y-6"
      >
        {submitted ? (
          <div className="text-green-600 font-semibold text-center text-lg">
            ✅ Thank you! Your message has been submitted.
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800">Contact Form</h2>
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="How can we help you?"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md shadow transition duration-200"
            >
              Send Message
            </button>
          </>
        )}
      </form>
    </div>
  );
}
