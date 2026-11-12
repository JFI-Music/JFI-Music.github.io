const header = document.querySelector('.shop-header');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('.product-card')];

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    products.forEach((product) => {
      product.hidden = filter !== 'all' && product.dataset.category !== filter;
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
