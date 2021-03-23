import React from 'react'
import loading from '../loading.svg'

const Loading: React.FC = () => {
  return (
    <div className='layout-content-loading'>
      <img src={loading} alt='loading'/>
      <div className='layout-content-loading__load'>
        Loading…
      </div>
    </div>
  )
}

export default Loading
