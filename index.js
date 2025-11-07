// index.js - CodMac Home
document.addEventListener("DOMContentLoaded", function () {

    // Botão Voltar ao Topo
    const btnTopo = document.getElementById("btn-topo");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            btnTopo.classList.add("show");
        } else {
            btnTopo.classList.remove("show");
        }
    });

    window.topFunction = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Toggle do Dropdown de Perfil (botão ícone de usuário)
    const btnPerfil = document.getElementById("btn-perfil");
    const dropdown = document.getElementById("profile-dropdown");

    if (btnPerfil && dropdown) {
        btnPerfil.addEventListener("click", function (e) {
            e.preventDefault();
            dropdown.classList.toggle("show");
        });

        // Fecha ao clicar fora
        document.addEventListener("click", function (e) {
            if (!btnPerfil.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove("show");
            }
        });
    }

    // Animação suave nos cards ao entrar na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.featured-card, .benefit-item').forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "all 0.6s ease";
        observer.observe(card);
    });

    console.log("CodMac Home carregado com sucesso! v1.0 - 06/11/2025 23:21");
});