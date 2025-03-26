import React, { useState } from "react";

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with Name: ${formData.name} and Email: ${formData.email}`);
    setFormData({ name: "", email: "" });
  };

  const handleClear = () => {
    setFormData({ name: "", email: "" });
  };

  const isFormFilled = formData.name !== "" || formData.email !== "";

  return (
    <div style={{ maxWidth: "300px", margin: "20px auto", textAlign: "left" }}>
      <h3 style={{ marginTop: "40px" }}>Newsletter</h3> {/* Added margin-top to create space */}
      <form onSubmit={handleSubmit}>
        <label style={{ color: "#ffffff" }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "5px", color: "#1C478E", backgroundColor: "#ffffff" }}
        />
        <label style={{ color: "#ffffff" }}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px", padding: "5px", color: "#1C478E", backgroundColor: "#ffffff" }}
        />
        <button type="submit" style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#ffffff", color: "#1C478E" }}>Send</button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: "5px 10px",
            backgroundColor: isFormFilled ? "#ffffff" : "#1C478E",
            color: isFormFilled ? "#1C478E" : "#ffffff",
            cursor: isFormFilled ? "pointer" : "not-allowed",
          }}
          disabled={!isFormFilled}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;

