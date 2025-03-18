import React, { useState } from "react";

const ReceiveFood = ({ onBack, foodItems }) => {
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [requestDetails, setRequestDetails] = useState([]);

  const handleRequest = (foodGroup) => {
    setSelectedFood(foodGroup);
    setRequestDetails(foodGroup.foodList.map((food) => ({ name: food.name, quantity: "" })));
    setIsRequestOpen(true);
  };

  const handleChange = (index, e) => {
    const updatedRequests = [...requestDetails];
    updatedRequests[index].quantity = e.target.value;
    setRequestDetails(updatedRequests);
  };

  const handleSubmitRequest = () => {
    console.log("Requested Items:", requestDetails);
    alert("Request submitted successfully!");
    setIsRequestOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#8b5a2b] mb-4">Available Food Donations</h2>

      {foodItems.length === 0 ? (
        <p className="text-gray-600">No food donations available yet.</p>
      ) : (
        <ul className="space-y-4">
          {foodItems.map((foodGroup, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">Donation {index + 1}</h3>

              {/* Donor Information */}
              <div className="mb-3 p-3 bg-gray-100 rounded">
                <p><strong>Donor:</strong> {foodGroup.donorInfo.name}</p>
                <p><strong>Contact:</strong> {foodGroup.donorInfo.contact}</p>
                <p><strong>Address:</strong> {foodGroup.donorInfo.address}</p>
              </div>

              {foodGroup.foodList.map((food, i) => (
                <div key={i} className="border-b pb-2 mb-2">
                  <p><strong>Food:</strong> {food.name}</p>
                  <p><strong>Quantity:</strong> {food.quantity}</p>
                  <p><strong>Serves:</strong> {food.serves} people</p>
                  <p><strong>Type:</strong> {food.isVeg ? "Veg" : "Non-Veg"}</p>
                  <p><strong>Consume Within:</strong> {food.consumeWithin} hours</p>
                </div>
              ))}
              <button 
                onClick={() => handleRequest(foodGroup)} 
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Request
              </button>
            </li>
          ))}
        </ul>
      )}

      <button onClick={onBack} className="w-full bg-gray-400 text-white py-2 rounded mt-4 hover:bg-gray-500">Back</button>

      {isRequestOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Request Food Items</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitRequest(); }} className="space-y-4">
              {requestDetails.map((item, index) => (
                <div key={index} className="border p-3 rounded shadow">
                  <p><strong>Food:</strong> {item.name}</p>
                  <input
                    type="text"
                    name="quantity"
                    placeholder="Enter quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border p-2 rounded mt-1"
                  />
                </div>
              ))}
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Submit Request</button>
              <button type="button" onClick={() => setIsRequestOpen(false)} className="w-full bg-gray-400 text-white py-2 rounded mt-2 hover:bg-gray-500">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveFood;
