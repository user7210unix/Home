// js/script.js

// Clock functionality
function updateClock() {
    const now = new Date();
    
    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    
    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);
    document.getElementById('date').textContent = dateStr;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Firefox link bypass - Use window.location instead of direct navigation
document.querySelectorAll('a[data-href]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.getAttribute('data-href');
        window.location.href = url;
    });
});

// Search functionality
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');

// Open search with spacebar
document.addEventListener('keydown', function(e) {
    // Open search overlay with spacebar (only if not already focused on input)
    if (e.code === 'Space' && document.activeElement !== searchInput && !searchOverlay.classList.contains('active')) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchInput.focus();
    }
    
    // Close search overlay with Escape
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});

// Close search when clicking outside
searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
    }
});

// Search submit functionality
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const query = this.value.trim();
        if (query) {
            handleSearch(query);
        }
    }
});

function handleSearch(query) {
    let url;
    
    // Check for prefixes
    if (query.startsWith('yt:')) {
        // YouTube search
        const searchTerm = query.substring(3).trim();
        url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
    } else if (query.startsWith('gh:')) {
        // GitHub search
        const searchTerm = query.substring(3).trim();
        url = `https://github.com/search?q=${encodeURIComponent(searchTerm)}`;
    } else if (query.startsWith('aw:')) {
        // Arch Wiki search
        const searchTerm = query.substring(3).trim();
        url = `https://wiki.archlinux.org/index.php?search=${encodeURIComponent(searchTerm)}`;
    } else if (query.startsWith('r:')) {
        // Reddit search
        const searchTerm = query.substring(2).trim();
        if (searchTerm.startsWith('/r/') || searchTerm.startsWith('r/')) {
            // Direct subreddit navigation
            const subreddit = searchTerm.replace(/^\/?(r\/)?/, '');
            url = `https://reddit.com/r/${subreddit}`;
        } else {
            // Reddit search
            url = `https://www.reddit.com/search?q=${encodeURIComponent(searchTerm)}`;
        }
    } else if (query.startsWith('gw:')) {
        // Gentoo Wiki search
        const searchTerm = query.substring(3).trim();
        url = `https://wiki.gentoo.org/index.php?search=${encodeURIComponent(searchTerm)}`;
    } else if (query.startsWith('4:')) {
        // 4chan board navigation
        const board = query.substring(2).trim().replace(/^\/+|\/+$/g, '');
        url = `https://boards.4chan.org/${board}/`;
    } else {
        // Default: Google search
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    // Navigate using window.location for Firefox compatibility
    window.location.href = url;
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Console message
console.log('%c Welcome to your Gruvbox startpage! ', 'background: #d65d0e; color: #282828; font-size: 16px; padding: 8px; font-weight: bold;');
console.log('%c Press SPACEBAR to search ', 'background: #3c3836; color: #ebdbb2; font-size: 12px; padding: 4px;');
