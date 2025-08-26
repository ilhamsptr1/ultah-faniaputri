// Data untuk website
const birthdayData = {
    name: "Fania Putri Azzahra",
    age: "19",
    birthDate: "26/09/2006",
    zodiac: "Virgo",
    hobbies: "Mancing Di Ronux",
    memories: [
        { image: "https://i.pinimg.com/736x/93/29/b0/9329b002b4ab8c0e18a914866c523c32.jpg", caption: "duckgyole" },
        { image: "https://i.pinimg.com/736x/81/34/0c/81340c98bfb8353a2f9b14138b014cc1.jpg", caption: "cantik banget" },
        { image: "https://i.pinimg.com/736x/f0/b4/4a/f0b44a4832cb0cbfef5b161b54e328d9.jpg", caption: "ini juga kamu cantik banget" },
        { image: "https://i.pinimg.com/736x/9e/7c/32/9e7c3298234cbc9dcfbbb1f8dda0cfaf.jpg", caption: "waktu kita sma!" },
        { image: "https://i.pinimg.com/736x/9e/f4/a2/9ef4a2219a0e4f2c387c2663eea2455a.jpg", caption: "aku suka banget foto ini" },
   
    ],
    messages: [
        { sender: "Batman", avatar: "https://i.pinimg.com/1200x/b9/a6/2b/b9a62b0f257042c1f3b3443186d98d6e.jpg", message: "Jangan Lupa Waktu kalo main rublux" },
        { sender: "Dr Strange", avatar: "https://i.pinimg.com/1200x/92/8c/3f/928c3ff3ff66c4625216d71f6c1669bc.jpg", message: "Jangan Lupa Ibadah" },
        { sender: "Bebek Madura", avatar: "https://i.pinimg.com/736x/50/21/26/5021262f5386cb36f3791281f0dcb6cb.jpg", message: "Hii temanku selamat ulang tahunn" },
    ],
    celebrationDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1) // Besok sebagai contoh
};

// Inisialisasi ketika dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Sembunyikan loading screen setelah 2 detik
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);
    
    // Isi data profil
    fillProfileData();
    
    // Isi memori slider
    initMemorySlider();
    
    // Isi pesan
    fillMessages();
    
    // Inisialisasi countdown
    initCountdown();
    
    // Setup event listeners
    setupEventListeners();
    
    // Mulai confetti secara acak
    startRandomConfetti();
});

// Fungsi untuk mengisi data profil
function fillProfileData() {
    document.querySelector('.profile-overlay h3').textContent = birthdayData.name;
    document.querySelector('.profile-overlay p').textContent = `Ulang Tahun ke-${birthdayData.age}`;
    
    const detailsList = document.querySelectorAll('.profile-details li');
    detailsList[0].innerHTML = `<span>Tanggal Lahir:</span> ${birthdayData.birthDate}`;
    detailsList[1].innerHTML = `<span>Zodiak:</span> ${birthdayData.zodiac}`;
    detailsList[2].innerHTML = `<span>Hobi:</span> ${birthdayData.hobbies}`;
}

// Fungsi untuk inisialisasi memory slider
function initMemorySlider() {
    const sliderContainer = document.getElementById('memorySlider');
    
    birthdayData.memories.forEach(memory => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';
        memoryItem.innerHTML = `
            <img src="${memory.image}" alt="${memory.caption}">
            <div class="memory-caption">${memory.caption}</div>
        `;
        sliderContainer.appendChild(memoryItem);
    });
    
    // Setup slider navigation
    let currentPosition = 0;
    const memoryItems = document.querySelectorAll('.memory-item');
    const itemWidth = memoryItems[0].offsetWidth + 15; // Width + gap
    
    document.querySelector('.slider-next').addEventListener('click', function() {
        const maxPosition = -((memoryItems.length - 5) * itemWidth);
        if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            sliderContainer.style.transform = `translateX(${currentPosition}px)`;
        }
    });
    
    document.querySelector('.slider-prev').addEventListener('click', function() {
        if (currentPosition < 0) {
            currentPosition += itemWidth;
            sliderContainer.style.transform = `translateX(${currentPosition}px)`;
        }
    });
}

// Fungsi untuk mengisi pesan
function fillMessages() {
    const messagesContainer = document.querySelector('.messages-container');
    
    birthdayData.messages.forEach(msg => {
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card';
        messageCard.innerHTML = `
            <div class="message-header">
                <div class="message-avatar">
                    <img src="${msg.avatar}" alt="${msg.sender}">
                </div>
                <div class="message-sender">${msg.sender}</div>
            </div>
            <div class="message-content">"${msg.message}"</div>
        `;
        messagesContainer.appendChild(messageCard);
    });
}



// Fungsi untuk setup event listeners
function setupEventListeners() {
    const audio = document.getElementById('birthdaySong');
    const playBtn = document.getElementById('playBtn');
    let isPlaying = false;
    
    // Tombol putar musik
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i> Putar';
        } else {
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Jeda';
            startConfetti();
        }
        isPlaying = !isPlaying;
    });
    
    // Tombol info
    document.getElementById('infoBtn').addEventListener('click', function() {
        document.getElementById('infoModal').style.display = 'flex';
    });
    
    // Tombol tutup modal
    document.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('infoModal').style.display = 'none';
    });
    
    // Tombol wish
    document.getElementById('wishBtn').addEventListener('click', function() {
        alert('Selamat ulang tahun! Semoga semua harapan dan impianmu terkabul! 🎂🎉');
        startConfetti();
    });
    
    // Klik di luar modal untuk menutup
    window.addEventListener('click', function(event) {
        if (event.target === document.getElementById('infoModal')) {
            document.getElementById('infoModal').style.display = 'none';
        }
    });
    
    // Smooth scroll untuk indikator scroll
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        document.getElementById('profile').scrollIntoView({ behavior: 'smooth' });
    });
}

// Fungsi untuk confetti effect
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#e50914', '#f5f5f1', '#000', '#b81d24', '#465ab6'];
    
    // Buat confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 + 2
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        let stillFalling = false;
        
        for (let i = 0; i < confettiPieces.length; i++) {
            const p = confettiPieces[i];
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            
            ctx.restore();
            
            p.y += p.speed;
            p.x += Math.sin(p.angle * Math.PI / 180) * 2;
            p.rotation += p.rotationSpeed;
            
            if (p.y < canvas.height) {
                stillFalling = true;
            }
        }
        
        if (stillFalling) {
            requestAnimationFrame(drawConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    drawConfetti();
}

// Fungsi untuk memulai confetti secara acak
function startRandomConfetti() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance untuk memulai confetti
            startConfetti();
        }
    }, 10000); // Setiap 10 detik
}

// Responsive canvas pada resize window
window.addEventListener('resize', function() {
    const canvas = document.getElementById('confettiCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('DOMContentLoaded', function() {
    const infoBtn = document.getElementById('infoBtn');
    const infoModal = document.getElementById('infoModal');
    const closeModal = infoModal.querySelector('.close-modal');

    infoBtn.addEventListener('click', function() {
        infoModal.style.display = 'block';
    });

    closeModal.addEventListener('click', function() {
        infoModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === infoModal) {
            infoModal.style.display = 'none';
        }
    });
});

// Add your JavaScript code here

document.addEventListener('DOMContentLoaded', function() {
    var wishBtn = document.getElementById('wishBtn');
    if (wishBtn) {
        wishBtn.addEventListener('click', function() {
            alert('Happy Birthday sayanggg, alias duckgyole');
        });
    }
});