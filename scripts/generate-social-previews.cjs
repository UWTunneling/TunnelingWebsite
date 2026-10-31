// Render the shared WT social-card design with Sharp: node scripts/generate-social-previews.cjs
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const logo = fs.readFileSync(path.join(root, 'assets/images/logo-washington-tunneling.png')).toString('base64');
const cards = {
  general: ['Engineering below the surface.', 'Student-built tunneling technology at the University of Washington.'],
  about: ['Our Team', 'Meet the students behind Washington Tunneling.'],
  tbm: ['Our Tunnel Boring Machine', 'Explore the design, systems, and engineering behind our TBM.'],
  sponsor: ['Support Washington Tunneling', 'Help students design, build, and test the next machine.'],
  joinus: ['Join the Team', 'Build practical skills. Take on real engineering challenges.'],
  contact: ['Get in Touch', 'Connect with Washington Tunneling.'],
};
(async () => {
  for (const [key, [title, subtitle]] of Object.entries(cards)) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#101010"/>
      <path d="M980 0H1200V630H1100Z" fill="#191323"/>
      <path d="M1060 0L1200 630" stroke="#5922e4" stroke-width="3"/>
      <image href="data:image/png;base64,${logo}" x="72" y="62" width="480" height="132"/>
      <text x="76" y="260" fill="#bda3ff" font-family="Arial, sans-serif" font-size="18" letter-spacing="3">UNIVERSITY OF WASHINGTON</text>
      <text x="72" y="358" fill="#fafafa" font-family="Arial, sans-serif" font-weight="700" font-size="${title.length > 28 ? 48 : 54}">${title}</text>
      <text x="76" y="416" fill="#c8c3cf" font-family="Arial, sans-serif" font-size="25">${subtitle}</text>
      <path d="M76 508H154" stroke="#ffc005" stroke-width="5"/>
      <text x="76" y="566" fill="#aaa" font-family="Arial, sans-serif" font-size="19">washingtontunneling.org${key === 'general' ? '' : '/' + (key === 'joinus' ? 'joinus' : key)}</text>
    </svg>`;
    await sharp(Buffer.from(svg)).png().toFile(path.join(root, `assets/images/wt-social-${key}.png`));
  }
})();
