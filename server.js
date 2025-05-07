const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve main.js from src for development (adjust build process for production)
app.use('/js', express.static(path.join(__dirname, 'src'))); 

// Serve matter.js from node_modules
app.use('/js/matter.js', express.static(path.join(__dirname, 'node_modules/matter-js/build/matter.js')));

// Basic route for the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

console.log("done.");