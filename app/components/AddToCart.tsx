'use client' //to make this component on client side
//we make this use client because it can accept events when clicked and other shit,
// so we need to render it on the client side because that if it is in server side it will not have interactivity and dont accept events

import React from 'react'

const AddToCart = () => {
  return (
    <div>
      <button className='btn btn-primary' onClick={() => console.log("click")}>Add to Cart </button>
    </div>
  )
}

export default AddToCart