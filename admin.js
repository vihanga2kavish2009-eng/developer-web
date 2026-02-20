document.addEventListener('DOMContentLoaded', () => {
    loadSocialLinks();
    loadProjects();

    document.getElementById('social-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('social-name').value;
        const url = document.getElementById('social-url').value;
        const links = getLinks('vk_social_links');
        links.push({ name, url });
        saveLinks('vk_social_links', links);
        this.reset();
        loadSocialLinks();
    });

    document.getElementById('project-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('project-title').value;
        const category = document.getElementById('project-category').value;
        const link = document.getElementById('project-link').value;
        const imageUrl = document.getElementById('project-image').value;
        const imageClass = document.getElementById('project-placeholder').value;
        const description = document.getElementById('project-desc').value;

        const projects = getLinks('vk_projects');
        projects.push({ title, category, link, imageUrl, imageClass, description });
        saveLinks('vk_projects', projects);
        this.reset();
        loadProjects();
    });
});

function getLinks(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveLinks(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Global functions so onclick can call them
window.removeSocial = function (index) {
    const links = getLinks('vk_social_links');
    if (confirm('Are you sure you want to delete this social link?')) {
        links.splice(index, 1);
        saveLinks('vk_social_links', links);
        loadSocialLinks();
    }
}

window.removeProject = function (index) {
    const projects = getLinks('vk_projects');
    if (confirm('Are you sure you want to delete this project?')) {
        projects.splice(index, 1);
        saveLinks('vk_projects', projects);
        loadProjects();
    }
}

function loadSocialLinks() {
    const list = document.getElementById('social-list');
    const links = getLinks('vk_social_links');
    list.innerHTML = '';

    if (links.length === 0) {
        list.innerHTML = '<p style="color:#94a3b8;">No social links added yet.</p>';
        return;
    }

    links.forEach((link, idx) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="list-item-content">
                <strong>${link.name}</strong> - <a href="${link.url}" target="_blank" style="color:var(--secondary)">${link.url}</a>
            </div>
            <div class="list-item-actions">
                <button onclick="removeSocial(${idx})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}

function loadProjects() {
    const list = document.getElementById('project-list');
    const projects = getLinks('vk_projects');
    list.innerHTML = '';

    if (projects.length === 0) {
        list.innerHTML = '<p style="color:#94a3b8;">No projects added yet.</p>';
        return;
    }

    projects.forEach((proj, idx) => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div class="list-item-content">
                <strong>${proj.title}</strong> <span style="color:var(--primary);">(${proj.category})</span><br>
                <small style="color:#94a3b8;">${proj.description}</small><br>
                <a href="${proj.link}" target="_blank" style="color:var(--secondary)">${proj.link}</a>
            </div>
            <div class="list-item-actions">
                <button onclick="removeProject(${idx})">Delete</button>
            </div>
        `;
        list.appendChild(div);
    });
}
