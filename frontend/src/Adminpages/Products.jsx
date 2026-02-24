import React, { useState } from "react";
import axios from "axios";

const skinTypes = [
  { value: "Oily", label: "Oily" },
  { value: "Dry", label: "Dry" },
  { value: "Combination", label: "Combination" },
  { value: "Sensitive", label: "Sensitive" },
];

const skinConcerns = [
  { value: "Acne", label: "Acne" },
  { value: "Dark Spots", label: "Dark Spots" },
  { value: "Aging / Wrinkles", label: "Aging / Wrinkles" },
  { value: "Dryness", label: "Dryness" },
  { value: "Oiliness", label: "Oiliness" },
  { value: "Redness / Sensitivity", label: "Redness / Sensitivity" },
  { value: "Uneven Texture", label: "Uneven Texture" },
  { value: "Large Pores", label: "Large Pores" },
];

const Products = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    ingredients: "",
    skinType: [],
    concerns: [],
    category: "Cleanser",
  });

  const [image, setImage] = useState(null);

  // ================= TEXT INPUT CHANGE =================
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ================= CHECKBOX CHANGE =================
  const handleCheckboxChange = (field, value) => {
    setProduct((prev) => {
      const exists = prev[field].includes(value);

      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
  };

  // ================= SUBMIT =================
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

    formData.append("image", image);

    try {
      await axios.post("http://localhost:3001/api/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product Added Successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Admin - Add Product</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Product Name"
          required
        />

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Price"
          required
        />

        <input
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Stock"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
        />

        <textarea
          name="ingredients"
          value={product.ingredients}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Ingredients"
        />

        {/* ===== SKIN TYPE MULTI SELECT ===== */}
        <div>
          <label className="font-semibold block mb-2">Skin Type</label>
          <div className="grid grid-cols-2 gap-2">
            {skinTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={product.skinType.includes(type.value)}
                  onChange={() =>
                    handleCheckboxChange("skinType", type.value)
                  }
                />
                {type.label}
              </label>
            ))}
          </div>
        </div>

        {/* ===== SKIN CONCERNS MULTI SELECT ===== */}
        <div>
          <label className="font-semibold block mb-2">Skin Concerns</label>
          <div className="grid grid-cols-2 gap-2">
            {skinConcerns.map((concern) => (
              <label
                key={concern.value}
                className="flex items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={product.concerns.includes(concern.value)}
                  onChange={() =>
                    handleCheckboxChange("concerns", concern.value)
                  }
                />
                {concern.label}
              </label>
            ))}
          </div>
        </div>

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Cleanser">Cleanser</option>
          <option value="Serum">Serum</option>
          <option value="Moisturizer">Moisturizer</option>
          <option value="Sunscreen">Sunscreen</option>
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
          accept="image/*"
          required
        />

        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default Products;
