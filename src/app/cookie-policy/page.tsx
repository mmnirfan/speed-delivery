// src/app/(legal)/cookie-policy/page.tsx
export default function CookiePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4">We use cookies to enhance your browsing experience and analyze site traffic. By using our site, you consent to our cookie policy.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">What Are Cookies?</h2>
      <p className="mb-4">Cookies are small text files stored on your device when you visit a website.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2">How We Use Cookies</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>To remember your cart and preferences</li>
        <li>To track site analytics and performance</li>
        <li>To deliver personalized content</li>
      </ul>
      <p className="mt-6 text-sm text-gray-600">Last updated: May 15, 2025</p>
    </div>
  );
}
