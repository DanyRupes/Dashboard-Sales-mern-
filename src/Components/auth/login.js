import React, { Component } from "react";
import axios from 'axios'
import { loginAction } from '../../action/Auth_act'
import { connect } from "react-redux";

class Login extends Component {


  state = {
    email:'', password:'',gst_no:''
  }


  componentDidMount(){
    // localStorage.clear()
  }


  hadnleSubmit = async (e)=>{
    e.preventDefault()
    const  {email, password } = this.state
    // alert("owww", password, email )
    // console.log(email, password,"passs")
    // console.log("okay ", this.state)
    this.props.loginAction({email, password})
  }

  componentWillReceiveProps(props){
    if(props.auth) { 
      this.props.history.push('/')
    }
  }
  
  render() {

      return(
        <div id="app">
        <section className="section">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                <div className="login-brand">
                  <img src="./dist/img/wefactor_logo.png" alt="logo" width="100" className="shadow-light rounded-circle" />
                </div>
    
                <div className="card card-primary">
                  <div className="card-header"><h4>Login</h4></div>
    
                  <div className="card-body">
                    <form  className="needs-validation" noValidate="">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-control"
                         name="email" tabIndex="1" required autoFocus
                         value={this.state.email}
                         onChange={(e) => this.setState({ email: e.target.value })} />
                        <div className="invalid-feedback">
                          Please fill in your email
                        </div>
                      </div>
    
                      <div className="form-group">
                        <div className="d-block">
                            <label htmlFor="password" className="control-label">Password</label>
                          <div className="float-right">
                            <a href="auth-forgot-password.html" className="text-small">
                              Forgot Password?
                            </a>
                          </div>
                        </div>
                        <input id="password" type="password" 
                         className="form-control"
                         name="password"
                         tabIndex="2" required
                         value={this.state.password}
                         onChange={(e)=>this.setState({password:e.target.value})}/>

                      </div>


    
                      <div className="form-group">
                        <div className="custom-control custom-checkbox">
                          <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" />
                          <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                        </div>
                      </div>
    
                      <div className="form-group">
                        <button 
                         className="btn btn-primary btn-lg btn-block" tabIndex="4"
                        disabled={this.state.email && this.state.password?false:true }
                          onClick={this.hadnleSubmit}>
                          Login
                        </button>
                      </div>
                      <div className="form-group"  style={{textAlign:'center'}}>
                        <a 
                          tabIndex="4"
                          onClick={()=>this.props.history.push('/register')}>
                          Register
                        </a>
                      </div>
                    </form>
                    
                    
    
                  </div>
                </div>
                {/* <div className="mt-5 text-muted text-center">
                  Don't have an account? <a href="auth-register.html">Create One</a>
                </div> */}
                <div className="simple-footer">
                  Copyright &copy; Lubricant 2019
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


const mapStateToProps = (state)=>({
  auth : state.auth.auth
})
export default connect(mapStateToProps, {loginAction})(Login);