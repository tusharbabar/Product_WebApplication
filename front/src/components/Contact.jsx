import React from "react";

const Contact = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">📞 Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="mb-1">
              <strong>Email:</strong> quickcartpvt123@gmail.com
            </p>
            <p className="mb-3">
              <strong>Phone:</strong> +91 9529647719
            </p>
            <div>
              <a
                href="https://github.com/tusharbabar"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-dark btn-sm me-2"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/tushar-babar-69643a292/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm me-2"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a
                href="mailto:quickcartpvt123@gmail.com"
                className="btn btn-outline-danger btn-sm"
              >
                <i className="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
