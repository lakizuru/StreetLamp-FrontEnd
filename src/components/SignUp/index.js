import React, { Component } from "react";
import Firebase from "../Firebase";
import { FirebaseContext } from "../Firebase";

const INITIAL_STATE = {
  email: "",
  password1: "",
  password2: "",
  error: null,
};

class SignUp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container">
        <div className="card shadow-lg o-hidden border-0 my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-flex">
                <div
                  className="flex-grow-1 bg-register-image"
                  style={{
                    backgroundImage:
                      'url("srcassetsimgadd-new-user-account-icon-simple-image-vector-26435263.jpg")',
                  }}
                ></div>
              </div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-dark mb-4">Add a New Admin</h4>
                  </div>
                  <FirebaseContext.Consumer>
                    {(firebase) => <SignUpForm firebase={firebase} />}
                  </FirebaseContext.Consumer>

                  <div className="text-center" />
                  <div className="text-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password1 } = this.state;

    this.props.Firebase.doCreateUserWithEmailAndPassword(email, password1)
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password1, password2, error } = this.state;

    const isInvalid =
      password1 !== password2 ||
      password1 === "" ||
      email === "" ||
      password1.length < 8;

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="row mb-3">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <input
              className="form-control form-control-user"
              type="text"
              id="Name"
              placeholder="Name"
              name="first_name"
            />
          </div>
          <div className="col-sm-6">
            <input
              className="form-control form-control-user"
              type="text"
              id="exampleFirstName"
              placeholder="Last Name"
              name="last_name"
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            className="form-control form-control-user"
            type="email"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={this.onChange}
          />
        </div>
        <div className="row mb-3">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <input
              className="form-control form-control-user"
              type="password"
              id="examplePasswordInput"
              placeholder="Password"
              name="password1"
              value={password1}
              onChange={this.onChange}
            />
          </div>
          <div className="col-sm-6">
            <input
              className="form-control form-control-user"
              type="password"
              id="exampleRepeatPasswordInput"
              placeholder="Repeat Password"
              name="password2"
              value={password2}
              onChange={this.onChange}
            />
          </div>
        </div>
        <button
          className="btn btn-primary d-block btn-user w-100"
          type="submit"
          disabled={isInvalid}
        >
          Submit
        </button>
        {error && <p> {error.message}</p>}
      </form>
    );
  }
}

export { SignUpForm };
