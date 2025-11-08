// CMD.js - Busca + Toggle + Copiar + Favoritos
document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement('script');
    script.src = 'index.js';
    document.body.appendChild(script);

    const search = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');
    const toggles = document.querySelectorAll('.toggle-code-btn');
    const copyBtns = document.querySelectorAll('.btn-copiar');
    const favBtns = document.querySelectorAll('.btn-fav');

    // BUSCA
    search.addEventListener('input', () => {
        const q = search.value.toLowerCase();
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(q) ? 'block' : 'none';
        });
    });

    // TOGGLE CÓDIGO
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.nextElementSibling;
            btn.classList.toggle('active');
            code.classList.toggle('show');
        });
    });

    // COPIAR
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.closest('.card').querySelector('.codigo').textContent;
            navigator.clipboard.writeText(code).then(() => {
                const orig = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.classList.remove('copied');
                }, 2000);
            });
        });
    });

    // FAVORITOS
    const key = 'cmd_favs';
    let favs = JSON.parse(localStorage.getItem(key)) || {};
    favBtns.forEach(btn => {
        const cmd = btn.closest('.card').dataset.cmd;
        const count = btn.nextElementSibling;
        if (favs[cmd]) {
            btn.classList.add('favorited');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
            count.textContent = favs[cmd];
        }
        btn.addEventListener('click', () => {
            const isFav = btn.classList.contains('favorited');
            let n = parseInt(count.textContent) || 0;
            n = isFav ? n - 1 : n + 1;
            count.textContent = n;
            if (n > 0) {
                btn.classList.add('favorited');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
                favs[cmd] = n;
            } else {
                btn.classList.remove('favorited');
                btn.innerHTML = '<i class="far fa-heart"></i>';
                delete favs[cmd];
            }
            localStorage.setItem(key, JSON.stringify(favs));
        });
    });

    // ANIMAÇÃO
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('show'));
    }, { threshold: 0.1 });
    cards.forEach(c => obs.observe(c));
});