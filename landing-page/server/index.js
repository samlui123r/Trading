const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// In-memory storage for leads (in production, use a database)
const leads = [];

// API endpoint to handle lead submission
app.post('/api/lead', (req, res) => {
  const { name, email, company } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Name and email are required' 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  // Store the lead
  const lead = {
    id: Date.now(),
    name,
    email,
    company: company || '',
    timestamp: new Date().toISOString()
  };
  
  leads.push(lead);

  console.log('New lead captured:', lead);

  // In production, you would:
  // 1. Send confirmation email
  // 2. Add to CRM
  // 3. Trigger notifications

  res.json({ 
    success: true, 
    message: 'Thank you! We will be in touch soon.' 
  });
});

// API endpoint to get lead count (for social proof)
app.get('/api/stats', (req, res) => {
  res.json({
    totalLeads: leads.length,
    joinedToday: leads.filter(lead => {
      const today = new Date().toDateString();
      return new Date(lead.timestamp).toDateString() === today;
    }).length
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Capturing leads and tracking conversions`);
});
