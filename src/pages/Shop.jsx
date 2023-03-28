import React, { useEffect, useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { default as errorLogo } from "../assets/errorSVG.svg";
import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchedProducts,
  landingSearchedValue,
  originalProducts,
} from "../atoms/modalAtoms";

function Shop() {
  const [products, setProducts] = useRecoilState(fetchedProducts);
  const [origProducts, setOrigProducts] = useRecoilState(originalProducts);
  const [searchedValue, setSearchedValue] =
    useRecoilState(landingSearchedValue);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isThereFor, setIsThereFor] = useState("");
  const navigate = useNavigate();

  function search(e) {
    if (e != 1) {
      e.preventDefault();
    } else if (!searchedValue) {
      return;
    }
    setError(false);
    setLoading(true);
    const filteredProducts = origProducts.filter((product) => {
      return (
        product.title.toLowerCase().includes(searchedValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchedValue.toLowerCase())
      );
    });
    setProducts(filteredProducts);
    filteredProducts.length === 0 ? setError(true) : setError(false);
    setIsThereFor(searchedValue);
    setLoading(false);
  }

  function filterProducts(filter) {
    setLoading(true);
    if (filter === "LOW_TO_HIGH") {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else if (filter === "HIGH_TO_LOW") {
      setProducts([...products].sort((a, b) => b.price - a.price));
    } else if (filter === "RATING") {
      setProducts([...products].sort((a, b) => b.rating.rate - a.rating.rate));
    }
    setLoading(false);
  }

  async function getProducts() {
    if (products.length > 0 && searchedValue) {
      search(1);
    } else {
      const { data } = await axios.get("https://fakestoreapi.com/products/");
      setOrigProducts(data);
      setProducts(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <section id="shop-banner">
        <div className="container container__top">
          <div className="row row__top">
            <nav>
              <ul className="nav__links">
                <div>
                  <li className="nav__link--img">
                    <a href="/" className="logo__img--wrapper">
                      <img
                        src="https://www.linkpicture.com/q/LPic6417115452db41730976866.png"
                        alt=""
                        className="logo__img"
                      />
                    </a>
                  </li>
                </div>
                <div className="text__links">
                  <li className="nav__link--text">
                    <Link to="/" className="nav__link">
                      Home
                    </Link>
                  </li>
                  <li className="nav__link--text">
                    <Link to="/shop" className="nav__link">
                      Browse Store
                    </Link>
                  </li>
                  <li className="nav__link--button">
                    <Link to="/" className="nav__link">
                      <button className="contact-button">CONTACT</button>
                    </Link>
                  </li>
                </div>
              </ul>
            </nav>
            <div className="shop-banner__search">
              <h1 className="search__heading">Browse our Store</h1>
              <form className="input__wrapper">
                <input
                  type="text"
                  name="search"
                  className="search__input"
                  placeholder="Search"
                  onChange={(event) => setSearchedValue(event.target.value)}
                  defaultValue={isThereFor}
                />
                <button
                  type="submit"
                  className="search__button"
                  onClick={search}
                >
                  <MagnifyingGlassCircleIcon className="search__icon" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section id="shop-page">
        <div className="container container__page">
          <div className="row row__page">
            <div className="shop-page__header">
              <h2 className="shop-page__heading">
                Search results
                {isThereFor && " for "}
                {isThereFor ? (
                  <span className="colored">"{isThereFor}"</span>
                ) : (
                  ":"
                )}
              </h2>
              <select
                name="LTH"
                id="search__filter--select"
                onChange={(event) => filterProducts(event.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Sort
                </option>
                <option value="LOW_TO_HIGH">Price: Low to High</option>
                <option value="HIGH_TO_LOW">Price: High to Low</option>
                <option value="RATING">Rating</option>
              </select>
            </div>
            <div className="store-results">
              <div className="products">
                {loading
                  ? new Array(9).fill(0).map(() => (
                      <div className="product__loading">
                        <div className="product__loading--first-half">
                          <div className="fake-image"></div>
                        </div>
                        <div className="product__loading--second-half">
                          <div className="second-half-inner">
                            <div className="product__loading--second-half--title-rating">
                              <div className="product__loading--second-half--title"></div>
                              <div className="product__loading--second-half--rating"></div>
                            </div>
                            <div className="product__loading--second-half--price"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  : products.map((product) => (
                      <div
                        className="product"
                        key={product.id}
                        onClick={() => navigate(`/shop/${product.id}`)}
                      >
                        <figure className="product__img--wrapper">
                          <img
                            src={product.image}
                            alt=""
                            className="product__img"
                          />
                        </figure>
                        <div className="product__txt">
                          <div className="name-rating__wrapper">
                            <h3 className="product__name">{product.title}</h3>
                            <div className="rating">
                              <span className="rate-span">
                                {product.rating.rate.toFixed(1)}
                              </span>
                              {new Array(Math.floor(product.rating.rate))
                                .fill(0)
                                .map(() => (
                                  <BsStarFill className="star" />
                                ))}
                              {Math.floor(product.rating.rate) <
                                product.rating.rate && (
                                <BsStarHalf className="star-half" />
                              )}
                            </div>
                          </div>
                          <h4 className="product__price">
                            ${product.price.toFixed(2)}
                          </h4>
                        </div>
                      </div>
                    ))}
                {error && (
                  <div className="error-page">
                    <figure className="error__svg--wrapper">
                      <img src={errorLogo} alt="" className="error__svg" />
                    </figure>
                    <h2 class="error-message">
                      Could not find any matches related to your search.
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
