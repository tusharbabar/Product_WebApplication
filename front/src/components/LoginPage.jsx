

import React, { Component } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ProdService from "../Services/Prodservice";
import "../style/login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      password: "",
      loggedIn: false,
      error: "",
      success: ""
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    ProdService.userLogin(this.state.Email, this.state.password)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          // 🔥 Dispatch custom event to refresh Navbar
          window.dispatchEvent(new Event("userChanged"));
        }

        this.setState({
          loggedIn: true,
          success: res.data.message,
          error: ""
        });
      })
      .catch(() => {
        this.setState({
          error: "Invalid Email or Password. Please Register First!",
          success: ""
        });
      });
  };

  render() {
    if (this.state.loggedIn) {
      const redirectPath = this.props.from || "/";
      return <Navigate to={redirectPath} />;
    }

    return (
      <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light mt-1">
        <div
          className="col-md-6 bg-white p-4 rounded shadow-sm border main"
          style={{ border: "2px solid black", width: "450px" }}
        >
          <h3 className="mb-4 text-center">Login to Your Account</h3>
          {this.state.success && (
            <div className="alert alert-success">{this.state.success}</div>
          )}
          {this.state.error && (
            <div className="alert alert-danger">{this.state.error}</div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Email"
                name="Email"
                value={this.state.Email}
                onChange={this.handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Log In
              </button>
            </div>

            <p className="text-center mb-0">
              Don't have an account?{" "}
              <Link to="/reg" className="text-decoration-none">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

// Wrapper to pass location state
export default function LoginPageWithLocation(props) {
  const location = useLocation();
  return <LoginPage {...props} from={location.state?.from} />;
}

