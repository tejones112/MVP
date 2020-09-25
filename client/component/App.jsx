import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import ArtList from './ArtList.jsx';
import ArtForm from './ArtForm.jsx';
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
      imageUrl: '',
      imageFile: null
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.createImageUrl = this.createImageUrl.bind(this);
    this.getData = this.getData.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
    this.exit = this.exit.bind(this);
    this.createCarousel = this.createCarousel.bind(this);
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
      imageFile: e.target.files[0]
    });
  }

  createImageUrl(e) {
    e.preventDefault();
    const data = new FormData();
    if (this.state.imageFile) {
      data.append('artImage', this.state.imageFile, this.state.imageFile.name);
      axios.post( '/api/profile/art-Img-Upload', data, {
        headers: {
         'accept': 'application/json',
         'Accept-Language': 'en-US,en;q=0.8',
         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
       })
        .then( ( response ) => {
    if ( 200 === response.status ) {
          if( response.data.error ) {
           if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
            console.log( 'Max size: 2MB', 'red' );
           } else {
            console.log( response.data );
            console.log( response.data.error, 'red' );
           }
          } else {
           let fileName = response.data;
           this.setState({
             currentImage: fileName.location
           })
           console.log(fileName.location );
           console.log( {title: this.state.title, description: this.state.description, email: this.state.email, price: this.state.price, image: this.state.currentImage} );
           axios.post('/api/local-market/', {title: this.state.title, description: this.state.description, email: this.state.email, price: this.state.price, image: this.state.currentImage})
           .then((data) => {
             console.log('ART CREATED!!!! ', data)
             this.componentDidMount();
           })
           .catch((err) => {
             console.log("ERROR");
           });
          }
         }
        }).catch( ( error ) => {
        console.log( error, 'red' );
       });
      } else {
       console.log( 'Please upload file', 'red' );
      }
  };

  render() {
    return(
      <div>
        <h1>FLAGSTAFF LOCAL ART MARKET</h1>
          <div>
            <CurrentImage currentImage={this.state.currentImage} isActive={this.state.isActive} scrollLeft={this.scrollLeft} scrollRight={this.scrollRight} exit={this.exit}/>
          </div>
          <div >
            <ArtList art={this.state.art} createCarousel={this.createCarousel}/>
          </div>
          <div>
            <ArtForm title={this.state.title} description={this.state.description} email={this.state.email} price={this.state.price} image={this.state.image} handleInputChange={this.handleInputChange} handleFileChange={this.handleFileChange} createImageUrl={this.createImageUrl}
            />
          </div>
      </div>
    )
  }
}

export default App;