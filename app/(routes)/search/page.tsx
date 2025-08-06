import React, { Suspense } from 'react'
import Search from './_components/Search'

const SearchPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Sonuçlar yükleniyor...</div>}>
        <Search />
      </Suspense>
    </div>
  )
}

export default SearchPage
