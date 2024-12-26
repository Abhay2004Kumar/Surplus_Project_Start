import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast, { Toaster } from "react-hot-toast";

const formId = process.env.REACT_APP_FORMSPREE; // Formspree form ID from .env

function Contact() {
  const [state, handleSubmit] = useForm(formId);
  const [formFields, setFormFields] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    contact: "",
    email: "",
  });

  // Validate email format using regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  // Validate contact number (only digits and length of 10)
  const validateContact = (contact) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(contact);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));

    // Validate fields on change
    if (name === "email" && !validateEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    if (name === "contact" && !validateContact(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "Please enter a valid 10-digit contact number.",
      }));
    } else if (name === "contact") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: "",
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (errors.contact || errors.email) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    handleSubmit(e);
  };

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks for contacting!");
      setFormFields({ name: "", contact: "", email: "", message: "" });
    }
  }, [state.succeeded]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formFields.name}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              placeholder="Enter your contact"
              value={formFields.contact}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formFields.email}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Write your message"
              value={formFields.message}
              onChange={handleFormChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <button
            type="submit"
            disabled={state.submitting || errors.contact || errors.email}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send Message
          </button>
        </form>
        <Toaster />
      </div>
    </div>
  );
}

export default Contact;
