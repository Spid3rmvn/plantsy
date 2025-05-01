import { useState, useEffect } from "react";
import PlantList from "./components/PlantList";
import NewPlantForm from "./components/NewPlantForm";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import { fetchPlants, addPlant } from "./services/Api";
import "./App.css";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPlants = async () => {
      const plantsData = await fetchPlants();
      setPlants(plantsData);
    };
    getPlants();
  }, []);

  const handleAddPlant = async (newPlant) => {
    const addedPlant = await addPlant(newPlant);
    setPlants([...plants, addedPlant]);
  };

  const handleMarkSoldOut = (id) => {
    setPlants(
      plants.map((plant) =>
        plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
      )
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList plants={filteredPlants} onMarkSoldOut={handleMarkSoldOut} />
    </div>
  );
}

export default App;
