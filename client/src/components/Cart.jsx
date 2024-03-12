import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider"
import axios from "axios"
import Swal from "sweetalert2"



const Cart = () => {
    const [cartData, setCartData] = useState([]);
    const [increaseTrigger, setIncreaseTrigger] = useState(0);
    const [decreaseTrigger, setDecreaseTrigger] = useState(0);
    const { user } = useContext(AuthContext);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await axios.get(`http://localhost:5000/carts/${user.email}`);
        if (resp.status !== 200) {
          console.log(resp.data);
        } else {
          setCartData(resp.data);
        }
      };
      fetchData();
    }, []);
    useEffect(() => {
      const fetchData = async () => {
        const resp = await axios.get(`http://localhost:5000/carts/${user.email}`);
        if (resp.status !== 200) {
          console.log(resp.data);
        } else {
          setCartData(resp.data);
        }
      };
      fetchData();
    }, [increaseTrigger, decreaseTrigger]);
    useEffect(() => {
      let totalPrice = 0;
      cartData.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
      setTotalPrice(totalPrice);
    }, [cartData]);
  
    const handleCartDelete = async (cartId) => {
      const resp = await axios.delete(`http://localhost:5000/carts/${cartId}`);
      if (resp.status !== 200) {
        console.log(resp.data);
      } else {
        Swal.fire({
          title: `Deleted ${cartId}`,
          position: "center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    };
  
    const handleIncrease = async (cartId, quantity) => {
      const resp = await axios.put(`http://localhost:5000/carts/${cartId}`, {
        quantity: quantity + 1,
      });
      if (resp.status !== 200) {
        console.log(resp.data);
      } else {
        setDecreaseTrigger(resp.data.quantity);
      }
    };
  
    const handleDecrease = async (cartId, quantity) => {
      const resp = await axios.put(`http://localhost:5000/carts/${cartId}`, {
        quantity: quantity - 1,
      });
      if (resp.status !== 200) {
        console.log(resp.data);
      } else {
        setIncreaseTrigger(resp.data.quantity);
      }
    };
    return (
      <div className="container mx-auto w-10/12 overflow-x-auto mt-44">
        <div className="font-bold text-center text-5xl mb-32">
          <span>
            Items Added to The <span className="text-red">Cart</span>
          </span>
        </div>
        <table className="table border-b">
          {/* head */}
          <thead>
            <tr className="bg-red text-white">
              <th>#</th>
              <th>Product</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price Per Unit</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((cart, index) => (
              <tr>
                <th>{index + 1} </th>
                <td>
                  <div className="w-12 h-12 ">
                    <img
                      src={cart.image ? cart.image : "/logo.png"}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </td>
                <td>{cart.name}</td>
                <td>
                  <div className="flex space-x-5 items-center">
                    <div>
                      <button
                        onClick={() => handleDecrease(cart._id, cart.quantity)}
                        className="py-1.5 px-3 bg-base-200 rounded-lg"
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <p>{cart.quantity}</p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleIncrease(cart._id, cart.quantity)}
                        className="py-1.5 px-3 bg-base-200 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </td>
                <td>{cart.price} ฿</td>
                <td>{(cart.price * cart.quantity).toFixed(3)} ฿</td>
                <td>
                  <button onClick={() => handleCartDelete(cart._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#820009"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-24 mb-24 flex justify-around items-center">
          <div className="flex flex-col space-y-2">
            <span className="font-bold">Customer Details</span>
            <span>Name:{user.displayName}</span>
            <span>Email:{user.email}</span>
            <span>User_id:{user.uid}</span>
          </div>
          <div className="flex flex-col space-y-2">
            <span>Shopping Details</span>
            <span>Total Items:{cartData.length}</span>
            <span>Total Price:{totalPrice.toFixed(3)}</span>
            <button className="btn bg-red text-white">
              Proceed to Checkout{" "}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Cart;