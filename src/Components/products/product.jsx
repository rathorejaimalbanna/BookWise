import React, { useEffect, useState } from 'react';
import ProductCard from './cards';
import { db } from '../../firebase';
import styles from '../../app.module.css'
import {toast} from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import { filterActions, filterSelectors } from '../../Redux/filterReducer';
import { userSelectors } from '../../Redux/userReducer';
import { collection, getDocs, doc, setDoc,updateDoc } from "firebase/firestore";
import { bookAsync, bookSelectors } from '../../Redux/booksReducer';


// Product component fetches and renders product data
export default function Product() {
  // State to store fetched product data
  const {books} = useSelector(bookSelectors)
  const [docs, setDocs] = useState([]);
  const [show,setShow]  = useState(false)
  const dispatch = useDispatch()
  // Retrieve userData and filter from context
  const userData = useSelector(userSelectors)

  // Access filter from store
  var filter = useSelector(filterSelectors)

  // Empty filter on page reload
  useEffect(()=>{
    dispatch(filterActions.emptyFilter())
  },[dispatch])

  // fetch book data and add filter is available
  useEffect(() => {
      let fetchedDocs = books
        dispatch(bookAsync())
        // Filter product data based on filter
        if (filter.length > 0) {
          fetchedDocs = fetchedDocs.filter((item) => {
            // Check if volumeInfo.categories exists and is an array
            if (item.volumeInfo.categories && Array.isArray(item.volumeInfo.categories)) {
              // Check if the first category matches any filter criteria
              return filter.some(filterItem => item.volumeInfo.categories.includes(filterItem));
            } else {
              return false; // Exclude items without categories or with non-array categories
            }});
        }
        setDocs(fetchedDocs);

        // Update state with filtered product data

  }, [filter,dispatch,books]);

  // Function to add item to cart
  function addCart(name, image) { 
    async function addItem() {
      const querySnapshot = await getDocs(
        collection(db, "cartData", userData.username, "product")
      );
      const cartData = querySnapshot.docs.map((doc) => doc.data());
      const find = cartData.find((item,id)=> item.name === name);
      if(find){
        toast.success("Item quantity increased")
        const itemRef = doc(db, "cartData", userData.username, "product",find.name);
        // Set the itme qty
        await updateDoc(itemRef, {
          qty: find.qty+1
        });

      }
      // Add item to cartData collection in Firestore
      else
     { toast.success("Item added to cart")
      await setDoc(doc(db, "cartData", userData.username, "product", name), {
        name, image,qty:1
      });}
    }
    // Call addItem function
    addItem();
  }

  // Render loading message if product data is not available
  if (docs.length === 0) {
    return (<><h2>Loading.....</h2></>);
  };
  function handleShow(){
    setShow(!show)
  }

  return (
    <>
    {show && <div className={styles.showDiv}>
      <div className={styles.innerShowDiv}>
        <div className={styles.showImgDiv}></div>
        <div className={styles.showDetailsDiv}></div>
        <button onClick={handleShow}> close </button>
      </div>
      </div>}
      {/* Render ProductCard for each product */}
      <div className={styles.outerCardDiv}>
      {docs.map((item, id) => 
        <ProductCard key={id} item={item} addCart={addCart} type="product" handleShow={handleShow}/>
      )}
      </div>
    </>
  );
}
