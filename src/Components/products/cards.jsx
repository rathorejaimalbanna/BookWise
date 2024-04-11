import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../app.module.css";
import { useSelector } from "react-redux";
import { userSelectors } from "../../Redux/userReducer";

// ProductCard component renders a card displaying product information
function ProductCard(props) {
  // Retrieve userData from context
  const userData = useSelector(userSelectors);

  // Function to add item to cart
  function addItem() {
    // Check if user is logged in
    if (userData.length === 0) {
      alert("Please Login First !!");
    } else {
      // Call addCart function
      props.addCart(
        limitTitle(props.item.volumeInfo.title),
        props.item.volumeInfo.imageLinks?.thumbnail
      );
    }
  }
  function limitTitle(title) {
    const words = title.split(" ");
    return words.slice(0, 4).join(" ");
  }

  return (
    <Card className={styles.cardsDiv}>
      {/* Render product image */}
      <Card.Img
        variant="top"
        src={
          props.type === "cart"
            ? props.item.image
            : props.item.volumeInfo.imageLinks?.thumbnail
        }
        className={styles.cardImage}
        alt="product image"
      />
      <Card.Body>
        {/* Render product name */}
        <Card.Title className={styles.cardTextTitle}>
          {props.type === "cart"
            ? props.item.name
            : limitTitle(props.item.volumeInfo.title)}
        </Card.Title>
        {/* Render product description (placeholder) */}
        <Card.Text className={styles.cardText}>
          {props.type === "cart" ? (
            <span>Qty: {props.item.qty}</span>
          ) : (
            <span>{props.item.volumeInfo.authors[0]}</span>
          )}
        </Card.Text>
        {props.type !== "cart" && (
          <Card.Text className={styles.cardText}>
            {props.item.saleInfo.listPrice?.amount && (
              <span>&#8377; {props.item.saleInfo.listPrice.amount}</span>
            )}
            {!props.item.saleInfo.listPrice?.amount && (
              <span>Rating: {props.item.volumeInfo.averageRating}</span>
            )}
          </Card.Text>
        )}
        {/* Render button for adding/removing from cart */}
        <Button
          className={styles.cardButton}
          variant={props.type === "cart" ? "danger" : "success"}
          onClick={
            props.type === "cart"
              ? () => {
                  props.remove(props.item.name);
                }
              : () => {
                  addItem();
                }
          }
        >
          {props.type === "cart" ? "Remove from cart" : "Add To Cart"}
        </Button>
        {props.type === "product" && (
          <Button
            className={styles.showButton}
            onClick={props.handleShow}
          >
            View
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
