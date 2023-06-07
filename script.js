const form = document.getElementById('work-form');
const workList = document.getElementById('work-list');
let savedLinks = JSON.parse(localStorage.getItem('links')) || [];

renderSavedLinks();

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('work-title').value;
  const link = document.getElementById('work-link').value;

  if (title.trim() && link.trim()) {
    const listItem = document.createElement('li');
    listItem.classList.add('work-item');
    listItem.innerHTML = `
      <h3>${title}</h3>
      <p><a href="${link}" target="_blank">${link}</a></p>
      <span class="delete-btn" onclick="deleteLink(event)"><i class="fas fa-trash"></i> Delete</span>
    `;
    workList.appendChild(listItem);

    savedLinks.push({ title, link });
    localStorage.setItem('links', JSON.stringify(savedLinks));

    document.getElementById('work-title').value = '';
    document.getElementById('work-link').value = '';
  }
});

function renderSavedLinks() {
  savedLinks.forEach((link) => {
    const listItem = document.createElement('li');
    listItem.classList.add('work-item');
    listItem.innerHTML = `
      <h3>${link.title}</h3>
      <p><a href="${link.link}" target="_blank">${link.link}</a></p>
      <span class="delete-btn" onclick="deleteLink(event)"><i class="fas fa-trash"></i> Delete</span>
    `;
    workList.appendChild(listItem);
  });
}

function deleteLink(event) {
  const item = event.target.parentNode;
  const link = item.querySelector('a').getAttribute('href');

  savedLinks = savedLinks.filter((savedLink) => savedLink.link !== link);
  localStorage.setItem('links', JSON.stringify(savedLinks));

  item.remove();
}
