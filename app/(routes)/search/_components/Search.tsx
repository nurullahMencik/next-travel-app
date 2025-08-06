"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Search = () => {
    const searchParams = useSearchParams()
    const destinations = searchParams.get("destinations")
    const activity = searchParams.get("activity")
    const duration = searchParams.get("duration")
    const price = searchParams.get("price")
  return (
    <div>
      <p><strong>Destinations: </strong>{destinations || "Null"}</p>
      <p><strong>activity: </strong>{activity || "Null"}</p>
      <p><strong>duration: </strong>{duration || "Null"}</p>
      <p><strong>price: </strong>{price || "Null"}</p>
    </div>
  )
}

export default Search
