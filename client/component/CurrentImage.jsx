import React from 'react';
import styles from './styles.css';

const CurrentImage = (props) => {
  if (props.isActive === false) {
      return null;
  } else {
    return (
      <div className={styles.main_image_container}>
        <div>
          <button className={styles.prev} onClick={() => { props.scrollLeft() }}>Prev</button>
        </div>
        <div className={styles.image_wrapper}>
          <img
          width="800"
          height="800"
          src={props.currentImage}
          alt="Picture Of Art"
          />
        </div>
        <div>
          <button className={styles.next} onClick={() => { props.scrollRight()}}>Next</button>
        </div>
        <div>
          <button className={styles.exit} onClick={() => {props.exit()}}>X</button>
        </div>
      </div>
    )
  }
}

export default CurrentImage;