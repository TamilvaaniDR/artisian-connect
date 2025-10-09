import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import CraftDetail from "./pages/CraftDetail";
import ArtisanProfile from "./pages/ArtisanProfile";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sell from "./pages/Sell";
import NotFound from "./pages/NotFound";
import DashboardRouter from "./pages/dashboard/DashboardRouter";
import ArtisanDashboard from "./pages/dashboard/ArtisanDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

// Context
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar"; // ✅ Global navbar for all pages
import Footer from "./components/Footer";
import { RequireAuth, RequireRole } from "./components/RequireAuth";
import ArtisanLayout from "./components/dashboard/ArtisanLayout";
import UserLayout from "./components/dashboard/UserLayout";
import ArtisanProducts from "./pages/dashboard/artisan/Products";
import ArtisanFeedback from "./pages/dashboard/artisan/Feedback";
import ArtisanProfilePage from "./pages/dashboard/artisan/Profile";
import ArtisanOrders from "./pages/dashboard/artisan/Orders";
import ArtisanMessages from "./pages/dashboard/artisan/Messages";
import ArtisanSettings from "./pages/dashboard/artisan/Settings";
import UserOrders from "./pages/dashboard/user/Orders";
import UserWishlist from "./pages/dashboard/user/Wishlist";
import UserFeedback from "./pages/dashboard/user/Feedback";
import UserProfilePage from "./pages/dashboard/user/Profile";
import UserMessages from "./pages/dashboard/user/Messages";
import UserSettings from "./pages/dashboard/user/Settings";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Show Navbar only on Home page */}
      {isHome && <Navbar />}

      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <Routes>
            {/* ✅ Core Pages */}
            <Route path="/" element={<Home />} />
            <Route
              path="/explore"
              element={
                <RequireAuth>
                  <Explore />
                </RequireAuth>
              }
            />
            <Route path="/sell" element={<Sell />} />
            {/* Unified product route: source can be 'catalog' or 'artisan' */}
            <Route path="/product/:source/:id" element={<ProductDetail />} />
            {/* Back-compat: allow /product/:id to still work as catalog */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/craft/:id" element={<CraftDetail />} />
            <Route path="/artisan/:slug" element={<ArtisanProfile />} />

            {/* Dashboards */}
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <DashboardRouter />
                </RequireAuth>
              }
            />
            {/* Artisan nested layout */}
            <Route
              path="/dashboard/artisan"
              element={
                <RequireRole role="Artisan">
                  <ArtisanLayout />
                </RequireRole>
              }
            >
              <Route index element={<ArtisanDashboard />} />
              <Route path="products" element={<ArtisanProducts />} />
              <Route path="orders" element={<ArtisanOrders />} />
              <Route path="messages" element={<ArtisanMessages />} />
              <Route path="feedback" element={<ArtisanFeedback />} />
              <Route path="profile" element={<ArtisanProfilePage />} />
              <Route path="settings" element={<ArtisanSettings />} />
            </Route>
            {/* User nested layout */}
            <Route
              path="/dashboard/user"
              element={
                <RequireRole role="Customer">
                  <UserLayout />
                </RequireRole>
              }
            >
              <Route index element={<UserDashboard />} />
              <Route path="orders" element={<UserOrders />} />
              <Route path="wishlist" element={<UserWishlist />} />
              <Route path="messages" element={<UserMessages />} />
              <Route path="feedback" element={<UserFeedback />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>

            {/* ✅ Cart & Payment */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order/:id" element={<OrderConfirmation />} />

            {/* ✅ Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Show Footer only on public area */}
      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
