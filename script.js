// Responsive navigation
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Set current year in footer
document.getElementById('footerYear').textContent = new Date().getFullYear();

// About Section Edit (bugfix: only one edit button)
function editSection(textId, btnId) {
  const section = document.getElementById(textId);
  const editBtn = document.getElementById(btnId);

  // Prevent multiple textareas
  if (section.tagName === 'TEXTAREA') return;

  const currentText = section.textContent;
  const textarea = document.createElement('textarea');
  textarea.value = currentText;
  textarea.style.width = '98%';
  textarea.style.height = '60px';
  textarea.style.margin = '0.5rem 0';
  textarea.style.fontSize = '1rem';

  section.replaceWith(textarea);
  editBtn.textContent = 'Save';

  textarea.focus();

  // Save new text and restore button
  editBtn.onclick = function() {
    const newText = textarea.value.trim() || currentText;
    const p = document.createElement('p');
    p.id = textId;
    p.textContent = newText;
    textarea.replaceWith(p);
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editSection(textId, btnId);
  };
}

// Projects CRUD
let projects = [
  {
    title: 'Sample Project',
    desc: 'A brief description about this amazing project.',
    link: '#'
  }
];

function renderProjects() {
  const container = document.getElementById('projectList');
  container.innerHTML = '';
  projects.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const title = document.createElement('h3');
    title.textContent = project.title;
    card.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = project.desc;
    card.appendChild(desc);

    if (project.link && project.link !== '#') {
      const link = document.createElement('a');
      link.href = project.link;
      link.target = '_blank';
      link.textContent = 'View Project';
      link.style.color = '#e94560';
      link.style.display = 'block';
      link.style.marginBottom = '0.5rem';
      card.appendChild(link);
    }

    // Actions
    const actions = document.createElement('div');
    actions.className = 'project-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editProject(idx);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteProject(idx);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

function addProject() {
  const title = prompt('Project Title:');
  if (!title) return;
  const desc = prompt('Project Description:');
  if (!desc) return;
  const link = prompt('Project Link (optional):', '#');
  projects.push({title, desc, link: link || '#'});
  renderProjects();
}

function editProject(idx) {
  const project = projects[idx];
  const title = prompt('Edit Title:', project.title);
  if (!title) return;
  const desc = prompt('Edit Description:', project.desc);
  if (!desc) return;
  const link = prompt('Edit Link:', project.link);
  projects[idx] = {title, desc, link: link || '#'};
  renderProjects();
}

function deleteProject(idx) {
  if (confirm('Delete this project?')) {
    projects.splice(idx, 1);
    renderProjects();
  }
}

window.addEventListener('DOMContentLoaded', renderProjects);

// Customization Panel Logic stays unchanged
function openCustomizePanel() {
  document.getElementById('customizePanel').style.display = 'block';
  document.getElementById('customName').value = document.getElementById('logo').textContent;
  // You can populate other fields as you wish
}
function closeCustomizePanel() {
  document.getElementById('customizePanel').style.display = 'none';
}
function applyCustomization() {
  // Sample: logo only for compactness
  const name = document.getElementById('customName').value.trim() || 'PORTFOLIO';
  document.getElementById('logo').textContent = name;
  closeCustomizePanel();
}
