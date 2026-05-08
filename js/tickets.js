// ── FIREBASE ──
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-3vy-leBagktgBb1qE6LIOEBX2B1yWYM",
  authDomain: "nova-festival.firebaseapp.com",
  projectId: "nova-festival",
  storageBucket: "nova-festival.firebasestorage.app",
  messagingSenderId: "872688182959",
  appId: "1:872688182959:web:ef267238e134c59e47d65a",
  measurementId: "G-6L0GNB15T9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── SELECTION DU PASS ──
window.selectPass = function(name, price) {
  document.getElementById('selected-pass').textContent = name + ' — €' + price;
  document.querySelectorAll('.ticket-card').forEach(card => {
    card.style.borderColor = 'rgba(240, 237, 228, 0.1)';
  });
  document.querySelector(`.ticket-btn[onclick*="${name}"]`)
    .closest('.ticket-card').style.borderColor = '#C8FF00';
  document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
};

// ── BOUTONS PASS ──
document.querySelectorAll('.ticket-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.ticket-card');
    const name = card.querySelector('.ticket-type').textContent;
    const price = card.querySelector('.ticket-price').textContent.replace('€', '');
    document.getElementById('selected-pass').textContent = name + ' — €' + price;
    document.querySelectorAll('.ticket-card').forEach(c => {
      c.style.borderColor = 'rgba(240, 237, 228, 0.1)';
    });
    card.style.borderColor = '#C8FF00';
    document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// ── VALIDATION ET ENVOI FIREBASE ──
document.getElementById('ticket-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  let isValid = true;

  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

  const firstname = document.getElementById('firstname');
  if (firstname.value.trim() === '') {
    document.getElementById('error-firstname').textContent = 'Le prénom est requis';
    firstname.classList.add('error');
    isValid = false;
  }

  const lastname = document.getElementById('lastname');
  if (lastname.value.trim() === '') {
    document.getElementById('error-lastname').textContent = 'Le nom est requis';
    lastname.classList.add('error');
    isValid = false;
  }

  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    document.getElementById('error-email').textContent = "L'email est requis";
    email.classList.add('error');
    isValid = false;
  } else if (!emailRegex.test(email.value)) {
    document.getElementById('error-email').textContent = 'Format email invalide';
    email.classList.add('error');
    isValid = false;
  }

  const cgv = document.getElementById('cgv');
  if (!cgv.checked) {
    document.getElementById('error-cgv').textContent = 'Vous devez accepter les CGV';
    isValid = false;
  }

  const pass = document.getElementById('selected-pass').textContent;
  if (pass === 'Aucun pass sélectionné') {
    alert('Veuillez sélectionner un pass avant de continuer !');
    isValid = false;
  }

  if (isValid) {
    try {
      const btn = document.querySelector('.btn-submit');
      btn.textContent = 'Envoi en cours...';
      btn.disabled = true;

      await addDoc(collection(db, 'commandes'), {
        prenom: firstname.value.trim(),
        nom: lastname.value.trim(),
        email: email.value.trim(),
        telephone: document.getElementById('phone').value.trim(),
        quantite: document.getElementById('quantity').value,
        pass: pass,
        date: new Date().toISOString()
      });

      document.getElementById('ticket-form').style.display = 'none';
      document.getElementById('success-msg').style.display = 'block';
      window.scrollTo({
        top: document.getElementById('success-msg').offsetTop - 100,
        behavior: 'smooth'
      });

    } catch (error) {
      console.error('Erreur Firebase:', error);
      alert('Une erreur est survenue. Réessaie !');
      const btn = document.querySelector('.btn-submit');
      btn.textContent = 'Confirmer ma commande →';
      btn.disabled = false;
    }
  }
});