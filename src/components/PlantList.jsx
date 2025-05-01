import PlantCard from "./PlantCard";

function PlantList({ plants, onMarkSoldOut }) {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onMarkSoldOut={onMarkSoldOut} />
      ))}
    </div>
  );
}

export default PlantList;
