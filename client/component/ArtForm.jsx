import React from 'react';
import styles from './styles.css';


const ArtForm = (props) => (
  <form>
    Title: <input type="text" name="title" value={props.title} onChange={() => {props.handleInputChange()}}/>
    <br />
    Description: <input type="text" name="description" value={props.description} onChange={() => {props.handleInputChange()}}/>
    <br />
    Email: <input type="text" name="email" value={props.email} onChange={() => {props.handleInputChange()}}/>
    <br />
    Price: <input type="text" name="price" value={props.price} onChange={() => {props.handleInputChange()}}/>
    <br />
    Image: <input type="file" onChange={() => {props.handleFileChange()}} />
    <br />
    <button type="submit" name="file" onClick={() => {props.createImageUrl()}}>Submit</button>
  </form>
)




export default ArtForm;