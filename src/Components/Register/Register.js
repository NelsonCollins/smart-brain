import React from 'react';

class Register extends React.Component{

	constructor(){
		super();
		this.state ={
			registerEmail: '',
			registerPassword: '',
			fullname: ''
		}
	};

	onEmailRegister =(event)=>{
		this.setState({registerEmail: event.target.value})
	};

	onPasswordRegister =(event)=>{
		this.setState({registerPassword: event.target.value})
	};

	onFullnameRegister =(event)=>{
		this.setState({fullname: event.target.value})
	};


	onSubmitSignup = () => {
		fetch('https://limitless-ridge-75980.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.fullname
			})

		})
		.then(response => response.json())
		.then(user =>{
			if (user.id){
				this.props.loadUser(user)
				this.props.onRouteChange('home');
			}
		})
	}


	render(){
		// const {onRouteChange} = this.props;
		return(
		<article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="name">Fullname</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="text" 
				        name="name"  
				        id="name" 
				        onChange= {this.onFullnameRegister}
				        />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" 
				        name="email-address"  
				        id="email-address" 
				        onChange= {this.onEmailRegister}
				        />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" 
				        name="password"  
				        id="password"
				        onChange= {this.onPasswordRegister} 

				        />
				      </div>
				      
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignup}
				      class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" value="Register" />
				    </div>
				    
				  </div>
				</main>
		</article>
	)
	}
	
}

export default Register;