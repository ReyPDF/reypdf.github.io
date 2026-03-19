const fs = require('fs');
const path = require('path');

const docsDir = './docs';
const outputJson = './data/files.json';
const pdfDir = './pdf';
const baseUrl = 'https://reypdf.github.io'; // CHANGE THIS

// Ensure folders exist
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

// Read PDF files
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.pdf'));

let jsonData = [];
let sitemapEntries = [];

files.forEach(file => {
  const name = file.replace('.pdf', '').replace(/-/g, ' ');
  const filePath = `docs/${file}`;
  const pagePath = `pdf/${file.replace('.pdf', '.html')}`;

  // JSON entry
  jsonData.push({
    name: name,
    file: filePath,
    page: pagePath
  });

  // Generate HTML page
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>${name} PDF Download</title>
  <meta name="description" content="Download ${name} PDF for free.">
</head>
<body>

<h1>${name}</h1>

<p>Download ${name} PDF for free.</p>

<iframe src="../${filePath}" width="600" height="400"></iframe>

<br><br>
<a href="../${filePath}" download>Download PDF</a>

</body>
</html>
`;

  fs.writeFileSync(`./${pagePath}`, htmlContent);

  // Sitemap entry
  sitemapEntries.push(`
  <url>
    <loc>${baseUrl}/${pagePath}</loc>
  </url>
  `);
});

// Write JSON
fs.writeFileSync(outputJson, JSON.stringify(jsonData, null, 2));

// Write sitemap
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</urlset>`;

fs.writeFileSync('./sitemap.xml', sitemap);

console.log('✅ Generated everything!');