import React, { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import "../main.css";
const getData = () => {
  return fetch(`https://overstock-clone-akash.herokuapp.com/products`).then(
    (res) => res.json()
  );
};
function DetailsPage() {
  const [slides, setSlide] = useState([]);
  const [data, setData] = useState({});
  useEffect(() => {
    getData().then((res) => {
      setData(res[0]);
      setSlide(res[0].thumbnails[0]);
      console.log(res);
    });
  }, []);
  const style_main = {
    display: "flex",
    width: "70%",
    margin: "0 20% 0 10%",
  };

  const cont1 = {
    width: "50%",
    height: "450px",
  };

  const cont2 = {
    width: "48%",
  };

  const image = {
    width: "90%",
    height: "450px",
  };

  const name = {
    fontSize: "20px",
    textAlign: "left",
  };

  const upper = {
    fontSize: "10px",
  };

  const quantity = {
    width: "225px",
    padding: "7px",
    border: "1px solid cream",
  };

  const cartBtn = {
    width: "225px",
    padding: "7px",
  };

  const buttons = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "40px",
  };

  const details_main = {
    width: "70%",
    margin: "2% 20% 0 10%",
  };
  const details = {
    width: "48%",
  };

  return (
    <>
      <div style={style_main}>
        <div style={cont1}>
          <ImageSlider slides={slides} />
        </div>
        {console.log(data)}
        <div style={cont2}>
          <p style={name}>{data?.title}</p>
          <p style={name}>{Number(data.rating).toFixed(1)} / 5⭐</p>
          <p style={name}>
            Starting at <sup style={upper}>INR</sup> {data.price}
            <sup style={upper}>00</sup>
          </p>
          <div style={buttons}>
            <select name="" id="" style={quantity} className="itemQuantity">
              <option value="1">Quantity 1</option>
              <option value="2">Quantity 2</option>
              <option value="3">Quantity 3</option>
              <option value="4">Quantity 4</option>
              <option value="5">Quantity 5</option>
            </select>
            <button style={cartBtn} className="cartBtn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div style={details_main}>
        <div style={details}>
          <h2>Deatils:</h2> Take home renovations into your own hands with
          Fasade Backsplash. Fasade Backsplash tiles are lightweight, flexible
          and easy to install, allowing even the most novice DIY-ers to create
          beautiful and luxurious spaces in their homes! Waterproof, rust-proof
          and mold-proof, our products are created with you in mind. Our vinyl
          finishes allow quick cleanup for even the toughest messes, simply wipe
          clean with warm, soapy water and soft cloth. You'll be grateful you
          chose Fasade, even years down the road!
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
