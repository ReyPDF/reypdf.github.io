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
      <div class="bg-slate-100 h-40 flex items-center justify-center border-b">
          <svg class="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path><path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path></svg>
      </div>
      <div class="p-5">
        <h4><a href="${file.page}" class="text-xs text-slate-500 mt-1">${file.name}</a></h3>

        <iframe src="${file.file}" width="300" height="200"></iframe>
        
        <br>
        <a href="${file.file}"  class="mt-4 block text-center border border-amber-600 text-amber-600 py-2 rounded hover:bg-amber-600 hover:text-white transition text-sm font-semibold" download>Download</a>
      </div>
    </div>
    `;

    container.appendChild(div);
  });

  // Pagination
  const totalPages = Math.ceil(filteredFiles.length / perPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;

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



