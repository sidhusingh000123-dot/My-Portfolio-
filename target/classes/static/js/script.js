// ===== Mobile Nav Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Load Projects from Backend API =====
async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) throw new Error('Failed to fetch projects');

    const projects = await response.json();

    if (!projects.length) {
      grid.innerHTML = '<p class="loading-text">No projects added yet.</p>';
      return;
    }

    grid.innerHTML = projects.map(project => `
      <div class="project-card">
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-tech">${escapeHtml(project.techStack || '')}</div>
        <div class="project-links">
          ${project.githubLink ? `<a href="${escapeHtml(project.githubLink)}" target="_blank">GitHub</a>` : ''}
          ${project.liveLink ? `<a href="${escapeHtml(project.liveLink)}" target="_blank">Live Demo</a>` : ''}
        </div>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<p class="loading-text">Could not load projects. Is the backend running?</p>';
    console.error(err);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

loadProjects();

// ===== Contact Form Submission =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    message: document.getElementById('message').value.trim()
  };

  formStatus.textContent = 'Sending...';
  formStatus.className = 'form-status';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      formStatus.textContent = data.message || 'Message sent successfully!';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } else {
      const firstError = Object.values(data)[0] || 'Please check your input.';
      formStatus.textContent = firstError;
      formStatus.className = 'form-status error';
    }
  } catch (err) {
    formStatus.textContent = 'Something went wrong. Please try again later.';
    formStatus.className = 'form-status error';
    console.error(err);
  }
});
