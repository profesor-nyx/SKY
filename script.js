/* =========================================================
   SKY — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- mobile nav toggle ---------- */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  /* ---------- animated stat counters ---------- */
  const stats = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString('tr-TR');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('tr-TR');
    };
    requestAnimationFrame(step);
  };
  if (stats.length) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(el => statsObserver.observe(el));
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        a.style.maxHeight = null;
      } else {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- command list ---------- */
  // Buraya kendi botunun gerçek komutlarını ekle / düzenle.
  const commands = [
    { name: '/ping', desc: 'Botun gecikme süresini (ms) gösterir.', tag: 'genel' },
    { name: '/yardim', desc: 'Tüm komutların listesini ve açıklamalarını gösterir.', tag: 'genel' },
    { name: '/profil', desc: 'Sunucudaki seviye, XP ve rütbe bilgini gösterir.', tag: 'genel' },
    { name: '/kick', desc: 'Belirtilen üyeyi sunucudan atar. Yetki gerektirir.', tag: 'moderasyon' },
    { name: '/ban', desc: 'Belirtilen üyeyi sunucudan yasaklar. Yetki gerektirir.', tag: 'moderasyon' },
    { name: '/mute', desc: 'Belirtilen üyeyi geçici olarak susturur.', tag: 'moderasyon' },
    { name: '/uyar', desc: 'Bir üyeye kayıtlı bir uyarı ekler.', tag: 'moderasyon' },
    { name: '/temizle', desc: 'Kanaldan belirtilen sayıda mesajı siler.', tag: 'moderasyon' },
    { name: '/cal', desc: 'YouTube veya Spotify bağlantısından şarkı çalar.', tag: 'muzik' },
    { name: '/duraklat', desc: 'Çalan şarkıyı duraklatır.', tag: 'muzik' },
    { name: '/sirdaki', desc: 'Şarkı listesindeki bir sonraki parçaya geçer.', tag: 'muzik' },
    { name: '/liste', desc: 'Sıradaki şarkı listesini gösterir.', tag: 'muzik' },
    { name: '/zar', desc: 'Sanal zar atar.', tag: 'eglence' },
    { name: '/yazitura', desc: 'Yazı tura attırır.', tag: 'eglence' },
    { name: '/gunluk', desc: 'Günlük ödülünü toplar.', tag: 'eglence' },
    { name: '/bakiye', desc: 'Sunucu içi ekonomi bakiyeni gösterir.', tag: 'eglence' },
  ];

  const tagLabels = {
    genel: 'Genel',
    moderasyon: 'Moderasyon',
    muzik: 'Müzik',
    eglence: 'Eğlence',
  };

  const tableEl = document.getElementById('cmd-table');
  const searchEl = document.getElementById('cmd-search');
  const filterButtons = document.querySelectorAll('#cmd-filters .chip');
  let activeFilter = 'hepsi';

  function renderCommands() {
    const query = (searchEl?.value || '').trim().toLowerCase();
    const filtered = commands.filter(cmd => {
      const matchesFilter = activeFilter === 'hepsi' || cmd.tag === activeFilter;
      const matchesQuery = !query ||
        cmd.name.toLowerCase().includes(query) ||
        cmd.desc.toLowerCase().includes(query);
      return matchesFilter && matchesQuery;
    });

    if (!filtered.length) {
      tableEl.innerHTML = `<div class="cmd-empty">Bu aramayla eşleşen komut bulunamadı.</div>`;
      return;
    }

    tableEl.innerHTML = filtered.map(cmd => `
      <div class="cmd-row">
        <span class="cmd-name">${cmd.name}</span>
        <span class="cmd-desc">${cmd.desc}</span>
        <span class="cmd-tag">${tagLabels[cmd.tag] || cmd.tag}</span>
      </div>
    `).join('');
  }

  if (tableEl) {
    renderCommands();
    searchEl?.addEventListener('input', renderCommands);
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderCommands();
      });
    });
  }

  /* ---------- nav background on scroll ---------- */
  const navEl = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) navEl.style.boxShadow = '0 8px 24px -12px rgba(0,0,0,0.5)';
    else navEl.style.boxShadow = 'none';
  });

});
