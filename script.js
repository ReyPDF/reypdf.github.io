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
      <h3>${file.name}</h3>
      <iframe src="${file.file}" width="300" height="200"></iframe>
      <br>
      <a href="${file.file}" download>Download</a>
      <hr>
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
}