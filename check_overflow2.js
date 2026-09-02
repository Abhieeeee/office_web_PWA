const fs = require('fs');

const css = fs.readFileSync('C:/Users/DELL/.gemini/antigravity/scratch/shree-anjani-b2b/styles.css', 'utf8');

// Search for any widths or min-widths that could cause overflow on 320px-400px mobile
const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.match(/(min-width|width):\s*(\d+)px/)) {
    const match = line.match(/(min-width|width):\s*(\d+)px/);
    const val = parseInt(match[2]);
    if (val > 280 && !line.includes('max-width') && !line.includes('--container-width')) {
      console.log(`Line ${idx+1}: ${line.trim()}`);
    }
  }
  if (line.includes('overflow-x') || line.includes('nowrap') || line.includes('flex-shrink: 0')) {
    if (idx < 500) {
      console.log(`Header Line ${idx+1}: ${line.trim()}`);
    }
  }
});
