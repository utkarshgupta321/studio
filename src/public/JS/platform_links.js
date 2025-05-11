document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('clickHere');
    const platformLinks = document.querySelector('.platform-links');

    toggleButton.addEventListener('click', function () {
      // Toggle the visibility
      if (platformLinks.style.display === 'none' || platformLinks.style.display === '') {
        platformLinks.style.display = 'flex';
      } else {
        platformLinks.style.display = 'none';
      }
    });
  });