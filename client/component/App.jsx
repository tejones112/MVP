import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import ArtList from './ArtList.jsx';
import styles from './styles.css';
import CurrentImage from './CurrentImage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      art: [],
      currentImage: '',
      isActive: false,
      title: '',
      description: '',
      email: '',
      price: '',
      image: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.createImage = this.createImage.bind(this);
    this.getData = this.getData.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.exit = this.exit.bind(this);
  }

  componentDidMount() {
    this.getData();
  }
  createCarousel(string) {
    this.setState({
      isActive: true,
      currentImage: string
    })
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleFileChange(e) {
    this.setState({
      image: e.target.files[0]
    });
    // const data = new FormData();
    // data.append('name', this.state.image);
    // console.log(data.getAll('name'));
  }

  createImage(e) {
    e.preventDefault();
    // file = file.JSON.stringify();

    const data = new FormData();
    data.append('file', this.state.image, this.state.image.name);
    console.log(this.state.image);
    console.log(data.getAll('file'));
    axios.post('/api/local-market/', data)
      .then((res) => {
        console.log('ART CREATED!!!');
        // this.componentDidMount();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  // {title: this.state.title, description: this.state.description, email: this.state.email, price: this.state.price, image: this.state.image.name}

  getData() {
    axios.get('/api/local-market/')
      .then(({data}) => {
        this.setState({
          art: data
        })
      })
      .catch((err) => {
        console.log("ERROR IN GET REQUEST: ", err);
      })
  }

  scrollRight() {
    let current = this.state.currentImage;
    let currentIndex;
    for (var i = 0; i < this.state.art.length; i++) {
      if (current === this.state.art[i].image) {
        currentIndex = i;
      }
    }
    if (currentIndex === this.state.art.length -1) {
      this.setState({
        currentImage: this.state.art[0].image
      });
    } else {
      this.setState({
        currentImage: this.state.art[currentIndex + 1].image
      });
    }
  }

  scrollLeft() {
    let current = this.state.currentImage;
    let currentIndex;
    for (var i = 0; i < this.state.art.length; i++) {
      if (current === this.state.art[i].image) {
        currentIndex = i;
      }
    }
    if (currentIndex === 0) {
      this.setState({
        currentImage: this.state.art[this.state.art.length - 1].image
      });
    } else {
      this.setState({
        currentImage: this.state.art[currentIndex - 1].image
      });
    }
  }

  exit() {
    this.setState({
      isActive: false,
      currentImage: ''
    })
  }

  render() {
    return(
      <div>
        <h1>FLAGSTAFF LOCAL ART MARKET</h1>
          <div>
            <CurrentImage currentImage={this.state.currentImage} isActive={this.state.isActive} scrollLeft={this.scrollLeft} scrollRight={this.scrollRight} exit={this.exit}/>
          </div>
          <div >
            <ArtList art={this.state.art} createCarousel={this.createCarousel.bind(this)}/>
          </div>
          <form>
            Title: <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
            <br />
            Description: <input type="text" name="description" value={this.state.description} onChange={this.handleInputChange}/>
            <br />
            Email: <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange}/>
            <br />
            Price: <input type="text" name="price" value={this.state.price} onChange={this.handleInputChange}/>
            <br />
            Image: <input type="file" onChange={this.handleFileChange} />
            <br />
            <button type="submit" name="file" onClick={this.createImage}>Submit</button>
          </form>
      </div>
    )
  }
}

export default App;