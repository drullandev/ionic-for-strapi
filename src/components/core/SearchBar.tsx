import React from 'react'
import { IonSearchbar } from '@ionic/react'

const SearchBar: React.FC = () => {

  const searchText = 'Search string'

  function setSearchText(text: string) {
    console.log(text)
  }

  return (
    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
  )
}

export default SearchBar