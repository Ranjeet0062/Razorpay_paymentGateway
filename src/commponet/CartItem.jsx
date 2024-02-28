import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { remove, addamount, removeamount } from '../redux/Slices/CartSlice'
export default function CartItem({ item }) {
    const dispatch = useDispatch()
    function removecart() {
        dispatch(remove(item.id))
    }
    function addamounthandler() {
        dispatch(addamount(item.id))
    }
    function removeamounthandler() {
        dispatch(removeamount(item.id))
    }
    return (

        <div className='  flex w-[70%] border-b-4 border-green-600 items-center justify-center min-h-[260px] mx-auto'>
            <div className='w-[40%] h-[220px] flex items-center' >
                <img className="max-h-[220px]" src={item.image} />
            </div>
            <div className=' flex flex-col justify-evenly ml-3'>
                <div>
                    <h2 className='text-xl font-bold'>
                        {item.title}
                    </h2>
                    <p className=' text-lg'>{item.description}</p>
                </div>
                <div className=' text-2xl font-bold w-full flex justify-between'>
                    <div>
                        <p className=' text-green-800'>${item.price}</p>

                        <div>
                            <button onClick={() => {
                                if (item.amount > 1) {
                                    removeamounthandler();
                                } else {
                                    removecart()
                                }

                            }}>
                                -
                            </button>
                            {item.amount}
                            <button onClick={() => {
                                addamounthandler();
                            }}>
                                +
                            </button>
                        </div>
                    </div>
                    <MdDelete onClick={() => {
                        removecart();
                    }} className='text-4xl' />
                </div>
            </div>
        </div>

    )
}
