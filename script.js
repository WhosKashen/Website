// Responsive navigation
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Set current year in footer
document.getElementById('footerYear').textContent = new Date().getFullYear();

// Simple scroll animation
const animateOnScroll = () => {
  const elements = document.querySelectorAll('section, .project-card');
  const triggerBottom = window.innerHeight * 0.88;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    } else {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
    }
  });
};
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Customization Panel Logic
function openCustomizePanel() {
  document.getElementById('customizePanel').style.display = 'block';
  document.getElementById('customName').value = document.getElementById('heroName').textContent;
  document.getElementById('customRole').value = document.getElementById('heroRole').textContent;
  document.getElementById('customHeroTitle').value = document.getElementById('heroTitle').textContent;
}

function closeCustomizePanel() {
  document.getElementById('customizePanel').style.display = 'none';
}

function applyCustomization() {
  const name = document.getElementById('customName').value.trim() || 'Your Name';
  const role = document.getElementById('customRole').value.trim() || 'Web Developer';
  const heroTitle = document.getElementById('customHeroTitle').value.trim() || `Hello, I'm ${name}`;

  document.getElementById('heroName').textContent = name;
  document.getElementById('heroRole').textContent = role;
  document.getElementById('heroTitle').textContent = heroTitle;
  document.getElementById('logo').textContent = name;
  document.getElementById('footerYear').nextSibling.textContent = ` ${name}. All rights reserved.`;

  closeCustomizePanel();
}

// About Section Edit
function editSection(id) {
  const section = document.getElementById(id);
  const currentText = section.textContent;
  const input = document.createElement('textarea');
  input.value = currentText;
  input.style.width = '100%';
  input.style.height = '100px';

  section.replaceWith(input);
  input.focus();

  input.addEventListener('blur', () => {
    const newText = input.value.trim() || currentText;
    const p = document.createElement('p');
    p.id = id;
    p.textContent = newText;
    input.replaceWith(p);
    const btn = document.createElement('button');
    btn.className = 'edit-btn';
    btn.textContent = 'Edit';
    btn.onclick = () => editSection(id);
    p.parentNode.appendChild(btn);
  });
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
      link.style.marginBottom = '1rem';
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

// Download CV (dummy)
document.getElementById('downloadCV').onclick = () => {
  alert('CV download link goes here. Replace this alert with actual file link.');
};

// Contact Form (dummy)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! (Form processing to be implemented)');
  this.reset();
});