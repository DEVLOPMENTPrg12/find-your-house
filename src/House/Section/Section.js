import React from "react";
import "./Section.css";
import { useSelector, useDispatch } from "react-redux";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { setSearchQuery } from "../redux/slice";

export default function Section({ children }) {
  const search = useSelector((state) => state.carts.searchQuery);
  const dispatch = useDispatch();

  function handleSearch() {
    console.log("بحث عن:", search);
  }

  return (
    <div>
      <section className="home">
        <motion.div
          className="left"
          initial={{ x: "-5rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <h1>
            Discover <span>Unique Stays </span>Across Morocco with FYH
          </h1>

          <p className="subtext">
            Find your dream home easily with our exclusive collection of houses
            across the kingdom.
          </p>

          <div className="stats">
            <div className="stat">
              <span>
                <CountUp start={88000} end={90000} duration={4} />
                <span className="plus">+</span>
              </span>
              <span className="tt">Reserved Houses</span>
            </div>
            <div className="stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} />
                <span className="plus">+</span>
              </span>
              <span className="tt">Happy Customers</span>
            </div>
            <div className="stat">
              <span>
                <CountUp start={0} end={28} duration={8} />
                <span className="plus">+</span>
              </span>
              <span className="tt">Various Countries</span>
            </div>
          </div>

          <button className="book-btn">BOOK NOW</button>
        </motion.div>

        <motion.div
          className="right"
          initial={{ x: "7rem", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <img src="/bgm.jpg" alt="home-bg" />
        </motion.div>
      </section>

      {children}
    </div>
  );
}
