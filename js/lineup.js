// ── FILTRES LINEUP ──
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.artist-card-full');

let activeDay = 'all';
let activeGenre = 'all';

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {

    const filter = this.dataset.filter;
    const parentGroup = this.closest('.filters-group');
    const label = parentGroup.querySelector('.filter-label').textContent;

    // Met à jour le filtre actif
    parentGroup.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    if (label.includes('Jour')) {
      activeDay = filter;
    } else {
      activeGenre = filter;
    }

    // Filtre les cartes
    cards.forEach(card => {
      const cardDay = card.dataset.day;
      const cardGenre = card.dataset.genre;

      const dayMatch = activeDay === 'all' || cardDay === activeDay;
      const genreMatch = activeGenre === 'all' || cardGenre === activeGenre;

      if (dayMatch && genreMatch) {
        card.classList.remove('hidden');
        gsap.fromTo(card,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      } else {
        card.classList.add('hidden');
      }
    });
  });
});