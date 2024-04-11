import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from "../../app.module.css"

// CheckBox component renders a checkbox option
function CheckBox(props) {
  return (
    <Form>
      <div key={`default-checkbox`} className="mb-3">
        {/* Render checkbox */}
        <Form.Check 
          type='checkbox'
          id={props.option}
          label={
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <img src={props.img} alt="Description"  className={styles.filterIcon}/>
              <p> {props.option}</p>
            </div>
          }
          onChange={() => { props.handleChange(props.option) }}
        />
      </div>
    </Form>
  );
}

export default CheckBox;
