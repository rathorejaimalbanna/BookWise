import React from 'react';
import styles from '../../app.module.css';
import CheckBox from './checkbox';
import { filterActions, filterSelectors } from '../../Redux/filterReducer';
import { useDispatch, useSelector } from 'react-redux';

// Aside component responsible for rendering filter options
export default function Aside() {
  const dispatch = useDispatch()
  // Retrieve filter from context
  const filter = useSelector(filterSelectors)

  // Function to handle checkbox change
  function handleChange(type) {
    const index = filter.indexOf(type);
    if (index > -1) {
      // Remove type from filter if it exists
      dispatch(filterActions.removeFilter(index))
    } else {
      // Add type to filter if it doesn't exist
      dispatch(filterActions.addFilter(type))
    }
  }

  return (
    <div className={styles.filterSection}>
      {/* Render filter options */}
      <ul className={styles.filterItems}>
        <li className={styles.filterLineItem}>
          {/* Render checkbox for Men's Fashion */}
          <CheckBox option="Men's Fashion" handleChange={handleChange} />
        </li>
        <li className={styles.filterLineItem}>
          {/* Render checkbox for Women's Fashion */}
          <CheckBox option="Women's Fashion" handleChange={handleChange} />
        </li>
        <li className={styles.filterLineItem}>
          {/* Render checkbox for Books */}
          <CheckBox option="Books" handleChange={handleChange} checked/>
        </li>
        <li className={styles.filterLineItem}>
          {/* Render checkbox for Electronics */}
          <CheckBox option="Electronics" handleChange={handleChange} />
        </li>
      </ul>
    </div>
  );
}
