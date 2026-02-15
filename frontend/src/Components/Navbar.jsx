export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b bg-white">
      
      {/* Logo */}
      <div className="text-xl font-bold text-pink-500">
        <a href="/home">  Skinova</a>
       
      </div>

      {/* Menu */}
      <ul className="hidden md:flex gap-6 text-sm text-gray-600">
        <li className="cursor-pointer hover:text-pink-500">Community</li>
        <li className="cursor-pointer hover:text-pink-500">Blog</li>
        <li className="cursor-pointer hover:text-pink-500">My Dashboard</li>
      
      </ul>

      {/* Search + Icons */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="hidden md:block px-4 py-2 border rounded-lg text-sm focus:outline-none"
        />

        {/* Wishlist */}
        <i className="bi bi-heart text-lg text-black cursor-pointer hover:text-pink-500"></i>

        {/* Cart */}
        <i className="bi bi-cart text-lg text-black cursor-pointer hover:text-pink-500"></i>

        {/* Profile */}
        <i className="bi bi-person text-lg text-black cursor-pointer hover:text-pink-500"></i>
      </div>
    </nav>
  );
}
