function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 pt-8 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP LINKS */}
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mb-6 gap-4">
          <p>© {new Date().getFullYear()} Rajdeep Singh</p>

          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Contact
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-700 mb-10"></div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Airbnb Clone</h3>
            <p className="text-sm">
              Discover unique stays and unforgettable experiences across India.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Beach Homes</li>
              <li className="hover:text-white cursor-pointer">
                Mountain Cabins
              </li>
              <li className="hover:text-white cursor-pointer">
                City Apartments
              </li>
              <li className="hover:text-white cursor-pointer">Luxury Stays</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Safety Info</li>
              <li className="hover:text-white cursor-pointer">Cancellation</li>
              <li className="hover:text-white cursor-pointer">Contact Us</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm">Nashik, Maharashtra</p>
            <p className="text-sm">rajdeep@example.com</p>
          </div>
        </div>
        {/* DIVIDER */}
        <div className="border-t border-slate-700 mt-10 pt-6"></div>

        {/* Social Icons */}
        <div className="flex gap-6 mt-10 text-xl">
          <span className="hover:text-white cursor-pointer">🌐</span>
          <span className="hover:text-white cursor-pointer">🐦</span>
          <span className="hover:text-white cursor-pointer">📸</span>
          <span className="hover:text-white cursor-pointer">💼</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
