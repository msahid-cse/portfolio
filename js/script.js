// Theme toggle functionality
function initializeTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // wire up both theme buttons if present + update icons
    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
        updateIcons();
    }

    const topThemeBtn = document.getElementById('theme-toggle');
    const sideThemeBtn = document.getElementById('theme-toggle-sidebar');
    const topMoon = document.getElementById('theme-toggle-dark-icon');
    const topSun = document.getElementById('theme-toggle-light-icon');
    const sideMoon = document.getElementById('sidebar-moon');
    const sideSun = document.getElementById('sidebar-sun');

    function updateIcons() {
        const isDark = document.documentElement.classList.contains('dark');
        if (topMoon && topSun) {
            // moon when light, sun when dark
            topMoon.classList.toggle('hidden', isDark);
            topSun.classList.toggle('hidden', !isDark);
        }
        if (sideMoon && sideSun) {
            sideMoon.classList.toggle('hidden', isDark);
            sideSun.classList.toggle('hidden', !isDark);
        }
    }
    if (topThemeBtn) topThemeBtn.onclick = toggleTheme;
    if (sideThemeBtn) sideThemeBtn.onclick = toggleTheme;
    updateIcons();
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

// Sidebar functionality
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    // Check if elements exist
    if (!sidebar || !mobileMenuToggle || !sidebarClose || !sidebarOverlay) {
        console.error('Sidebar elements not found!');
        return;
    }

    console.log('Sidebar elements found, initializing...');

    // Open sidebar
    function openSidebar() {
        console.log('Opening sidebar');
        console.log('Before opening - sidebar classes:', sidebar.className);
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        console.log('After opening - sidebar classes:', sidebar.className);
    }

    // Close sidebar
    function closeSidebar() {
        console.log('Closing sidebar');
        console.log('Before closing - sidebar classes:', sidebar.className);
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        console.log('After closing - sidebar classes:', sidebar.className);
    }

    // Toggle sidebar
    function toggleSidebar() {
        console.log('Toggle sidebar called');
        console.log('Sidebar has -translate-x-full class:', sidebar.classList.contains('-translate-x-full'));
        if (sidebar.classList.contains('-translate-x-full')) {
            console.log('Opening sidebar (currently closed)');
            openSidebar();
        } else {
            console.log('Closing sidebar (currently open)');
            closeSidebar();
        }
    }

    // Event listeners
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu button clicked via event listener!');
        console.log('Current sidebar classes:', sidebar.className);
        
        // Visual feedback
        this.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);
        
        toggleSidebar();
    });
    
    sidebarClose.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Sidebar close button clicked!');
        closeSidebar();
    });
    
    // Alternative event listener for close button
    sidebarClose.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Close button clicked via onclick!');
        closeSidebar();
    };
    
    sidebarOverlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Sidebar overlay clicked!');
        closeSidebar();
    });

    // Close sidebar when clicking on links (mobile only)
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });

    // Smooth scrolling for sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveLink);
    
    // Set initial active link
    updateActiveLink();
}

// Global function for onclick fallback
function toggleMobileSidebar() {
    console.log('Global toggle function called');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    
    console.log('Sidebar element:', sidebar);
    console.log('Overlay element:', sidebarOverlay);
    console.log('Mobile menu toggle element:', mobileMenuToggle);
    
    // Visual feedback
    if (mobileMenuToggle) {
        mobileMenuToggle.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
        setTimeout(() => {
            mobileMenuToggle.style.backgroundColor = '';
        }, 200);
    }
    
    if (sidebar && sidebarOverlay) {
        console.log('Current sidebar classes:', sidebar.className);
        if (sidebar.classList.contains('-translate-x-full')) {
            // Open sidebar
            console.log('Opening sidebar via global function');
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        } else {
            // Close sidebar
            console.log('Closing sidebar via global function');
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    } else {
        console.error('Sidebar or overlay element not found!');
    }
}

// Global function for close button
function closeMobileSidebar() {
    console.log('Global close function called');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && sidebarOverlay) {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        console.log('Closing sidebar via global close function');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing sidebar...');
    initializeTheme();
    initializeViewMoreProjects();
    initializeSidebar();
});