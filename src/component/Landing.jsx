import React, {useRef, useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faComment, faTimes } from '@fortawesome/free-solid-svg-icons';
import main from "../assets/main.png";
import logo from "../assets/logo.png";
import home from "../assets/home.jpg";
import homeside from "../assets/homeside.jpg";
import boat from "../assets/boat.jpg";
import island from "../assets/island.png";
import top from "../assets/top.jpg";
import view from "../assets/view.jpg";
import viewLeft from "../assets/viewRight.jpg";
import viewRight from "../assets/viewLeft.jpg";

export default function App() {
  const heroSectionRef = useRef(null);
  const collectionSectionRef = useRef(null);
  const homeSectionRef = useRef(null);
  const homeSideSectionRef = useRef(null);
  const boatSectionRef = useRef(null);
  const topSectionRef = useRef(null);
  const islandSectionRef = useRef(null);
  const viewSectionRef = useRef(null);
  const enquireFormRef = useRef(null);

  const [heroToCollectionProgress, setHeroToCollectionProgress] = useState(0);
  const [homeToHomeSideProgress, setHomeToHomeSideProgress] = useState(0);
  const [homeSideToBoatProgress, setHomeSideToBoatProgress] = useState(0);
  const [topToIslandProgress, setTopToIslandProgress] = useState(0);
  const [islandToViewProgress, setIslandToViewProgress] = useState(0);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });

  const toggleEnquire = () => {
    setIsEnquireOpen(!isEnquireOpen);
  };

  const closeEnquire = () => {
    setIsEnquireOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add API call or other logic here
    alert('Thank you for your enquiry! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      comment: ''
    });
    closeEnquire();
  };

  // Close enquire form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (enquireFormRef.current && !enquireFormRef.current.contains(event.target)) {
        closeEnquire();
      }
    };

    if (isEnquireOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isEnquireOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const heroProgress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      setHeroToCollectionProgress(heroProgress);

      const homeSectionTop = homeSectionRef.current.offsetTop;
      const homeProgress = Math.min(
        Math.max((scrollY - homeSectionTop) / windowHeight, 0),
        1
      );
      setHomeToHomeSideProgress(homeProgress);

      const homeSideTop = homeSideSectionRef.current.offsetTop;
      const startBoat = homeSideTop + windowHeight * 0.25;
      const distanceBoat = windowHeight * 0.65;

      const boatProgress = Math.min(
        Math.max((scrollY - startBoat) / distanceBoat, 0),
        1
      );
      setHomeSideToBoatProgress(boatProgress);

      const topSectionTop = topSectionRef.current.offsetTop;
      const topSectionHeight = topSectionRef.current.offsetHeight;

      const transitionStart = topSectionTop + topSectionHeight + 1500;
      const transitionDistance = windowHeight;

      const topProgress = Math.min(
        Math.max((scrollY - transitionStart) / transitionDistance, 0),
        1
      );
      setTopToIslandProgress(topProgress);
      // ---------- ISLAND → VIEW TRANSITION ----------
if (islandSectionRef.current) {
  const islandBottom =
    islandSectionRef.current.offsetTop +
    islandSectionRef.current.offsetHeight;

  const startView = islandBottom - window.innerHeight *0.9;
  const distance = window.innerHeight * 0.8;

  const viewProgress = Math.min(
    Math.max((scrollY - startView) / distance, 0),
    1
  );

  setIslandToViewProgress(viewProgress);
}

    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main-container">

      {/* Enquire Now Popup */}
      {isEnquireOpen && (
        <div className="enquire-overlay">
          <div className="enquire-form-container" ref={enquireFormRef}>
            <div className="enquire-form-header">
              <h2>Enquire Now</h2>
              <button className="close-btn" onClick={closeEnquire}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <form className="enquire-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faUser} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faPhone} className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faComment} className="input-icon textarea-icon" />
                  <textarea
                    name="comment"
                    placeholder="Write your comment..."
                    value={formData.comment}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
              </div>
              
              <button type="submit" className="submit-btn">
                SUBMIT ENQUIRY
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========== FIXED NAVBAR (GLOBAL) ========== */}
      <div className="fixed-navbar">
        <button className="enquire-btn fixed-enquire" onClick={toggleEnquire}>Enquire Now</button>
        <img src={logo} className="fixed-logo" />
      </div>

      {/* ========== FIRST SECTION ========== */}
      <div
        className="dashboard-container"
        ref={heroSectionRef}
        style={{
          opacity: 1 - heroToCollectionProgress,
          transform: `scale(${1 + heroToCollectionProgress * 0.1})`,
          filter: `blur(${heroToCollectionProgress * 8}px)`
        }}
      >
        <img src={main} className="background-image" />

        <div className="overlay">
          <div className="text-container">
            <h1 className="title">DISCOVER AN EXCLUSIVE ISLAND SANCTUARY</h1>
            <div className="divider"></div>
            <p className="subtitle">Automatic Director of the United Nations</p>
          </div>
        </div>
      </div>

      <div style={{ height: "100vh" }}></div>

      {/* ========== COLLECTION SECTION ========== */}
      <div
        className="collection-section"
        ref={collectionSectionRef}
        style={{
          opacity: heroToCollectionProgress,
          transform: `translateY(${-50 * (1 - heroToCollectionProgress)}px)`,
          filter: `blur(${(1 - heroToCollectionProgress) * 8}px)`
        }}
      >
        {/* removed navbar */}
        <div className="collection-content">
          <h2 className="collection-title">
            A COLLECTION OF DISTINGUISHED RESIDENCES
          </h2>
        </div>
      </div>

      {/* ========== HOME SECTION ========== */}
      <div
        className="home-section"
        ref={homeSectionRef}
        style={{
          opacity: 1 - homeToHomeSideProgress,
          transform: `scale(${1 + homeToHomeSideProgress * 0.1})`,
          filter: `blur(${homeToHomeSideProgress * 8}px)`
        }}
      >
        <img src={home} className="home-background-image" />
      </div>

      {/* ========== HOME SIDE SECTION ========== */}
      <div
        className="home-side-section"
        ref={homeSideSectionRef}
        style={{
          opacity: homeToHomeSideProgress,
          filter: `blur(${(1 - homeToHomeSideProgress) * 8 + homeSideToBoatProgress * 8}px)`,
          transform: `
            translateY(${(1 - homeToHomeSideProgress) * -50}vh)
            scale(${0.9 + homeToHomeSideProgress * 0.1 - homeSideToBoatProgress * 0.05})
          `,
          pointerEvents: homeSideToBoatProgress > 0.9 ? "none" : "auto"
        }}
      >
        <img src={homeside} className="home-side-background-image" />

        <div className="home-side-overlay">
      
          <div className="home-side-buttons">
            <button className="concept-btn">+ THE CONCEPT</button>
            <button className="architects-btn">+ THE ARCHITECTS</button>
          </div>
        </div>
      </div>

      {/* ========== BOAT SECTION ========== */}
      <div
        className="boat-section"
        ref={boatSectionRef}
        style={{
          opacity: homeSideToBoatProgress,
          filter: `blur(${(1 - homeSideToBoatProgress) * 12}px)`,
          transform: `
            translateY(${(1 - homeSideToBoatProgress) * -50}px)
            scale(${0.9 + homeSideToBoatProgress * 0.1})
          `
        }}
      >
        <img src={boat} className="boat-image" />

        <div className="boat-overlay">
          <div className="boat-text-container">
            <h1 className="boat-title">
              OFFERING DUBAI'S FIRST <br />
              TRUE RESIDENTIAL SAIL-IN <br />
              SAIL-OUT EXPERIENCE
            </h1>
          </div>
        </div>
      </div>

      {/* ========== TOP SECTION ========== */}
      <div 
        className="top-section"
        ref={topSectionRef}
        style={{
          opacity: 1 - topToIslandProgress,
          filter: `blur(${topToIslandProgress * 90}px)`,
          transform: `translateY(${-topToIslandProgress * 20}px)`
        }}
      >
        <img src={top} className="top-image" />
        <div className="sea-info-box">
          <h2 className="sea-info-title">
            WATERFRONT LIVING<br />WITH A PRIVATE MARINA
          </h2>

          <p className="sea-info-text">
            Step from your living room, onto your private<br />
            beach, into your yacht...and step off in the city just<br />
            six minutes later.
          </p>
        </div>

        <div className="sea-big-text">
          DIVE DEEPER <br/>INTO ISLAND<br/> LIVING
        </div>
      </div>

      {/* ========== ISLAND SECTION ========== */}
      <div 
        className="island-section"
        ref={islandSectionRef}
        style={{
          opacity: topToIslandProgress,
          filter: `blur(${(1 - topToIslandProgress) * 9}px)`,
          transform: `
            translateY(${(1 - topToIslandProgress) * 50}px)
            scale(${0.95 + topToIslandProgress * 0.05})
          `,
          pointerEvents: topToIslandProgress > 0.5 ? "auto" : "none"
        }}
      >
        <img src={island} className="island-image" />
      </div>
{/* ========== APARTMENT SECTION WITH ANIMATION ========== */}
<div
  className="apartment-section"
  ref={viewSectionRef}
>
  {/* MAIN FULL SCREEN IMAGE - Zooms out to become center image */}
  <div 
    className="view-main-container"
    style={{
      transform: `scale(${1.5 - islandToViewProgress * 0.5})`,
      opacity: 1 - (islandToViewProgress * 0.3),
      filter: `blur(${islandToViewProgress * 2}px)`
    }}
  >
    <img src={view} className="apartment-image view-main-img" />
  </div>

  {/* CENTER IMAGE (will be revealed during animation) */}
  <div 
    className="view-center"
    style={{
      opacity: islandToViewProgress,
      transform: `translateX(-50%) scale(${0.8 + islandToViewProgress * 0.2})`
    }}
  >
    <img src={view} className="view-center-img" />
  </div>

  {/* LEFT IMAGE - SLIDES IN FROM LEFT */}
  <div 
    className="view-side left"
    style={{
      transform: `translateX(${-300 + islandToViewProgress * 300}px) scale(${0.8 + islandToViewProgress * 0.2})`,
      opacity: islandToViewProgress * 0.9,
      filter: `blur(${(1 - islandToViewProgress) * 5}px)`
    }}
  >
    <img src={viewLeft} className="view-side-img" />
  </div>

  {/* RIGHT IMAGE - SLIDES IN FROM RIGHT */}
  <div 
    className="view-side right"
    style={{
      transform: `translateX(${300 - islandToViewProgress * 300}px) scale(${0.8 + islandToViewProgress * 0.2})`,
      opacity: islandToViewProgress * 0.9,
      filter: `blur(${(1 - islandToViewProgress) * 5}px)`
    }}
  >
    <img src={viewRight} className="view-side-img" />
  </div>

  {/* BROWN TEXT BOX */}
  <div 
    className="view-text-box"
    style={{
      transform: `translateY(${40 - islandToViewProgress * 40}px)`,
      opacity: islandToViewProgress
    }}
  >
    <h3 className="view-heading">
      EMBRACE THE LUXURY OF CHOICE WITH TWO INTERIOR AESTHETICS: TERRA & ULTRA
    </h3>
  </div>

  {/* ULTRA + TERRA BUTTONS */}
  <div 
    className="view-buttons"
    style={{
      transform: `translateY(${40 - islandToViewProgress * 40}px)`,
      opacity: islandToViewProgress
    }}
  >
    {/* Add your buttons here */}
  </div>
</div>
    </div>
  );
}