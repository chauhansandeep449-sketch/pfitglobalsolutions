import React from 'react'

function Privacy() {
  const handleNavClick = (path) => {
    window.history.pushState(null, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  const lastUpdated = 'May 15, 2026'

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
      <header className="hero-panel privacy-hero">
        <section className="hero-content">
          <span className="eyebrow">Your Privacy Matters</span>
          <h1>Privacy Policy</h1>
          <p>
            Transparency and trust are fundamental to our business. Learn how we collect, use, and protect your data.
          </p>
          <p className="last-updated">Last Updated: {lastUpdated}</p>
        </section>
      </header>

      <main className="content-grid">
        {/* Table of Contents */}
        <section className="glass-card table-of-contents">
          <h2>Quick Links</h2>
          <nav className="toc-list">
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#information-we-collect">Information We Collect</a></li>
              <li><a href="#how-we-use">How We Use Your Information</a></li>
              <li><a href="#data-sharing">Data Sharing & Disclosure</a></li>
              <li><a href="#data-security">Data Security</a></li>
              <li><a href="#your-rights">Your Rights & Choices</a></li>
              <li><a href="#cookies">Cookies & Tracking</a></li>
              <li><a href="#third-party">Third-Party Links</a></li>
              <li><a href="#children">Children's Privacy</a></li>
              <li><a href="#international">International Users</a></li>
              <li><a href="#contact-privacy">Contact Us</a></li>
            </ul>
          </nav>
        </section>

        {/* Introduction */}
        <section className="glass-card privacy-section" id="introduction">
          <h2>1. Introduction</h2>
          <p>
            Welcome to PFit Global Solutions ("Company," "We," "Us," or "Our"). We are committed to protecting your privacy and ensuring you have a positive experience on our website.
          </p>
          <p>
            This Privacy Policy explains our information practices, what data we collect, how we use it, and your rights regarding your personal information. It applies to all users of our website, applications, and services (collectively, the "Services").
          </p>
          <p>
            By accessing or using our Services, you consent to the practices described in this Privacy Policy. If you do not agree with our practices, please do not use our Services.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="glass-card privacy-section" id="information-we-collect">
          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide Directly</h3>
          <p>We collect information you voluntarily provide, including:</p>
          <ul className="info-list">
            <li><strong>Contact Forms:</strong> Name, email address, phone number, company name, and message content</li>
            <li><strong>Account Registration:</strong> Username, password, profile information, and preferences</li>
            <li><strong>Inquiry & Support:</strong> Details about service requests, questions, or feedback</li>
            <li><strong>Newsletter Signup:</strong> Email address for marketing communications</li>
            <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by third parties)</li>
            <li><strong>Communications:</strong> Any information shared in emails, chats, or support tickets</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <p>We automatically collect certain information when you visit our website:</p>
          <ul className="info-list">
            <li><strong>Browser & Device Data:</strong> Browser type, operating system, device type, device ID</li>
            <li><strong>Browsing Activity:</strong> Pages visited, time spent on pages, clicks, scrolling behavior</li>
            <li><strong>Access Information:</strong> IP address, referring/exit pages, access times and dates</li>
            <li><strong>Location Data:</strong> Approximate geographic location (country, state, city level)</li>
            <li><strong>Cookies & Tracking:</strong> Unique identifiers stored on your device</li>
            <li><strong>Usage Analytics:</strong> Search queries, features used, actions taken</li>
          </ul>

          <h3>2.3 Information from Third Parties</h3>
          <p>We may receive information about you from:</p>
          <ul className="info-list">
            <li>Analytics providers (Google Analytics, Vercel Analytics)</li>
            <li>Marketing platforms (email service providers, social media)</li>
            <li>Payment processors and financial institutions</li>
            <li>Data brokers and aggregators</li>
            <li>Publicly available sources and social media platforms</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="glass-card privacy-section" id="how-we-use">
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information for the following purposes:</p>

          <div className="purposes-grid">
            <div className="purpose-item">
              <h4>📧 Service Delivery</h4>
              <p>Responding to inquiries, processing requests, delivering services, and providing customer support</p>
            </div>
            <div className="purpose-item">
              <h4>📊 Analytics & Improvement</h4>
              <p>Understanding user behavior, improving website performance, and optimizing user experience</p>
            </div>
            <div className="purpose-item">
              <h4>📢 Marketing & Communications</h4>
              <p>Sending promotional emails, newsletters, updates about services, and relevant information (with consent)</p>
            </div>
            <div className="purpose-item">
              <h4>🔒 Security & Compliance</h4>
              <p>Protecting against fraud, ensuring security, detecting misuse, and complying with legal obligations</p>
            </div>
            <div className="purpose-item">
              <h4>📝 Research & Development</h4>
              <p>Conducting surveys, analyzing trends, developing new features, and improving our services</p>
            </div>
            <div className="purpose-item">
              <h4>⚖️ Legal Requirements</h4>
              <p>Complying with court orders, government requests, and applicable laws and regulations</p>
            </div>
          </div>

          <p>
            <strong>Note:</strong> We will not use your information in ways you have not authorized. Marketing communications are sent only with your consent.
          </p>
        </section>

        {/* Data Sharing & Disclosure */}
        <section className="glass-card privacy-section" id="data-sharing">
          <h2>4. Data Sharing & Disclosure</h2>

          <h3>4.1 We Do NOT Sell Your Data</h3>
          <p>
            PFit Global Solutions does not sell, trade, rent, or lease your personal information to third parties for their marketing purposes.
          </p>

          <h3>4.2 When We Share Information</h3>
          <p>We may share your information in the following situations:</p>
          <ul className="info-list">
            <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf (hosting, email, analytics) under confidentiality agreements</li>
            <li><strong>Business Partners:</strong> Affiliated companies or partners with your consent</li>
            <li><strong>Legal Compliance:</strong> When required by law, court order, or government request</li>
            <li><strong>Fraud Prevention:</strong> To protect against fraud, security threats, or illegal activity</li>
            <li><strong>Business Transitions:</strong> In case of merger, acquisition, bankruptcy, or sale of assets</li>
            <li><strong>Aggregate Data:</strong> Anonymous, aggregated information that cannot identify you</li>
            <li><strong>With Your Consent:</strong> When you explicitly authorize sharing with specific third parties</li>
          </ul>

          <h3>4.3 Third-Party Service Providers</h3>
          <p>We use the following third-party services:</p>
          <ul className="info-list">
            <li><strong>Vercel:</strong> Website hosting and deployment</li>
            <li><strong>Email Services:</strong> Newsletter and communication delivery</li>
            <li><strong>Analytics:</strong> Google Analytics for website usage analysis</li>
            <li><strong>Payment Processing:</strong> Secure payment gateways for transactions</li>
          </ul>
          <p>These providers have their own privacy policies and are contractually obligated to protect your data.</p>
        </section>

        {/* Data Security */}
        <section className="glass-card privacy-section" id="data-security">
          <h2>5. Data Security</h2>

          <h3>5.1 Security Measures</h3>
          <p>We implement industry-standard security measures to protect your information:</p>
          <ul className="info-list">
            <li>SSL/TLS encryption for data in transit</li>
            <li>HTTPS protocol for all website communications</li>
            <li>Secure password hashing and storage</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security audits and updates</li>
            <li>Firewalls and intrusion detection systems</li>
            <li>Secure data centers with physical access controls</li>
          </ul>

          <h3>5.2 Limitations</h3>
          <p>
            While we take security seriously, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security, and transmission of data to our website is at your own risk.
          </p>

          <h3>5.3 Data Retention</h3>
          <p>
            We retain your information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. You may request deletion of your data at any time (subject to legal obligations).
          </p>
        </section>

        {/* Your Rights & Choices */}
        <section className="glass-card privacy-section" id="your-rights">
          <h2>6. Your Rights & Choices</h2>

          <h3>6.1 Access & Portability</h3>
          <p>You have the right to request a copy of the personal information we hold about you in a portable format.</p>

          <h3>6.2 Correction & Deletion</h3>
          <p>
            You can request that we correct inaccurate information or delete your personal data. We will comply within applicable legal timeframes (typically 30 days).
          </p>

          <h3>6.3 Opt-Out of Marketing</h3>
          <p>
            You can unsubscribe from marketing emails by clicking the "Unsubscribe" link in our communications or by contacting us directly. We will honor opt-out requests within 10 business days.
          </p>

          <h3>6.4 Cookie Management</h3>
          <p>
            You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Note that disabling cookies may affect website functionality.
          </p>

          <h3>6.5 California Consumer Rights (CCPA)</h3>
          <p>
            If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA):
          </p>
          <ul className="info-list">
            <li>Right to know what personal information is collected</li>
            <li>Right to know whether your personal information is sold or disclosed</li>
            <li>Right to say no to the selling or sharing of your personal information</li>
            <li>Right to access, delete, and correct your personal information</li>
            <li>Right to non-discrimination for exercising your privacy rights</li>
          </ul>

          <h3>6.6 GDPR Rights (EU Residents)</h3>
          <p>
            If you are located in the European Union, you have rights under the General Data Protection Regulation (GDPR):
          </p>
          <ul className="info-list">
            <li>Right to access your data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to lodge a complaint with your data protection authority</li>
          </ul>
        </section>

        {/* Cookies & Tracking */}
        <section className="glass-card privacy-section" id="cookies">
          <h2>7. Cookies & Tracking Technologies</h2>

          <h3>7.1 What Are Cookies?</h3>
          <p>
            Cookies are small text files stored on your device that help us remember your preferences and improve your experience. We use both session cookies (temporary) and persistent cookies (long-term).
          </p>

          <h3>7.2 Types of Cookies We Use</h3>
          <ul className="info-list">
            <li><strong>Essential Cookies:</strong> Required for website functionality (authentication, security)</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Marketing Cookies:</strong> Track your interests for targeted marketing</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          </ul>

          <h3>7.3 Other Tracking Technologies</h3>
          <p>We may use:</p>
          <ul className="info-list">
            <li>Pixels and web beacons</li>
            <li>Local storage and session storage</li>
            <li>Analytics tools and heatmaps</li>
            <li>Cross-device tracking</li>
          </ul>

          <h3>7.4 Controlling Cookies</h3>
          <p>
            You can control cookies through your browser settings. Visit <strong>www.allaboutcookies.org</strong> for instructions specific to your browser.
          </p>
        </section>

        {/* Third-Party Links */}
        <section className="glass-card privacy-section" id="third-party">
          <h2>8. Third-Party Links & Services</h2>

          <p>
            Our website may contain links to third-party websites and services. We are not responsible for their privacy practices or content. We recommend reviewing their privacy policies before providing any information.
          </p>

          <p>
            Third-party services may use cookies and tracking technologies independently of our website. Their use of your information is governed by their privacy policies, not ours.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="glass-card privacy-section" id="children">
          <h2>9. Children's Privacy</h2>

          <p>
            Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13.
          </p>

          <p>
            If we become aware that we have collected information from a child under 13 without parental consent, we will take steps to delete such information and terminate the child's account immediately.
          </p>

          <p>
            For children ages 13-18, we limit information collection and provide additional privacy protections. Parents or guardians may contact us to review or delete their child's information.
          </p>
        </section>

        {/* International Users */}
        <section className="glass-card privacy-section" id="international">
          <h2>10. International Users & Data Transfers</h2>

          <p>
            Our Services are operated from the United States. By using our Services, you consent to the transfer of your information to the United States and other countries, which may have different data protection laws.
          </p>

          <p>
            For users in the EU/EEA, we comply with GDPR requirements for international data transfers, including:
          </p>
          <ul className="info-list">
            <li>Standard Contractual Clauses (SCC)</li>
            <li>Privacy Shield framework (where applicable)</li>
            <li>Adequacy decisions</li>
          </ul>
        </section>

        {/* Contact Us */}
        <section className="glass-card privacy-section" id="contact-privacy">
          <h2>11. Contact Us</h2>

          <p>
            If you have questions about this Privacy Policy, wish to exercise your rights, or have privacy concerns, please contact us:
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <h4>📧 Email</h4>
              <p>
                <a href="mailto:privacy@pfitglobal.com">privacy@pfitglobal.com</a>
              </p>
            </div>
            <div className="contact-item">
              <h4>📬 Mailing Address</h4>
              <p>
                PFit Global Solutions<br />
                Privacy Team<br />
                123 Global Street<br />
                Washington, D.C. 20001<br />
                United States
              </p>
            </div>
            <div className="contact-item">
              <h4>📞 Phone</h4>
              <p>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </p>
            </div>
          </div>

          <p className="response-time">
            <strong>Response Time:</strong> We will respond to privacy requests within 30 days (or as required by law).
          </p>
        </section>

        {/* Updates to Policy */}
        <section className="glass-card privacy-section">
          <h2>12. Updates to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by updating the "Last Updated" date above and, if significant, by sending you an email notification.
          </p>

          <p>
            Your continued use of our Services after updates indicates your acceptance of the revised policy. We encourage you to review this policy periodically to stay informed about how we protect your privacy.
          </p>
        </section>

        {/* Summary */}
        <section className="glass-card privacy-summary">
          <h2>Your Privacy at a Glance</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>✅ What We Do</h4>
              <ul>
                <li>Protect your data with encryption</li>
                <li>Honor your privacy preferences</li>
                <li>Provide transparency</li>
                <li>Comply with applicable laws</li>
              </ul>
            </div>
            <div className="summary-item">
              <h4>❌ What We Don't Do</h4>
              <ul>
                <li>Sell your personal information</li>
                <li>Share data without consent</li>
                <li>Use deceptive practices</li>
                <li>Collect from children under 13</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2026 PFit Global Solutions. Privacy is our commitment.</p>
          <div className="footer-links">
            <a href="#" onClick={() => handleNavClick('/')}>Home</a>
            <a href="#" onClick={() => handleNavClick('/accessibility')}>Accessibility</a>
            <a href="#" onClick={() => handleNavClick('/privacy')}>Privacy Policy</a>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Privacy
