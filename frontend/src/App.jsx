import React, { useState, useEffect } from "react";
import { Utensils, Heart, Users } from "lucide-react";
import DonateFoodForm from "./components/DonateForm";
import ReceiveFood from "./components/ReceiveFood";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/food")
      .then((res) => res.json())
      .then((data) => setFoodItems(data))
      .catch((err) => console.error(err));
  }, []);

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

  const renderPage = () => {
    switch (currentPage) {
      case "donate":
        return <DonateFoodForm onBack={() => setCurrentPage("home")} onSubmit={handleFoodSubmit} />;
      case "receive":
        return <ReceiveFood onBack={() => setCurrentPage("home")} foodItems={foodItems} />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center mb-12">
              <div className="flex justify-center items-center mb-4">
                <Utensils className="w-12 h-12 text-green-600 mr-3" />
                <h1 className="text-4xl font-bold text-gray-800">Bhojan Seva</h1>
              </div>
              <p className="text-xl text-gray-600">
                Join our mission to reduce food waste and help those in need.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <button onClick={() => setCurrentPage("donate")} className="bg-[#f5f5dc] p-8 rounded-lg shadow-lg">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Donate Food</h2>
              </button>
              <button onClick={() => setCurrentPage("receive")} className="bg-[#f5f5dc] p-8 rounded-lg shadow-lg">
                <Users className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Receive Food</h2>
              </button>
            </div>
          </div>
        );
    }
  };

  return <div className="min-h-screen bg-[#f8f8e8]">{renderPage()}</div>;
};

export default App;
