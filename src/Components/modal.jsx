import React from 'react'
import styles from "../app.module.css"

export default function Modal(props) {
    function shortDes(des){
        return des.slice(0,400)
    }
    
  return (
    <>
    <div className={styles.innerShowDiv}>
        <div className={styles.showImgDiv}>
            <img src={props.info.volumeInfo.imageLinks?.thumbnail}
        className={styles.cardImage}
        alt="product image" />
        <p style={{marginTop:"25px"}}>{props.info.volumeInfo.title}</p>
        <p>By {props.info.volumeInfo.authors[0]}</p>
        {props.info.accessInfo.epub.isAvailable ? <span className={styles.span} style={{backgroundColor:"green"}} >Available</span> : <span className={styles.span} style={{backgroundColor:"red"}}>Not Available</span> } 
        </div>
        <div className={styles.showDetailsDiv}>
            <h3>Description</h3>
            <p style={{overflow:"hidden"}}>{shortDes(props.info.volumeInfo.description)}</p>
            <h4>Published Date</h4>
            <p>{props.info.volumeInfo.publishedDate}</p>
        </div>
      </div>
    </>
  )
}
