import React from "react";
import styles from "./spinner.module.css";
const Spinner = () => {
  return (
    <div class={styles.loader}>
      <div class={styles.spinner} aria-hidden="true"></div>
    </div>
  );
};

export default Spinner;
