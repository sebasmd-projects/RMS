(function() {
    "use strict";
/**
   * Prevent multiple form submissions
   */
document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.contact-form');
    var submitButton = document.getElementById('contact-submit-button');
    console.log("holi")
    form.addEventListener('submit', function () {
      console.log("holi")
      submitButton.disabled = true;
      submitButton.textContent = '...';
    });
  });
})();