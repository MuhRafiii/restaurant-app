import { useEffect, useState } from "react";
import { api } from "../services/api";

export function MasterFood() {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get("/foods");
      setFoods(res.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const addFood = async () => {
    try {
      await api.post("/foods", { name, price });
      setName("");
      setPrice("");
      fetchFoods();
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const startEdit = (food) => {
    setEditingId(food.id);
    setEditName(food.name);
    setEditPrice(food.price);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPrice("");
  };

  const updateFood = async (id) => {
    try {
      await api.put(`/foods/${id}`, {
        name: editName,
        price: editPrice,
      });
      cancelEdit();
      fetchFoods();
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  const deleteFood = async (id) => {
    if (!confirm("Yakin ingin menghapus menu ini?")) return;

    try {
      await api.delete(`/foods/${id}`);
      fetchFoods();
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Master Makanan</h2>

      {/* Add Form */}
      <div className="flex gap-2 mb-6">
        <input
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />

        <input
          placeholder="Harga"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />

        <button
          onClick={addFood}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah
        </button>
      </div>

      {/* Food List */}
      <div className="space-y-2">
        {foods.map((food) => (
          <div
            key={food.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            {editingId === food.id ? (
              <>
                <div className="flex gap-2 w-2/3">
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 rounded w-1/2"
                  />
                  <input
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="border px-2 py-1 rounded w-1/2"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateFood(food.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Batal
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="font-semibold">{food.name}</div>
                  <div className="text-sm text-gray-600">Rp {food.price}</div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(food)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFood(food.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
