import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { connect } from "react-redux";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AddToCartDialog from "../Components/AddToCartDialog";
import { useDispatch } from "react-redux";
import { addToCart } from "../CartManipulation/cartSlice";

function ShopDetails({ userData }) {
  const dispatch = useDispatch();
  const { shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [moreThanPrice, setMoreThanPrice] = useState("");
  const [lessThanPrice, setLessThanPrice] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleMoreThanPriceChange = (event) => {
    setMoreThanPrice(event.target.value);
  };

  const handleLessThanPriceChange = (event) => {
    setLessThanPrice(event.target.value);
  };
  const handleBrandChange = (event) => {
    setBrandFilter(event.target.value);
  };
  const filteredProducts = products.filter((product) => {
    const nameMatches = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatches =
      !categoryFilter || product.category === categoryFilter;
    const priceMatches =
      !priceFilter ||
      (priceFilter === "more" ? product.price > 50 : product.price <= 50);
    const brandMatches =
      !brandFilter ||
      product.brand.toLowerCase().includes(brandFilter.toLowerCase());
    const moreThanPriceMatches =
      !moreThanPrice ||
      (Number.isNaN(Number(moreThanPrice))
        ? true
        : product.price > parseFloat(moreThanPrice));

    const lessThanPriceMatches =
      !lessThanPrice ||
      (Number.isNaN(Number(lessThanPrice))
        ? true
        : product.price <= parseFloat(lessThanPrice));

    return (
      nameMatches &&
      categoryMatches &&
      priceMatches &&
      brandMatches &&
      moreThanPriceMatches &&
      lessThanPriceMatches
    );
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const parsedShopId = parseInt(shopId, 10);

        if (!isNaN(parsedShopId)) {
          const response = await axios.get(
            `http://localhost:5000/products/${parsedShopId}`
          );
          setProducts(response.data);
        } else {
          console.error("Invalid shopId:", shopId);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [shopId]);

  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-col sm:flex-row gap-1 p-1">
          <div className="flex flex-col mb-2 sm:mb-0">
            <label className="text-gray-700">
              Prix plus de :
              <input
                type="text"
                value={moreThanPrice}
                onChange={handleMoreThanPriceChange}
                className="mt-1 p-1 border rounded-md w-1/5 outline-none"
              />
            </label>
          </div>
          <div className="flex flex-col mb-2 sm:mb-0">
            <label className="text-gray-700">
              Prix moins de:
              <input
                type="text"
                value={lessThanPrice}
                onChange={handleLessThanPriceChange}
                className="mt-1 p-1 border rounded-md w-1/5 outline-none"
              />
            </label>
          </div>
          <div className="flex flex-col mb-2 sm:mb-0">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 p-1 border rounded-md outline-none"
              placeholder="Rechercher produit ..."
            />
          </div>
          <div className="flex flex-col mb-2 sm:mb-0">
            <select
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="mt-1 p-1 border rounded-md outline-none"
            >
              <option value="">Tous les catégories .. </option>
              <option value="fruits">Fruits</option>
              <option value="fruits">Epices</option>
            </select>
          </div>
          <div className="flex flex-col mb-2 sm:mb-0">
            <input
              type="text"
              value={brandFilter}
              onChange={handleBrandChange}
              className="mt-1 p-1 border rounded-md  outline-none"
              placeholder="Rechercher marque ..."
            />
          </div>
        </div>

        <h3>Produits :</h3>
        <div className="flex flex-wrap gap-4 p-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-center  sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-2/6 shadow-lg bg-white rounded-2xl "
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-2/4"
              />
              <h4 className="text-HardOrange m-1 font-bold text-xl">
                {product.name}
              </h4>
              <p className="text-HardGreen m-1">Prix:{product.price} DZD</p>
              <p className="text-HardGreen m-1">Marque: {product.brand}</p>
              {userData && (
                <p className="text-end text-HardOrange ">
                  <IconButton
                    className=" text-HardOrange "
                    onClick={() => handleOpenDialog(product)}
                  >
                    <AddBoxIcon />
                  </IconButton>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddToCartDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        productInfo={selectedProduct}
        addToCart={handleAddToCart}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

export default connect(mapStateToProps)(ShopDetails);
