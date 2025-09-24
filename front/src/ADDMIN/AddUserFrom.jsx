
import React, { Component } from "react";
import "../style/Register.css";
import Prodservice from "../Services/Prodservice";

class AddUserFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      password: "",
      Date: "",
      role: "",
      msg: "",
      errors: {}
    };
  }

  validateField = (name, value) => {
    let errors = this.state.errors;

    switch (name) {
      case "Name":
        if (value.trim().length < 3) {
          errors.Name = "Name must be at least 3 characters";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          errors.Name = "Only alphabets allowed";
        } else {
          errors.Name = "";
        }
        break;
      case "Email":
        errors.Email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
        break;
      case "password":
        errors.password =
          value.length < 6
            ? "Password must be at least 6 characters"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { errors, Name, Email, password, Date, role } = this.state;

    if (errors.Name || errors.Email || errors.password) {
      this.setState({ msg: "Please fix validation errors" });
      return;
    }

    const payload = { Name, Email, password, Date, role };

    Prodservice.addUsers(payload)
      .then((result) => {
        this.setState({
          msg: result.data.message || "User added successfully",
          Name: "",
          Email: "",
          password: "",
          Date: "",
          role: "",
          errors: {}
        });

        setTimeout(() => this.setState({ msg: "" }), 3000);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ msg: "Something went wrong" });
        setTimeout(() => this.setState({ msg: "" }), 3000);
      });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register-container">
        <form onSubmit={this.handleSubmit} className="register-form">
          <h2 className="register-title">Register</h2>

          <input
            type="text"
            name="Name"
            placeholder="Full Name"
            value={this.state.Name}
            onChange={this.handleChange}
            required
            className={`register-input ${errors.Name ? "input-error" : ""}`}
            autoComplete="off"
          />
          {errors.Name && <span className="error">{errors.Name}</span>}
            
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={this.state.Email}
            onChange={this.handleChange}
            required
            className={`register-input ${errors.Email ? "input-error" : ""}`}
            autoComplete="off"
          />
          {errors.Email && <span className="error">{errors.Email}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            className={`register-input ${errors.password ? "input-error" : ""}`}
            autoComplete="off"
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <input
            type="date"
            name="Date"
            value={this.state.Date}
            onChange={this.handleChange}
            required
            className="register-input"
            autoComplete="off"
          />

          <select
            name="role"
            value={this.state.role}
            onChange={this.handleChange}
            required
            className="register-input"
          >
            <option value="">Select User</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="register-button"
            disabled={errors.Name || errors.Email || errors.password}
          >
            Register
          </button>

          <br />
          <div className="last">
            <label>{this.state.msg}</label>
          </div>
        </form>
      </div>
    );
  }
}

export default AddUserFrom;

