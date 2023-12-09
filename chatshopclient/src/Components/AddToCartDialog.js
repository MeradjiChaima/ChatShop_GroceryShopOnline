import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const AddToCartDialog = ({ open, handleClose, productInfo, addToCart }) => {
  const handleConfirm = () => {
    addToCart(productInfo);
    handleClose();
  };
  console.log(productInfo);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add to Cart Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {productInfo && productInfo.name
            ? `Do you want to add ${productInfo.name} to your shopping cart?`
            : "Product information is missing."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Non</Button>
        <Button onClick={handleConfirm}>Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCartDialog;
