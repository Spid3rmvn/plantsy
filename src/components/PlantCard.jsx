import { useState } from "react";
import { updatePlantPrice, deletePlant } from "../services/Api";

function PlantCard({ plant, onMarkSoldOut }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handleMarkSoldOut = () => {
    onMarkSoldOut(plant.id);
  };

  // Advanced deliverables
  const handleUpdatePrice = async () => {
    try {
      await updatePlantPrice(plant.id, parseFloat(newPrice));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      try {
        await deletePlant(plant.id);

        window.location.reload();
      } catch (error) {
        console.error("Error deleting plant:", error);
      }
    }
  };

  return (
    <div className={`plant-card ${plant.soldOut ? "sold-out" : ""}`}>
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>

      {isEditing ? (
        <div className="price-edit">
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handleUpdatePrice}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>${plant.price}</p>
      )}

      <div className="card-buttons">
        <button onClick={handleMarkSoldOut}>
          {plant.soldOut ? "In Stock" : "Sold Out"}
        </button>

        {/* Advanced deliverables */}
        <button onClick={() => setIsEditing(true)}>Edit Price</button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {plant.soldOut && <div className="sold-out-badge">Sold Out</div>}
    </div>
  );
}

export default PlantCard;
