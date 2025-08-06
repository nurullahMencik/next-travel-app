import React, { Suspense } from 'react'

import RentaCarList from './_components/RentaCarList'

const RentacarsPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Liste Yükleniyor...</div>}>
        <RentaCarList />
      </Suspense>
    </div>
  )
}

export default RentacarsPage
