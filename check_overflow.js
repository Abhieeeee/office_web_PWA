const fs = require('fs');

const css = fs.readFileSync('C:/Users/DELL/.gemini/antigravity/scratch/shree-anjani-b2b/styles.css', 'utf8');

// Find all rules with min-width greater than 300px
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('min-width:') && !line.includes('@media')) {
    const match = line.match(/min-width:\s*(\d+)px/);
    if (match && parseInt(match[1]) > 300) {
      console.log(`Line ${idx+1}: ${line.trim()}`);
    }
  }
  if (line.includes('100vw')) {
    console.log(`Line ${idx+1} (100vw): ${line.trim()}`);
  }
});
