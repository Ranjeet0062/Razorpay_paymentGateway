import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sucess() {
  const navigate = useNavigate()
  return (
    <>
      <div className='text-black'>your order is Sucessfully completed  </div>
      <button type='button' className='text-white bg-green-800 p-3 rounded-lg font-semibold' onClick={() => navigate("/home")}>Go to Home</button>
    </>
  )
}

export default Sucess