import React from 'react'

const Products = () => {
  return (
    <div className="min-h-screen p-6">
<h2 className="text-2xl font-bold mb-4">Add Product</h2>

<form className=" p-6 rounded-xl space-y-3">
<input className="w-full border rounded-lg p-2" placeholder="Product Name" />
<input type="file" className="w-full border rounded-lg p-2" />
<input className="w-full border rounded-lg p-2" placeholder="Price" />
<textarea className="w-full border rounded-lg p-2" placeholder="Description" />
<select className="w-full border rounded-lg p-2">
<option>Select Category</option>
<option>Electronics</option>
<option>Fashion</option>
</select>
<button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">Save Product</button>
</form>
</div>
  )
}

export default Products
