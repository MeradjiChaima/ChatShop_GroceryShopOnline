import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../CartManipulation/cartSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ShoppingCartDialog = ({ open, onClose }) => {
  const cart = useSelector(selectCart);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Shopping Cart</DialogTitle>
      <DialogContent>
        {cart &&
          cart.products &&
          cart.products.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
            </div>
          ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button color="primary">Confirm Order</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShoppingCartDialog;
