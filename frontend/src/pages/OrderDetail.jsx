import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

export function OrderDetail() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchDetail();
    fetchFoods();
  }, []);

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data.data);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const addItem = async () => {
    if (!selectedFood) return alert("Pilih menu terlebih dahulu");

    try {
      await api.post(`/orders/${id}/items`, {
        food_id: selectedFood,
        quantity,
      });

      setSelectedFood("");
      setQuantity(1);
      fetchDetail();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const closeOrder = async () => {
    try {
      await api.post(`/orders/${id}/close`);
      fetchDetail();
    } catch (error) {
      console.error("Error closing order:", error);
    }
  };

  const downloadReceipt = async () => {
    try {
      const res = await api.get(`/orders/${id}/receipt`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-order-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order #{order.id}</h2>

      <div className="mb-2 text-gray-600">Meja: {order.table.number}</div>

      <div className="mb-4">
        Status:{" "}
        <span
          className={`font-semibold ${
            order.status === "open" ? "text-yellow-600" : "text-green-600"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Tambah Menu */}
      {order.status === "open" && (
        <div className="border rounded p-4 mb-6 bg-gray-50">
          <h3 className="font-semibold mb-3">Tambah Menu</h3>

          <div className="flex gap-3">
            <select
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
              className="border px-3 py-2 rounded w-1/2"
            >
              <option value="">-- Pilih Menu --</option>
              {foods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name} (Rp {food.price})
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border px-3 py-2 rounded w-24"
            />

            <button
              onClick={addItem}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>
        </div>
      )}

      {/* Item List */}
      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between border-b pb-2">
            <span>
              {item.food.name} x {item.quantity}
            </span>
            <span>Rp {item.subtotal}</span>
          </div>
        ))}
      </div>

      <div className="font-bold text-lg mb-6">
        Total: Rp {order.total_price}
      </div>

      {/* Action Buttons */}
      {order.status === "open" ? (
        <button
          onClick={closeOrder}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Tutup Order
        </button>
      ) : (
        <div className="space-y-3">
          <div className="text-green-600 font-semibold">
            Order sudah ditutup
          </div>

          <button
            onClick={downloadReceipt}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
          >
            Download Receipt (PDF)
          </button>
        </div>
      )}
    </div>
  );
}
