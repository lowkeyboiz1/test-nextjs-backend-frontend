"use client"

import { useEffect, useState } from "react"

// Type for the item
type Item = {
  _id: string
  name: string
}

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [itemName, setItemName] = useState<string>("")

  // Fetch items from the API
  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items", { cache: "no-store" })
      if (!response.ok) {
        throw new Error("Failed to fetch items")
      }
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error(error)
    }
  }

  // Add a new item
  const addItem = async () => {
    if (!itemName.trim()) {
      console.error("Item name cannot be empty")
      return
    }

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: itemName }),
      })

      if (!response.ok) {
        throw new Error("Failed to add item")
      }

      const newItem = await response.json()
      setItems((prevItems) => [...prevItems, newItem])
      setItemName("") // Clear input after adding the item
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div>
      <h1>Items</h1>

      {/* Input field for adding a new item */}
      <div>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Enter item name" className="border p-2" />
        <button
          onClick={addItem}
          disabled={!itemName.trim()} // Disable if input is empty
          className="ml-2 p-2 bg-blue-500 text-white"
        >
          Add Item
        </button>
      </div>

      {/* List of items */}
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
