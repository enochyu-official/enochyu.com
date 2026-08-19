document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');

    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// Contact Form
const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("access_key", "f7db8f47-7025-441a-887f-b9c0a354dad5"); // Public Key

  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }
});


