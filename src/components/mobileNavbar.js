import { NavLink } from "react-router-dom";
import { FaHome, FaCoins, FaTag, FaUser } from "react-icons/fa";

export default function MobileNavbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg block md:hidden">
      <div className="flex justify-around items-center py-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-emerald-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaHome size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/Coins"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-emerald-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaCoins size={22} />
          <span>Coins</span>
        </NavLink>

        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-emerald-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaTag size={22} />
          <span>Pricing</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center text-sm ${
              isActive ? "text-emerald-500" : "text-gray-400 hover:text-white"
            }`
          }
        >
          <FaUser size={22} />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}
