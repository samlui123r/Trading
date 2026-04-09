# ScaleUp Landing Page

A high-converting, full-stack landing page built with modern web technologies.

## Features

### Frontend
- **Modern Design**: Clean, professional UI with gradient accents and smooth animations
- **Responsive Layout**: Fully responsive design that works on all devices
- **Conversion Optimized**:
  - Above-the-fold lead capture form
  - Social proof elements (user avatars, live join counter)
  - Trust signals (security badges, testimonials)
  - Multiple CTAs throughout the page
  - Clear value proposition
- **Interactive Elements**:
  - Smooth scroll navigation
  - Form validation
  - Success state feedback
  - Live stats updates

### Backend
- **Express.js Server**: Lightweight Node.js backend
- **Lead Capture API**: `/api/lead` endpoint for collecting leads
- **Stats API**: `/api/stats` endpoint for social proof data
- **Input Validation**: Email format and required field validation
- **CORS Enabled**: Ready for production deployment

## Project Structure

```
landing-page/
├── public/
│   └── index.html          # Main landing page
├── server/
│   └── index.js            # Express backend
├── package.json            # Dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Navigate to the project directory:
```bash
cd landing-page
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## API Endpoints

### POST /api/lead
Submit a new lead.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Inc"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you! We will be in touch soon."
}
```

### GET /api/stats
Get lead statistics for social proof.

**Response:**
```json
{
  "totalLeads": 42,
  "joinedToday": 5
}
```

## Conversion Optimization Features

1. **Hero Section**
   - Compelling headline with gradient text
   - Clear value proposition
   - Embedded lead form (no modal)
   - Social proof with avatars and counter

2. **Features Section**
   - Six key benefits with icons
   - Hover animations for engagement
   - Benefit-focused copy

3. **Testimonials**
   - Four customer reviews
   - Star ratings
   - Author credentials

4. **Final CTA**
   - Gradient background
   - Clear action button
   - Links back to form

5. **Trust Signals**
   - Security messaging
   - "No credit card required"
   - "No spam" guarantee

## Customization

### Colors
Edit CSS variables in `public/index.html`:
```css
:root {
    --primary: #4F46E5;      /* Main brand color */
    --primary-dark: #4338CA; /* Darker variant */
    --secondary: #10B981;    /* Success/accent color */
}
```

### Content
- Update company name, features, and testimonials in `public/index.html`
- Modify form fields as needed
- Adjust copy to match your value proposition

### Backend Integration
To connect to a real database or email service:

1. Replace the in-memory `leads` array with database calls
2. Add email sending with nodemailer or similar
3. Integrate with CRM (HubSpot, Salesforce, etc.)
4. Add webhook notifications for new leads

## Production Deployment

1. Set environment variables:
```bash
export PORT=3000
export NODE_ENV=production
```

2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server/index.js
```

3. Deploy to platforms like:
   - Heroku
   - Vercel (with serverless functions)
   - AWS Elastic Beanstalk
   - DigitalOcean App Platform

## License

MIT License - feel free to use this template for your projects!
