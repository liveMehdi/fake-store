import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";
import { useRecoilState } from "recoil";
import { useNavigate, Link } from "react-router-dom";
import {
  landingSearchedValue,
  fetchedProducts,
  originalProducts,
} from "../atoms/modalAtoms";
import axios from "axios";
import { default as poster } from "../assets/posterSVG.svg";

function Home() {
  const [landingSearchValue, setLandingSearchValue] =
    useRecoilState(landingSearchedValue);
  const [products, setProducts] = useRecoilState(fetchedProducts);
  const [origProducts, setOrigProducts] = useRecoilState(originalProducts);
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  async function getProducts() {
    const { data } = await axios.get("https://fakestoreapi.com/products/");
    setOrigProducts(data);
    setProducts(data);
    setButtonLoading(false);
    navigate("/shop");
  }

  function landingSearch(e) {
    setButtonLoading(true);
    e.preventDefault();
    getProducts();
  }

  return (
    <div>
      <section id="landing">
        <div className="container container__top">
          <div className="row">
            <nav>
              <ul className="home-nav__links">
                <div>
                  <li className="home-nav__link--img">
                    <Link to="/" className="logo__img--wrapper">
                      <img
                        src="https://www.linkpicture.com/q/LPic6417115452db41730976866.png"
                        alt=""
                        className="logo__img"
                      />
                    </Link>
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
                    <a href="/" className="home-nav__link">
                      <button className="home-contact-button">CONTACT</button>
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
            <div className="landing-page">
              <div className="landing-top">
                <h1 className="landing__heading">Welcome.</h1>
                <h2 className="landing__subheading">
                  Find all your wants in our exclusive{" "}
                  <span className="colored">online selection...</span>
                </h2>
                <form className="landing-search">
                  <input
                    placeholder="Search anything"
                    type="text"
                    className="landing-search__input"
                    onChange={(event) =>
                      setLandingSearchValue(event.target.value)
                    }
                  />
                  <button
                    className="landing-search__button"
                    onClick={landingSearch}
                    disabled={!landingSearchValue}
                  >
                    {!buttonLoading ? (
                      <TbSearch className="landing-search__icon" />
                    ) : (
                      <span class="loader"></span>
                    )}
                  </button>
                </form>
              </div>
              <div className="landing-poster">
                <img src={poster} alt="" className="landing-poster__img" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
