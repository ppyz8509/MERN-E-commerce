import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCart from "../../hook/useCart";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItem, setCartItems] = useState([]);
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const calculateTotalPrice = (item) => item.price * item.quantity;
  // const calculateTotal = () => {
  //   let total = 0;
  //   cart.map((item) => {
  //     total += calculateTotalPrice(item);
  //   });
  //   return total;
  // };
  const calculateTotal = () =>
    cart.reduce((total, item) => total + calculateTotalPrice(item), 0);

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          "http://localhost:5000/carts/" + item._id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );
        if (response.ok) {
          const updatedCart = cartItem.map((cartItem) => {
            if (cartItem.id === item.id) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.log("Failed to update quantity");
        }
      } catch (error) {
        console.log("Error updating qunatity:", error);
      }
    }
  };
  const handleIncrease = async (item) => {
    try {
      const response = await fetch("http://localhost:5000/carts/" + item._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });
      if (response.ok) {
        const updatedCart = cartItem.map((cartItem) => {
          if (cartItem.id === item.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.log("Failed to update quantity");
      }
    } catch (error) {
      console.log("Error updating qunatity:", error);
    }
  };
  const handleDelete = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      position: "center",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5000/carts/" + item._id)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "You product has been deleted",
                icon: "success",
              });
            }
          });
      }
    });
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col item center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-red">Cart</span>
            </h2>
          </div>
        </div>
      </div>
      {cart.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity Color</th>
                <th>Price Per Unit</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Item */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="avatar">
                      <div className="mask-squiecle w-12 rounded-full">
                        <img src={item.image} />
                      </div>
                    </div>
                  </td>
                  <td className="text-start">{item.name}</td>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleDecrease(item)}
                      style={{ marginRight: "5px" }}
                    >
                      {"-"}
                    </button>
                    <td>{item.quantity}</td>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleIncrease(item)}
                      style={{ marginLeft: "5px" }}
                    >
                      {"+"}
                    </button>
                  </div>
                  <td>{item.price}</td>
                  <td>{calculateTotalPrice(item)}</td>
                  <td>
                    <button
                      className="btn btn-sm border-none text-red bg-transparent"
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>Totle:{calculateTotal()}</div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>cart is empty. Please add products.</p>
          <Link to="/shop">
            <button className="btn bg-red text-white mt-3">Back to Shop</button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
