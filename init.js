function getHomeGames() {
    return [
        ...(window.gamesData || []),
        ...(window.actionGames || []),
        ...(window.battleRoyaleData || []),
        ...(window.fpsData || []),
        ...(window.multiplayerGames || []),
        ...(window.sniperData || [])
    ];
}

function loadMainGame() {
    if (!window.gamesData || !window.gamesData.length) {
        return;
    }

    const featuredGame = window.gamesData[0];
    const iframe = document.getElementById("game-iframe");
    const title = document.getElementById("current-game-title");
    const icon = document.getElementById("game-icon");

    if (iframe && featuredGame.iframeUrl) {
        iframe.src = featuredGame.iframeUrl;
    }

    if (title) {
        title.textContent = featuredGame.name || "Wrestle Bros";
    }

    if (icon) {
        icon.src = featuredGame.imageUrl || "favicon.svg";
        icon.onerror = function() {
            this.src = "favicon.svg";
        };
    }
}

function toggleFullscreen() {
    const iframe = document.getElementById("game-iframe");
    if (!iframe) {
        return;
    }

    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
    }
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function loadRelatedGames() {
    const container = document.getElementById("related-games-container");
    if (!container) {
        return;
    }

    const featuredId = window.gamesData && window.gamesData[0] ? window.gamesData[0].id : "";
    const allGames = getHomeGames().filter(game => game.id !== featuredId);

    if (!allGames.length) {
        return;
    }

    const pickedGames = shuffleArray(allGames).slice(0, 12);
    container.innerHTML = "";

    pickedGames.forEach(game => {
        const card = document.createElement("article");
        card.className = "game-card";
        card.innerHTML = `
            <img src="${game.imageUrl}" alt="${game.name}" onerror="this.src='img/icon/model.jpg'">
            <div class="game-card-title">${game.name}</div>
        `;
        card.addEventListener("click", function() {
            if (game.link) {
                window.location.href = game.link;
            }
        });
        container.appendChild(card);
    });
}

function initParticles() {
    const container = document.getElementById("particles");
    if (!container) {
        return;
    }

    container.innerHTML = "";
    const colors = ["#ff5a2a", "#ffd166", "#7cffcb"];

    for (let i = 0; i < 22; i += 1) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDelay = Math.random() * 18 + "s";
        particle.style.animationDuration = 14 + Math.random() * 10 + "s";
        particle.style.width = 4 + Math.random() * 4 + "px";
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    document.addEventListener("mousemove", event => {
        glow.style.left = event.clientX + "px";
        glow.style.top = event.clientY + "px";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadMainGame();
    loadRelatedGames();
    initParticles();
    initCursorGlow();
});
