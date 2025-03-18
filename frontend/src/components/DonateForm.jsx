import { useState } from "react";

const DonateFoodForm = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    location: "",
    donor: "",
    expiry: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.location || !formData.donor || !formData.expiry) {
      alert("All fields are required!");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData({ name: "", quantity: "", location: "", donor: "", expiry: "" });
      onBack();
    } catch (error) {
      console.error("Failed to submit food donation:", error);
      alert("Failed to submit food donation.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Donate Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Food Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="donor" placeholder="Your Name" value={formData.donor} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="expiry" type="date" value={formData.expiry} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
      </form>
      <button onClick={onBack} className="mt-4 w-full bg-gray-500 text-white p-2 rounded">Back</button>
    </div>
  );
};

export default DonateFoodForm;
