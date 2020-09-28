import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import './App.css';



const partclesOptions  ={
  particles: {
    number:{
      value: 30,
        density:{
          enable: true,
            value_area:800 
      }               
    }
  }
} 

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSiginedIn: false,
      user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
      }
    }
class App extends Component {
  constructor(){
    super()
    this.state = initialState;
  }

loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined  
      }
  })
}
  // Life cycle hook
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log);
  // };

  calculateFaceLocation =(data) =>{
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow:  height - (clarifiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=>{
this.setState({box: box});
  }

  onInputChange =(event)=>{
    this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://limitless-ridge-75980.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
              input: this.state.input
        })
      })
      .then(response =>response.json())
      .then(response => {
        if(response) {
          fetch('https://limitless-ridge-75980.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user, {
              entries: count
            }))
          })

          .catch(console.log)
        }
          this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSiginedIn: true})
    }
    this.setState({route: route});
  }
  render(){
    const {isSiginedIn, imageUrl, route, box} = this.state;
    return (
          <div className="App">
            <Particles className='particles'
              params = {partclesOptions}
            />
            <Navigation isSiginedIn={isSiginedIn}onRouteChange={this.onRouteChange}/>
          {route === 'home' ?
              <div>
                <Logo />
                 <Rank name={this.state.user.name} 
                 entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
             : (
                this.state.route === 'signin' 
                ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
             
          }    
            </div>
    );
 } 
  
}

export default App;
