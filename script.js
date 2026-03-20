let allFiles = [];
let filteredFiles = [];
let currentPage = 1;
const perPage = 10;

fetch('data/files.json')
  .then(res => res.json())
  .then(data => {
    allFiles = data.sort((a, b) => a.name.localeCompare(b.name));
    filteredFiles = allFiles;
    render();
  });

document.getElementById('search').addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    filteredFiles = allFiles.filter(file =>
    file.name.toLowerCase().includes(value)
    );

    currentPage = 1;
    render();
});

function render() {
  const container = document.getElementById('pdf-container');
  const pagination = document.getElementById('pagination');

  container.innerHTML = '';

  const start = (currentPage - 1) * perPage;
  const paginated = filteredFiles.slice(start, start + perPage);

  paginated.forEach(file => {
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <div class="p-4">
        <h4 class="font-serif text-lg text-slate-800 mb-1">${file.name}</h4>
        <iframe src="${file.file}" width="100%"></iframe>
        <br>
        <a href="${file.file}"  class="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-amber-800 transition shadow-md">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download
        </a>
      </div>
    </div>
    `;

    container.appendChild(div);
  });

  // Pagination
  const totalPages = Math.ceil(filteredFiles.length / perPage);
  //const totalPages = 3;
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    btn.classList = "buttonPages";

    btn.onclick = () => {
      currentPage = i;
      render();
    };

    pagination.appendChild(btn);
  }

  // ✅ SEO hidden links (IMPORTANT)
  const allLinksDiv = document.getElementById('all-links');
  allLinksDiv.innerHTML = allFiles.map(file => 
    `<a href="${file.page}">${file.name}</a>`
  ).join('');
}



