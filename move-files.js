/* eslint-disable no-undef */
const fs = require('fs');

try {
  fs.mkdirSync('src/features/portfolio', { recursive: true });
  if (fs.existsSync('src/pages/Landing.jsx')) {
    fs.renameSync('src/pages/Landing.jsx', 'src/features/portfolio/Landing.jsx');
  }
  
  if (fs.existsSync('src/pages/portfolio')) {
    const portfolioFiles = fs.readdirSync('src/pages/portfolio');
    for(const f of portfolioFiles) {
      if(f.endsWith('.jsx')) {
        fs.renameSync('src/pages/portfolio/' + f, 'src/features/portfolio/' + f);
      }
    }
  }

  // Remove the old pages directory safely
  fs.rmSync('src/pages', { recursive: true, force: true });
  console.log('Successfully moved portfolio files and deleted old pages directory.');
} catch (e) {
  console.error('Error:', e);
}
