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
      <span class="delete-btn" onclick="showConfirmationBox(event)"><i class="fas fa-trash"></i></span>
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
      <span class="delete-btn" onclick="showConfirmationBox(event)"><i class="fas fa-trash"></i></span>
    `;
    workList.appendChild(listItem);
  });
}

function showConfirmationBox(event) {
  const confirmationBox = document.createElement('div');
  confirmationBox.classList.add('confirmation-box');
  confirmationBox.innerHTML = `
    <p>Are you sure you want to delete this link?</p>
    <button class="cancel" onclick="hideConfirmationBox(event)">Cancel</button>
    <button class="delete" onclick="deleteLink(event)">Delete</button>
  `;
  const deleteBtn = event.target;
  deleteBtn.parentNode.appendChild(confirmationBox);
}

function hideConfirmationBox(event) {
  const confirmationBox = event.target.parentNode;
  confirmationBox.remove();
}

function deleteLink(event) {
  const confirmationBox = event.target.parentNode;
  const item = confirmationBox.parentNode;
  const link = item.querySelector('a').getAttribute('href');

  savedLinks = savedLinks.filter((savedLink) => savedLink.link !== link);
  localStorage.setItem('links', JSON.stringify(savedLinks));

  item.remove();
}
