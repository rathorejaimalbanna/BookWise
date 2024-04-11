import React from 'react';
import styles from "../app.module.css"; // Import CSS module styles.

// Define a functional component named Modal.
export default function Modal(props) {
    
    // Define a function to truncate the description to a maximum length of 400 characters.
    function shortDes(des){
        return des.slice(0, 400);
    }
    
    // Render the component JSX.
    return (
        <>
            {/* Outer div with CSS classes from imported module */}
            <div className={styles.innerShowDiv}>
                {/* Div for image and basic information */}
                <div className={styles.showImgDiv}>
                    {/* Render book image */}
                    <img 
                        src={props.info.volumeInfo.imageLinks?.thumbnail} // Check if thumbnail image link is available
                        className={styles.cardImage} // Apply CSS class for image styling
                        alt="product" // Alt text for image
                    />
                    {/* Display book title */}
                    <p style={{marginTop:"25px"}}>{props.info.volumeInfo.title}</p>
                    {/* Display book author */}
                    <p>By {props.info.volumeInfo.authors[0]}</p>
                    {/* Display availability status */}
                    {props.info.accessInfo.epub.isAvailable ? // Check if epub is available
                        <span className={styles.span} style={{backgroundColor:"green"}}>Available</span> : // Display "Available" with green background
                        <span className={styles.span} style={{backgroundColor:"red"}}>Not Available</span> // Display "Not Available" with red background
                    } 
                </div>
                {/* Div for detailed information */}
                <div className={styles.showDetailsDiv}>
                    {/* Display description */}
                    <h3>Description</h3>
                    {/* Truncate description to maximum length and display */}
                    <p style={{overflow:"hidden"}}>{shortDes(props.info.volumeInfo.description)}</p>
                    {/* Display published date */}
                    <h4>Published Date</h4>
                    <p>{props.info.volumeInfo.publishedDate}</p>
                </div>
            </div>
        </>
    );
}
