
// import React, { Component } from "react";
// import "../style/Register.css";
// import Prodservice from "../Services/Prodservice";
// class RegisterForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Name: "",
//       Email: "",
//       password: "",
//       Date: "",
//       role: "",
//       msg: "",
//       errors: {}
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     // Name validation: only alphabets & spaces
//     if (!this.state.Name.trim()) {
//       isValid = false;
//       errors["Name"] = "Name is required";
//     } else if (!/^[A-Za-z\s]+$/.test(this.state.Name)) {
//       isValid = false;
//       errors["Name"] = "Name should only contain letters";
//     }

//     // Email validation
//     if (!this.state.Email.trim()) {
//       isValid = false;
//       errors["Email"] = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(this.state.Email)) {
//       isValid = false;
//       errors["Email"] = "Invalid email format";
//     }

//     // Password validation (at least 6 chars)
//     if (!this.state.password) {
//       isValid = false;
//       errors["password"] = "Password is required";
//     } else if (this.state.password.length < 6) {
//       isValid = false;
//       errors["password"] = "Password must be at least 6 characters";
//     }

//     // Date validation
//     if (!this.state.Date) {
//       isValid = false;
//       errors["Date"] = "Date is required";
//     }

//     // Role validation
//     if (!this.state.role) {
//       isValid = false;
//       errors["role"] = "Please select a role";
//     }

//     this.setState({ errors });
//     return isValid;
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     if (!this.validateForm()) {
//       return;
//     }

//     const payload = {
//       Name: this.state.Name,
//       Email: this.state.Email,
//       password: this.state.password,
//       Date: this.state.Date,
//       role: this.state.role
//     };

//     Prodservice.addUsers(payload)
//       .then((result) => {
//         this.setState({
//           msg: result.data.message || "User added successfully",
//           Name: "",
//           Email: "",
//           password: "",
//           Date: "",
//           role: "",
//           errors: {}
//         });

//         setTimeout(() => this.setState({ msg: "" }), 3000);
//       })
//       .catch((err) => {
//         console.error(err);
//         this.setState({ msg: "Something went wrong" });
//         setTimeout(() => this.setState({ msg: "" }), 3000);
//       });
//   };

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="register-container">
//         <form onSubmit={this.handleSubmit} className="register-form">
//           <h2 className="register-title">Register</h2>

//           <input
//             type="text"
//             name="Name"
//             placeholder="Full Name"
//             value={this.state.Name}
//             onChange={this.handleChange}
//             required
//             className="register-input"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Name}</span>

//           <input
//             type="email"
//             name="Email"
//             placeholder="Email Address"
//             value={this.state.Email}
//             onChange={this.handleChange}
//             required
//             className="register-input"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Email}</span>

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             required
//             className="register-input"
//             autoComplete="off"
//           />
//           <span className="error">{errors.password}</span>

//           <input
//             type="date"
//             name="Date"
//             value={this.state.Date}
//             onChange={this.handleChange}
//             required
//             className="register-input"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Date}</span>

//           <select
//             name="role"
//             value={this.state.role}
//             onChange={this.handleChange}
//             required
//             className="register-input"
//           >
//             <option value="">Select Role</option>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           <span className="error">{errors.role}</span>

//           <button type="submit" className="register-button">
//             Register
//           </button>
//           <br />
//           <div className="last">
//             <label>{this.state.msg}</label>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default RegisterForm;












// import React, { Component } from "react";
// import { Link } from "react-router-dom"; 
// import "../style/Register.css";
// import Prodservice from "../Services/Prodservice";

// class RegisterForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Name: "",
//       Email: "",
//       password: "",
//       Date: "",
//       msg: "",
//       errors: {}
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!this.state.Name.trim()) {
//       isValid = false;
//       errors["Name"] = "Name is required";
//     } else if (!/^[A-Za-z\s]+$/.test(this.state.Name)) {
//       isValid = false;
//       errors["Name"] = "Name should only contain letters";
//     }

//     if (!this.state.Email.trim()) {
//       isValid = false;
//       errors["Email"] = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(this.state.Email)) {
//       isValid = false;
//       errors["Email"] = "Invalid email format";
//     }

//     if (!this.state.password) {
//       isValid = false;
//       errors["password"] = "Password is required";
//     } else if (this.state.password.length < 6) {
//       isValid = false;
//       errors["password"] = "Password must be at least 6 characters";
//     }

//     if (!this.state.Date) {
//       isValid = false;
//       errors["Date"] = "Date is required";
//     }

//     this.setState({ errors });
//     return isValid;
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();

//     if (!this.validateForm()) {
//       return;
//     }

//     const payload = {
//       Name: this.state.Name,
//       Email: this.state.Email,
//       password: this.state.password,
//       Date: this.state.Date,
//       role: "user" 
//     };

//     Prodservice.addUsers(payload)
//       .then((result) => {
//         this.setState({
//           msg: result.data.message || "User registered successfully",
//           Name: "",
//           Email: "",
//           password: "",
//           Date: "",
//           errors: {}
//         });

//         setTimeout(() => this.setState({ msg: "" }), 3000);
//       })
//       .catch((err) => {
//         console.error(err);
//         this.setState({ msg: "Something went wrong" });
//         setTimeout(() => this.setState({ msg: "" }), 3000);
//       });
//   };

//   render() {
//     const { errors } = this.state;

//     return (
//       <div className="register-container">
//         <form onSubmit={this.handleSubmit} className="register-form">
//           <h2 className="register-title">User Register</h2>

//           <input
//             type="text"
//             name="Name"
//             placeholder="Full Name"
//             value={this.state.Name}
//             onChange={this.handleChange}
//             required
//             className="register-input mb-4"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Name}</span>
//           <input
//             type="email"
//             name="Email"
//             placeholder="Email Address"
//             value={this.state.Email}
//             onChange={this.handleChange}
//             required
//             className="register-input mb-4"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Email}</span>

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleChange}
//             required
//             className="register-input mb-4"
//             autoComplete="off"
//           />
//           <span className="error">{errors.password}</span>

//           <input
//             type="date"
//             name="Date"
//             value={this.state.Date}
//             onChange={this.handleChange}
//             required
//             className="register-input mb-4"
//             autoComplete="off"
//           />
//           <span className="error">{errors.Date}</span>

          

//           <button type="submit" className="register-button">
//             Register
//           </button>
//           <div className="login-link">
//             <p>Already have an account?</p>
//             <Link to="/login" className="login-button">
//               Go to Login
//             </Link>
//           </div>
//           <br />

//           <div className="last">
//             <label>{this.state.msg}</label>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default RegisterForm;





import React, { Component } from "react";
import { Link } from "react-router-dom"; 
import "../style/Register.css";
import Prodservice from "../Services/Prodservice";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      password: "",
      Date: "",
      msg: "",
      errors: {}
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Name") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return; // block typing invalid chars
      }
    }

    this.setState({ [name]: value }, () => {
      this.validateField(name, value); 
    });
  };

  validateField = (name, value) => {
    let errors = { ...this.state.errors }; 

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
          value.length < 6 ? "Password must be at least 6 characters" : "";
        break;

      case "Date":
        errors.Date = value ? "" : "Date is required";
        break;

      default:
        break;
    }

    this.setState({ errors });
  };

  validateForm = () => {
    let isValid = true;
    const { Name, Email, password, Date } = this.state;

    // Run validations again before submit
    this.validateField("Name", Name);
    this.validateField("Email", Email);
    this.validateField("password", password);
    this.validateField("Date", Date);

    const errors = this.state.errors;
    Object.keys(errors).forEach((key) => {
      if (errors[key]) {
        isValid = false;
      }
    });

    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    const payload = {
      Name: this.state.Name,
      Email: this.state.Email,
      password: this.state.password,
      Date: this.state.Date,
      role: "user" 
    };

    Prodservice.addUsers(payload)
      .then((result) => {
        this.setState({
          msg: result.data.message || "User registered successfully",
          Name: "",
          Email: "",
          password: "",
          Date: "",
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
          <h2 className="register-title">User Register</h2>

          <input
            type="text"
            name="Name"
            placeholder="Full Name"
            value={this.state.Name}
            onChange={this.handleChange}
            required
            className="register-input mb-4"
            autoComplete="off"
          />
          <span className="error">{errors.Name}</span>
            
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            value={this.state.Email}
            onChange={this.handleChange}
            required
            className="register-input mb-4  "
            autoComplete="off"
          />
          <span className="error">{errors.Email}</span>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            className="register-input mb-4"
            autoComplete="off"
          />
          <span className="error">{errors.password}</span>

          <input
            type="date"
            name="Date"
            value={this.state.Date}
            onChange={this.handleChange}
            required
            className="register-input mb-4"
            autoComplete="off"
          />
          <span className="error">{errors.Date}</span>

          <button type="submit" className="register-button">
            Register
          </button>

          <div className="login-link">
            <p>Already have an account?</p>
            <Link to="/login" className="login-button">
              Go to Login
            </Link>
          </div>

          <br />
          <div className="last">
            <label>{this.state.msg}</label>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;

