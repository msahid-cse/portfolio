// Theme toggle functionality
function initializeTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// View More Projects functionality
function initializeViewMoreProjects() {
    const projects = document.querySelectorAll('#featured-projects > div');
    const viewMoreBtn = document.getElementById('view-more-btn');
    const initialProjectCount = 5;
    let isExpanded = false;

    // Hide projects beyond the initial count
    projects.forEach((project, index) => {
        if (index >= initialProjectCount) {
            project.classList.add('hidden-project');
        }
    });

    viewMoreBtn.addEventListener('click', function() {
        const hiddenProjects = document.querySelectorAll('.hidden-project');
        hiddenProjects.forEach(project => {
            project.classList.toggle('show');
        });

        isExpanded = !isExpanded;
        this.innerHTML = isExpanded ?
            '<span>Show Less</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" /></svg>' :
            '<span>View More Projects</span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeViewMoreProjects();
});