import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">List Order</h2>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
            className="border rounded p-4 shadow cursor-pointer hover:shadow-md"
          >
            <div className="flex justify-between">
              <span>Order #{order.id}</span>
              <span>Meja {order.table.number}</span>
            </div>
            <div>Total: Rp {order.total_price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
