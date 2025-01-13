document.addEventListener("DOMContentLoaded", () => {
    // Video data and carousel functionality
    const videoData = [
        {
            title: "Solotravel to 17 countries at 17.",
            url: "https://www.youtube.com/watch?v=Wr7QPBkcK98",
            thumbnail: "https://img.youtube.com/vi/Wr7QPBkcK98/0.jpg"
        },
        {
            title: "From Luxembourgh, from the war.",
            url: "https://www.youtube.com/watch?v=-YJkAzYe0QI",
            thumbnail: "https://img.youtube.com/vi/-YJkAzYe0QI/0.jpg"
        },
        {
            title: "Venice, fall 2023.",
            url: "https://www.youtube.com/watch?v=P3ygAlpWYeE",
            thumbnail: "https://img.youtube.com/vi/P3ygAlpWYeE/0.jpg"
        },
        {
            title: "A swisss summer.",
            url: "https://www.youtube.com/watch?v=432j-xQVmWU",
            thumbnail: "https://img.youtube.com/vi/432j-xQVmWU/0.jpg"
        },
        {
            title: "chưa biết nữa",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        },
        {
            title: "Video 6 Title",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        },
        {
            title: "Video 7 Title",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        },
        {
            title: "Video 8 Title",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        },
        {
            title: "Video 9 Title",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        },
        {
            title: "Video 10 Title",
            url: "https://www.youtube.com/watch?v=5AQRQFIpjc0",
            thumbnail: "https://img.youtube.com/vi/5AQRQFIpjc0/0.jpg"
        }
    ];

    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Populate carousel
    videoData.forEach(video => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        item.innerHTML = `
            <a href="${video.url}" target="_blank">
                <img src="${video.thumbnail}" alt="Video Thumbnail">
                <p>${video.title}</p>
            </a>
        `;
        track.appendChild(item);
    });

    const items = Array.from(track.children);
    const itemWidth = 204 + 10; // Video width + gap
    const visibleItems = 5;
    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= items.length - visibleItems;
    };

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex -= visibleItems;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < items.length - visibleItems) {
            currentIndex += visibleItems;
            updateCarousel();
        }
    });

    updateCarousel();

    // Fade-in animation for visible classes
    const elements = document.querySelectorAll(
        ".footer-container, .social-media, .hydration, .left-title, .scroll-text, .description, .portrait-container, .magnets-grid, .travels-right, .video-content, .awards-section, .right-content"
    );

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fadeInUp-animation");
                observer.unobserve(entry.target); // Stop observing after triggering animation
            }
        });
    }, { threshold: 0.1 }); // Trigger animation when 10% of element is visible

    elements.forEach(el => observer.observe(el));

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






/* FOR THE AWARD PART */
document.addEventListener('DOMContentLoaded', () => {
    const englishTab = document.querySelector('.language-tab[data-lang="english"]');
    const vietnameseTab = document.querySelector('.language-tab[data-lang="vietnamese"]');
    const englishAwards = document.querySelector('.awards-carousel.awards-english');
    const vietnameseAwards = document.querySelector('.awards-carousel.awards-vietnamese');

    // Event listener for switching tabs
    englishTab.addEventListener('click', () => {
        englishTab.classList.add('active');
        vietnameseTab.classList.remove('active');
        englishAwards.style.display = 'block';
        vietnameseAwards.style.display = 'none';
    });

    vietnameseTab.addEventListener('click', () => {
        vietnameseTab.classList.add('active');
        englishTab.classList.remove('active');
        vietnameseAwards.style.display = 'block';
        englishAwards.style.display = 'none';
    });
});
