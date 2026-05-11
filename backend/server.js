import express from 'express'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// In-memory storage for demo (replace with database in production)
let contacts = []
let submissions = []

// Health check endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Welcome to PFit Global Solutions API',
    timestamp: new Date().toISOString(),
  })
})

// Get all services (mock data)
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Web Design & Development',
      description: 'Custom React applications with glassmorphism UI, responsive layouts, and optimal performance.',
    },
    {
      id: 2,
      title: 'Backend API Solutions',
      description: 'Scalable Node.js servers, REST APIs, database integration, and cloud deployment.',
    },
    {
      id: 3,
      title: 'UI/UX Strategy',
      description: 'User-centered design, accessibility standards, and engaging interactive experiences.',
    },
  ]
  res.json({ status: 'success', data: services })
})

// Contact form submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, message } = req.body

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, email, and message are required.',
      })
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address.',
      })
    }

    // Store the contact
    const contact = {
      id: contacts.length + 1,
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    }

    contacts.push(contact)

    // Log it
    console.log(`New contact from ${name} (${email}): ${message}`)

    res.status(201).json({
      status: 'success',
      message: "Thank you! We've received your message and will get back to you soon.",
      data: contact,
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while processing your request.',
    })
  }
})

// Get all contacts (admin endpoint - for demonstration)
app.get('/api/contacts', (req, res) => {
  res.json({
    status: 'success',
    data: contacts,
    count: contacts.length,
  })
})

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolio = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'React + Node',
      description: 'Full-stack shopping experience with real-time inventory and payment processing.',
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      category: 'Analytics',
      description: 'Data visualization with charts, reports, and user management systems.',
    },
    {
      id: 3,
      title: 'Mobile Web App',
      category: 'Progressive Web App',
      description: 'Responsive app for iOS, Android, and desktop with offline capability.',
    },
  ]
  res.json({ status: 'success', data: portfolio })
})

// Newsletter subscription (example)
app.post('/api/subscribe', (req, res) => {
  try {
    const { email } = req.body

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address.',
      })
    }

    submissions.push({ email, subscribedAt: new Date().toISOString() })

    res.json({
      status: 'success',
      message: 'Thank you for subscribing!',
    })
  } catch (error) {
    console.error('Subscription error:', error)
    res.status(500).json({
      status: 'error',
      message: 'An error occurred during subscription.',
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred.',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found.',
  })
})

// Start server
app.listen(port, () => {
  console.log(`✨ PFit Global Solutions API running on http://localhost:${port}`)
  console.log(`API Documentation: http://localhost:${port}/api/status`)
})
