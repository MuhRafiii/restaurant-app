import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { MasterFood } from "./pages/MasterFood";
import { OrderDetail } from "./pages/OrderDetail";
import { OrderList } from "./pages/OrderList";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/foods"
          element={
            <PrivateRoute allowedRoles={["pelayan"]}>
              <MasterFood />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute allowedRoles={["kasir"]}>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute allowedRoles={["pelayan", "kasir"]}>
              <OrderDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
