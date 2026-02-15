import React from 'react'

const Blog = () => {
  return (
   <div className="min-h-screen p-6">
<h2 className="text-2xl font-bold mb-4">Add Blog</h2>
<form className=" p-6 rounded-xl   space-y-3">
<input className="w-full border rounded-lg p-2" placeholder="Blog Title" />
<textarea className="w-full border rounded-lg p-2" placeholder="Blog Content" />
<button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">Publish</button>
</form>
</div>
  )
}

export default Blog
