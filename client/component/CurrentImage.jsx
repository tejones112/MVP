import React from 'react';
import styles from './styles.css';

const CurrentImage = (props) => {
  if (props.isActive === false) {
      return null;
  } else {
    return (
      <div>
        <div>
          <div className={styles.background}></div>
        </div>
        <div className={styles.main_image_container}>
            <span className={styles.prev} onClick={() => { props.scrollLeft() }}>PREV</span>
            <img
            className={styles.main_image}
            src={props.currentImage}
            alt="Picture Of Art"
            />
            <span className={styles.next} onClick={() => { props.scrollRight()}}>NEXT</span>
            <span className={styles.exit} onClick={() => {props.exit()}}>X</span>
        </div>
      </div>
    )
  }
}

export default CurrentImage;