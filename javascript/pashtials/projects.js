// ========================================
// PROJECTS.JS
// AJAX loading, filtering, sorting, pagination (load more), local storage favorites
// ========================================

const PROJECTS_PER_PAGE = 6;
const STORAGE_KEY = 'felixFavoriteProjects';

let allProjects = [];
let filteredProjects = [];
let currentPage = 1;

// ========== LOAD PROJECTS VIA AJAX ==========
export async function initProjects() {
    const projectsPage = document.getElementById('projectsGrid');
    if (!projectsPage) return;

    try {
        showLoadingState();

        const response = await fetch('projects.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        allProjects = data.projects;
        filteredProjects = [...allProjects];

        hideLoadingState();
        renderProjects();
        renderFavorites();
        initFilters();
        initModal();

    } catch (error) {
        console.error('Error loading projects:', error);
        showErrorState();
    }
}

// ========== RENDER PROJECTS ==========
function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const noResults = document.getElementById('noResultsState');

    if (filteredProjects.length === 0) {
        grid.classList.add('d-none');
        loadMoreBtn.classList.add('d-none');
        noResults.classList.remove('d-none');
        updateResultsCount(0);
        return;
    }

    noResults.classList.add('d-none');
    grid.classList.remove('d-none');

    // Calculate slice for current page
    const projectsToShow = filteredProjects.slice(0, currentPage * PROJECTS_PER_PAGE);

    grid.innerHTML = projectsToShow.map(project => createProjectCard(project)).join('');

    // Show/hide Load More button
    if (projectsToShow.length < filteredProjects.length) {
        loadMoreBtn.classList.remove('d-none');
    } else {
        loadMoreBtn.classList.add('d-none');
    }

    updateResultsCount(filteredProjects.length);
}

// ========== CREATE PROJECT CARD ==========
function createProjectCard(project) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(project.id);
    const formattedPrice = formatPrice(project.price);
    const categoryLabel = formatCategoryLabel(project.category);
    const statusClass = project.status === 'completed' ? 'status-completed' : 'status-inprogress';
    const statusLabel = project.status === 'completed' ? 'Completed' : 'In Progress';

    return `
        <div class="col-12 col-md-6 col-lg-4 project-card-wrapper" data-id="${project.id}">
            <div class="project-card" onclick="openProjectModal(${project.id})">
                <div class="project-card-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="project-card-img"
                         onerror="this.src='images/indexslika1.jpg'">
                    <div class="project-card-overlay">
                        <span class="view-details-text">View Details</span>
                    </div>
                    <button class="card-favorite-btn ${isFavorite ? 'active' : ''}"
                        onclick="event.stopPropagation(); toggleFavorite(${project.id})"
                        title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="project-card-body">
                    <div class="project-card-meta">
                        <span class="project-card-category">${categoryLabel}</span>
                        <span class="project-card-status ${statusClass}">${statusLabel}</span>
                    </div>
                    <h3 class="project-card-title">${project.title}</h3>
                    <div class="project-card-info">
                        <span><i class="fas fa-map-marker-alt"></i> ${project.location}</span>
                        <span><i class="fas fa-calendar"></i> ${project.year}</span>
                        <span><i class="fas fa-euro-sign"></i> ${formattedPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========== FILTERS ==========
function initFilters() {
    const filterCategory = document.getElementById('filterCategory');
    const filterLocation = document.getElementById('filterLocation');
    const filterYear = document.getElementById('filterYear');
    const sortBy = document.getElementById('sortBy');
    const resetBtn = document.getElementById('resetFilters');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Apply filters on change
    [filterCategory, filterLocation, filterYear, sortBy].forEach(el => {
        el.addEventListener('change', applyFiltersAndSort);
    });

    // Reset filters
    resetBtn.addEventListener('click', resetAllFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', resetAllFilters);

    // Load More
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderProjects();
    });
}

function applyFiltersAndSort() {
    const category = document.getElementById('filterCategory').value;
    const location = document.getElementById('filterLocation').value;
    const year = document.getElementById('filterYear').value;
    const sort = document.getElementById('sortBy').value;

    // Filter
    filteredProjects = allProjects.filter(project => {
        const matchCategory = category === 'all' || project.category === category;
        const matchLocation = location === 'all' || project.location === location;
        const matchYear = year === 'all' || project.year === parseInt(year);
        return matchCategory && matchLocation && matchYear;
    });

    // Sort
    filteredProjects = sortProjects(filteredProjects, sort);

    // Reset to first page when filters change
    currentPage = 1;
    renderProjects();
}

function sortProjects(projects, sortType) {
    const sorted = [...projects];
    switch (sortType) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'year-asc':
            return sorted.sort((a, b) => a.year - b.year);
        case 'year-desc':
            return sorted.sort((a, b) => b.year - a.year);
        default:
            return sorted;
    }
}

function resetAllFilters() {
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterLocation').value = 'all';
    document.getElementById('filterYear').value = 'all';
    document.getElementById('sortBy').value = 'default';
    filteredProjects = [...allProjects];
    currentPage = 1;
    renderProjects();
}

// ========== PROJECT MODAL ==========
function initModal() {
    const closeBtn = document.getElementById('closeModal');
    const overlay = document.getElementById('projectModal');

    closeBtn.addEventListener('click', closeProjectModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeProjectModal();
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') closeProjectModal();
    });
}

window.openProjectModal = function(projectId) {
    const project = allProjects.find(p => p.id === projectId);
    if (!project) return;

    const favorites = getFavorites();
    const isFavorite = favorites.includes(project.id);

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalImage').onerror = function() { this.src = 'images/indexslika1.jpg'; };
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalCategory').textContent = formatCategoryLabel(project.category);
    document.getElementById('modalLocation').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${project.location}`;
    document.getElementById('modalYear').innerHTML = `<i class="fas fa-calendar"></i> ${project.year}`;
    document.getElementById('modalStatus').textContent = project.status === 'completed' ? '✓ Completed' : '⏳ In Progress';
    document.getElementById('modalStatus').className = `modal-tag ${project.status === 'completed' ? 'status-completed' : 'status-inprogress'}`;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalDuration').textContent = `${project.duration} days`;
    document.getElementById('modalPrice').textContent = `€${formatPrice(project.price)}`;

    const favoriteBtn = document.getElementById('modalFavoriteBtn');
    favoriteBtn.className = `favorite-btn ${isFavorite ? 'active' : ''}`;
    favoriteBtn.onclick = () => toggleFavorite(project.id);

    document.getElementById('projectModal').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.add('d-none');
    document.body.style.overflow = '';
}

// ========== LOCAL STORAGE - FAVORITES ==========
function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveFavorites(favorites) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

window.toggleFavorite = function(projectId) {
    const favorites = getFavorites();
    const index = favorites.indexOf(projectId);

    if (index === -1) {
        favorites.push(projectId);
        showFavoriteToast('Project saved to favorites! ❤️');
    } else {
        favorites.splice(index, 1);
        showFavoriteToast('Project removed from favorites.');
    }

    saveFavorites(favorites);
    renderProjects();
    renderFavorites();

    // Update modal button if open
    const modal = document.getElementById('projectModal');
    if (!modal.classList.contains('d-none')) {
        const favoriteBtn = document.getElementById('modalFavoriteBtn');
        favoriteBtn.className = `favorite-btn ${favorites.includes(projectId) ? 'active' : ''}`;
    }
}

function renderFavorites() {
    const favGrid = document.getElementById('favoritesGrid');
    const noFavMsg = document.getElementById('noFavoritesMsg');
    const favorites = getFavorites();

    const favoriteProjects = allProjects.filter(p => favorites.includes(p.id));

    if (favoriteProjects.length === 0) {
        favGrid.innerHTML = '';
        noFavMsg.style.display = 'block';
        return;
    }

    noFavMsg.style.display = 'none';
    favGrid.innerHTML = favoriteProjects.map(project => createProjectCard(project)).join('');
}

function showFavoriteToast(message) {
    const existing = document.querySelector('.favorite-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'favorite-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ========== UTILITY FUNCTIONS ==========

// Format price with thousands separator
function formatPrice(price) {
    return new Intl.NumberFormat('en-EU').format(price);
}

// Format category key to readable label
function formatCategoryLabel(category) {
    const CATEGORY_LABELS = {
        adaptations: 'Adaptations',
        renovations: 'Renovations',
        roughConstruction: 'Rough Construction',
        doors: 'Doors',
        windows: 'Windows',
        flooring: 'Flooring',
        tilework: 'Tile Work',
        knauf: 'Drywall & Knauf',
        electricalInstallation: 'Electrical Installation',
        plumbingworks: 'Plumbing Works',
        insulation: 'Insulation',
        maintenance: 'Building Maintenance'
    };
    return CATEGORY_LABELS[category] || category;
}

function updateResultsCount(count) {
    const el = document.getElementById('resultsCount');
    if (el) el.textContent = count;
}

// ========== UI STATE HELPERS ==========
function showLoadingState() {
    document.getElementById('loadingState').classList.remove('d-none');
    document.getElementById('errorState').classList.add('d-none');
    document.getElementById('projectsGrid').classList.add('d-none');
    document.getElementById('loadMoreBtn').classList.add('d-none');
}

function hideLoadingState() {
    document.getElementById('loadingState').classList.add('d-none');
}

function showErrorState() {
    document.getElementById('loadingState').classList.add('d-none');
    document.getElementById('errorState').classList.remove('d-none');
}

// Make loadProjects available globally for retry button
window.loadProjects = initProjects;