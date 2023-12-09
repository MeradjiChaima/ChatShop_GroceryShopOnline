import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Navbar from "../Components/Navbar";
import axios from "axios";
function GroceryShopList() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/shops/`)
      .then((response) => {
        setShops(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [wilayas, setWilayas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("wilaya.json")
      .then((response) => response.json())
      .then((data) => {
        setWilayas(data);
      })
      .catch((error) => console.error("Error fetching wilaya.json:", error));
  }, []);

  useEffect(() => {
    fetch("commune.json")
      .then((response) => response.json())
      .then((data) => {
        setCommunes(data);
      })
      .catch((error) => console.error("Error fetching commune.json:", error));
  }, []);
  console.log("wilaya:", wilayas, "commune", communes);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const handleWilayaChange = (event) => {
    setSelectedWilaya(event.target.value);
    setSelectedCommune(""); // Réinitialiser la commune lors du changement de la wilaya
  };

  const handleCommuneChange = (event) => {
    setSelectedCommune(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredGroceries = shops.filter((grocery) => {
    const wilayaMatches =
      selectedWilaya === "" || grocery.wilaya === selectedWilaya;
    const communeMatches =
      selectedCommune === "" || grocery.commune === selectedCommune;
    const nameMatches =
      searchTerm === "" ||
      grocery.name.toLowerCase().includes(searchTerm.toLowerCase());

    return wilayaMatches && communeMatches && nameMatches;
  });
  return (
    <>
      <Navbar />
      <div className="flex items-center space-x-4 justify-center w-full">
        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Rechercher un magasin..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded-md outline-none"
        />

        {/* Menu déroulant pour la wilaya */}
        <select
          value={selectedWilaya}
          onChange={handleWilayaChange}
          className="border p-2 rounded-md outline-none"
        >
          {wilayas.map((wilaya) => (
            <option key={wilaya.value} value={wilaya.value}>
              {wilaya.label}
            </option>
          ))}
        </select>

        {/* Menu déroulant pour la commune */}
        <select
          value={selectedCommune}
          onChange={handleCommuneChange}
          className="border p-2 rounded-md outline-none"
        >
          {communes[selectedWilaya]?.map((commune) => (
            <option key={commune.value} value={commune.value}>
              {commune.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap lg:gap-4 md:gap-2 p-3 justify-center w-full">
        {filteredGroceries.map((grocery) => (
          <div className="flex flex-col justify-center  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-2/6 shadow-lg bg-white rounded-2xl">
            <Link
              key={grocery.id}
              to={`/shops/${grocery.idshop}`}
              classname=" relative z-10"
            >
              <img
                src={grocery.picture}
                alt={grocery.name}
                className="w-full h-2/4"
              />
              <h2 className="text-HardOrange m-1 font-bold text-xl">
                {grocery.name}
              </h2>
              <div className="flex flex-row justify-between items-center">
                <Rating
                  size="small"
                  name="text-feedback"
                  value={grocery.appreciations}
                  readOnly
                  precision={0.5}
                  emptyIcon={<StarIcon fontSize="small" />}
                />
                <p className="text-HardGreen m-1">{grocery.appreciations}</p>
              </div>
              <p className="text-HardGreen m-1">{grocery.adresse}</p>
              <p className="text-HardGreen m-1">{grocery.workTime}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default GroceryShopList;
