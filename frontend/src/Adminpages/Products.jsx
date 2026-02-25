import React, { useEffect, useState } from "react";
import axios from "axios";

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
    const res = await axios.get("http://localhost:3001/api/products");

    setProducts(res.data);
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
  // CHECKBOX
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
  // ADD OR UPDATE
  ////////////////////////////////////////////////////////////

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    ////////////////////////////////////
    // ADD
    ////////////////////////////////////

    if (!editId) {
      await axios.post("http://localhost:3001/api/products/add", formData);

      alert("Product Added ✅");
    }

    ////////////////////////////////////
    // UPDATE
    ////////////////////////////////////
    else {
      await axios.put(`http://localhost:3001/api/products/${editId}`, formData);

      alert("Product Updated ✅");

      setEditId(null);
    }

    setProduct(emptyProduct);
    setImage(null);
    setShowForm(false);

    loadProducts();
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

    await axios.delete(`http://localhost:3001/api/products/${id}`);

    loadProducts();
  };

  ////////////////////////////////////////////////////////////
  // ADD BUTTON
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
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Product Management</h2>
      <button
        onClick={handleAddClick}
        className="mb-6 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
      >
        + Add Product
      </button>
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
            />
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border p-2 rounded"
            />
            <input
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full border p-2 rounded"
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
            <div>
              <label className="font-semibold">Skin Type</label>

              <div className="flex gap-4 mt-2">
                {skinTypes.map((s) => (
                  <label key={s}>
                    <input
                      type="checkbox"
                      checked={product.skinType.includes(s)}
                      onChange={() => handleCheckboxChange("skinType", s)}
                    />

                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold">Concerns</label>

              <div className="flex flex-wrap gap-3 mt-2">
                {skinConcerns.map((s) => (
                  <label key={s}>
                    <input
                      type="checkbox"
                      checked={product.concerns.includes(s)}
                      onChange={() => handleCheckboxChange("concerns", s)}
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
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
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

      <div className="bg-white shadow-md rounded-xl overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Skin Type
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Concerns
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-pink-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={p.imageUrl}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>

                <td className="px-6 py-4 font-medium">{p.name}</td>

                <td className="px-6 py-4">Rs {p.price}</td>

                <td className="px-6 py-4">{p.category}</td>

                <td className="px-6 py-4">{p.skinType.join(", ")}</td>

                <td className="px-6 py-4 flex flex-wrap gap-2">
                  {p.concerns.map((c, i) => (
                    <span
                      key={i}
                      className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs"
                    >
                      {c}
                    </span>
                  ))}
                </td>

                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
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
