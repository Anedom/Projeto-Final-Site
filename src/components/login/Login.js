import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css'
import Input from '../input/Input'
import LoginInput from './loginInput/LoginInput';
import AuthService from "../auth/auth-service";
import { whileStatement } from '@babel/types';

class Login extends Component{
  constructor (props){
    super(props)
    this.state = {
      email: "",
      password: "",
      showPassword: true,
      message: "",
    }
    this.service = new AuthService();
    this.clickShowPassword = this.clickShowPassword.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.removeModalBackdrop = this.removeModalBackdrop.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeInfo = this.removeInfo.bind(this);
  }

  clickShowPassword() {
    const { showPassword } = this.state
    showPassword ? this.setState({showPassword: !showPassword}) : this.setState({showPassword: !showPassword})

    this.passInput = document.getElementById('password')
    if(showPassword){
      this.passInput.type = "password"
      this.setState({
        showPassword : false
      })
    } else {
      this.passInput.type = "text"
      this.setState({
        showPassword : true
      })
    }
  }

  onChangeHandler(e)  {
    let { name, value, type, checked } = e.target;
    value = (type==="checkbox")?checked:value;
    this.setState({ [name]: value})
  }

  onSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state;
    this.service.login(email, password)
      .then(response => {
        this.setState({ email: "", password: "", message: "" });
        this.props.getUser(response);
        this.props.history.push(this.props.location.prevPath);
      })
      .catch(error => console.log(error))

  }

  removeModalBackdrop() {
    let modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop.parentNode.removeChild(modalBackdrop);
    this.setState({ message: "" });
  }

  removeInfo() {
    this.props.changeLogin();
  }

  render(){

    return( 
      <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div id="login-center" className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button id="login__close-btn" type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.removeInfo}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="login__title">
                  Faça seu Login
                </div>

                <Link to="https://projfinal-dev.herokuapp.com/api/auth/facebook" className='login__facebook-btn'>
                  <img className='icos-fac' src="./images/facebookico.png" alt=""/>
                  Facebook
                </Link>

                <Link to="https://projfinal-dev.herokuapp.com/api/auth/google"  className='login__google-btn'>
                  <img className='icos-goo' src="./images/googleico.png" alt=""/>
                  Google
                </Link>
                
                <div class="login-form__or">
                  <div class="login-form__or-line"></div>
                  <p class="login-form__or-text">Ou continue com</p>
                  <div class="login-form__or-line"></div>
                </div>

                <form class="login__modal-form" autocomplete="off">
                  <LoginInput className="login__modal-input" imgUrl="/images/mail.svg" type="text" name="email" label="Email" id="email" value={this.state.email} changeAction={(e) => this.onChangeHandler(e)} />
                  <LoginInput className="login__modal-input" imgUrl="/images/locker.svg" type='password' name="password" label='Password' id="password" value={this.state.password} changeAction={(e) => this.onChangeHandler(e)} />
                  <span onClick={this.clickShowPassword} className="login__modal-showPassword">Mostrar senha</span>
                    <button type="button" className="login__modal-loginBtn" onClick={(e) => {this.onSubmit(e)}}>Login</button>
                    <p className="login__modal-register">Não possui conta? <Link className="linkSignin" to="/signup" onClick={() => this.removeModalBackdrop()}>Cadastre-se</Link></p>
                </form>
                
                {/* <div className="col-12 formLogin">
                  <form className="row" autocomplete="off">
                    <Input type="text" name="email" label="Email" id="email" value={this.state.email} changeAction={(e) => this.onChangeHandler(e)} />
                    <Input type='password' name="password" label='Password' id="password" value={this.state.password} changeAction={(e) => this.onChangeHandler(e)} />
                    {(this.state.message)?(<div className="alert alert-danger" role="alert">{ this.state.message }</div>):null}
                    <span onClick={this.clickShowPassword} className="col-12 text-right mousePointer">Mostrar senha</span>
                    <button type="button" className="btn btn-login d-flex" onClick={(e) => {this.onSubmit(e)}}>Login</button>
                    <span className="col-12 text-center">Não possui conta? <Link className="linkSignin" to="/signup" onClick={() => this.removeModalBackdrop()}>Cadastre-se</Link></span>
                  </form>
                </div> */}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Login