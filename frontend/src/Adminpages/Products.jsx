import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

const skinTypes = ["Oily", "Dry", "Combination", "Sensitive"];

const skinConcerns = [
  "Acne",
  "Dark Spots",
  "Aging / Wrinkles",
  "Dryness",
  "Oiliness",
  "Redness / Sensitivity",
  "Uneven Texture",
  "Large Pores",
];

const Products = () => {
  ////////////////////////////////////////////////////////////
  // EMPTY PRODUCT TEMPLATE
  ////////////////////////////////////////////////////////////

  const emptyProduct = {
    name: "",
    price: "",
    stock: "",
    description: "",
    ingredients: "",
    skinType: [],
    concerns: [],
    category: "Cleanser",
  };

  ////////////////////////////////////////////////////////////
  // STATES
  ////////////////////////////////////////////////////////////

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(emptyProduct);
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  ////////////////////////////////////////////////////////////
  // LOAD PRODUCTS
  ////////////////////////////////////////////////////////////

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  ////////////////////////////////////////////////////////////
  // INPUT CHANGE
  ////////////////////////////////////////////////////////////

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  ////////////////////////////////////////////////////////////
  // CHECKBOX HANDLER
  ////////////////////////////////////////////////////////////

  const handleCheckboxChange = (field, value) => {
    setProduct((prev) => {
      const exists = prev[field].includes(value);

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((i) => i !== value)
          : [...prev[field], value],
      };
    });
  };

  ////////////////////////////////////////////////////////////
  // ADD OR UPDATE PRODUCT
  ////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(product).forEach((key) => {
        if (Array.isArray(product[key])) {
          product[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, product[key]);
        }
      });

      if (image) {
        formData.append("image", image);
      }

      if (!editId) {
        await axios.post(
          "http://localhost:3001/api/products/add",
          formData
        );
        alert("Product Added ✅");
      } else {
        await axios.put(
          `http://localhost:3001/api/products/${editId}`,
          formData
        );
        alert("Product Updated ✅");
        setEditId(null);
      }

      setProduct(emptyProduct);
      setImage(null);
      setShowForm(false);
      loadProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  ////////////////////////////////////////////////////////////
  // EDIT
  ////////////////////////////////////////////////////////////

  const handleEdit = (p) => {
    setProduct(p);
    setEditId(p._id);
    setShowForm(true);
  };

  ////////////////////////////////////////////////////////////
  // DELETE
  ////////////////////////////////////////////////////////////

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  ////////////////////////////////////////////////////////////
  // ADD BUTTON CLICK
  ////////////////////////////////////////////////////////////

  const handleAddClick = () => {
    setProduct(emptyProduct);
    setEditId(null);
    setShowForm(true);
  };

  ////////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////////

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>

      <button
        onClick={handleAddClick}
        className="mb-6 bg-[#E0536A] text-white px-4 py-2 rounded hover:bg-[#744049]"
      >
        + Add Product
      </button>

      {/* ================= FORM ================= */}
      {showForm && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editId ? "Update Product" : "Add Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
              required
            />

            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full border p-2 rounded"
              required
            />

            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border p-2 rounded"
            />

            <textarea
              name="ingredients"
              value={product.ingredients}
              onChange={handleChange}
              placeholder="Ingredients"
              className="w-full border p-2 rounded"
            />

            {/* SKIN TYPE */}
            <div>
              <label className="font-semibold">Skin Type</label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {skinTypes.map((s) => (
                  <label key={s} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={product.skinType.includes(s)}
                      onChange={() =>
                        handleCheckboxChange("skinType", s)
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            {/* CONCERNS */}
            <div>
              <label className="font-semibold">Concerns</label>
              <div className="flex flex-wrap gap-3 mt-2">
                {skinConcerns.map((s) => (
                  <label key={s} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={product.concerns.includes(s)}
                      onChange={() =>
                        handleCheckboxChange("concerns", s)
                      }
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Cleanser</option>
              <option>Serum</option>
              <option>Moisturizer</option>
              <option>Sunscreen</option>
            </select>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="flex gap-3">
              <button className="bg-pink-500 text-white px-5 py-2 rounded">
                {editId ? "Update" : "Add"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 px-5 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 w-20">Image</th>
              <th className="px-4 py-3 w-40">Name</th>
              <th className="px-4 py-3 w-24">Price</th>
              <th className="px-4 py-3 w-28">Category</th>
              <th className="px-4 py-3 w-40">Skin Type</th>
              <th className="px-4 py-3 w-56">Concerns</th>
              <th className="px-4 py-3 w-28 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-pink-50 transition">

                <td className="px-4 py-4">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>

                <td className="px-4 py-4 font-medium truncate">
                  {p.name}
                </td>

                <td className="px-4 py-4">
                  Rs {p.price}
                </td>

                <td className="px-4 py-4">
                  {p.category}
                </td>

                <td className="px-4 py-4 text-sm">
                  {p.skinType?.join(", ")}
                </td>

                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {p.concerns?.map((c, i) => (
                      <span
                        key={i}
                        className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs whitespace-nowrap"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
