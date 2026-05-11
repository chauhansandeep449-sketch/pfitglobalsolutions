import React from 'react'

const accessibilityFeatures = [
  {
    icon: '👁️',
    title: 'Visual Accessibility',
    description: 'High contrast ratios, readable fonts, and adjustable text sizes for visually impaired users.',
  },
  {
    icon: '🎧',
    title: 'Audio & Video',
    description: 'Captions, transcripts, and audio descriptions for multimedia content.',
  },
  {
    icon: '⌨️',
    title: 'Keyboard Navigation',
    description: 'Full keyboard support and logical navigation flow for all interactive elements.',
  },
  {
    icon: '🗣️',
    title: 'Screen Reader Support',
    description: 'ARIA labels and semantic HTML for compatibility with assistive technologies.',
  },
  {
    icon: '📱',
    title: 'Mobile Friendly',
    description: 'Responsive design works seamlessly on all devices and screen sizes.',
  },
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Fast loading times and optimized code for users with slower connections.',
  },
]

const wcagStandards = [
  {
    level: 'WCAG 2.1 Level A',
    status: 'Compliant',
    description: 'Basic accessibility standards met for all users.',
  },
  {
    level: 'WCAG 2.1 Level AA',
    status: 'Target',
    description: 'Enhanced accessibility for improved usability across diverse needs.',
  },
  {
    level: 'WCAG 2.1 Level AAA',
    status: 'Ongoing',
    description: 'Advanced accessibility features for maximum inclusivity.',
  },
]

function Accessibility() {
  const handleNavClick = (path) => {
    window.history.pushState(null, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <div className="app-shell">
      <nav className="topbar">
        <div className="brand" onClick={() => handleNavClick('/')}>✨ PFit Global</div>
        <div className="nav-links">
          <a href="#" onClick={() => handleNavClick('/')}>Home</a>
          <a href="/#services" onClick={() => handleNavClick('/')}>Services</a>
          <a href="/#contact" onClick={() => handleNavClick('/')}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-panel accessibility-hero">
        <section className="hero-content">
          <span className="eyebrow">Our Commitment</span>
          <h1>Expert Solutions for Seamless Web Accessibility!</h1>
          <p>
            Transform your website into an inclusive space where everyone can navigate, interact, and thrive.
            We're committed to WCAG compliance and universal design principles.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#features" onClick={(e) => e.preventDefault() || document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Learn Our Standards
            </a>
            <a className="btn secondary" href="#contact-accessibility" onClick={(e) => e.preventDefault() || document.getElementById('contact-accessibility').scrollIntoView({ behavior: 'smooth' })}>
              Get Accessibility Audit
            </a>
          </div>
        </section>
      </header>

      <main className="content-grid">
        {/* Statement */}
        <section className="glass-card accessibility-statement" id="statement">
          <h2>Our Accessibility Promise</h2>
          <p>
            At PFit Global Solutions, we believe the web should be accessible to everyone, regardless of ability or disability.
            We design and develop websites that comply with international accessibility standards and best practices.
          </p>
          <p>
            Our team understands that accessibility isn't an afterthought—it's a fundamental aspect of good design.
            Every project we undertake is built with inclusive design principles from the ground up.
          </p>
        </section>

        {/* Features Section */}
        <section className="accessibility-features-section" id="features">
          <h2 className="section-title">Our Accessibility Features</h2>
          <div className="accessibility-grid">
            {accessibilityFeatures.map((feature, idx) => (
              <article key={idx} className="glass-card accessibility-feature-card">
                <span className="feature-emoji">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WCAG Standards */}
        <section className="glass-card wcag-section">
          <h2>WCAG 2.1 Compliance Levels</h2>
          <div className="wcag-standards">
            {wcagStandards.map((standard, idx) => (
              <div key={idx} className="wcag-item">
                <div className="wcag-header">
                  <h4>{standard.level}</h4>
                  <span className="wcag-status">{standard.status}</span>
                </div>
                <p>{standard.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility Principles */}
        <section className="glass-card principles-section">
          <h2>Our Core Principles</h2>
          <div className="principles-grid">
            <div className="principle">
              <h4>Perceivable</h4>
              <p>Content must be presented in ways users can perceive with their senses.</p>
            </div>
            <div className="principle">
              <h4>Operable</h4>
              <p>Users must be able to navigate and interact with all functionality.</p>
            </div>
            <div className="principle">
              <h4>Understandable</h4>
              <p>Content and operations must be clear and easy to comprehend.</p>
            </div>
            <div className="principle">
              <h4>Robust</h4>
              <p>Content must work with current and future assistive technologies.</p>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section className="glass-card implementation-section">
          <h2>How We Implement Accessibility</h2>
          <ol className="implementation-steps">
            <li>
              <strong>Audit & Assessment</strong> — We conduct thorough accessibility audits using WAVE, Axe, and manual testing.
            </li>
            <li>
              <strong>Semantic HTML</strong> — Proper markup ensures screen readers and assistive tech work correctly.
            </li>
            <li>
              <strong>Color & Contrast</strong> — We maintain WCAG AA standards for color contrast ratios.
            </li>
            <li>
              <strong>ARIA Labels</strong> — Enhanced semantic meaning for complex interactive components.
            </li>
            <li>
              <strong>Keyboard Navigation</strong> — All features accessible via keyboard alone (Tab, Enter, Arrows).
            </li>
            <li>
              <strong>Testing & Validation</strong> — Ongoing testing with real users, assistive devices, and automated tools.
            </li>
          </ol>
        </section>

        {/* Resources */}
        <section className="glass-card resources-section">
          <h2>Accessibility Resources</h2>
          <div className="resources-list">
            <div className="resource-item">
              <h4>W3C Web Accessibility Initiative</h4>
              <p>Official guidelines and standards for web accessibility.</p>
            </div>
            <div className="resource-item">
              <h4>ARIA Authoring Practices</h4>
              <p>Best practices for using ARIA roles, properties, and states.</p>
            </div>
            <div className="resource-item">
              <h4>WebAIM</h4>
              <p>Resources and tools for evaluating and improving web accessibility.</p>
            </div>
            <div className="resource-item">
              <h4>Accessibility Checker Tools</h4>
              <p>WAVE, Axe DevTools, and Lighthouse for comprehensive audits.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="glass-card accessibility-contact" id="contact-accessibility">
          <h2>Accessibility Questions or Issues?</h2>
          <p>
            Have accessibility concerns about our website? Found something that doesn't work for you?
            Please reach out—we want to know so we can improve.
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <h4>📧 Email</h4>
              <p>accessibility@pfitglobal.com</p>
            </div>
            <div className="contact-method">
              <h4>📞 Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-method">
              <h4>💬 Contact Form</h4>
              <p><a href="#" onClick={() => handleNavClick('/#contact')}>Submit accessibility feedback</a></p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2026 PFit Global Solutions. Committed to Accessibility & Inclusion.</p>
          <div className="footer-links">
            <a href="#" onClick={() => handleNavClick('/')}>Home</a>
            <a href="/accessibility">Accessibility Statement</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Accessibility


      {/* Hero Section */}
      <header className="hero-panel accessibility-hero">
        <section className="hero-content">
          <span className="eyebrow">Our Commitment</span>
          <h1>Expert Solutions for Seamless Web Accessibility!</h1>
          <p>
            Transform your website into an inclusive space where everyone can navigate, interact, and thrive.
            We're committed to WCAG compliance and universal design principles.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#features">
              Learn Our Standards
            </a>
            <a className="btn secondary" href="#contact-accessibility">
              Get Accessibility Audit
            </a>
          </div>
        </section>
      </header>

      <main className="content-grid">
        {/* Statement */}
        <section className="glass-card accessibility-statement" id="statement">
          <h2>Our Accessibility Promise</h2>
          <p>
            At PFit Global Solutions, we believe the web should be accessible to everyone, regardless of ability or disability.
            We design and develop websites that comply with international accessibility standards and best practices.
          </p>
          <p>
            Our team understands that accessibility isn't an afterthought—it's a fundamental aspect of good design.
            Every project we undertake is built with inclusive design principles from the ground up.
          </p>
        </section>

        {/* Features Section */}
        <section className="accessibility-features-section" id="features">
          <h2 className="section-title">Our Accessibility Features</h2>
          <div className="accessibility-grid">
            {accessibilityFeatures.map((feature, idx) => (
              <article key={idx} className="glass-card accessibility-feature-card">
                <span className="feature-emoji">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* WCAG Standards */}
        <section className="glass-card wcag-section">
          <h2>WCAG 2.1 Compliance Levels</h2>
          <div className="wcag-standards">
            {wcagStandards.map((standard, idx) => (
              <div key={idx} className="wcag-item">
                <div className="wcag-header">
                  <h4>{standard.level}</h4>
                  <span className="wcag-status">{standard.status}</span>
                </div>
                <p>{standard.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accessibility Principles */}
        <section className="glass-card principles-section">
          <h2>Our Core Principles</h2>
          <div className="principles-grid">
            <div className="principle">
              <h4>Perceivable</h4>
              <p>Content must be presented in ways users can perceive with their senses.</p>
            </div>
            <div className="principle">
              <h4>Operable</h4>
              <p>Users must be able to navigate and interact with all functionality.</p>
            </div>
            <div className="principle">
              <h4>Understandable</h4>
              <p>Content and operations must be clear and easy to comprehend.</p>
            </div>
            <div className="principle">
              <h4>Robust</h4>
              <p>Content must work with current and future assistive technologies.</p>
            </div>
          </div>
        </section>

        {/* Implementation */}
        <section className="glass-card implementation-section">
          <h2>How We Implement Accessibility</h2>
          <ol className="implementation-steps">
            <li>
              <strong>Audit & Assessment</strong> — We conduct thorough accessibility audits using WAVE, Axe, and manual testing.
            </li>
            <li>
              <strong>Semantic HTML</strong> — Proper markup ensures screen readers and assistive tech work correctly.
            </li>
            <li>
              <strong>Color & Contrast</strong> — We maintain WCAG AA standards for color contrast ratios.
            </li>
            <li>
              <strong>ARIA Labels</strong> — Enhanced semantic meaning for complex interactive components.
            </li>
            <li>
              <strong>Keyboard Navigation</strong> — All features accessible via keyboard alone (Tab, Enter, Arrows).
            </li>
            <li>
              <strong>Testing & Validation</strong> — Ongoing testing with real users, assistive devices, and automated tools.
            </li>
          </ol>
        </section>

        {/* Resources */}
        <section className="glass-card resources-section">
          <h2>Accessibility Resources</h2>
          <div className="resources-list">
            <div className="resource-item">
              <h4>W3C Web Accessibility Initiative</h4>
              <p>Official guidelines and standards for web accessibility.</p>
            </div>
            <div className="resource-item">
              <h4>ARIA Authoring Practices</h4>
              <p>Best practices for using ARIA roles, properties, and states.</p>
            </div>
            <div className="resource-item">
              <h4>WebAIM</h4>
              <p>Resources and tools for evaluating and improving web accessibility.</p>
            </div>
            <div className="resource-item">
              <h4>Accessibility Checker Tools</h4>
              <p>WAVE, Axe DevTools, and Lighthouse for comprehensive audits.</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="glass-card accessibility-contact" id="contact-accessibility">
          <h2>Accessibility Questions or Issues?</h2>
          <p>
            Have accessibility concerns about our website? Found something that doesn't work for you?
            Please reach out—we want to know so we can improve.
          </p>
          <div className="contact-methods">
            <div className="contact-method">
              <h4>📧 Email</h4>
              <p>accessibility@pfitglobal.com</p>
            </div>
            <div className="contact-method">
              <h4>📞 Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-method">
              <h4>💬 Contact Form</h4>
              <p><a href="/#contact">Submit accessibility feedback</a></p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2026 PFit Global Solutions. Committed to Accessibility & Inclusion.</p>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/accessibility">Accessibility Statement</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Accessibility
