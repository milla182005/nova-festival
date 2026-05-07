// ── SELECTION DU PASS ──
function selectPass(name, price) {
  document.getElementById('selected-pass').textContent = name + ' — €' + price;

  document.querySelectorAll('.ticket-card').forEach(card => {
    card.style.borderColor = 'rgba(240, 237, 228, 0.1)';
  });

  event.target.closest('.ticket-card').style.borderColor = '#C8FF00';

  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
}

// ── VALIDATION FORMULAIRE ──
document.getElementById('ticket-form').addEventListener('submit', function(e) {
  e.preventDefault();

  let isValid = true;

  // Reset erreurs
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

  // Prénom
  const firstname = document.getElementById('firstname');
  if (firstname.value.trim() === '') {
    document.getElementById('error-firstname').textContent = 'Le prénom est requis';
    firstname.classList.add('error');
    isValid = false;
  }

  // Nom
  const lastname = document.getElementById('lastname');
  if (lastname.value.trim() === '') {
    document.getElementById('error-lastname').textContent = 'Le nom est requis';
    lastname.classList.add('error');
    isValid = false;
  }

  // Email
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    document.getElementById('error-email').textContent = 'L\'email est requis';
    email.classList.add('error');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    document.getElementById('error-email').textContent = 'Format email invalide';
    email.classList.add('error');
    isValid = false;
  }

  // CGV
  const cgv = document.getElementById('cgv');
  if (!cgv.checked) {
    document.getElementById('error-cgv').textContent = 'Vous devez accepter les CGV';
    isValid = false;
  }

  // Pass sélectionné
  const pass = document.getElementById('selected-pass').textContent;
  if (pass === 'Aucun pass sélectionné') {
    alert('Veuillez sélectionner un pass avant de continuer !');
    isValid = false;
  }

  // Succès
  if (isValid) {
    document.getElementById('ticket-form').style.display = 'none';
    document.getElementById('success-msg').style.display = 'block';
    window.scrollTo({ top: document.getElementById('success-msg').offsetTop - 100, behavior: 'smooth' });
  }
});