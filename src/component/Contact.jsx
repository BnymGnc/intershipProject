import "../css/Contact.css";
import React, { useState } from "react";

function Contact() {
  const [errors, setErrors] = useState({
    Name: "",
    Surname: "",
    Email: "",
    RepeatEmail: "",
    CountryCode: "",
    PhoneNumber: "",
    Country: "",
    City: "",
    Address: "",
    Zipcode: "",
    Checkbox: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (field, value) => {
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [field]: `${getLabel(field)} alanını doldurunuz.`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const getLabel = (field) => {
    switch (field) {
      case "RepeatEmail": return "Repeat E-mail";
      case "PhoneNumber": return "Phone Number";
      default: return field;
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (!e.target.checked) {
      setErrors((prev) => ({
        ...prev,
        Checkbox: "You should confirm participation.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, Checkbox: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = [
      "Name", "Surname", "Email", "RepeatEmail",
      "Country", "City", "Address", "Zipcode"
    ];

    let tempErrors = {};

    fields.forEach((field) => {
      const value = document.getElementById(field)?.value.trim();
      if (!value) {
        tempErrors[field] = `${getLabel(field)} alanını doldurunuz.`;
      }
    });

    const phoneValue = document.getElementById("PhoneNumber")?.value.trim();
    if (!phoneValue) {
      tempErrors.PhoneNumber = "Phone Number alanını doldurunuz.";
    } else if (phoneValue.length !== 10) {
      tempErrors.PhoneNumber = "Phone Number must be 10 digits.";
    }

    if (!isChecked) {
      tempErrors.Checkbox = "You must confirm participation.";
    }

    setErrors((prev) => ({ ...prev, ...tempErrors }));
  };

  const redStarStyle = { color: "red", marginLeft: "2px" };
  const inputStyle = {
    width: "450px",
    padding: "12px",
    fontSize: "14px",
    border: "1px solid rgba(83, 83, 83, 0.3)",
  };
  const errorStyle = {
    color: "red",
    fontSize: "12px",
    minHeight: "20px",
    marginTop: "4px",
    display: "block",
    overflow: "hidden",
    
  };
  const TableStyle = {
    marginLeft: "50px",
    border: "1px solid #bdbfbf",
    width: "1100px",
    borderCollapse: "separate",
    borderSpacing: "10px",
  };

  return (
    <>
      <h1 style={{ marginLeft: "50px" }}>Contact Information</h1>
      <form onSubmit={handleSubmit}>
        <table style={TableStyle}>
          <tbody>
            <tr>
              <td><label htmlFor="Name">Name<span style={redStarStyle}>*</span></label></td>
              <td><label htmlFor="Surname">Surname<span style={redStarStyle}>*</span></label></td>
            </tr>
            <tr>
              <td>
                <input id="Name" type="text" onChange={(e) => handleChange("Name", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.Name || "\u00A0"}</div>
              </td>
              <td>
                <input id="Surname" type="text" onChange={(e) => handleChange("Surname", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.Surname || "\u00A0"}</div>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="Email">E-mail<span style={redStarStyle}>*</span></label></td>
              <td><label htmlFor="RepeatEmail">Repeat E-mail<span style={redStarStyle}>*</span></label></td>
            </tr>
            <tr>
              <td>
                <input id="Email" type="email" onChange={(e) => handleChange("Email", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.Email || "\u00A0"}</div>
              </td>
              <td>
                <input id="RepeatEmail" type="email" onChange={(e) => handleChange("RepeatEmail", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.RepeatEmail || "\u00A0"}</div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="CountryCode">Country Code<span style={redStarStyle}>*</span></label>
                <label htmlFor="PhoneNumber" style={{ marginLeft: "20px" }}>Phone Number<span style={redStarStyle}>*</span></label>
              </td>
              <td><label htmlFor="Country">Country<span style={redStarStyle}>*</span></label></td>
            </tr>
            <tr>
              <td>
                <select id="CountryCode" onChange={(e) => handleChange("CountryCode", e.target.value)} style={{ ...inputStyle, width: "90px", marginRight: "10px" }} defaultValue="">
                  <option value="">Select</option>
                  <option value="+90">+90</option>
                  <option value="+80">+80</option>
                  <option value="+70">+70</option>
                </select>
                <input id="PhoneNumber" type="number" onChange={(e) => handleChange("PhoneNumber", e.target.value)} style={{ ...inputStyle, width: "350px" }} />
                <div style={errorStyle}>{errors.PhoneNumber || "\u00A0"}</div>
              </td>
              <td>
                <select id="Country" onChange={(e) => handleChange("Country", e.target.value)} style={{ ...inputStyle, width: "475px" }} defaultValue="">
                  <option value="">Select Country</option>
                  <option value="Turkey">Turkey</option>
                  <option value="USA">USA</option>
                  <option value="Germany">Germany</option>
                </select>
                <div style={errorStyle}>{errors.Country || "\u00A0"}</div>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="City">City<span style={redStarStyle}>*</span></label></td>
              <td><label htmlFor="Address">Address<span style={redStarStyle}>*</span></label></td>
            </tr>
            <tr>
              <td>
                <input id="City" type="text" onChange={(e) => handleChange("City", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.City || "\u00A0"}</div>
              </td>
              <td>
                <input id="Address" type="text" onChange={(e) => handleChange("Address", e.target.value)} style={inputStyle} />
                <div style={errorStyle}>{errors.Address || "\u00A0"}</div>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="Zipcode">Zipcode<span style={redStarStyle}>*</span></label></td>
              <td></td>
            </tr>
            <tr>
              <td>
                <input id="Zipcode" type="text" onChange={(e) => handleChange("Zipcode", e.target.value)} style={{ ...inputStyle, width: "250px" }} />
                <div style={errorStyle}>{errors.Zipcode || "\u00A0"}</div>
              </td>
              <td style={{ textAlign: "right" }}>
                <button type="submit" className="save-button">Save</button>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <label>
                  <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} style={{ marginRight: "8px" }} />
                  I am participating in the journey myself
                </label>
                <div style={errorStyle}>{errors.Checkbox || "\u00A0"}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default Contact;
