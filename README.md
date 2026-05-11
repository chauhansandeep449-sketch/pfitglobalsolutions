# PFit Global Solutions

A modern, full-stack website with **React frontend** and **Node.js backend**, featuring a premium glassmorphism UI theme and responsive design.

## Overview

This project showcases a professional digital agency website built with cutting-edge web technologies:

- **Frontend**: React 18 + Vite with glassmorphism styling
- **Backend**: Express.js REST API with comprehensive endpoints
- **Design**: Dark theme with gradient overlays, smooth transitions, and accessible UI
- **Responsive**: Mobile-first approach with breakpoints for all devices

## Project Structure

```
pfitglobalsolutions/
├── frontend/                 # React application
│   ├── src/
│   │   ├── App.jsx          # Main component with all page sections
│   │   ├── main.jsx         # App entry point
│   │   └── index.css        # Global styling with glassmorphism effects
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
└── backend/                 # Express server
    ├── server.js            # API endpoints and middleware
    └── package.json         # Backend dependencies
```

## Features

### Frontend
- **Hero Section** - Compelling headline with call-to-action buttons
- **About Section** - Company overview with impressive statistics
- **Services** - 6 service cards with icons and descriptions
- **Portfolio** - 3 project showcases with case study links
- **Process** - Step-by-step workflow explanation
- **Tech Stack** - Technology breakdown by category
- **Contact Form** - Fully functional form with validation
- **Footer** - Links and copyright information

### Backend
- **REST API** with CORS support
- **Contact Management** - Form submission handling and storage
- **Services Endpoint** - Retrieve available services
- **Portfolio Endpoint** - Get project data
- **Newsletter Subscription** - Email subscription handling
- **Error Handling** - Comprehensive error responses
- **Admin Endpoints** - View all submissions

### Design
- **Glassmorphism UI** - Frosted glass effect with backdrop blur
- **Color Palette** - Deep blues, purples, and cyan accents
- **Gradient Text** - Eye-catching heading styles
- **Smooth Animations** - Hover effects and transitions
- **Dark Theme** - Eye-friendly modern aesthetic

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Quick Start

#### 1. Clone the Repository
```bash
git clone https://github.com/chauhansandeep449-sketch/pfitglobalsolutions.git
cd pfitglobalsolutions
```

#### 2. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Start the Frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173`

#### 4. Open in Browser
Navigate to `http://localhost:5173` and you'll see the website!

## API Endpoints

### Base URL: `http://localhost:5000/api`

#### Get Status
```
GET /api/status
```
Returns basic API health info.

#### Get Services
```
GET /api/services
```
Returns list of available services.

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Let's work together..."
}
```

#### Get All Contacts (Admin)
```
GET /api/contacts
```
Returns all contact submissions.

#### Subscribe to Newsletter
```
POST /api/subscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Get Portfolio
```
GET /api/portfolio
```
Returns portfolio projects.

## Build for Production

### Frontend Build
```bash
cd frontend
npm run build
npm run preview  # Preview production build locally
```

Output will be in `frontend/dist/` directory.

### Deployment Options
- **Frontend**: Vercel, Netlify, GitHub Pages, AWS S3 + CloudFront
- **Backend**: Heroku, Railway, AWS EC2, DigitalOcean, Render

## Development Tips

### Customizing Styles
Edit `frontend/src/index.css` to modify:
- Colors (`:root` variables)
- Breakpoints for responsive design
- Component-specific styles

### Adding New Sections
1. Add component code in `frontend/src/App.jsx`
2. Add corresponding styles in `index.css`
3. Update component data arrays for easy content management

### Modifying API
Edit `backend/server.js` to:
- Add new endpoints
- Connect to a database (MongoDB, PostgreSQL, etc.)
- Implement authentication
- Add file upload handling

## Technologies Used

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Node.js, Express.js
- **Build Tools**: Vite, npm
- **Styling**: CSS3 with glassmorphism effects
- **API**: RESTful JSON API with CORS

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics

- Optimized bundle size with Vite
- Fast page load times with minimal dependencies
- Responsive images and lazy loading ready
- CSS animations for smooth 60fps interactions

## License

MIT License - Free to use and modify

## Contributing

Contributions are welcome! Feel free to:
- Report issues
- Submit pull requests
- Suggest improvements

## Support

For questions or support, reach out via the contact form on the website or email: support@pfitglobal.com

## Roadmap

- [ ] Backend database integration (MongoDB/PostgreSQL)
- [ ] Email notification system
- [ ] Admin dashboard
- [ ] Blog section
- [ ] Team member profiles
- [ ] Testimonials slider
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

---

**Built with 💜 by PFit Global Solutions**
