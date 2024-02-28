import React, { useEffect, useState } from 'react'
import Product from './Product';
export default function Home() {
  const [products,setproducts]=useState([]);
  const [loader,setloding]=useState(false)
  const url="https://fakestoreapi.com/products";
  async function fetchdata(){
    setloding(true);
    try{
      const res=await fetch(url);
      const data=await res.json();
      setproducts(data)
    }catch(e){

    }
  
    setloding(false)
   

  }
  useEffect(()=>{
    fetchdata();
  },[])
  return (
    <div className='max-w-[1100px] flex items-center justify-center flex-wrap mx-auto'>
      {
       
      
        loader?(<div>loding...</div>):( (products.length > 0 ? 
          (<div className='grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto  min-h-[80vh] gap-4 '>{products.map( (post) => (
            <Product key = {post.id} item={post}/>
          ) )}</div>):
         (<div>not found</div>)))
      }
            
      
    </div>
  )
}
