import { useEffect, useState } from "react";
import { api } from "../services/api";

export function Dashboard() {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    try {
      const res = await api.get("/tables");
      setTables(res.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div>
      <h2>Dashboard - List Meja</h2>
      {tables.map((table) => (
        <div key={table.id}>
          Meja {table.number} - {table.status}
        </div>
      ))}
    </div>
  );
}
