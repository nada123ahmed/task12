import React, { useState } from 'react';
import './ContactForm.css';
import * as yup from 'yup';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });

  const [errorsObject, setErrorsObject] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Declare the state here

  // Define the schema using Yup
  const userSchema = yup.object().shape({
    firstName: yup.string().min(4, "First name must be more than 4 characters").required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Please enter a valid Email address"),
    queryType: yup.string().oneOf(["General Enquiry", "Support Request"], "Invalid query type").required("Please select a Query type"),
    message: yup.string().required("Message is required"),
    consent: yup.boolean().oneOf([true], "To submit this form, please consent to being contacted"),
  });

  // Function to handle validation
  async function testValidation() {
    try {
      const response = await userSchema.validate(formData, {
        abortEarly: false,
      });
      console.log(response, "Is valid object");
      return true;
    } catch (err) {
      const errors = {};
      err.inner.forEach((error) => {
        console.log(`${error.path}: ${error.message}`);
        errors[error.path] = error.message;
      });
      setErrorsObject(errors);
      console.log(errors);
      return false;
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await testValidation(); // Validate form data before submission
    if (isValid) {
      console.log('Form Data Submitted:', formData);
      setShowSuccessMessage(true); // Show success message
      // Here you can proceed to send the form data to your backend or any other logic

      // Reset form and hide success message after a delay (optional)
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          queryType: '',
          message: '',
          consent: false,
        });
        setErrorsObject({});
        setShowSuccessMessage(false);
      }, 3000); // 3 seconds delay
    }
  };

  return (
    <>
   {showSuccessMessage && (
        <div className="success-message"><span><img src='icon-checkbox-check.svg' className='image'></img></span>Message Sent!<br></br> Thanks for completing the form. We’ll be in touch soon!</div>
      )}
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      
      <div className="form-group">
        <label>First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={errorsObject.firstName ? 'error' : ''}
        />
        {errorsObject.firstName && <p className="error">{errorsObject.firstName}</p>}
      </div>

      <div className="form-group">
        <label>Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={errorsObject.lastName ? 'error' : ''}
        />
        {errorsObject.lastName && <p className="error">{errorsObject.lastName}</p>}
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errorsObject.email ? 'error' : ''}
        />
        {errorsObject.email && <p className="error">{errorsObject.email}</p>}
      </div>

      <div className="form-group">
        <label>Query Type *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="queryType"
              value="General Enquiry"
              checked={formData.queryType === 'General Enquiry'}
              onChange={handleChange}
            />
            General Enquiry
          </label>
          <label>
            <input
              type="radio"
              name="queryType"
              value="Support Request"
              checked={formData.queryType === 'Support Request'}
              onChange={handleChange}
            />
            Support Request
          </label>
        </div>
        {errorsObject.queryType && <p className="error">{errorsObject.queryType}</p>}
      </div>

      <div className="form-group">
        <label>Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errorsObject.message ? 'error' : ''}
        />
        {errorsObject.message && <p className="error">{errorsObject.message}</p>}
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
          />
          I consent to being contacted by the team *
        </label>
        {errorsObject.consent && <p className="error">{errorsObject.consent}</p>}
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
    </>
  );
};

export default ContactForm;
