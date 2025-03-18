const ReceiveFood = ({ onBack, foodItems }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Available Food Donations</h2>
      {foodItems.length === 0 ? (
        <p className="text-gray-600">No food donations available.</p>
      ) : (
        <ul className="space-y-4">
          {foodItems.map((item) => (
            <li key={item.id} className="p-4 border rounded shadow-sm">
              <p><strong>Food:</strong> {item.name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Donor:</strong> {item.donor}</p>
              <p><strong>Expiry:</strong> {item.expiry}</p>
            </li>
          ))}
        </ul>
      )}
      <button onClick={onBack} className="mt-4 w-full bg-gray-500 text-white p-2 rounded">Back</button>
    </div>
  );
};

export default ReceiveFood;
