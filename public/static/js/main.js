(function() {
    "use strict";
/**
   * Prevent multiple form submissions
   */
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.contact-form');
    var submitButton = document.getElementById('contact-submit-button');
  
    form.addEventListener('submit', function () {
      submitButton.disabled = true;
      submitButton.textContent = '...';
    });
  });
})();