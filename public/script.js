// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const tweetButton = document.getElementById('tweetButton');
    const statusMessage = document.getElementById('statusMessage');

    tweetButton.addEventListener('click', async () => {
        // Disable the button and show a loading message
        tweetButton.disabled = true;
        tweetButton.textContent = 'Tweeting...';
        statusMessage.textContent = '';
        statusMessage.style.color = '#333';

        try {
            // Make a POST request to our backend API endpoint
            const response = await fetch('/api/tweet', {
                method: 'POST',
            });

            const result = await response.json();

            if (response.ok) {
                // Success!
                statusMessage.textContent = result.message;
                statusMessage.style.color = 'green';
            } else {
                // Failure
                throw new Error(result.message || 'An unknown error occurred.');
            }

        } catch (error) {
            statusMessage.textContent = `Error: ${error.message}`;
            statusMessage.style.color = 'red';
        } finally {
            // Re-enable the button after the request is complete
            tweetButton.disabled = false;
            tweetButton.textContent = 'Tweet Now 👋';
        }
    });
});