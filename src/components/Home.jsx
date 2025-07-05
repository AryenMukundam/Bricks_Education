
import React, { useEffect, useState } from "react";
import "../style.css";
import { Link } from "react-router-dom";


const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentDay, setCurrentDay] = useState(1);

  useEffect(() => {
    const loading = document.getElementById("loading");
    if (loading) {
      setTimeout(() => {
        loading.classList.add("fade-out");
        setTimeout(() => {
          loading.style.display = "none";
        }, 500);
      }, 1500);
    }

    let lastScrollTop = 0;
    const navbar = document.getElementById("header");
    const onScroll = () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add("navbar-hidden");
      } else {
        navbar.classList.remove("navbar-hidden");
      }
      if (scrollTop > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      lastScrollTop = scrollTop;

      // Parallax effect for hero
      const hero = document.querySelector(".hero-background");
      if (hero) {
        hero.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", onScroll);

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.querySelector(".nav-links");
    
    const toggleMobileMenu = () => {
      mobileMenuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    };

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    }

    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Fun elements hover effect
    document.querySelectorAll(".fun-element").forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.animationPlayState = "paused";
      });

      element.addEventListener("mouseleave", function () {
        this.style.animationPlayState = "running";
      });
    });

    // Auto-slide testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener("click", toggleMobileMenu);
      }
      clearInterval(testimonialInterval);
    };
  }, []);

  const changeSlide = (direction) => {
    setCurrentSlide(prev => {
      let newSlide = prev + direction;
      if (newSlide >= 4) newSlide = 0;
      if (newSlide < 0) newSlide = 3;
      return newSlide;
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const showDay = (dayNumber) => {
    setCurrentDay(dayNumber);
  };

  useEffect(() => {
    const track = document.getElementById("testimonialTrack");
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  }, [currentSlide]);

  return (
    <>
      <div className="loading" id="loading">
        <div className="loader"></div>
        <div className="loading-text">BRICKS Education</div>
      </div>

      <header id="header">
        <nav className="container">
          <div className="logo-container">
            <div className="logo-icon">
              <img src="./src/assets/Logo.png" alt="Bricks" />
            </div>
            <div className="logo-text">BRICKS EDUCATION</div>
          </div>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#outcomes">Outcomes</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
          <div className="mobile-menu-toggle" id="mobileMenuToggle">
            <span></span><span></span><span></span>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-background"></div>
          <div className="container hero-container">
            <div className="hero-content">
              <div className="hero-badge">ज्ञानं शक्ति</div>
              <h1>BRICKS EDUCATION</h1>
              <p className="tagline">Build. Think. Lead.</p>
              <p className="hero-description">
                At BRICKS, we are a team of young innovators, educators, and builders who believe the classroom should prepare students not just for exams, but for life. We create hands-on, highly engaging workshops that blend coding, robotics, career exposure, and public speaking all in a format that's fun, challenging, and unforgettable.
              </p>
              <div className="hero-buttons">
                <a href="#about" className="cta-button primary">Learn More</a>
                <a href="#schedule" className="cta-button secondary">View Schedule</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="fun-container">
                <div className="fun-elements">
                  <div className="fun-element robot-element">🤖</div>
                  <div className="fun-element code-element">💻</div>
                  <div className="fun-element lightbulb-element">💡</div>
                  <div className="fun-element rocket-element">🚀</div>
                </div>
                <div className="central-message">
                  <h3>BUILD YOUR FUTURE</h3>
                  <p>With hands-on robotics & AI learning</p>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2>Who We Are</h2>
              <p className="section-subtitle">
                Transforming education through innovation and hands-on learning
              </p>
            </div>
            <div className="grid grid-2">
              <div className="content-card">
                <div className="card-icon">🎯</div>
                <h3>Our Mission</h3>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  With experience ranging from building grassroots startups to running real-world learning programs in schools, we bring unmatched energy, relevance, and creativity to everything we do.
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Our mission is simple: to turn curiosity into capability and students into future-ready thinkers.
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>
                  Every student we work with doesn't just learn, they explore, collaborate, question, and build. Because at BRICKS, we don't just teach. We spark futures.
                </p>
              </div>
              <div className="content-card">
                <div className="card-icon">📚</div>
                <h3>Workshop Details</h3>
                <div className="info-item">
                  <strong>Class Level:</strong> Grade 8th, 9th and 10th
                </div>
                <div className="info-item">
                  <strong>Skills Covered:</strong> Robotics, Coding, AI Tools, Problem Solving, Teamwork, Public Speaking
                </div>
                <div className="info-item">
                  <strong>Format Options:</strong>
                  <ul className="format-list">
                    <li>2-Day: Build + Compete</li>
                    <li>3-Day: Build + Compete + Present (optional)</li>
                  </ul>
                </div>
                <div className="highlight-box">
                  With Robo Races, creative challenges, and live tech demos, students don't just learn — they experience innovation.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section testimonials-section animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2>Backed By The Best</h2>
              <p className="section-subtitle">
                Designed with the minds who shaped India's top tech education movements.
              </p>
            </div>
            <div className="testimonial-carousel">
              <button className="carousel-nav carousel-prev" onClick={() => changeSlide(-1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="carousel-nav carousel-next" onClick={() => changeSlide(1)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="testimonial-track" id="testimonialTrack">
                <div className={`testimonial-slide ${currentSlide === 0 ? 'active' : ''}`}>
                  <div className="modern-testimonial-card">
                    <div className="testimonial-image-section">
                      <img src="./src/assets/Pic1.jpg" alt="Anshuman Singh" className="testimonial-profile-image" />
                    </div>
                    <div className="testimonial-content-section">
                      <div className="testimonial-header">
                        <h3 className="testimonial-name">Anshuman Singh</h3>
                        <div className="testimonial-company">
                          <img src="./src/assets/facebook.png" alt="Facebook" className="company-logo" />
                          <span className="company-text">Ex - Facebook</span>
                        </div>
                        <div className="testimonial-stats">
                          <div className="stat-item">
                            <img src="./src/assets/Scaler.jpg" alt="Scaler" className="company-logo" />
                            <span>Co-founder Scaler</span>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-quote">
                        I love what BRICKS is doing — it's bold, it's timely, and it's going to change how kids think about learning and building.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`testimonial-slide ${currentSlide === 1 ? 'active' : ''}`}>
                  <div className="modern-testimonial-card">
                    <div className="testimonial-image-section">
                      <img src="./src/assets/pic2.jpg" alt="Prasanna Sankar" className="testimonial-profile-image" />
                    </div>
                    <div className="testimonial-content-section">
                      <div className="testimonial-header">
                        <h3 className="testimonial-name">Prasanna Sankar</h3>
                        <div className="testimonial-company">
                          <img src="./src/assets/microsoft.png" alt="Microsoft" className="company-logo" />
                          <span className="company-text">Ex - Microsoft</span>
                        </div>
                        <div className="testimonial-stats">
                          <div className="stat-item">
                            <img src="./src/assets/rippling.jpg" alt="Rippling" className="company-logo" />
                            <span>Co-founder Rippling</span>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-quote">
                        I strongly believe core technical skills should be taught in school. The BRICKS team understands this deeply — and they're building it bottom-up, the right way.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`testimonial-slide ${currentSlide === 2 ? 'active' : ''}`}>
                  <div className="modern-testimonial-card">
                    <div className="testimonial-image-section">
                      <img src="./src/assets/Pic3.jpg" alt="Abhimanyu Saxena" className="testimonial-profile-image" />
                    </div>
                    <div className="testimonial-content-section">
                      <div className="testimonial-header">
                        <h3 className="testimonial-name">Abhimanyu Saxena</h3>
                        <div className="testimonial-company">
                          <img src="./src/assets/IVB.jpg" alt="InterviewBit" className="company-logo" />
                          <span className="company-text">InterviewBit</span>
                        </div>
                        <div className="testimonial-stats">
                          <div className="stat-item">
                            <img src="./src/assets/Scaler.jpg" alt="Scaler" className="company-logo" />
                            <span>Co-founder Scaler</span>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-quote">
                        BRICKS workshops give students their first real taste of building with tech — and they walk away transformed.
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`testimonial-slide ${currentSlide === 3 ? 'active' : ''}`}>
                  <div className="modern-testimonial-card">
                    <div className="testimonial-image-section">
                      <img src="./src/assets/Pic4.jpg" alt="Manmeet Singh Akali" className="testimonial-profile-image" />
                    </div>
                    <div className="testimonial-content-section">
                      <div className="testimonial-header">
                        <h3 className="testimonial-name">Manmeet Singh Akali</h3>
                        <div className="testimonial-company">
                          <img src="./src/assets/eduvanz.png" alt="Eduvanz" className="company-logo" />
                          <span className="company-text">Ex-Eduvanz</span>
                        </div>
                        <div className="testimonial-stats">
                          <div className="stat-item">
                            <img src="./assets/Scaler.jpg" alt="Scaler" className="company-logo" />
                            <span>V.P. Scaler</span>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-quote">
                        It's time we stop teaching computer science like it's 1999. What BRICKS is doing brings relevance, curiosity, and hands-on energy back into classrooms.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="carousel-indicators">
                {[0, 1, 2, 3].map(index => (
                  <span 
                    key={index}
                    className={`indicator ${currentSlide === index ? 'active' : ''}`} 
                    onClick={() => goToSlide(index)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section id="outcomes" className="section outcomes-section animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2>Learning Outcomes</h2>
              <p className="section-subtitle">
                What students achieve through our innovative workshops
              </p>
            </div>
            <div className="outcomes-grid">
              <div className="outcome-card">
                <div className="outcome-number gradient-01">01</div>
                <div className="outcome-icon">🤖</div>
                <h4>Robot Building</h4>
                <p>Students assemble and code their first robot using Arduino and real hardware.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-02">02</div>
                <div className="outcome-icon">🧠</div>
                <h4>Critical Thinking</h4>
                <p>They learn to ask better questions, break down problems, and think independently.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-03">03</div>
                <div className="outcome-icon">🚀</div>
                <h4>AI Learning Skills</h4>
                <p>Master how to learn using ChatGPT, YouTube, and online tools — a lifelong skill.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-04">04</div>
                <div className="outcome-icon">🌍</div>
                <h4>Real-World Exposure</h4>
                <p>Explore tech careers like robotics, AI, and design through hands-on tasks.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-05">05</div>
                <div className="outcome-icon">🎤</div>
                <h4>Public Speaking</h4>
                <p>Present ideas confidently in a pitch-style format, just like a startup founder.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-06">06</div>
                <div className="outcome-icon">🤝</div>
                <h4>Team Collaboration</h4>
                <p>Work in groups to build, test, and present — learning cooperation and leadership.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-07">07</div>
                <div className="outcome-icon">🧩</div>
                <h4>Problem Solving</h4>
                <p>Use design thinking to turn a real-world problem into a working prototype.</p>
                <div className="outcome-glow"></div>
              </div>

              <div className="outcome-card">
                <div className="outcome-number gradient-08">08</div>
                <div className="outcome-icon">🏆</div>
                <h4>Competitive Spirit</h4>
                <p>Participate in Robo Races & Wars to test their builds in a fun, high-energy format.</p>
                <div className="outcome-glow"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="section schedule-section animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2>Workshop Schedule</h2>
              <p className="section-subtitle">
                A comprehensive 3-day journey of learning and innovation
              </p>
            </div>

            <div className="schedule-container">
              <div className="schedule-sidebar">
                <div className="schedule-progress-line"></div>

                <div className={`schedule-day-item ${currentDay === 1 ? 'active' : ''}`} onClick={() => showDay(1)}>
                  <div className="day-number">01</div>
                  <div className="day-title">Mindset & Fundamentals</div>
                  <div className="day-subtitle">6 hours of immersive learning</div>
                  <div className="progress-dot"></div>
                </div>

                <div className={`schedule-day-item ${currentDay === 2 ? 'active' : ''}`} onClick={() => showDay(2)}>
                  <div className="day-number">02</div>
                  <div className="day-title">Action & Competition</div>
                  <div className="day-subtitle">4 hours of building and competing</div>
                  <div className="progress-dot"></div>
                </div>

                <div className={`schedule-day-item ${currentDay === 3 ? 'active' : ''}`} onClick={() => showDay(3)}>
                  <div className="day-number">03</div>
                  <div className="day-title">Think Like a CEO</div>
                  <div className="day-subtitle">4.5 hours of innovation and presentation</div>
                  <div className="progress-dot"></div>
                </div>
              </div>

              <div className="schedule-content" id="scheduleContent">
                <div className={`schedule-day ${currentDay === 1 ? 'active' : ''}`} id="day1">
                  <div className="day-header">
                    <h3>DAY 1 - Mindset & Fundamentals</h3>
                    <div className="day-duration">6 hours of immersive learning</div>
                  </div>
                  <div className="schedule-timeline">
                    <div className="timeline-item">
                      <div className="timeline-time">15 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">👋</div>
                        <h4>Intro + Icebreaking</h4>
                        <p>Meet your mentors, teammates, and the BRICKS vibe.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">20 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">💭</div>
                        <h4>Philosophy of Exploration</h4>
                        <p>Why is this workshop happening? Why do we need to learn to learn? How is tech moving so fast?</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">20 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🌟</div>
                        <h4>Interactive Tech Session</h4>
                        <p>Mind-blowing facts: Microsoft servers are underwater, Elon Musk's tech visions, What if tech disappears tomorrow?</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">20 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🎯</div>
                        <h4>Team Formation + Kit Distribution</h4>
                        <p>Each team gets: 1 Arduino, Chassis + Motors, 1-2 sensors, Breadboard, wires, batteries etc.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">2 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">⚡</div>
                        <h4>Tech Fundamentals</h4>
                        <p>Arduino basics, sensors, wiring, logic. Hands-on circuit building.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">1 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🤖</div>
                        <h4>AI x Learn-to-Learn</h4>
                        <p>Using ChatGPT, YouTube, Docs for self-learning & debugging.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`schedule-day ${currentDay === 2 ? 'active' : ''}`} id="day2">
                  <div className="day-header">
                    <h3>DAY 2 - Action & Competition</h3>
                    <div className="day-duration">4 hours of building and competing</div>
                  </div>
                  <div className="schedule-timeline">
                    <div className="timeline-item">
                      <div className="timeline-time">1-1.5 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🔧</div>
                        <h4>Continue Building</h4>
                        <p>Teams build and test their bots. Mentors support.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">15 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🏁</div>
                        <h4>Robo Race Setup</h4>
                        <p>Obstacle courses, racing loops, and test trials.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">1-1.5 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🏎️</div>
                        <h4>Robo Races & Wars</h4>
                        <p>Let the games begin. Time-based, task-based, or battle-based races.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">30 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🏆</div>
                        <h4>Prize Distribution</h4>
                        <p>Winning teams receive goodies and certificates.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`schedule-day ${currentDay === 3 ? 'active' : ''}`} id="day3">
                  <div className="day-header">
                    <h3>DAY 3 - Think Like a CEO</h3>
                    <div className="day-duration">4.5 hours of innovation and presentation</div>
                  </div>
                  <div className="schedule-timeline">
                    <div className="timeline-item">
                      <div className="timeline-time">1.5 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">💡</div>
                        <h4>Mentored Build Time</h4>
                        <p>Work on prototypes and solutions.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">30 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">📊</div>
                        <h4>Presentation Prep</h4>
                        <p>Pitching skills, team planning.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">2 hour</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🦈</div>
                        <h4>Shark Tank Pitches</h4>
                        <p>Present ideas to panel. Judges evaluate on originality, relevance, teamwork.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-time">40-50 min</div>
                      <div className="timeline-content">
                        <div className="timeline-icon">🎉</div>
                        <h4>Final Prize Distribution + Reflection</h4>
                        <p>Final awards and student reflections.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Provide Section */}
        <section className="section provides-section animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2>What We Provide to Students</h2>
              <p className="section-subtitle">
                Everything students need for a complete hands-on learning experience
              </p>
            </div>
            <div className="provides-grid">
              <div className="provide-card">
                <div className="provide-icon">🎒</div>
                <h3>Complete Hardware Kit</h3>
                <p>
                  Each team receives a comprehensive robotics kit including Arduino, motors, sensors, chassis, breadboard, wires, and batteries - everything needed to build and program their first robot.
                </p>
                <div className="provide-features">
                  <span className="feature-tag">Arduino Board</span>
                  <span className="feature-tag">Motors & Sensors</span>
                  <span className="feature-tag">Building Materials</span>
                </div>
              </div>

              <div className="provide-card">
                <div className="provide-icon">👨‍🏫</div>
                <h3>Expert Mentorship</h3>
                <p>
                  Students work directly with experienced mentors who guide them through challenges, provide technical support, and help develop problem-solving skills throughout the workshop.
                </p>
                <div className="provide-features">
                  <span className="feature-tag">1:1 Support</span>
                  <span className="feature-tag">Technical Guidance</span>
                  <span className="feature-tag">Career Insights</span>
                </div>
              </div>

              <div className="provide-card">
                <div className="provide-icon">🏆</div>
                <h3>Certificates & Recognition</h3>
                <p>
                  All participants receive completion certificates, with special recognition and prizes for outstanding performance in competitions and presentations.
                </p>
                <div className="provide-features">
                  <span className="feature-tag">Workshop Certificate</span>
                  <span className="feature-tag">Competition Prizes</span>
                  <span className="feature-tag">Achievement Badges</span>
                </div>
              </div>

              <div className="provide-card">
                <div className="provide-icon">📚</div>
                <h3>Learning Resources</h3>
                <p>
                  Access to comprehensive learning materials, code samples, project documentation, and continued learning resources to support students beyond the workshop.
                </p>
                <div className="provide-features">
                  <span className="feature-tag">Digital Resources</span>
                  <span className="feature-tag">Code Libraries</span>
                  <span className="feature-tag">Project Templates</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-header">
            <h2 className="footer-title">BRICKS EDUCATION</h2>
            <p className="footer-tagline">Learning by Doing, Leading by Thinking!</p>
          </div>
          <div className="footer-contacts">
            <div className="contact-item">
              <span className="contact-label">Phone:</span>
              <div className="contact-value">+91 94623 11937</div>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <div className="contact-value">aryan@bricks.org.in</div>
            </div>
          </div>
          <div className="footer-note">
            <p>
              <strong>Note:</strong> Our team will capture key moments from the workshop through photos and videos. The school is welcome to use this content on their website, social media, or in promotional materials.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
