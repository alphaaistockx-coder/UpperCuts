const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const copyPhone = document.querySelector('#copy-phone');
const copyAddress = document.querySelector('#copy-address');
const contactForm = document.querySelector('.contact-form');

menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

const copyToClipboard = async (value, label) => {
  try {
    await navigator.clipboard.writeText(value);
    alert(`${label} copied to clipboard.`);
  } catch (error) {
    alert('Copy failed. Please copy manually.');
  }
};

copyPhone?.addEventListener('click', () =>
  copyToClipboard('+1 (212) 555-0134', 'Phone')
);

copyAddress?.addEventListener('click', () =>
  copyToClipboard('116 Aurora Avenue, Suite 21', 'Address')
);

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks! Your booking request is in. We will text you shortly.');
  contactForm.reset();
});
