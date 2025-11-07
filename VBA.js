// VBA.js - CodMac VBA Page
// Atualizado em: 07/11/2025 00:16 -03

document.addEventListener("DOMContentLoaded", function () {

    // ==================== BOTÃO VOLTAR AO TOPO ====================
    const btnTopo = document.getElementById("btn-topo");
    window.addEventListener("scroll", () => {
        btnTopo.classList.toggle("show", window.scrollY > 300);
    });
    window.topFunction = () => window.scrollTo({ top: 0, behavior: "smooth" });

    // ==================== DROPDOWN DE PERFIL ====================
    const btnPerfil = document.getElementById("btn-perfil");
    const dropdown = document.getElementById("profile-dropdown");

    if (btnPerfil && dropdown) {
        btnPerfil.addEventListener("click", e => {
            e.preventDefault();
            dropdown.classList.toggle("show");
        });
        document.addEventListener("click", e => {
            if (!btnPerfil.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove("show");
            }
        });
    }

    // ==================== BUSCA DE MACROS ====================
    const searchInput = document.getElementById("macro-search");
    const macroItems = document.querySelectorAll(".macro-item");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();
        macroItems.forEach(item => {
            const text = (item.getAttribute("data-search") || "").toLowerCase();
            item.style.display = text.includes(query) ? "flex" : "none";
        });
    });

    // ==================== TOGGLE DO CÓDIGO VBA ====================
    document.querySelectorAll(".toggle-code-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            target.classList.toggle("show");
            btn.classList.toggle("active");
        });
    });

    // ==================== COPIAR CÓDIGO ====================
    document.querySelectorAll(".btn-copiar").forEach(btn => {
        const originalHTML = btn.innerHTML;
        btn.addEventListener("click", () => {
            const code = document.getElementById(btn.dataset.code).textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.classList.add("copied");
                btn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    btn.classList.remove("copied");
                    btn.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => console.error("Erro ao copiar:", err));
        });
    });

    // ==================== FAVORITOS (CURTIR / DESCURTIR) ====================
    const favoriteButtons = document.querySelectorAll(".btn-favorite");
    const favoritesStorage = JSON.parse(localStorage.getItem("codmac_favorites") || "{}");

    favoriteButtons.forEach(btn => {
        const macroId = btn.dataset.macro;
        const countSpan = document.querySelector(`[data-macro="${macroId}-count"]`);
        const isFavorited = favoritesStorage[macroId] === 1;

        updateFavoriteUI(btn, countSpan, isFavorited);

        btn.addEventListener("click", () => {
            const newState = favoritesStorage[macroId] === 1 ? 0 : 1;
            favoritesStorage[macroId] = newState;
            localStorage.setItem("codmac_favorites", JSON.stringify(favoritesStorage));
            updateFavoriteUI(btn, countSpan, newState === 1);
        });
    });

    function updateFavoriteUI(btn, countSpan, isFavorited) {
        btn.classList.toggle("favorited", isFavorited);
        btn.innerHTML = isFavorited 
            ? '<i class="fas fa-heart"></i>' 
            : '<i class="far fa-heart"></i>';
        countSpan.textContent = isFavorited ? "1" : "0";
        countSpan.parentElement.classList.toggle("favorited", isFavorited);

        // Animação ao curtir
        if (isFavorited) {
            btn.style.animation = "pulse 0.4s ease";
            setTimeout(() => btn.style.animation = "", 400);
        }
    }

    // ==================== LOG FINAL ====================
    console.log("CodMac VBA carregado com sucesso! v1.2 - 07/11/2025 00:16");
});