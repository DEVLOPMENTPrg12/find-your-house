import React from "react";
import './Section.css';
import { useSelector, useDispatch } from "react-redux";
 
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { setSearchQuery } from "../redux/slice";

export default function Section({ children }) {
    const search = useSelector((state) => state.carts.searchQuery); 
    const dispatch = useDispatch();  

    function handleSearch() {
        console.log("بحث عن:", search);
    }

    return (
        <div>
            <section className="hero-wrapper">
                <div className="hero-container">
                    <div className="hero-left">
                        <div className="hero-title">
                            <div className="orange-cicle" />
                            <motion.h1
                                initial={{ y: "2rem", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 2, type: "spring" }}
                            >
                                Discover <br />Most Suitable<br />Property
                            </motion.h1>
                        </div>
                        <div className="hero-des">
                            <span className="des">Find a variety of properties that suit you very easily</span>
                            <span className="des">Forget all difficulties in finding a residence for you</span><br />
                        </div>
                      
                        <div className="stats">
                            <div className="stat">
                                <span>
                                    <CountUp start={88000} end={90000} duration={4} />
                                    <span className="plus">+</span>
                                </span>
                                <span className="tt">Premium Product</span>
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
                                <span className="tt">Award Winnings</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-right">
                        <motion.div
                            initial={{ x: '7rem', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, type: 'spring' }}
                            className="img1"
                        >
                            <img src="header.avif" alt="header" />
                        </motion.div>
                    </div>
                </div>
            </section>
            {children} {/* تمرير المكونات الأخرى */}
        </div>
    );
}
