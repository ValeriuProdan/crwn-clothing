import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  singInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFromFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  const reserFormFields = () => {
    setFormFields(defaultFromFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    reserFormFields();

    try {
      await singInAuthUserWithEmailAndPassword(email, password);

      reserFormFields();
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-login-credentials") {
        alert("Cannot signin user, incorect email or password");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();

      reserFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>I already have an acount.</h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
