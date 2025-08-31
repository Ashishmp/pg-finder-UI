

// export default MainApp;
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// Auth Pages
import LoginPage from "../pages/auth/loginPage";
import RegisterPage from "../pages/auth/registerPage";

// User Pages
import UserDashboard from "../pages/user/userDashboard";
import FavoritesPage from "../pages/user/favouritePage";

// Owner Pages
import OwnerDashboard from "../pages/owner/ownerDshboard";
import AddPgPage from "../pages/owner/AddPgForm";

// Components
import PgDetailsModal from "./common/PGdetailsModel";
import { INITIAL_PGS } from "../utils/constants";

const MainApp = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState("landing");
  const [selectedPg, setSelectedPg] = useState(null);

  // ✅ Correct usage
  const pgs = INITIAL_PGS;

  /** ============ Landing Page ============ */
  const renderLandingPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <div className="w-full bg-white shadow-md rounded-2xl p-4 mb-6 flex justify-between items-center">
        <span className="font-bold text-xl text-blue-600">🏠 PG Finder</span>

        {!user ? (
          <div className="flex gap-3">
            <button
              className="px-4 py-2 rounded-xl border border-blue-500 text-blue-600 font-medium hover:bg-blue-50 transition"
              onClick={() => setCurrentView("login")}
            >
              Sign In
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              onClick={() => setCurrentView("register")}
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">👤 {user.name}</span>
            <button
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
              onClick={() =>
                setCurrentView(
                  user.role === "owner" ? "owner-dashboard" : "user-dashboard"
                )
              }
            >
              Dashboard
            </button>
          </div>
        )}
      </div>

      {/* PG List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        {pgs.map((pg) => (
          <div
            key={pg.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4"
          >
            <img
              src={pg.image || "https://via.placeholder.com/300"}
              alt={pg.title}
              className="rounded-md w-full h-40 object-cover mb-3"
            />
            <h3 className="font-bold text-lg">{pg.title}</h3>
            <p className="text-gray-600">📍 {pg.location}</p>
            <p className="font-semibold text-blue-600">{pg.price}</p>

            {/* Hide sensitive info if not logged in */}
            {!user ? (
              <p className="text-sm italic text-gray-500">
                Login to see contact details
              </p>
            ) : (
              <p className="text-sm text-gray-700">
                📞 {pg.phone} | 📧 {pg.email}
              </p>
            )}

            <button
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
              onClick={() => setSelectedPg(pg)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  /** ============ Auth & Dashboard Routing ============ */
  const renderPage = () => {
    if (!user) {
      switch (currentView) {
        case "login":
          return <LoginPage onViewChange={setCurrentView} />;
        case "register":
          return <RegisterPage onViewChange={setCurrentView} />;
        default:
          return renderLandingPage();
      }
    }

    // If logged in
    switch (currentView) {
      case "user-dashboard":
        return (
          <UserDashboard
            onViewChange={setCurrentView}
            onSelectPg={setSelectedPg}
          />
        );
      case "favorites":
        return (
          <FavoritesPage
            onViewChange={setCurrentView}
            onSelectPg={setSelectedPg}
          />
        );
      case "owner-dashboard":
        return (
          <OwnerDashboard
            onViewChange={setCurrentView}
            onSelectPg={setSelectedPg}
          />
        );
      case "add-pg":
        return <AddPgPage onViewChange={setCurrentView} />;
      default:
        return user.role === "owner" ? (
          <OwnerDashboard
            onViewChange={setCurrentView}
            onSelectPg={setSelectedPg}
          />
        ) : (
          <UserDashboard
            onViewChange={setCurrentView}
            onSelectPg={setSelectedPg}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}

      {/* PG Modal */}
      {selectedPg && (
        <PgDetailsModal pg={selectedPg} onClose={() => setSelectedPg(null)} />
      )}
    </div>
  );
};

export default MainApp;
