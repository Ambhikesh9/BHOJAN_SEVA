//donate
import React, { useState } from "react";
import { Store, PlusCircle, Trash } from "lucide-react";

const DonateForm = ({ onBack }) => {
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    contact: "",
    address: "",
  });

  const [foodItems, setFoodItems] = useState([
    { name: "", quantity: "", isVeg: null, serves: "", consumeWithin: "" },
  ]);

  const handleChange = (index, e) => {
    const { name, value, checked } = e.target;
    const updatedItems = [...foodItems];

    if (name === "isVeg") {
      updatedItems[index].isVeg = checked ? true : null;
    } else if (name === "isNonVeg") {
      updatedItems[index].isVeg = checked ? false : null;
    } else {
      updatedItems[index][name] = value;
    }

    setFoodItems(updatedItems);
  };

  const handleDonorChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo({ ...donorInfo, [name]: value });
  };

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { name: "", quantity: "", isVeg: null, serves: "", consumeWithin: "" },
    ]);
  };

  const removeFoodItem = (index) => {
    setFoodItems(foodItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check
    const isValid = foodItems.every((item) => item.isVeg !== null && item.consumeWithin);
    if (!isValid || !donorInfo.name || !donorInfo.contact || !donorInfo.address) {
      alert("Please fill out all required fields.");
      return;
    }

    const donationData = {
      donorInfo,
      foodItems: foodItems.map((item) => ({
        name: item.name,
        quantity: parseInt(item.quantity), // Ensure number format
        isVeg: item.isVeg,
        serves: parseInt(item.serves),
        consumeWithin: parseInt(item.consumeWithin),
      })),
    };

    try {
      const response = await fetch("http://localhost:5000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit donation");
      }

      alert("Food donation submitted successfully!");

      // Reset form after successful submission
      setFoodItems([{ name: "", quantity: "", isVeg: null, serves: "", consumeWithin: "" }]);
      setDonorInfo({ name: "", contact: "", address: "" });

      onBack(); // Navigate back to ReceiveFood
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Error submitting donation. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold text-[#8b5a2b] flex items-center mb-4">
        <Store className="h-6 w-6 mr-2" /> List Your Surplus Food
      </h2>

      {/* Donor Information */}
      <div className="border p-4 rounded shadow mb-4">
        <h3 className="text-md font-semibold mb-2">Donor Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={donorInfo.name}
          onChange={handleDonorChange}
          className="w-full border p-2 rounded text-sm mb-2"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={donorInfo.contact}
          onChange={handleDonorChange}
          className="w-full border p-2 rounded text-sm mb-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={donorInfo.address}
          onChange={handleDonorChange}
          className="w-full border p-2 rounded text-sm"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {foodItems.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={item.name}
              onChange={(e) => handleChange(index, e)}
              className="w-full border p-2 rounded text-sm"
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity (in kg/ltr)"
              value={item.quantity}
              onChange={(e) => handleChange(index, e)}
              className="w-full border p-2 rounded text-sm"
              required
            />
            <input
              type="number"
              name="serves"
              placeholder="Sufficient for how many people?"
              value={item.serves}
              onChange={(e) => handleChange(index, e)}
              className="w-full border p-2 rounded text-sm"
              required
            />
            <div className="flex items-center space-x-4 text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={item.isVeg === true}
                  onChange={(e) => handleChange(index, e)}
                  className="mr-2"
                />
                Veg
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNonVeg"
                  checked={item.isVeg === false}
                  onChange={(e) => handleChange(index, e)}
                  className="mr-2"
                />
                Non-Veg
              </label>
            </div>

            <input
              type="number"
              name="consumeWithin"
              placeholder="Safe to consume within (hours)"
              value={item.consumeWithin}
              onChange={(e) => handleChange(index, e)}
              className="w-full border p-2 rounded text-sm mt-2"
              min="1"
              required
            />

            {index > 0 && (
              <button
                type="button"
                onClick={() => removeFoodItem(index)}
                className="mt-2 text-red-500 flex items-center text-sm"
              >
                <Trash className="h-4 w-4 mr-1" /> Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addFoodItem}
          className="w-full bg-green-500 text-white py-2 rounded flex items-center justify-center text-sm"
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add More Food
        </button>

        <button type="submit" className="w-full bg-[#8b5a2b] text-white py-2 rounded hover:bg-[#6d4520] text-sm">
          Submit
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full bg-gray-400 text-white py-2 rounded mt-2 hover:bg-gray-500 text-sm"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default DonateForm;