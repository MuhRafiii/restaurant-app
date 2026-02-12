import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function Dashboard() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const res = await api.get("/tables");
    setTables(res.data);
  };

  const openOrder = async (tableId) => {
    await api.post("/orders/open", { table_id: tableId });
    fetchTables();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Meja</h2>

      <div className="grid grid-cols-4 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">Meja {table.number}</h3>

            <div
              className={`mt-2 px-2 py-1 rounded text-white text-sm inline-block
              ${table.status === "available" ? "bg-green-500" : "bg-red-500"}`}
            >
              {table.status}
            </div>

            {role === "pelayan" && table.status === "available" && (
              <button
                onClick={() => openOrder(table.id)}
                className="mt-3 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 cursor-pointer"
              >
                Buka Order
              </button>
            )}

            {table.status === "occupied" && (
              <button
                onClick={() => navigate(`/orders/${table.active_order_id}`)}
                className="mt-3 w-full bg-gray-800 text-white py-1 rounded"
              >
                Detail Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
