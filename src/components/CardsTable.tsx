import React from 'react'
import { IPhotosData } from '../Interfaces/Interfaces'
import Cards from './Cards'
import Loading from './Loading'
import NoConnect from './NoConnect'

interface CardsTableProps {
  photos: IPhotosData[]
  error: boolean
  loading: boolean
}

const CardsTable: React.FC<CardsTableProps> = ({ photos, error, loading }) => {
  if (loading) return <Loading />
  if (error) return <NoConnect />

  return (
    <>
      {
        photos.map((item) => <Cards key={item.id} photo={item.image.name} description={item.description} name={item.name} />)
      }
    </>
  )
}

export default React.memo(CardsTable)
