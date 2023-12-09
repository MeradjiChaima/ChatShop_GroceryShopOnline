import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { connect } from "react-redux";
import { setUserData } from "../actions";
import ShoppingCartDialog from "./ShoppingCartDialog";

function Navbar({ userData, setUserData }) {
  const [cartDialogOpen, setCartDialogOpen] = useState(false);

  const handleOpenCartDialog = () => {
    setCartDialogOpen(true);
  };

  const handleCloseCartDialog = () => {
    setCartDialogOpen(false);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  //const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    setUserData(null);
  };
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUserData(userObject);
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "608315267969-v10sugfhblophvucuo9s1bhajv0tmjof.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("sighInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);
  return (
    <nav className="py-4 px-8 flex items-center justify-between">
      {/* Logo and Brand */}
      <div className="text-HardGreen text-lg font-bold flex justify-start space-x-2 items-center">
        <img src="logo.png" alt="logo" className="w-1/5" />
        <p>ChatShop</p>
      </div>

      {/* Hamburger Menu Button */}
      <div className={`md:hidden ${userData ? "hidden" : "sm:flex"}`}>
        <button
          onClick={toggleMenu}
          className="text-HardGreen focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}

      {!userData ? (
        <div
          className={`hidden md:flex space-x-4 justify-end items-center ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <a href="/Contacts" className="text-HardGreen">
            Contacts
          </a>
          <a href="/a-propos" className="text-HardGreen">
            A propos
          </a>
          <button className="bg-SoftGreen text-white px-4 py-2 rounded-xl">
            S'inscrire
          </button>
          <div className="google" id="sighInDiv"></div>
        </div>
      ) : (
        <div
          className={` md:flex space-x-4 justify-center items-center ${
            isMenuOpen ? "flex" : "flex"
          }`}
        >
          <p className="text-HardGreen">{userData.name}</p>
          <img
            src={userData.picture}
            alt="user"
            className="w-8 h-8 rounded-full"
          />
          <IconButton
            className="bg-SoftGreen text-white px-4 py-2 rounded-xl"
            onClick={handleOpenCartDialog}
          >
            <ShoppingCartIcon />
          </IconButton>

          <IconButton
            onClick={handleLogout}
            className="bg-SoftGreen text-white px-4 py-2 rounded-xl"
          >
            <LogoutIcon />
          </IconButton>
          <ShoppingCartDialog
            open={cartDialogOpen}
            onClose={handleCloseCartDialog}
          />
        </div>
      )}

      {/* Mobile Menu (Hidden on larger screens) */}
      {!userData && (
        <div className="md:hidden">
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 right-8 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col space-y-2 p-3">
              <a href="/Contacts" className="text-HardGreen p-2">
                Contacts
              </a>
              <a href="/a-propos" className="text-HardGreen p-2">
                A propos
              </a>
              <button className="bg-SoftGreen text-white px-4 py-2 rounded-xl">
                S'inscrire
              </button>
              <div className="google" id="sighInDiv"></div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

const mapStateToProps = (state) => ({
  userData: state.userData,
});

const mapDispatchToProps = {
  setUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
