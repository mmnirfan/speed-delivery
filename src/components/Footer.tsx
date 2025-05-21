export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-6 px-4 text-center text-sm text-gray-600">
      <div className="max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Speed Delivery. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/about" className="hover:underline">About</a>
          <a href="/contact" className="hover:underline">Contact</a>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
