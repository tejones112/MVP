import React from 'react';
import ArtListEntry from './ArtListEntry.jsx';
import styles from './styles.css';


const ArtList = (props) => (
  <div className={styles.image_row}>
    {props.art.map((piece) => (
      <ArtListEntry piece={piece}
        createCarousel={props.createCarousel}
      />
    ))}
  </div>
)


export default ArtList;