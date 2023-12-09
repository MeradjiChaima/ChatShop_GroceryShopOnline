import React from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Twitter, Facebook, Instagram } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();

  const redirectToShops = (value) => {
    navigate(`/shops`);
  };

  return (
    <div className="flex justify-between items-end">
      <div className="flex-1 text-center w-1/3">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-HardGreen leading-snug mb-10">
            Des saveurs
            <span className="bg-HardGreen rounded-lg text-HardOrange transform -rotate-[-8deg] inline-block px-2 m-2">
              authentiques
            </span>
            , une expérience sans tracas , votre épicerie en
            <span className="bg-HardGreen rounded-lg text-HardOrange transform -rotate-[8deg] inline-block px-2 m-2">
              un clic{" "}
            </span>
          </h1>

          <p className="text-lg text-HardGreen leading-snug">
            Réinventez votre façon de faire vos courses alimentaires en ligne
            avec <span className="font-bold">ChatShop</span>{" "}
          </p>
        </div>
        <button
          className="bg-HardOrange text-HardGreen rounded-xl px-6 py-3 font-bold"
          onClick={redirectToShops}
        >
          Commandez Maintenant !
        </button>
        <div className="flex justify-center mt-4">
          <IconButton
            style={{
              color: "#4B6657",
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            style={{
              color: "#4B6657",
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            style={{
              color: "#4B6657",
            }}
          >
            <Instagram />
          </IconButton>
        </div>
      </div>
      <div className="flex-1 w-2/3 justify-end items-end">
        <img src="image.png" alt="Grocery" className="w-full" />
      </div>
    </div>
  );
};

export default Header;
