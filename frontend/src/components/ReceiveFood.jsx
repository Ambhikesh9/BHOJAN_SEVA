//receive
import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

const ReceiveFood = ({ onBack }) => {
  const [foodDonations, setFoodDonations] = useState([]);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [requestDetails, setRequestDetails] = useState([]);

  useEffect(() => {
    // Fetch food donations from MongoDB
    fetch("http://localhost:5000/food")
      .then((response) => response.json())
      .then((data) => setFoodDonations(data))
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);

  const handleRequest = (foodGroup) => {
    setSelectedFood(foodGroup);
    setRequestDetails(
      foodGroup.foodItems.map((food) => ({ name: food.name, quantity: "" }))
    );
    setIsRequestOpen(true);
  };

  const handleChange = (index, e) => {
    const updatedRequests = [...requestDetails];
    updatedRequests[index].quantity = e.target.value;
    setRequestDetails(updatedRequests);
  };

  const handleSubmitRequest = () => {
    alert("Food request submitted successfully!");
    setIsRequestOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold text-[#8b5a2b] flex items-center mb-4">
        <ShoppingBag className="h-6 w-6 mr-2" /> Available Food Donations
      </h2>

      {foodDonations.length === 0 ? (
        <p className="text-gray-600 text-center">No food donations available yet.</p>
      ) : (
        <div className="space-y-4">
          {foodDonations.map((donation, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="text-md font-semibold text-[#8b5a2b] mb-2">
                Donation {index + 1}
              </h3>
              <p>
                <strong>Donor:</strong> {donation.name}
              </p>
              <p>
                <strong>Contact:</strong> {donation.contact}
              </p>
              <p>
                <strong>Address:</strong> {donation.address}
              </p>
              <div className="mt-2">
                {donation.foodItems.map((food, i) => (
                  <div key={i} className="border-b pb-2 mb-2">
                    <p>
                      <strong>Food:</strong> {food.name}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {food.quantity}
                    </p>
                    <p>
                      <strong>Serves:</strong> {food.serves} people
                    </p>
                    <p>
                      <strong>Type:</strong> {food.isVeg ? "Veg" : "Non-Veg"}
                    </p>
                    <p>
                      <strong>Consume within:</strong> {food.consumeWithin} hours
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleRequest(donation)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
              >
                Request Food
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onBack}
        className="w-full bg-gray-400 text-white py-2 rounded mt-4 hover:bg-gray-500 text-sm"
      >
        Back
      </button>

      {isRequestOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Request Food Items</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitRequest();
              }}
              className="space-y-4"
            >
              {requestDetails.map((item, index) => (
                <div key={index} className="border p-3 rounded shadow">
                  <p>
                    <strong>Food:</strong> {item.name}
                  </p>
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
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setIsRequestOpen(false)}
                className="w-full bg-gray-400 text-white py-2 rounded mt-2 hover:bg-gray-500"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveFood;