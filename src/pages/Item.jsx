import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartQuantity, originalProducts } from "../atoms/modalAtoms";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [ratingArray, setRatingArray] = useState([]);
  const [addHalf, setAddHalf] = useState(false);
  const [cartAmount, setCartAmount] = useRecoilState(cartQuantity);
  const [pressedAdd, setPressedAdd] = useState(false);
  const [loading, setLaoding] = useState(true);
  const navigate = useNavigate();

  async function getItem() {
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setItem(data);
    setRatingArray(Array(Math.floor(data.rating.rate)).fill(0));
    if (Math.floor(data.rating.rate) < data.rating.rate) {
      setAddHalf(true);
    }
    setLaoding(false);
  }

  function cartFunction() {
    if (pressedAdd) {
      navigate("/cart");
    } else {
      setCartAmount((prevCart) => prevCart + 1);
      setPressedAdd(true);
    }
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <div>
      <div className="container container__top">
        <div className="row">
          <nav>
            <ul className="home-nav__links">
              <div>
                <li className="home-nav__link--img">
                  <a href="/" className="logo__img--wrapper">
                    <img
                      src="https://www.linkpicture.com/q/LPic6417115452db41730976866.png"
                      alt=""
                      className="logo__img"
                    />
                  </a>
                </li>
              </div>
              <div className="home-text__links">
                <li className="home-nav__link--text">
                  <Link to="/" className="home-nav__link">
                    Home
                  </Link>
                </li>
                <li className="home-nav__link--text">
                  <Link to="/shop" className="home-nav__link">
                    Browse Store
                  </Link>
                </li>
                <li className="home-nav__link--button">
                  <Link href="/cart" className="home-nav__link">
                    <button className="home-contact-button">
                      CART{" "}
                      <span className="cart__number--wrapper">
                        <div className="cart__number">{cartAmount}</div>
                      </span>
                    </button>
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
          <div className="item-page">
            <div className="item-page__header">
              <Link to="/shop">
                <button className="back-button">
                  <span className="arrow">
                    <HiArrowLeft className="left" />
                  </span>{" "}
                  SHOP
                </button>
              </Link>
            </div>
            {loading ? (
              <div className="item__wrapper--loading">
              <div className="item__img--loading"></div>
              <div className="item__description--wrapper--loading">
                <div className="item__description--loading">
                  <h2 className="item__title--loading"></h2>
                  <div className="item__rating--loading">
                  </div>
                  <p className="item__price--loading"></p>
                  <p className="item__para--loading"></p>
                </div>
                <button className="cart__button--loading">
                </button>
              </div>
            </div>
            ) : (
              <div className="item__wrapper">
                <img src={item?.image} alt="" className="item__img" />
                <div className="item__description--wrapper">
                  <div className="item__description">
                    <h2 className="item__title">{item?.title}</h2>
                    <div className="item__rating">
                      {ratingArray.map(() => (
                        <BsStarFill className="star" />
                      ))}
                      {addHalf && <BsStarHalf className="star-half" />}
                    </div>
                    <p className="item__price">${item?.price?.toFixed(2)}</p>
                    <p className="item__para">{item?.description}</p>
                  </div>
                  <button className="cart__button" onClick={cartFunction}>
                    {pressedAdd ? "Checkout" : "Add to Cart"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
