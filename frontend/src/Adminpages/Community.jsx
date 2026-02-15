import React from 'react'

const Community = () => {
  return (
   <div className="min-h-screen bg-pink-50 p-6">
<h2 className="text-2xl font-bold mb-4">Community Posts</h2>
<div className="bg-white p-4 rounded-xl shadow">
<p>User post example...</p>
<div className="flex gap-2 mt-3">
<button className="bg-pink-500 text-white px-3 py-1 rounded-lg hover:bg-pink-600">Approve</button>
<button className="bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500">Delete</button>
</div>
</div>
</div>
  )
}

export default Community
