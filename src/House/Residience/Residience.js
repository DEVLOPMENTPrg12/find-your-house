import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "./Residience.css";
import "bootstrap/dist/css/bootstrap.css";
import data from "../utils/accordion";
import sliderSettings from "../utils/common";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart, setSearchQuery } from "../redux/slice";
import Nav from "../navigation/Nav";

export default function Residencies() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.carts.searchQuery);
  const [priceFilter, setPriceFilter] = useState(""); // State for price filter
  const [showModal, setShowModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleAddToCart = (item) => {
    dispatch(addTocart(item));
    setShowModal(true);
  };

  const handleShowDetails = (house) => {
    setSelectedHouse(house);
    setMainImage(house.image);
  };

  // Filtering logic based on price range
  const filteredData = data.filter((item) => {
    // Search filter
    const matchesSearchQuery = item.name.toLowerCase().includes(search.toLowerCase()) ||
                               item.price.toString().includes(search) ||
                               item.desc.toLowerCase().includes(search.toLowerCase());

    // Price filter logic
    let matchesPrice = true;
    if (priceFilter === "less_than_1000") {
      matchesPrice = item.price < 1000;
    } else if (priceFilter === "between_1000_2000") {
      matchesPrice = item.price >= 1000 && item.price <= 2000;
    } else if (priceFilter === "more_than_2000") {
      matchesPrice = item.price > 2000;
    }

    return matchesSearchQuery && matchesPrice;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div>
      <Nav/>
      <section className="r-wrapper">
        <div className="r-container">
          <div className="r-head">
            <span className="orange">Best Choices</span>
            <span className="primary">Popular Residencies</span>
          </div>

          <div className="search-container">
            <div className="search-bar">
              <i className="bi bi-search search-icon"></i>
              <input
                type="text"
                value={search}
                onChange={(ev) => dispatch(setSearchQuery(ev.target.value))}
                placeholder="Search for a home..."
                className="search-input"
              />
              <button className="search-button">Search</button>
            </div>
          </div>

          {/* Price filter dropdown */}
          <div className="price-filter">
            <label>Filter by Price: </label>
            <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
              <option value="">Select Price Range</option>
              <option value="less_than_1000">Less than 1000 MAD</option>
              <option value="between_1000_2000">Between 1000 and 2000 MAD</option>
              <option value="more_than_2000">More than 2000 MAD</option>
            </select>
          </div>

          <div className="pagination-container ccv">
            <button className="btn btn-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </button>
            <span> Page {currentPage} of {totalPages} </span>
            <button className="btn btn-primary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </button>
          </div>

          <Swiper {...sliderSettings}>
            <div className="row row-cols-md-4">
              {currentItems.length > 0 ? (
                currentItems.map((card, i) => (
                  <div
                    className="col mb-3 r-card"
                    key={i}
                    onClick={() => handleShowDetails(card)}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={card.image} alt="home" className="card-header" />
                    <span className="r-price card-body">
                      <span style={{ color: "orange" }}>MAD</span>
                      <span>{card.price} per night</span>
                    </span>
                    <span className="primary card-title">{card.name}</span>
                    <span className="secondary card-text">{card.desc}</span>
                    <span className="budget">
                      <strong>Budget:</strong> {card.budget} MAD
                    </span>
                    <div className="form">
                      <button
                        className="addCart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(card);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="book"
                        onClick={() => { setSelectedHouse(card); setShowBookingModal(true); }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-result">
                  <h2>❌ No Results Found</h2>
                  <p>Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </Swiper>
        </div>
      </section>

      {showModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✅ Successfully Added</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>The item has been added to your favorites!</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedHouse && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedHouse.name}</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedHouse(null)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={mainImage}
                  alt={selectedHouse.name}
                  className="img-fluid main-image"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <div className="thumbnail-container" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  {[selectedHouse.image, selectedHouse.image1, selectedHouse.image2, selectedHouse.image3].map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="house thumbnail"
                      className="thumbnail"
                      style={{
                        width: "80px", height: "60px", margin: "5px", cursor: "pointer", borderRadius: "5px",
                        border: mainImage === img ? "2px solid blue" : "none"
                      }}
                      onClick={() => setMainImage(img)}
                    />
                  ))}
                </div>
                <p><strong>Price:</strong> {selectedHouse.price} MAD / night</p>
                <p><strong>Bedrooms:</strong> {selectedHouse.detail.badrooms}</p>
                <p><strong>Guests:</strong> {selectedHouse.detail.guests}</p>
                <p><strong>Beds:</strong> {selectedHouse.detail.beds}</p>
                <p><strong>Budget:</strong> {selectedHouse.budget} MAD</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedHouse(null)}>Close</button>
                <button className="btn btn-primary" onClick={() => handleAddToCart(selectedHouse)}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBookingModal && selectedHouse && (
        <div className="modal fade show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Form for {selectedHouse.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowBookingModal(false)}></button>
              </div>
              <div className="modal-body">
                <img
                  src={selectedHouse.image}
                  alt={selectedHouse.name}
                  className="img-fluid mb-3"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <form>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" placeholder="Enter your phone number" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Check-in Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Check-out Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowBookingModal(false)}>Close</button>
                <button className="btn btn-primary">Submit Booking</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
