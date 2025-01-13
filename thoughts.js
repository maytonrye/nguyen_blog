let posts = [];
let activeTab = 'on places i’ve been to'; // Set the default active tab

async function loadPostsFromGoogleSheet() {
    const sheetId = '1Vcc6Km_FYiQp8doJvNC_OPGGVeUfYO8CQIC1S77TIHQ';
    const apiKey = 'AIzaSyC0Pfi_cT87uiP7Nb2dWE8ZFX0SKbUjldM';
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.values || data.values.length <= 1) {
            document.getElementById('posts-container').innerHTML = '<p>Error loading posts. Please check your Google Sheets setup.</p>';
            return;
        }

        const rows = data.values.slice(1); // Skip header row
        posts = rows.map(row => {
            const iframeTag = row[4]?.trim() || ''; // The iframe HTML string
            const iframeURLMatch = iframeTag.match(/src=["']([^"']+)["']/); // Extract src attribute
            const iframeURL = iframeURLMatch ? iframeURLMatch[1] : ''; // Get the URL if available

            return {
                tab: row[0]?.toLowerCase().trim() || '',
                categories: row[1]?.trim() || 'Uncategorized',
                title: row[2]?.trim() || 'Untitled',
                image: row[3]?.trim() || 'site-brandings/Image Not Available.jpg',
                iframeURL: iframeURL, // Use the extracted URL
                description: row[5]?.trim() || 'No description available.',
            };
        });

        // Automatically display the default active tab after loading posts
        showTab(activeTab);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function showTab(tabName) {
    const normalizedTabName = tabName.toLowerCase().trim();
    activeTab = normalizedTabName;

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    const filteredPosts = posts.filter(post => post.tab === normalizedTabName);

    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `<p>No posts available in "${tabName}" section.</p>`;
        return;
    }

    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post'); // Fade-in animation will be applied dynamically
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.title}" onerror="this.src='Image Not Available.jpg';">
            <h3>${post.title}</h3>
            <p class="post-category"> ${post.categories}</p>
        `;

        postElement.addEventListener('click', () => {
            // Pass title, iframeURL, and image as URL parameters
            const blogURL = `blog.html?title=${encodeURIComponent(post.title)}&iframeURL=${encodeURIComponent(post.iframeURL)}&image=${encodeURIComponent(post.image)}`;
            window.open(blogURL, '_blank'); // Open in a new tab
        });

        postsContainer.appendChild(postElement);
    });

    // Initialize observer for fade-in animation
    initFadeInAnimation();
}

// Set the active class for the navigation bar based on the current URL
function setActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        // Remove existing active class
        link.classList.remove('active');

        // Check if the href matches the current URL or if it's within the "Thoughts" section
        if (
            link.href === window.location.href ||
            (window.location.pathname.includes('blog.html') &&
                window.location.search.includes('Thoughts'))
        ) {
            link.classList.add('active');
        }
    });
}

// Initialize fade-in animation logic for .post elements
function initFadeInAnimation() {
    const posts = document.querySelectorAll('.post');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp-animation'); // Add fade-in animation class
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger animation when 10% of the element is visible

    posts.forEach(post => observer.observe(post));
}

document.addEventListener('DOMContentLoaded', () => {
    // Set the default tab and load posts
    loadPostsFromGoogleSheet();

    // Set active navigation link
    setActiveNav();

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab.active').classList.remove('active');
            tab.classList.add('active');
            showTab(tab.getAttribute('data-tab'));
        });
    });

// Loading screen logic
const loadingScreen = document.querySelector("#loading-screen");
const loadingVideo = document.querySelector("#loading-video");

// Reset the video to the beginning on page reload
loadingVideo.currentTime = 0;

// Listen for the video's metadata to get its duration
loadingVideo.addEventListener("loadedmetadata", () => {
    const videoDuration = loadingVideo.duration;

    // Schedule the fade-out 1 second before the video ends
    setTimeout(() => {
        // Fade out the loading screen
        loadingScreen.style.opacity = "0";

        // Wait for the fade-out transition to complete before hiding the element
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 1000); // Matches the CSS transition duration
    }, (videoDuration - 1) * 1000); // Trigger fade-out 1 second before the video ends
});

// If the video ends and hasn't faded out, ensure fallback fade-out
loadingVideo.addEventListener("ended", () => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 1000); // Matches the CSS transition duration
});

});
