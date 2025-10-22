import React from "react";
import AddToCart from "./AddToCart";
import styles from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <div>
        {/* this component is from the client side  */}
        <AddToCart/> 
    </div>
  );
};

export default ProductCard;
 /**

  * import styles from './ProductCard.module.css' //importing it as an object 
  *  <div className={styles.card} > this how use the css module 
  
  */