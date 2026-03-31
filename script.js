/**
 * Must match the address where you want to receive form messages.
 */
const CONTACT_EMAIL = "marcusfisico02@gmail.com";

(function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = (form.querySelector('[name="name"]') || {}).value?.trim() || "";
      const message = (form.querySelector('[name="message"]') || {}).value?.trim() || "";

      const subject = encodeURIComponent(
        name ? `Website message from ${name}` : "Website contact form"
      );
      const body = encodeURIComponent(message);

      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
  }
})();
