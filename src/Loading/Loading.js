import React from 'react'
import styles from './styles.module.css'
const Loading = () => {
  return (
    <div
      style={{
        position:"absolute",
        left:"45%",
        top:0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles.loading}></div>

    </div>
  )
}

export default Loading