import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Us</h2>

      <div className="form-group">
        <label>First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
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
              required
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
      </div>

      <div className="form-group">
        <label>Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
          />
          I consent to being contacted by the team *
        </label>
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default ContactForm;
// import './ContactForm.css';
// function Form() {
//     function handleOnFormSubmit(event){
// event.PreventDefault();
// console.log(fistname)
//     }
//     return(
//         <main>
//         <form id="contact-form" onSubmit={handleOnFormSubmit}>
//             <h1>Contact Us</h1>
            
//             <div className="form-group">
//                 <label htmlFor="first-name">First Name *</label>
//                 <input type="text" id="first-name" name="first-name" required/>
//             </div>
            
//             <div className="form-group">
//                 <label htmlFor="last-name">Last Name *</label>
//                 <input type="text" id="last-name" name="last-name" required/>
//             </div>
            
//             <div className="form-group">
//                 <label htmlFor="email">Email Address *</label>
//                 <input type="email" id="email" name="email" required/>
//             </div>
            
//             <div className="form-group">
//                 <label>Query Type *</label>
//                 <div className="radio-group">
//                     <label>
//                         <input type="radio" name="query-type" value="general-enquiry" required/>
//                         General Enquiry
//                     </label>
//                     <label>
//                         <input type="radio" name="query-type" value="support-request" required/>
//                         Support Request
//                     </label>
//                 </div>
//             </div>
            
//             <div className="form-group">
//                 <label htmlFor="message">Message *</label>
//                 <textarea id="message" name="message" required></textarea>
//             </div>
            
//             <div className="form-group checkbox-group">
//                 <label>
//                     <input type="checkbox" name="consent" required/>
//                     I consent to being contacted by the team *
//                 </label>
//             </div>
            
//             <button type="submit">Submit</button>
//         </form>
//     </main>
//     )
// }   

// export default Form;