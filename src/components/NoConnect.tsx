import React from 'react'
import connectPorblem from '../connectPorblem.svg'

const NoConnect: React.FC = () => {
  return (
    <div className='layout-content-connect'>
      <img src={connectPorblem} alt='noInternet'/>
      <div className='layout-content-connect__title'>
        Oh shucks!
      </div>
      <div className='layout-content-connect__subtitle'>
        Slow or no internet connection.<br />
        Please check your internet settings
      </div>
    </div>
  )
}

export default NoConnect
