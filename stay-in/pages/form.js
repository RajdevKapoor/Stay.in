import React from "react";
import axios from "axios";

const Form = () => {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    proertyName: "",

    file: null
  });

  function handleChange(e) {
    if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    for (let [key, value] of Object.entries(state)) {
      formData.append(key, value);
    }

    // Console Logging for now
    // console.log(formData.values());
    for (var value of formData.values()) {
      console.log(value);
   }

    // Use fetch or axios to submit the form
    // await axios
    //   .post("{Formeezy-Endpoint}", formData)
    //   .then(({ data }) => {
    //     const { redirect } = data;
    //     // Redirect used for reCAPTCHA and/or thank you page
    //     window.location.href = redirect;
    //   })
    //   .catch((e) => {
    //     window.location.href = e.response.data.redirect;
    //   });
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        value={state.message}
        required
      />
      <textarea
        name="firstName"
        placeholder="Last Name"
        onChange={handleChange}
        value={state.message}
        required
      />
       <textarea
        name="propertyName"
        placeholder="Property Name"
        onChange={handleChange}
        value={state.message}
        required
      />
      <input type="file" name="file" onChange={handleChange} />
      <input
        name="bot-field"
        type="text"
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <button type="submit">Send</button>
    </form>
  );
}

const AddProperty = () => {
  return (
    <div>
      <h1>Add Property & Earn!</h1>
      <Form/>
    </div>
  );
};

export default AddProperty;