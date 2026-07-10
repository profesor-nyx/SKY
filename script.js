
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}`;
}
updateClock();
setInterval(updateClock, 1000 * 30);

// istatistik sayaçları
function animateCount(el, target, duration) {
  const start = 0;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);
    el.textContent = value.toLocaleString('tr-TR');
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statServer = document.getElementById('statServer');
const statUser = document.getElementById('statUser');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(statServer, 12000, 1200);
      animateCount(statUser, 2100000, 1500);
      statsObserver.disconnect();
    }
  });
});
statsObserver.observe(statServer);
const cmdTabs = document.querySelectorAll('.cmd-tab');
const cmdRows = document.querySelectorAll('.cmd-row');

cmdTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    cmdTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const cat = tab.dataset.cat;
    cmdRows.forEach(row => {
      row.classList.toggle('hidden', row.dataset.cat !== cat);
    });
  });
});
cmdRows.forEach(row => {
  if (row.dataset.cat !== 'moderasyon') row.classList.add('hidden');
});
