import { LogoutIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";

export default function Header() {
  const [modal, setModal] = useState(false);
  const { currentUser } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-gradient-to-b from-[#0f172a]/80 to-[#1e293b]/60 backdrop-blur-md border-b border-white/10 px-4 py-3 shadow-md rounded-b-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold text-white tracking-wide">
              LinkUp
            </span>
          </Link>

          {/* Right Controls */}
          {currentUser && (
            <div className="flex items-center space-x-4">
              {/* Logout Button */}
              <button
                onClick={() => setModal(true)}
                className="text-white hover:text-red-400 transition-colors duration-200"
              >
                <LogoutIcon className="h-6 w-6" />
              </button>

              {/* Profile Picture */}
              <Link to="/profile" className="focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full border border-white/30 hover:border-white transition-all duration-200"
                  src={currentUser.photoURL}
                  alt="User"
                />
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Modal */}
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
