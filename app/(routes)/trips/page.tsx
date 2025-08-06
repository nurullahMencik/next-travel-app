import React, { Suspense } from 'react'
import TripsList from './_components/TripsList'

const TripsPage = () => {
  return (
    <Suspense fallback={<div>Liste Yükleniyor...</div>}>
        <TripsList />
      </Suspense>
  )
}

export default TripsPage
