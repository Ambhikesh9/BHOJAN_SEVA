//app
import React, { useState, useEffect } from "react";
import { Utensils, Heart, Users } from "lucide-react";
import DonateFoodForm from "./components/DonateForm";
import ReceiveFood from "./components/ReceiveFood";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [foodItems, setFoodItems] = useState([]);

  // Fetch food donations from MongoDB on mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/food");
        const data = await res.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  // Handle food submission
  const handleFoodSubmit = async (foodItem) => {
    try {
      const res = await fetch("http://localhost:5000/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodItem),
      });

      if (res.ok) {
        const newFoodItem = await res.json();
        setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
        setCurrentPage("receive");
      } else {
        alert("Failed to submit food donation.");
      }
    } catch (error) {
      console.error("Error submitting food item:", error);
      alert("Error submitting food donation.");
    }
  };

  // Render the appropriate page
  const renderPage = () => {
    switch (currentPage) {
      case "donate":
        return <DonateFoodForm onBack={() => setCurrentPage("home")} onSubmit={handleFoodSubmit} />;
      case "receive":
        return <ReceiveFood onBack={() => setCurrentPage("home")} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <Utensils className="w-12 h-12 text-green-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-800">BhojanSeva</h1>
              </div>
              <p className="text-xl text-gray-600">
                Join our mission to reduce food waste and help those in need.
                Connect surplus food with those who need it most.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => setCurrentPage("donate")}
                className="bg-[#f5f5dc] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Donate Food</h2>
                <p className="text-gray-600">Share your excess food with those who need it</p>
              </button>

              <button
                onClick={() => setCurrentPage("receive")}
                className="bg-[#f5f5dc] p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Receive Food</h2>
                <p className="text-gray-600">Find available food donations near you</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="min-h-screen bg-[#f8f8e8]">{renderPage()}</div>;
};

export default App;