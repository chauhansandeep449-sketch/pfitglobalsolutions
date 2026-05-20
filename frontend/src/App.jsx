import { useState } from 'react'

const services = [
  {
    icon: '✦',
    title: 'Web Design & Development',
    description: 'Custom React applications with glassmorphism UI, responsive layouts, and optimal performance.',
  },
  {
    icon: '◆',
    title: 'Backend API Solutions',
    description: 'Scalable Node.js servers, REST APIs, database integration, and cloud deployment.',
  },
  {
    icon: '▲',
    title: 'UI/UX Strategy',
    description: 'User-centered design, accessibility standards, and engaging interactive experiences.',
  },
  {
    icon: '●',
    title: 'Performance Optimization',
    description: 'Lightning-fast page loads, SEO optimization, and mobile-first delivery systems.',
  },
  {
    icon: '◇',
    title: 'API Integration',
    description: 'Third-party service integration, payment gateways, and real-time data synchronization.',
  },
  {
    icon: '■',
    title: 'Ongoing Support',
    description: 'Maintenance, updates, security patches, and feature enhancements post-launch.',
  },
]

const portfolio = [
  {
    title: 'E-Commerce Platform',
    category: 'React + Node',
    description: 'Full-stack shopping experience with real-time inventory and payment processing.',
  },
  {
    title: 'SaaS Dashboard',
    category: 'Analytics',
    description: 'Data visualization with charts, reports, and user management systems.',
  },
  {
    title: 'Mobile Web App',
    category: 'Progressive Web App',
    description: 'Responsive app for iOS, Android, and desktop with offline capability.',
  },
]

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="app-shell">
      <nav className="topbar">
        <div className="brand">✨ PFit Global</div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#about">About</a>
          <a href="/accessibility">Accessibility</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero-panel">
        <section className="hero-content">
          <span className="eyebrow">Premium Digital Solutions</span>
          <h1>Transform your vision into stunning digital experiences.</h1>
          <p>
            We design and build high-performance web applications with React, Node.js, and cutting-edge glassmorphism UI.
            Every project is crafted with precision, elegance, and purpose.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#contact">
              Start Your Project
            </a>
            <a className="btn secondary" href="#services">
              Explore Services
            </a>
          </div>
        </section>
      </header>

      <main className="content-grid">
        <section className="glass-card about-card" id="about">
          <h2>Who We Are</h2>
          <p>
            PFit Global Solutions is a forward-thinking digital agency specializing in full-stack web development.
            We combine strategic design thinking with robust backend architecture to create seamless user experiences.
          </p>
          <div className="stats">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">35+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <h2 className="section-title">Our Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <article key={service.title} className="glass-card service-card">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="portfolio-section" id="portfolio">
          <h2 className="section-title">Recent Work</h2>
          <div className="portfolio-grid">
            {portfolio.map((project) => (
              <article key={project.title} className="glass-card portfolio-card">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href="#" className="project-link">
                  View Case Study →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="glass-card process-card">
          <h2>Our Process</h2>
          <ol className="process-steps">
            <li>
              <strong>Discovery</strong> — Understand your goals, audience, and technical requirements.
            </li>
            <li>
              <strong>Strategy</strong> — Plan architecture, user flows, and design system.
            </li>
            <li>
              <strong>Design</strong> — Create wireframes, mockups, and interactive prototypes.
            </li>
            <li>
              <strong>Development</strong> — Build frontend and backend with clean, scalable code.
            </li>
            <li>
              <strong>Testing</strong> — QA, performance optimization, and security audits.
            </li>
            <li>
              <strong>Launch & Support</strong> — Deploy, monitor, and provide ongoing maintenance.
            </li>
          </ol>
        </section>

        <section className="glass-card tech-card">
          <h2>Tech Stack</h2>
          <div className="tech-grid">
            <div className="tech-group">
              <h4>Frontend</h4>
              <p>React, Vite, CSS3, JavaScript, HTML5</p>
            </div>
            <div className="tech-group">
              <h4>Backend</h4>
              <p>Node.js, Express, REST APIs, WebSockets</p>
            </div>
            <div className="tech-group">
              <h4>Database</h4>
              <p>MongoDB, PostgreSQL, Firebase</p>
            </div>
            <div className="tech-group">
              <h4>Deployment</h4>
              <p>Vercel, AWS, Docker, CI/CD Pipelines</p>
            </div>
          </div>
        </section>

        <section className="glass-card cta-card">
          <h2>Ready to Start?</h2>
          <p>Let's discuss your project goals and create something extraordinary together.</p>
          <a className="btn primary" href="#contact">
            Get in Touch
          </a>
        </section>

        <section className="glass-card contact-card" id="contact">
          <h2>Get In Touch</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn primary">
              Send Message
            </button>
          </form>
        </section>

        <footer className="footer">
          <p>&copy; 2026 PFit Global Solutions. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#social">Social Media</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
