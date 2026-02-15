export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">About Us</h3>
          <p className="text-gray-500 text-sm">
            We provide personalized skincare products to help you achieve your best skin.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><a href="/products" className="hover:text-pink-500">Products</a></li>
            <li><a href="/about" className="hover:text-pink-500">About</a></li>
            <li><a href="/contact" className="hover:text-pink-500">Contact</a></li>
            <li><a href="/login" className="hover:text-pink-500">Login</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li><a href="#" className="hover:text-pink-500">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-800 font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-500 text-sm">Skinova@gmail.com</p>
          <p className="text-gray-500 text-sm">Phone: 01-426838</p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="text-gray-500 hover:text-pink-500"><i className="bi bi-facebook"></i></a>
            <a href="#" className="text-gray-500 hover:text-pink-500"><i className="bi bi-instagram"></i></a>
            <a href="#" className="text-gray-500 hover:text-pink-500"><i className="bi bi-twitter"></i></a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-400 text-sm py-4 border-t">
        &copy; {new Date().getFullYear()} Skincare. All rights reserved.
      </div>
    </footer>
  );
}
