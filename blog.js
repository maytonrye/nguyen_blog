document.addEventListener('DOMContentLoaded', () => {
    const iframeURL = getQueryParam('iframeURL');
    const title = getQueryParam('title') || 'Untitled Post';

    if (iframeURL) {
        // Dynamically update the document title
        document.title = title;

        // Display the iframe
        document.getElementById('post-content').innerHTML = `
            <iframe src="${iframeURL}" frameborder="0" style="width: 100%; height: 100vh;" allowfullscreen></iframe>
        `;
    } else {
        document.getElementById('post-content').innerHTML =
            '<p>No content available for this post.</p>';
    }
});

// Utility to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
