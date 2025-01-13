const sheetId = '1sHHC9H0YHDA9jJt9Mjve9Tddvi8sbgI_DxFf4CCZxqM'; // Replace with your Google Sheet ID
const apiKey = 'AIzaSyC0Pfi_cT87uiP7Nb2dWE8ZFX0SKbUjldM'; // Replace with your API Key

let photoCollections = [];
let currentIndex = 0; // Track the current image index

async function loadPhotosFromGoogleSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.values || data.values.length <= 1) {
            document.getElementById('photos-container').innerHTML = '<p>Error loading photos. Please check your Google Sheets setup.</p>';
            return;
        }

        const rows = data.values.slice(1); // Skip header row
        photoCollections = rows.map(row => ({
            collection: row[0]?.trim() || 'Unnamed Collection',
            description: row[1]?.trim() || 'No description available.',
            images: row.slice(2).filter(url => url.trim() !== ''),
        }));

        populateDropdown();
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('photos-container').innerHTML = '<p>Error fetching data. Check API key and Sheet ID.</p>';
    }
}

function populateDropdown() {
    const dropdown = document.getElementById('collections-dropdown');
    dropdown.innerHTML = '<option value="">Select a collection</option>';

    photoCollections.forEach(collection => {
        const option = document.createElement('option');
        option.value = collection.collection;
        option.textContent = collection.collection;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', (event) => {
        showCollection(event.target.value);
    });
}

function showCollection(collectionName) {
    const collection = photoCollections.find(item => item.collection === collectionName);
    const photosContainer = document.getElementById('photos-container');
    const descriptionElement = document.querySelector('.photography-description');

    // Clear previous content
    photosContainer.innerHTML = '';
    descriptionElement.textContent = ''; // Reset the description

    if (!collection) return;

    // Set the description dynamically with animation
    descriptionElement.textContent = collection.description;
    descriptionElement.classList.add('fade-in'); // Trigger fade-in animation

    // Display all photos lazily
    collection.images.forEach((imageUrl, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = `Photo from ${collectionName}`;
        imgElement.classList.add('photo', 'lazy'); // Add lazy class

        // Add click event for modal with navigation
        imgElement.addEventListener('click', () => openModalWithNavigation(index));

        photosContainer.appendChild(imgElement);
    });

    // Trigger lazy loading
    lazyLoadImages();
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy');
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.remove('lazy'); // Remove lazy class
                    img.style.opacity = '1'; // Ensure visibility
                    img.style.transform = 'scale(1)'; // Reset scale
                    observer.unobserve(img); // Stop observing this image
                }
            });
        },
        {
            root: null, // Observe in the viewport
            rootMargin: '0px',
            threshold: 0.1, // Trigger when 10% of the image is in view
        }
    );

    lazyImages.forEach(img => observer.observe(img));
}

function openModalWithNavigation(index) {
    const modal = document.getElementById('photo-modal');
    const modalImg = modal.querySelector('img');
    const collection = photoCollections.find(item => item.collection === document.getElementById('collections-dropdown').value);

    if (!collection) return;

    currentIndex = index;
    modalImg.src = collection.images[currentIndex];
    modal.style.display = 'flex';

    // Ensure the image starts faded out
    modalImg.style.opacity = '0';

    // Fade in the image
    setTimeout(() => {
        modalImg.style.opacity = '1';
    }, 50); // Short delay for smooth transition
}

function showNextImage() {
    const modalImg = document.getElementById('photo-modal').querySelector('img');
    const collection = photoCollections.find(item => item.collection === document.getElementById('collections-dropdown').value);

    if (!collection) return;

    currentIndex = (currentIndex + 1) % collection.images.length; // Loop to the start
    modalImg.style.opacity = '0'; // Start fade-out
    setTimeout(() => {
        modalImg.src = collection.images[currentIndex];
        modalImg.style.opacity = '1'; // Fade back in
    }, 200); // Delay to allow for fade-out effect
}

function showPreviousImage() {
    const modalImg = document.getElementById('photo-modal').querySelector('img');
    const collection = photoCollections.find(item => item.collection === document.getElementById('collections-dropdown').value);

    if (!collection) return;

    currentIndex = (currentIndex - 1 + collection.images.length) % collection.images.length; // Loop to the end
    modalImg.style.opacity = '0'; // Start fade-out
    setTimeout(() => {
        modalImg.src = collection.images[currentIndex];
        modalImg.style.opacity = '1'; // Fade back in
    }, 200); // Delay to allow for fade-out effect
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    loadPhotosFromGoogleSheet();

    // Close modal on clicking the close button
    document.getElementById('photo-modal').addEventListener('click', (event) => {
        if (
            event.target.classList.contains('close-btn') || // Close button
            event.target === event.currentTarget // Clicking outside the image
        ) {
            closeModal();
        }
    });

    document.querySelector('.next-btn').addEventListener('click', showNextImage);
    document.querySelector('.prev-btn').addEventListener('click', showPreviousImage);





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


