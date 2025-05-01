const API_URL = "http://localhost:6001";

export const fetchPlants = async () => {
  const response = await fetch(`${API_URL}/plants`);
  return response.json();
};

export const addPlant = async (plantData) => {
  const response = await fetch(`${API_URL}/plants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(plantData),
  });
  return response.json();
};

// Advanced deliverables
export const updatePlantPrice = async (id, price) => {
  const response = await fetch(`${API_URL}/plants/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price }),
  });
  return response.json();
};

export const deletePlant = async (id) => {
  await fetch(`${API_URL}/plants/${id}`, {
    method: "DELETE",
  });
  return {};
};
