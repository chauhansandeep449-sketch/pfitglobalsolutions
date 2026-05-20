import React from 'react'

function Terms() {
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
          <a href="/accessibility">Accessibility</a>
          <a href="#" onClick={() => handleNavClick('/privacy')}>Privacy Policy</a>
        </div>
      </nav>

      <header className="hero-panel terms-hero">
        <section className="hero-content">
          <span className="eyebrow">Terms of Service</span>
          <h1>Welcome to PFit Global Solutions</h1>
          <p>
            These terms govern your use of our website and services. Please read them carefully before engaging with our products or contacting us.
          </p>
        </section>
      </header>

      <main className="content-grid">
        <section className="glass-card terms-section" id="terms-intro">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the PFit Global Solutions website and services, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
          </p>
        </section>

        <section className="glass-card terms-section" id="service-use">
          <h2>2. Use of Services</h2>
          <p>
            Our website provides information about digital services, including design, development, and consulting. You may use the content for personal, non-commercial purposes only unless we agree otherwise in writing.
          </p>
          <ul className="info-list">
            <li>Users must provide accurate information when requesting services.</li>
            <li>Unauthorized use of the website or its content is prohibited.</li>
            <li>We may suspend access for misuse, abuse, or breach of these terms.</li>
          </ul>
        </section>

        <section className="glass-card terms-section" id="client-responsibilities">
          <h2>3. Client Responsibilities</h2>
          <p>
            Clients are responsible for providing timely feedback, required assets, and clear instructions to support successful delivery of services.
          </p>
          <ul className="info-list">
            <li>Review and approve mockups, designs, and deliverables promptly.</li>
            <li>Provide access to necessary systems, accounts, and third-party tools.</li>
            <li>Maintain communication and respond to questions during the project.</li>
          </ul>
        </section>

        <section className="glass-card terms-section" id="intellectual-property">
          <h2>4. Intellectual Property</h2>
          <p>
            Unless otherwise agreed in writing, PFit Global Solutions retains ownership of all design and development materials created during the project until payment is received in full.
          </p>
          <p>
            After full payment, rights to deliverables will transfer as agreed in the project scope. We may use general experience and knowledge gained while working on the project in future work.
          </p>
        </section>

        <section className="glass-card terms-section" id="payments-refunds">
          <h2>5. Payments & Refunds</h2>
          <p>
            Payment terms, milestones, and refund policies are defined in individual service agreements. Fees for services are due as agreed in the contract or invoice.
          </p>
          <ul className="info-list">
            <li>Late payments may incur additional charges or delay project delivery.</li>
            <li>Refunds are provided only where specified in the service agreement.</li>
          </ul>
        </section>

        <section className="glass-card terms-section" id="disclaimer">
          <h2>6. Disclaimer</h2>
          <p>
            The website and services are provided "as is" without warranties of any kind. We do not guarantee that the services will meet your specific expectations or be error-free.
          </p>
        </section>

        <section className="glass-card terms-section" id="liability">
          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, PFit Global Solutions is not liable for indirect, incidental, or consequential damages arising from the use of our website or services.
          </p>
        </section>

        <section className="glass-card terms-section" id="changes-terms">
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will post changes on this page and update the date when the terms were last revised.
          </p>
        </section>

        <section className="glass-card terms-section" id="contact-terms">
          <h2>9. Contact Us</h2>
          <p>
            If you have questions about these terms or require more information, please contact us through our website or email us at support@pfitglobal.com.
          </p>
        </section>

        <footer className="footer">
          <p>&copy; 2026 PFit Global Solutions. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" onClick={() => handleNavClick('/')}>Home</a>
            <a href="#" onClick={() => handleNavClick('/privacy')}>Privacy Policy</a>
            <a href="#" onClick={() => handleNavClick('/accessibility')}>Accessibility</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Terms
