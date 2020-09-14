import React from 'react';
import styles from './styles.css';


const ArtListEntry = (props) => (
  <div className={styles.image} >
    <img
      width="300"
      height="300"
      src={props.piece.image}
      alt="Picture Of Art"
      onClick={() => {
        props.createCarousel(props.piece.image)
      }}
      />
    <br />
    Title: <span>{props.piece.title}</span>
    <br />
    Description: <span>{props.piece.description}</span>
    <br />
    Email: <span>{props.piece.email}</span>
    <br />
    Price: <span>{props.piece.price}</span>

  </div>
)

export default ArtListEntry;