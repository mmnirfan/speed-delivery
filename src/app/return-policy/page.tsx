// src/app/(legal)/return-policy/page.tsx
export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>
      <p className="mb-4">We accept returns within 14 days of delivery. Items must be unused and in original packaging.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Refund Process</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Contact our support team to initiate a return.</li>
        <li>Ship the item back with tracking.</li>
        <li>Refunds will be processed within 5–10 business days of receiving the return.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2">Exceptions</h2>
      <p className="mb-4">Certain items like personal care goods or gift cards are non-refundable.</p>
      <p className="mt-6 text-sm text-gray-600">Last updated: May 15, 2025</p>
    </div>
  );
}
