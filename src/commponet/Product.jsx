import React from 'react'
// import { UseSelector } from 'react-redux';
import { useSelector, useDispatch } from "react-redux";
import { add,remove} from "../redux/Slices/CartSlice";

export default function Product({ item }) {
  const dispatch = useDispatch();
  const cartarr = useSelector((state) => state)
  function addcart() {
    const c={...item,amount:1};
    console.log(c);
    dispatch(add(c))
  }
  function removecart() {
    dispatch(remove(item.id))
  }
  return (
    <div className='  flex flex-col justify-center items-center border-4 border-black p-4 mt-4 rounded-xl hover:scale-110'>
      <h2 className=' text-xl font-bold'>{item.title.substring(0, 15) + "..."}</h2>
      <p>{item.description.substring(0, 56) + "..."}</p>
      <img src={item.image} alt='' className='h-[180px] ' />
      <div className='flex items-center justify-between w-full mt-3'>
        <p className='text-xl font-bold text-green-800'>${item.price}</p>

        {
          cartarr.cart.some((cartitem) => cartitem.id == item.id) ?
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={removecart}>
              Remove Item
            </button>) :
            (<button
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
              onClick={addcart}>
              Add to Cart
            </button>)
        }
      </div>
    </div>
  )
}
