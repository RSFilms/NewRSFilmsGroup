// ============================
// 1. PRELOADER LOGIC
// ============================
window.addEventListener('load', () => {
    const loader = document.getElementById('preloader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// ============================
// 2. ANIMATED BACKGROUND LOGIC
// ============================
const canvas = document.getElementById('cyber-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

// Resize Canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Create Particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        // Check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // Draw particle
        this.draw();
    }
}

// Initialize Particles
function init() {
    particlesArray = [];
    // Number of particles proportional to screen area
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 3) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1; // Speed
        let directionY = (Math.random() * 2) - 1;

        // Colors: mostly grey, some brand pink/blue
        let rand = Math.random();
        let color = '#ccc'; // Default grey
        if (rand > 0.95) color = '#ff2a6d'; // Pink accent
        else if (rand > 0.90) color = '#00acc1'; // Blue accent
        else color = '#aaaaaa';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles with lines
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0,0,0,' + (opacityValue * 0.1) + ')'; // Very faint lines
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

// Resize Event
window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height / 80) * (canvas.height / 80));
    init();
});

// Mouse out
window.addEventListener('mouseout', function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

init();
animate();


// ============================
// 3. DATA DEFINITIONS
// ============================
const teamData = [{
        name: "R.S Founder",
        role: "CEO & Founder",
        img: "https://dummyimage.com/600x600/ccc/000&text=CEO",
        bio: "The visionary behind R.S Films Group with over 15 years of experience."
    },
    {
        name: "Amit Kumar",
        role: "Channel Manager",
        img: "https://dummyimage.com/600x600/ddd/000&text=Manager",
        bio: "Expert in YouTube CMS and Rights Management."
    },
    {
        name: "Rahul Singh",
        role: "Senior Editor",
        img: "https://dummyimage.com/600x600/eee/000&text=Editor",
        bio: "The magic hands behind our 4K cinematic edits."
    },
    {
        name: "Priya Sharma",
        role: "Social Head",
        img: "https://dummyimage.com/600x600/ccc/000&text=Social",
        bio: "Managing digital campaigns and influencer marketing."
    }
];

const clientList = [
    "Gudiya Jhaki Official", "Shivam Chhaliya Official", "R.S Films Bhojpuri",
    "Siddhi Vinayak Films Bhakti", "Aarti Films Jhanki", "Ahir Brand",
    "Rang Mahal Studios", "Ishu Tilakdhari Official", "Abhishek Chhaliya Official",
    "Avinash Madhur Official", "Vikash Bhardwaj Official", "Lovkush Arpita Official",
    "Siddhi Vinayak Films", "Aarti Films Hits", "Neha Singh Music", "BVD Music World",
    "Ishu Tilakdhari Kanpur", "Manish Mastana Official", "Mayur Bharat Raas",
    "GP Music Official", "Amresh Yadav Entertainment", "Neeraj Official", "MB Music World"
];

// Specific Data for Each Channel (Stats & Bio & Links)
const partnerDetails = {
    "Gudiya Jhaki Official": {
        tagline: "Radha Krishan, Fagan Geet & Bhakti",
        about: "Our YouTube Channel Gudiya Jhakhi Official brings devotional content related to radha krishan, Fagan Geet, dehati bhakti bhajan, dancing bhakti songs, jagran songs and more.",
        stats: {
            subs: "63.9K",
            views: "30M+",
            videos: "190"
        },
        contact: "gudiyajhakiofficial01@gmail.com | +91 91615 29116",
        type: "Devotional",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@gudiyajhakiofficial",
            instagram: "https://instagram.com/gudiyaprinceofficial",
            facebook: "https://facebook.com/gudiyajhankiofficial"
        }
    },
    "Aarti Films Hits": {
        tagline: "Trending Bhojpuri Hits",
        about: "Your ultimate destination for trending Bhojpuri songs, romantic hits, and official music videos that define passion, emotion, and entertainment.",
        stats: {
            subs: "900+",
            views: "208K+",
            videos: "49"
        },
        contact: "info.rsfilmsofficial@gmail.com",
        type: "Music Label",
        typeClass: "music",
        links: {
            youtube: "https://youtube.com/@AartiFilmsHits",
            instagram: "https://instagram.com/aartifilms099",
            facebook: "https://facebook.com/people/AARTI-FILMS/100064133170179"
        }
    },
    "Neha Singh Music": {
        tagline: "Soulful Melodies & Beats",
        about: "Your ultimate destination for soulful melodies, energetic beats, and heart-touching songs. From romantic tracks to devotional music, every tune here is crafted to connect with your emotions.",
        stats: {
            subs: "220+",
            views: "11K+",
            videos: "14"
        },
        contact: "nehasinghmusiclko@gmail.com",
        type: "Artist Channel",
        typeClass: "artist",
        links: {
            youtube: "https://www.youtube.com/@NehaSinghMusic1"
        }
    },
    "R.S Films Bhojpuri": {
        tagline: "The Heart of Bhojpuri",
        about: "R.S Films Bhojpuri mein apna gana release karne ke liye call karein. Hum fresh content aur naye talent ko promote karte hain. No release charges.",
        stats: {
            subs: "19.9K",
            views: "5.5M+",
            videos: "220"
        },
        contact: "ay95686@gmail.com | 9792946666",
        type: "Music Label",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/@RSFilmsBhojpuri",
            instagram: "https://instagram.com/r.sfilmsbhojpuri",
            facebook: "https://facebook.com/r.sfilmsbhojpuri"
        }
    },
    "Ishu Tilakdhari Official": {
        tagline: "Soulful Jhankis & Devotion",
        about: "Your spiritual destination for soulful jhankis and devotional content. Immerse yourself in divine stories, mesmerizing bhajans, and spiritual teachings.",
        stats: {
            subs: "7.48K",
            views: "2.2M+",
            videos: "23"
        },
        contact: "ishutilakdhariofficial@gmail.com | 6386505230",
        type: "Devotional Creator",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@IshuTilakdhariOfficial",
            instagram: "https://instagram.com/ishutilakdhari/?hl=en",
            facebook: "https://facebook.com/people/Ishu-Tilakdhari/100023361700549/"
        }
    },
    "Vikash Bhardwaj Official": {
        tagline: "Rangdari Songs Ka Asli Adda",
        about: "Is channel par aapko milega dhamakedar Rangdari Song, Awadhi Tadka aur zabardast entertainment. Awadhi power-packed gaane pasand hain, toh subscribe karein!",
        stats: {
            subs: "4.01K",
            views: "334K+",
            videos: "24"
        },
        contact: "vikashsharmaofficial111@gmail.com | +91 9792946666",
        type: "Artist Channel",
        typeClass: "artist",
        links: {
            youtube: "https://www.youtube.com/@Vikashbhardwajofficial1",
            instagram: "https://instagram.com/pt.vikash_bhardwaj_thekedaar"
        }
    },
    "BVD Music World": {
        tagline: "Bhojpuri Bhakti & Vibes",
        about: "Your ultimate destination for Bhojpuri Videos & Music. Soul-touching Bhajans, Kirtans, and Spiritual Songs dedicated to various deities.",
        stats: {
            subs: "263",
            views: "18K+",
            videos: "12"
        },
        contact: "bvdmusicworld@gmail.com",
        type: "Music Channel",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@BVDMusicWorld"
        }
    },
    "Avinash Madhur Official": {
        tagline: "Voice of Avinash Yadav Madhur",
        about: "Official channel of Avinash Yadav 'Madhur'. Dedicated to providing the best songs to the audience with love and blessings.",
        stats: {
            subs: "7.08K",
            views: "987K+",
            videos: "341"
        },
        contact: "avinashyadav.madhur@gmail.com | +91 9839233977",
        type: "Official Artist",
        typeClass: "artist",
        links: {
            youtube: "https://www.youtube.com/@AvinashYadavMadhur",
            instagram: "https://instagram.com/avinashmadhurji?igsh=MWowMW4yNnY1NWtnZQ==",
            facebook: "https://facebook.com/AvinashYadavMadhur"
        }
    },
    "Aarti Films Jhanki": {
        tagline: "Faith, Devotion & Culture",
        about: "We bring you soul-touching devotional videos filled with faith, devotion, and Indian cultural traditions — including stunning Radha Krishna Jhanki Songs and soulful Bhajans.",
        stats: {
            subs: "788",
            views: "265K+",
            videos: "28"
        },
        contact: "aartifilmsjhanki@gmail.com | +91 9792946666",
        type: "Devotional Hub",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@AartiFilmsJhanki"
        }
    },
    "Ahir Brand": {
        tagline: "Trending Music Brand",
        about: "Ahir Brand mein apna gaana release karne ke liye call karein. Fresh content only. Humare sath judkar apne music ko naye mukam par le jayein.",
        stats: {
            subs: "3.54K",
            views: "474K+",
            videos: "46"
        },
        contact: "info.ahiranbrand@gmail.com | 9792946666",
        type: "Music Brand",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/@ahirbrandofficial"
        }
    },
    "Siddhi Vinayak Films Bhakti": {
        tagline: "Divine Melodies",
        about: "Immerse yourself in the spiritual world of bhajans, aartis, and mantras dedicated to Lord Ganesha, Krishna, Durga, Shiva. Crafted to uplift your soul.",
        stats: {
            subs: "16.4K",
            views: "5.5M+",
            videos: "52"
        },
        contact: "siddhivinayakfilmbhakti@gmail.com | 7068636112",
        type: "Bhakti Channel",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@SiddhiVinayakFilmsBhakti"
        }
    },
    "Siddhi Vinayak Films": {
        tagline: "Vibrant Bhojpuri Hits",
        about: "Your ultimate destination for soulful and vibrant Bhojpuri music! Trending Bhojpuri hits, high-quality music videos, and exclusive releases.",
        stats: {
            subs: "3.08K",
            views: "386K+",
            videos: "47"
        },
        contact: "info.siddhivinayakfilms@gmail.com | 7068636112",
        type: "Regional Music",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/@SiddhiVinayakFilmsBhojpuri",
            facebook: "https://facebook.com/SiddhiVinayakFilms01"
        }
    },
    "Rang Mahal Studios": {
        tagline: "Spiritual Music Destination",
        about: "Dive into the divine world of Bhajans. Soulful Hanuman Bhajans, Krishna Bhajans, Ram Bhajans, and heart-touching devotional melodies.",
        stats: {
            subs: "11.4K",
            views: "2.5M+",
            videos: "90"
        },
        contact: "poonamsingla299@gmail.com",
        type: "Studio Channel",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@rangmahalstudios",
            instagram: "https://instagram.com/rangmahalstudios",
            facebook: "https://facebook.com/rangmahalstu"
        }
    },
    "Shivam Chhaliya Official": {
        tagline: "The Jhanki King",
        about: "Your spiritual destination for soulful jhankis and devotional content. Join us on a sacred journey as we bring you closer to the divine through vibrant jhankis.",
        stats: {
            subs: "116K",
            views: "34M+",
            videos: "211"
        },
        contact: "shivamchhaliya9335@gmail.com | 7007376969",
        type: "Star Creator",
        typeClass: "artist",
        links: {
            youtube: "https://www.youtube.com/@shivamchhaliyaofficial",
            instagram: "https://instagram.com/shivam_chhaliya_official?igsh=MW5vbjc4aWJ5ZGRzeA==",
            facebook: "https://facebook.com/profile.php?id=100008744467616"
        }
    },
    "Abhishek Chhaliya Official": {
        tagline: "Devotion & Faith",
        about: "Your ultimate destination for soulful and divine experiences through Indian devotional songs and mesmerizing jhanki videos of Radha Krishna and Shankar Parvati.",
        stats: {
            subs: "8.12K",
            views: "2.7M+",
            videos: "42"
        },
        contact: "abhishekchhaliyaofficial@gmail.com | +91 9792946666",
        type: "Devotional Creator",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@AbhishekChhaliyaOfficial"
        }
    },
    "Lovkush Arpita Official": {
        tagline: "Divya Bhakti Sangeet",
        about: "Divya bhakti sangeet ke liye aapka pavitra sthan. Bhagwan Ram, Sita Mata, Krishna, aur Devi Durga ko samarpit bhavpoorn bhajan aur aarti.",
        stats: {
            subs: "2.38K",
            views: "679K+",
            videos: "31"
        },
        contact: "lovkusharpitaofficial@gmail.com | +91 91405 69766",
        type: "Bhakti Duo",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/@LovkushArpitaOfficial"
        }
    },
    "Amresh Yadav Entertainment": {
        tagline: "Complete Entertainment",
        about: "Official channel for Amresh Yadav Entertainment. Bringing you the best of regional content and music videos.",
        stats: {
            subs: "50K+",
            views: "5M+",
            videos: "100+"
        },
        contact: "amreshyadavballu6859@gmail.com",
        type: "Entertainment",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/channel/UCD_3yi3VuRyMoFzF44LLvTg"
        }
    },
    "GP Music Official": {
        tagline: "Music for Soul",
        about: "GP Music Official channel presenting heart-touching songs and melodies.",
        stats: {
            subs: "10K+",
            views: "1M+",
            videos: "50+"
        },
        contact: "info.gpmusicofficial@gmail.com",
        type: "Music Channel",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/channel/UCVSk3hYESHNPvsWKYYk-2yg"
        }
    },
    "Ishu Tilakdhari Kanpur": {
        tagline: "Kanpur's Devotional Voice",
        about: "Official channel of Ishu Tilakdhari from Kanpur, featuring devotional songs and events.",
        stats: {
            subs: "15K+",
            views: "1.5M+",
            videos: "60+"
        },
        contact: "eshushukla52@gmail.com",
        type: "Devotional",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/channel/UCQ8IFeH6_MnAVOSBDjNag3g"
        }
    },
    "Manish Mastana Official": {
        tagline: "Mastana Melodies",
        about: "Official channel of Manish Mastana. Enjoy the best of regional hits.",
        stats: {
            subs: "20K+",
            views: "2M+",
            videos: "80+"
        },
        contact: "my868881@gmail.com",
        type: "Artist Channel",
        typeClass: "artist",
        links: {
            youtube: "https://www.youtube.com/channel/UC_4PIApVwjbY8FeV3BrIDIQ"
        }
    },
    "Mayur Bharat Raas": {
        tagline: "Cultural Raas & Bhajans",
        about: "Dedicated to Raas Leela and cultural devotional events.",
        stats: {
            subs: "5K+",
            views: "500K+",
            videos: "30+"
        },
        contact: "mayurbharatraas6394@gmail.com",
        type: "Cultural",
        typeClass: "devotional",
        links: {
            youtube: "https://www.youtube.com/channel/UCIICR6RaExZzusn1swtFuZg"
        }
    },
    "Neeraj Official": {
        tagline: "Official Music Channel",
        about: "Official channel for Neeraj Official. Bringing you fresh and trending music content managed by R.S Films Group.",
        stats: {
            subs: "Coming Soon",
            views: "Growing",
            videos: "New"
        },
        contact: "info.neerajofficial@gmail.com",
        type: "Artist Channel",
        typeClass: "artist",
        links: {
            youtube: "#"
        }
    },
    "MB Music World": {
        tagline: "Regional & Devotional Beats",
        about: "MB Music World is your destination for soulful regional and devotional music. Subscribe for regular updates.",
        stats: {
            subs: "1K+",
            views: "100K+",
            videos: "20+"
        },
        contact: "mandeepbabacreator@gmail.com",
        type: "Music Label",
        typeClass: "music",
        links: {
            youtube: "https://www.youtube.com/channel/UCjatmsWwJ7fSK1MAVBnrlxQ"
        }
    }
};

// Specific Portfolio Data for Partners
const partnerSpecificVideos = {
    "Ahir Brand": [
        "UyeH93Z7T_0", "uQ3r9dqk5Qw", "q5dQtXdezao", "nekHMOespko", "PxfcK_HPhxQ",
        "AcrQy_8QDy0", "ulXCEYS6iX8", "Hm2aWyHOUZ4", "84GMtipHXfM", "0Pd6GM_ngKA",
        "qr-6Bh0qQOk", "WM2ENiq80Lw", "xtaHBivQSzY", "AyX9aZFkyp8", "PloOWhwFIY8",
        "vTvOS5h_Dtc", "Z9--cS6h_SY", "5mnX42CiIWc", "9tO6WurHFkI", "JE4M-rgdofI",
        "Y_88qTzUHmA", "rAO1kSz0alE", "j9DmMgbXPds", "rYZztMPQYGc"
    ],
    "Gudiya Jhaki Official": [
        "ImyRqDDKYR0", "9gqxJ4h7zE0", "a4j2gYmaYls", "cZoDtxzU-dk", "gfUSMHAh2_A",
        "ppf9nRtW6Io", "XHVNj61J2AU", "EIBolyMuf5Q", "ikyHGdWJjoI", "ipgctBlWKik",
        "XCE9zh4qSv0", "8iWUctkmDiE", "UFiwOV_S1a8", "sqI_MgKXcXM", "RW8anlP7R0Y",
        "_Dpwe4LaHQ0", "boBSnltFuVQ", "G7bSEG6QGzU", "ETEhCUKp31g", "VsT6oW_YnI8",
        "QiTd8tKAfCU", "0QDGpZDacgE", "ukmPO3VRUXQ", "EdBvNZrsLv0", "IPBp3htxarI",
        "pBbvobD1Nog", "D20zljQWvHs", "dtytQH2DObU", "CjSGT6sP-VQ", "7XeS2vSmhvI",
        "z3IwmxHvIFM", "z2DIdVr4Qo0", "FyE22qWVx0Y", "F8iqM6tycrE", "hQnusFjLVqQ",
        "It4nQTed9GU", "TKLBHaGtbgA", "uw2HCTkcwgc", "BRxaxAwgTxU", "k6bx8TBn6FA",
        "HJs8qE0cJh0", "8tfHMI1FJjo", "IDhBFhP_REI", "AbXmfXR-8yA", "hho0nA7UDmY",
        "bYJEkKDNyi8", "XJeeuBEZ180", "IEsKTztc0AA", "6qKDGuRYdQM", "kBu8FWdlUUM",
        "Icj36k_3aio", "8hHmQoggDhI", "D5QBTmHZiF0", "NLbphNRoBYc", "IYLCr_cBfGI",
        "bpo5CVcmeUc", "6CYKPKJlgZA", "ZVzesepjF9M", "l0t23jUQhP0", "j_XQVRYTBgE",
        "8OmmLeU6Q2k", "OXJ1t2pHQ1E", "yLTekTk_6ek", "he4GDU3VN0o", "DhpqsySwN2I",
        "9Kkodc8qIOQ", "jJJGcbn-bwY", "f4PZT6WXfg0", "sIgaSgZgIew", "GZH-zoeBGBU",
        "U7724WXkUqk", "qLYoOZoINdU", "KQizQ9ynexk", "uyhZZoocuvM", "0NNMMzUVcfI",
        "3tfBIvM6U9E", "rgbq8ZG-_GU", "xyQtYFIRBZg", "7xQ7w2yolj0", "gAFLe-n5dok",
        "cViDfdad-u8", "cwFht9JutmU", "_SATbBK8w90", "QZqQzR4F_EA", "iSaMZyv7XBw",
        "Fby0uocB2vc", "44LLo4lmfdU", "GFnuVCPjKgs", "JP2gau9Aj4Y", "69p1_raHjoU",
        "SMu-uPIYZs0", "e62BSz2yCO8", "tyxsQaCcwoQ", "kOC3Hob7Jdo", "cuxPukEDB6s",
        "kzyaAKez5wU", "2UYU9by4UGg", "6uJ7o2q2Loo", "BMaUTG7M-Fk", "29gEgsZ2iDQ",
        "64qPF9fS_Ag", "H_5yxdoQv6k", "TjBR68JSMok", "2lPl3bJ6Dos", "s-S8NjjbNzo",
        "LlgfiZKTTJg", "GiwS8SZ6I8c", "ujRhP81Dun8", "jVNeLO2UBbY", "Ld1qeu5n1kk",
        "UQADn1xwd4g", "BHKffieDR0o", "lTZo_s6IMZc", "VsItso2hDxo", "0KfUHI1VQAs",
        "xdig22fLQjk", "-161fz54_2Q", "ZCxopNSQXTM", "S3U-lvrnBjg", "hgvIdcEAR14",
        "9tMPqnK6JRM", "E2c8amuDfE8", "f1WwTMak1tw", "6LRWyEyDcMs", "pZJ4QdSrb4g"
    ],
    "Aarti Films Jhanki": [
        "ANIt_gZf0xQ", "007BcGeSoDw", "ggDkWOPVY08", "JEz-xg65z24", "EadW8uU4Ta0",
        "ckjI5hpQ0Cg", "g8NKsTZ7iGk"
    ],
    "Abhishek Chhaliya Official": [
        "_Mklvd08nBI", "f7u18XEF2t4", "3sbmKW7hzmA", "5MP9R94QDJA", "Z1mDlUOnPT4",
        "lGhCoipDHSc", "J4wNp005Yqg", "GCU4DTq3GrE", "LMYQHXRQ0Q8", "4GJGzKMGtho",
        "FszBcAnMpTo", "JWF3t8B4MFE", "aqkqF6WR8BE", "GQR6ulxKmmg", "t8NJ0DfXgdI",
        "cNFpxXy3dUc", "hhOSJ6JKReY", "1rKU_ncrGNM", "UbmmV1M81DU"
    ],
    "Avinash Madhur Official": [
        "mUrYL8n3Bbk", "I99b3ue7N9o", "3zbTeB8b4GQ", "c_dxf5enNEM", "gd2_p24i-Xk",
        "_NBOczCTaBo", "0oV11SeS1-o", "kh0K2Lf2UWg", "zqEz3ZA_AXk", "wZOmgUbq3IQ",
        "hx2NEsObloc", "Vb8zFoPXlQU", "Iowm_g2R8tU", "zN4IFqZ8Unc", "R67a_S_b2Es",
        "OGDIE6gQcRo", "csTmWvPVAxQ", "QQMUNJsNzz0", "J5VJ0m4V2OI", "KOtTrH6SK5s",
        "R7YqXNTF8u0", "Da3nkh4w2IM", "FuRCYDnUpmo", "-J2YhIFUULY", "G9byzV2VZlg",
        "_D-xXYlA6xI", "m0GwqjUYAuA", "e_Z0f-94Yyc", "mkDs0XK8Njk", "xdz0abUNGBs",
        "_c5g52M7g2E", "O0NL14jOml0", "4Eox0gDUrL4", "cZWXkfkVcYA", "j0tDWvBtwnA",
        "NnTmE5S4zbk", "j-7FG4YFlXE", "hrPR39wrpTk", "lE-70MYKs0E", "H_oSzg-U8LI",
        "4GKPWrJmpkQ", "s1d02TsA1AM", "dSRpYvf50DQ", "48-r9eYbX3w", "Q2tO21MydOY",
        "PNAqHhdY-tY", "zpS9MVZzZRA", "LXdwYDsoi6A", "H6QZq3n9AD8", "2WHPK4d_nLU",
        "k8DXnhKTX1U", "uOOW4gImlSI", "c2hRjljGUio", "G5H0Ai2Lvo0", "uU2ygV81ThA",
        "dtQyqZxR_M4", "b7SGVoWyO-k", "4Ggu2E4X-CM", "5AjNM2hmPp4", "rbqsmBgDGyw",
        "POCpvgiaWKU", "7EsaIJJRHto", "WWnBi2CRHNE", "xwht4glGDpk", "EkK8kkozDtQ",
        "d4-W5r1gXf4", "lCiwQua2BAk", "KU9Tz6BbiJo", "-yLx0ayyp6I", "wHXwE16kCq0",
        "SH57qcXu2j0", "n7gWzbu8ydM", "ER-MsmLH8FE", "ySqV94FOWaI", "PgmK_VFj938",
        "bXxiMuBbxew", "-LBfaEbu8YM", "J5zD6EOIMsk", "JgCbXKhAzm4", "E3dYJIlI9Ao",
        "RK_EIhhwIk8", "4okxX5jYKK8", "6Pru3205-3w", "dQJ8sZow4D8", "w32zoKJpvQI",
        "gtf3IMv0cA8", "GezCC8G1LyA", "jTRa_PbXN8U", "f61l7CT5a3A", "2h_P0xvzC3A",
        "aAxqPQPQe_s", "htBE1igjftU", "P_zwx-dwJAM", "PgNU6tgGDtU", "Ny4uLofqhVw",
        "B0mdEt9AXnA", "59itx4u4ORw", "v1w5uiioOXg", "ImxBz5SQ07c", "VT_mGOit-hA",
        "VkYIkWiMVZ0", "QeZ6vePZolU", "tkeGQ4v4eDo", "6hwSLFWPuE4", "hu_WadLT7Rw",
        "xhTW1B3V2vw", "5erWKZyVfZ8", "D6OCv1odffQ", "fw5EaPfHvnU"
    ],
    "Amresh Yadav Entertainment": [
        "8OcXSc1waUU", "y0wZ4Hx2G_Y", "hrF45Ayd47k", "FjOCFTI1oss", "RKahC20pREM",
        "pGU0-YGQwvg", "iW7XtCd-iLM", "pnRPFz4boU4", "kOJEoP92D-8", "_C3vwETKVGs",
        "rrfknmW6-IE", "OOpF9y6LRjc", "7DC3N-ptyTk", "-ePz-7l4uaU", "plZDlnjN_DI",
        "wnnXTG7TMv0", "ipO2gIPOZHA", "r6M3WMA5Ke0", "lKvVaker2Cc", "t4221vUvAdY",
        "MdxixDDrGwc", "xfxXCtDOS5I", "lP-pi2IOcN8", "CRKTgBzCvfE", "B-xuwWdf78E",
        "jUAMfPt-N5k", "mlAmRMObp90", "CC0yib3at3M", "XGn_ekc0MtY", "Oq7JHIgKYFg",
        "lHTwgVebB_k", "1kYwMjgrvro", "FuZO-Ja1Qsw", "v0ZRAyuwX2w", "1QGMhpzypZ4",
        "na1scPYY48Y", "iXGvWlVTnwE", "p6CLYIhbvLk", "QDAxzCkisos", "J0Kbe5lCj94",
        "De1PLqB6KzY", "LVzhrfiMc74", "4kugOS2qiO8", "L1zxY2IPEDk", "pTneQSnijoY",
        "eQ1zHhv7I4Q", "8X7c8_xNisI", "Nta68rQg_pE"
    ],
    "BVD Music World": [
        "ufvcJot_x4c", "VXvR9i1SLQs", "UJ0bq9YXtLE", "vIyT7mzQxPo"
    ],
    "GP Music Official": [
        "3q8ssp5y6H4", "anefJoTAbjY", "ez8hLTMQyBk", "BXiribN_PgM", "myx1a8YaBAg",
        "i72Xzn_Rmck"
    ],
    "Ishu Tilakdhari Kanpur": [
        "HgSC4xsfAmo", "_obEYg8jGsI", "WYY-7a84qvU", "PPrESHW6-GE", "C8SFKQ3nIhQ",
        "CUzkc_W-P3s", "lwwdcYX07_M", "WaWTvSesgRk", "TCjT5Zyp0cU", "_HlKnKrXfsc",
        "4_spp8lEjOA", "ake-amcxrWc", "0GMdX3V0un8", "Nx-C40XTA2A", "viKIgJEuxwg",
        "TBddRAI949g", "ogvQB2FxtZc", "Tis5CXffiR8", "GmO6X4E7GDk", "ZHjVHUPDrYA",
        "RK4AXroBaM8", "2O3uQ_FXcYs", "s_Bu2a1jhM0", "npA3TJEuHnM", "xDXIXKU0jVY",
        "ZP9C_u75MmI", "-Ve34o79SL8", "bYEN39fzgSQ", "fDiW77EPd44", "FGw2Po837q8",
        "2LaxsGwPHxA", "s1-Tpytc5ok", "ob6qW1BmC0Y", "LxDZseTTazA", "hoBhKvHj3_Y",
        "MYdvJkviYI4", "PAxsBnQ3jMQ", "i-Emxhw6nA8", "6TKI_rNAKd4", "Nyvk23kA_YI",
        "3bv2zCU6Yg8", "mmmaCQ3kwsQ", "XH1xm3mr94k", "bhtyenEe61g", "ReRlbMITmB0",
        "CIg3Ldz9uWY", "A5xnuDsVnZ4", "IS9rsnsjxtw", "QNqqm8iijYY", "818uqQaWtmA",
        "k1s-2SawXEA", "rNNnzDfRx-s", "u7tcCvXd4ag", "qDcCQmSUTg8", "rrAEdLoVIDk",
        "xzplh3dyBeU", "eay0b_DIqrM", "qj_UoRK7Ku0", "kU5YUPq6ICc", "PgjS-1fknrg",
        "GdtBfPeHPSI", "lw3pokcUVnw", "l6smNpoBWsI", "rFWAskjH3VE", "uJEgmZIS20M",
        "SJFpbnQxRxQ", "fsg3lDrSAIc", "MioeC9i4wbg", "naRhzKXWIxg", "9Jo2iJ71E5g",
        "erjOt2OfNsI", "-QsY4ZykAXM", "SecOrlRr7BE", "Uc_2EfMPJMc", "rd2ckB8akhc",
        "BMOI6heji7M"
    ],
    "Ishu Tilakdhari Official": [
        "Dr7HmqA0JQU", "h6sZ-QmZfXo", "9TaQHu85u9s", "X4hiGx6iWZY", "vhxuDTVjVqg",
        "wrj15A8M2E4", "i0mwpnN7KHU", "PrbWRTyEq-g", "aMsGHPtXvA0", "lVuD6GpCstw",
        "PiQJhCHJos4"
    ],
    "Lovkush Arpita Official": [
        "n9QzZ5SQ5Jk", "Gb-CgQVsGeQ", "BKMmb8X6do4", "tA-SWSWRcAw", "nApUVFU_owM",
        "73hjpmpHVJc", "Fbs25Bdy6Pc", "frECcPl9VL4", "ljGJ5ZFUEYE", "NTdLwpHgHF8",
        "D1pr8XRXdHg", "RPOKKs7sl18", "GCEOaKiXFWE", "T4mFAlJRapI", "XpT-6l9KIDY"
    ],
    "Manish Mastana Official": [
        "1LNK2lEdtX8", "yaXyIICGwoM", "9fzVef9h4HU", "LrvLhI-L06M", "cvxt2vCJig0",
        "0cdL0YSJA3U", "31fWmJd4PDE", "HddBvGXY4wI", "3-B_AUnS3mk", "vI5B6hHU9uk",
        "orHfX57Hn4U", "uH0OmarbtBk", "U4RfMfp4Shs", "i5EeWDoOo4w", "kLvDnpLtmqI",
        "41FI0OJ0YA0", "cPlkGbpxxsM", "aGvjOaj2Fs4", "E8R3Yg3wjyw", "8rhq6yCxCy4",
        "kowQQ_kxc44", "tsf3vIrRezk", "GvTORSyezM8", "naHlUJ-6Ngo", "FnpC00GjGNE",
        "4G6sHvUaBWw"
    ],
    "Mayur Bharat Raas": [
        "jn4EVdC-dXY", "HEUnJV00yhA", "Ype0NTAKDYA"
    ],
    "Neha Singh Music": [
        "yGSnlrtte8Q", "oLpHz8vX-rY", "wVnqMWUOGew", "q-x0bTrNPbg", "bMY8c6I7qh4",
        "5Dn2GU1xHSE"
    ],
    "R.S Films Bhojpuri": [
        "s0044jDbRD8", "paD5uhbXbZc", "hRzb0FSAmc0", "Hr6lhY0SdVo", "7gLGFFjR2Rw",
        "9tVDn9mZs2w", "gfUSMHAh2-nY", "1awCzWMtsEQ", "k0kHLaVxH3c", "4PzxPbGIJVI",
        "8iRs4haG6H0", "r5vsk1Dm1d4", "rZbqy0wxPRs", "6b1xdoBYMY0", "TA7S3RC_YmA",
        "Gz1-Hr6nma0", "ibyJhNMqKRg", "--M2LkrPDhM", "k_kA-xbI4qw", "QaD4KbnIWYk",
        "u_aRwqDeUqg", "hbj1MFaEbsY", "gxxjxhfc9fM", "iVtwYkS-xCQ", "pAFdThjGfps",
        "OzMIL-s5S9w", "vg8deIxsy3s", "OUwSJ_xLm2U", "Cd-epWmUibY", "pTW2i32KF8g",
        "Zqu4HEsqXlY", "iadHizBDCrY", "UOfPHSaVF4g", "fAyR_3BTuHA", "WI56kRS_S3s",
        "ac29BeDhdKQ", "Qp47OHumLgw", "lnW1ixwsdIA", "1baxLUjCRNY", "GKmb6--4q3g",
        "UwixPdF5DiY", "tmnOmBFhNJY", "O2z1v3JR6vo", "ZlJ0bSWGN28", "iC1KJad8WTE",
        "W8WKveGrcjE", "qXLlfV7PA0c", "xcx438RJHRw", "GtgkVd-LSqU", "qL5h7fWfRHw",
        "Jpc1xatGWIk", "7G6GO-vnNDk", "-ls_6V6GsSk", "iFUPvJReIs0", "DUcSaQBiMdo",
        "DVXJ2Dx3Lkg", "2qwHdxXxCEU", "dciIMNmdiPE", "Y7H_l0DvE-Q", "TEQ8B1ld3kM",
        "uwMAhPCdz1M", "yUE4hm-VcXk", "SoCfbjCzV2g", "LvKYQX-iw7I", "Z4fSq64ygDY",
        "eUm5oW7L9dg", "ER_5hQmLJZ4", "ec07Lqdos4M", "5Oo9jRyhw4U", "nsmkTXKnC9I",
        "bxHJx7i591I", "e9HmbJRhvpw", "tRBp3hOOe5k", "15Bl6-U2XRs", "Q4ujD6EWTTA",
        "NXu4xyKQ8us", "P5piNcvRuqo", "A9-HOd7Dfac", "RAKLQzeYsrs", "7wsbVKrLoAg",
        "D5o1rhzGrnI", "U93z7nxyuuE", "Ku_oDko_fcI", "pvERH6HEMbE", "GTBilgCOH6E",
        "9Y9Yh7JhQXQ", "wolenAJxKzk", "7vlJoa4BD8A", "4gJdB4S0mUk", "B6j2FQgHDTE",
        "RKMJiJ5Dnvs", "7u_LvTrRo18", "RMPePThGSyQ", "E-oqOlH8Q04", "brRdSMNRaNQ",
        "AnEMT8qo_Zs", "6OAtRcWgL_A", "MGzAhpFmeaU", "_RMRsiDsLvU", "l15SJ1Rx7Ig",
        "Q6LSh54Yf2Q", "XjfItrTktQs", "rUYe6lnJ4Jg", "cPyeioQnAuI", "QJK8ylwxcb8",
        "8bJlK07c_Zs", "ws99F73JwZs", "VkFLxAYreBc", "QSxcZ6quBJ4", "1AqonxB1sjo",
        "citHEE7jAF0", "0gOLZ4dLTc0", "C13vJeT81u0", "mTgLcLBa1HU", "tlz727i5t_8",
        "-W4Uu9czPEA"
    ],
    "Rang Mahal Studios": [
        "F1En68eUuLY", "sRQLCebBJRc", "K7F3IFIA--g", "BA09xmdLVWM", "Nhhd8bMGt2M",
        "0U1Ca-CYF2c", "4HJE54KQkFY", "38Q2tqkFloo", "P50fCn2RGMk", "5HFczJW3I2M",
        "35eWM8Fgk84", "Vyd88toR0KM", "zVnyXLCOVe4", "LLAMOkwZJD8", "23PFL7IBMJk",
        "xXPbxTxJ2lY", "aO_YhbBHM8w", "5feteVSp04A", "9V8ITQBVcsk", "MHkC9YuQqzs",
        "DiOyR7RzS2k", "JoDDwdkUwZk", "Q2KTWFpTcuE", "H9kQFAOIryg", "3YCazrWEzT0",
        "FxNIRbWhIgk", "4KveMJEoWvM", "n3GNhzXth_c", "Dv2i2RtKr1I", "Hk1fOcmhc4Q"
    ],
    "Shivam Chhaliya Official": [
        "bGPtO7juMe0", "1xAHdBLT3rk", "5zqM77kl4L8", "8sd0UjXYGHA", "5s1mCa4IZ8U",
        "dmjD5AC0NKM", "XnzkxJcYFDg", "IEcS9IREfJA", "4UP_eAFJYs8", "YWTkAXZGhiQ",
        "xUMidLEkiaI", "kbQAk0WSW8A", "2dGvWvMtdU8", "WpI3F7su6eU", "IlnAwPLTzsI",
        "XsGYimpDHG8", "pRimcZQkJ40", "RPEnb0j5ePM", "EzGo1n0qjP0", "LYjLoKeU-84"
    ],
    "Siddhi Vinayak Films": [
        "lsp8axMZNl4", "PtJvjDsZYI4", "Hh2fQImCSV0", "xvxmhBflMbA", "BduXcYhJpNo",
        "AFq7DP2Uulo", "Jz7V5yIEPuc", "goAm-7EhFGY", "Cc1WBdsQ4cA", "XvU7HLDualQ",
        "hHPgGPHMXHM", "BpIyuZdEJDc", "rRn5jAVrWMw", "HYWuH41_WW4", "_HoAOCV43bE",
        "SzklJDx7W5g", "d0-YxLCiEb4", "N6oqdLApXW8", "9Y9Yh7JhQXQ"
    ],
    "Siddhi Vinayak Films Bhakti": [
        "AP8arWrTLF8", "f_S5BsEAeic", "Ix4yq8b0Y2A", "j6TwZxeVxWo", "k2Dt1wLE1LE",
        "pq24Blcbk5A", "faE58LVHCw4", "fL0XFKhbWlI", "tsmj6xQIlfs", "n5STcsW5wzw",
        "u3T90jmvwcY", "J-vvgpz1H3o", "loHzevB4HW8", "b78Y7GymOrs", "Jw8SZ8-eSE8",
        "NjnDLHE7bT4", "5XgPimLvqdo", "y0MdqigOg5Y", "H81-r0vZXKE", "gUbhMDVr_DQ",
        "eSyFF-J-Bvk", "X_b_dN2GGTg", "9rr_pp1yRLY"
    ],
    "Vikash Bhardwaj Official": [
        "rTgnd73bPaA", "vM-NhlK1aWw", "Wa6bUX6HmsM", "Od9ixey4DsA", "I5XEC2JPpEI",
        "GefwGmjVeW0", "ZAI_WUVDW2w", "upA66VC9brA", "zgvRVUXz9FY", "fSYydWJIeWI"
    ]
};

// Specific Logos for Partners
const partnerLogos = {
    "Aarti Films Jhanki": "https://yt3.googleusercontent.com/EChckhiUBUcATT9qxmO1S939tG6aB0rkm2vCwoVtu1j_vHSx0Dm3E_ioNJ_15eb0cD3-TX8pbw=s176-c-k-c0x00ffffff-no-rj-mo"
};

// ============================
// 4. CHECKOUT LOGIC
// ============================
function openCheckout(planName, price) {
    // Tax Calculation (18% GST)
    const tax = Math.round(price * 0.18);
    const total = price + tax;

    // Update HTML Elements
    const planNameEl = document.getElementById('checkout-plan-name');
    const planPriceEl = document.getElementById('checkout-plan-price');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');
    const confirmAmountEl = document.getElementById('confirm-amount');

    if (planNameEl) planNameEl.innerText = planName;
    if (planPriceEl) planPriceEl.innerText = "₹" + price.toLocaleString();
    if (taxEl) taxEl.innerText = "₹" + tax.toLocaleString();
    if (totalEl) totalEl.innerText = "₹" + total.toLocaleString();
    if (confirmAmountEl) confirmAmountEl.innerText = "₹" + total.toLocaleString();

    // Switch Page
    switchPage('checkout-page');
}

function selectPaymentMethod(el, method) {
    // 1. Remove 'active' class from all tabs
    document.querySelectorAll('.pay-method').forEach(item => item.classList.remove('active'));
    // 2. Add 'active' class to clicked tab
    el.classList.add('active');

    // 3. Hide all forms
    const cardForm = document.getElementById('card-form');
    const upiForm = document.getElementById('upi-form');
    const qrForm = document.getElementById('qr-form');

    if (cardForm) cardForm.style.display = 'none';
    if (upiForm) upiForm.style.display = 'none';
    if (qrForm) qrForm.style.display = 'none';

    // 4. Show selected method form
    const selectedForm = document.getElementById(method + '-form');
    if (selectedForm) selectedForm.style.display = 'block';
}

function processPayment() {
    const btn = document.getElementById('pay-btn');
    if (!btn) return;
    const originalText = btn.innerHTML;

    // Loading State
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
    btn.style.opacity = '0.8';
    btn.style.pointerEvents = 'none';

    // Simulate API Call delay
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        switchPage('confirmation-page'); // Redirect to success
    }, 2500);
}

// ============================
// 5. RENDER FUNCTIONS
// ============================
function renderTeam(data) {
    const container = document.getElementById('teamGrid');
    if (!container) return;
    container.innerHTML = '';
    data.forEach(person => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.onclick = () => showProfileDetails(person, 'team');
        card.innerHTML = `
            <img src="${person.img}" class="profile-img" alt="${person.name}">
            <div class="profile-info">
                <div class="profile-name">${person.name}</div>
                <div class="profile-role">${person.role}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Helper to generate UNIQUE detailed HTML bio based on name keywords
function getPartnerTemplate(name) {
    // Default Values if not found in specific list
    let details = partnerDetails[name] || {
        type: "General Partner",
        typeClass: "music",
        tagline: "Premium Entertainment Hub",
        about: "Official channel managing premium content under R.S Films Group.",
        stats: {
            subs: "50K+",
            views: "10M+",
            videos: "100+"
        },
        contact: "info.rsfilmsofficial@gmail.com",
        links: {
            youtube: "#"
        }
    };

    // Generate Social Links HTML
    let linksHTML = '';
    if (details.links) {
        linksHTML = '<div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">';
        if (details.links.youtube) linksHTML += `<a href="${details.links.youtube}" target="_blank" class="cta-nav" style="font-size:0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #FF0000, #c4302b);"><i class="fab fa-youtube"></i> Channel</a>`;
        if (details.links.instagram) linksHTML += `<a href="${details.links.instagram}" target="_blank" class="cta-nav" style="font-size:0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);"><i class="fab fa-instagram"></i> Instagram</a>`;
        if (details.links.facebook) linksHTML += `<a href="${details.links.facebook}" target="_blank" class="cta-nav" style="font-size:0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #3b5998, #1877f2);"><i class="fab fa-facebook"></i> Facebook</a>`;
        linksHTML += '</div>';
    }

    return `
        <div class="partner-detail-content">
            <span class="partner-tag ${details.typeClass}">${details.type}</span>
            <h3 style="font-family: var(--font-head); margin-bottom:5px; color:#111; line-height:1.2;">${name}</h3>
            
            <div class="partner-quote">"${details.tagline}"</div>

            <div class="stats-grid-modern">
                <div class="stat-card-modern">
                    <span class="stat-val-modern">${details.stats.subs}</span>
                    <span class="stat-lbl-modern">Subscribers</span>
                </div>
                <div class="stat-card-modern">
                    <span class="stat-val-modern">${details.stats.views}</span>
                    <span class="stat-lbl-modern">Total Views</span>
                </div>
            </div>

            <h4 style="font-family: var(--font-head); margin-top:20px; color:#111;">About Channel</h4>
            <p style="color:#555; font-size:0.95rem; line-height:1.6; margin-bottom:20px;">${details.about}</p>

            <h4 style="font-family: var(--font-head); margin-bottom:10px; color:#111;">Official Links</h4>
            ${linksHTML}

            <div style="background:#f4f4f4; padding:20px; border-radius:15px; margin-top:25px; border-left: 5px solid var(--primary); box-shadow:0 5px 15px rgba(0,0,0,0.05);">
                <h4 style="font-family: var(--font-head); margin-bottom:10px; color:#111; text-transform:uppercase;">Managed By</h4>
                <div style="font-size:1.1rem; color:#111; font-weight:800; margin-bottom:10px;">R.S Films Group</div>
                <p style="font-size:0.9rem; color:#555;"><strong>Contact for Business:</strong> ${details.contact}</p>
            </div>
        </div>
    `;
}

function renderClients(list) {
    const container = document.getElementById('clientListContainer');
    if (!container) return;
    container.innerHTML = '';
    list.forEach(client => {
        const div = document.createElement('div');
        div.className = 'client-box';
        div.innerText = client;

        // Use custom logo if available, else default text image
        const logoUrl = partnerLogos[client] ? partnerLogos[client] : "https://dummyimage.com/600x600/eee/000&text=" + client.charAt(0);

        div.onclick = () => showProfileDetails({
            name: client,
            role: "Official Partner",
            img: logoUrl,
            bio: getPartnerTemplate(client)
        }, 'partners');
        container.appendChild(div);
    });
}

// Initialize Renders
renderTeam(teamData);
renderClients(clientList);


// ============================
// 6. PROFILE DETAIL PAGE LOGIC
// ============================
let currentBackTarget = 'home';

function showProfileDetails(data, sourcePage) {
    currentBackTarget = sourcePage;
    const detailImg = document.getElementById('detail-img');
    const detailName = document.getElementById('detail-name');
    const detailRole = document.getElementById('detail-role');
    const detailBio = document.getElementById('detail-bio');

    if (detailImg) detailImg.src = data.img;
    if (detailName) detailName.innerText = data.name;
    if (detailRole) detailRole.innerText = data.role;
    // Updated to use innerHTML for rich content
    if (detailBio) detailBio.innerHTML = data.bio;

    const portfolioContainer = document.getElementById('detail-portfolio');
    if (portfolioContainer) {
        portfolioContainer.innerHTML = '';

        // Check if specific videos exist for this partner (e.g., Ahir Brand)
        const specificVids = partnerSpecificVideos[data.name];

        if (specificVids && specificVids.length > 0) {
            specificVids.forEach(vidId => {
                portfolioContainer.innerHTML += `
                    <div class="work-card" onclick="window.open('https://www.youtube.com/watch?v=${vidId}', '_blank')">
                        <img src="https://img.youtube.com/vi/${vidId}/hqdefault.jpg" style="width:100%; height:100%; object-fit:cover;">
                        <i class="fas fa-play-circle play-icon" style="font-size: 2.5rem;"></i>
                    </div>
                `;
            });
        } else {
            // Default dummy content for others
            for (let i = 1; i <= 3; i++) {
                portfolioContainer.innerHTML += `
                    <div class="work-card" style="aspect-ratio:1/1;">
                        <img src="https://dummyimage.com/300x300/ccc/000&text=Work+${i}">
                    </div>
                `;
            }
        }
    }
    switchPage('profile-details');
}

function goBackFromProfile() {
    switchPage(currentBackTarget);
}


// ============================
// 7. NAVIGATION & MENU LOGIC
// ============================
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('active');
}

function mobileLink(pageId) {
    toggleMenu();
    switchPage(pageId);
}

function switchPage(pageId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active-page');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
        window.scrollTo(0, 0);
    }
}


// ============================
// 8. ANIMATIONS & INTERACTIONS
// ============================
const cursorDot = document.getElementById("cursor-dot");
const cursorOutline = document.getElementById("cursor-outline");

// Only add cursor listener for desktop
if (window.matchMedia("(min-width: 769px)").matches) {
    window.addEventListener("mousemove", function(e) {
        const posX = e.clientX;
        const posY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
        }
        if (cursorOutline) {
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, {
                duration: 500,
                fill: "forwards"
            });
        }
    });
}

document.querySelectorAll('a, button, span, .tilt-card, .profile-card, .work-card, .client-box, .plan-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});

// 3D Tilt - Desktop Only
if (window.matchMedia("(min-width: 769px)").matches) {
    document.querySelectorAll(".tilt-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
        });
    });
}

const stats = document.querySelectorAll('.stat-num');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const isPercent = entry.target.innerText.includes('%');
            let count = 0;
            const inc = target / 50;
            const updateCount = () => {
                count += inc;
                if (count < target) {
                    entry.target.innerText = Math.ceil(count) + (isPercent ? '%' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target + (isPercent ? '%' : '+');
                }
            };
            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});
stats.forEach(stat => observer.observe(stat));

function selectPlan(planName) {
    const input = document.getElementById('serviceInput');
    if (input) input.value = planName;
    switchPage('contact');
}


// ============================
// 9. ADVANCED HUB LOGIC
// ============================
function switchHubTab(tabName, btnElement) {
    // Remove active class from buttons (if passed)
    if (btnElement) {
        document.querySelectorAll('.hub-nav-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }

    // Hide all content
    document.querySelectorAll('.hub-tab-content').forEach(content => content.classList.remove('active'));

    // Show selected
    const tab = document.getElementById('hub-' + tabName);
    if (tab) tab.classList.add('active');
}

function sendQuickMsg(msg) {
    const input = document.getElementById('hubChatInput');
    if (input) {
        input.value = msg;
        sendHubMessage();
    }
}

function sendHubMessage() {
    const input = document.getElementById('hubChatInput');
    const chatBox = document.getElementById('hubChatBox');
    if (!input || !chatBox) return;
    if (input.value.trim() === '') return;

    // User Msg
    const userRow = document.createElement('div');
    userRow.className = 'chat-msg-row user';
    userRow.innerHTML = `<div class="msg-bubble">${input.value}<div class="chat-time">Just Now</div></div>`;
    chatBox.appendChild(userRow);

    // Auto Scroll
    chatBox.scrollTop = chatBox.scrollHeight;

    const userText = input.value;
    input.value = '';

    // Bot Typing Simulation
    setTimeout(() => {
        const botRow = document.createElement('div');
        botRow.className = 'chat-msg-row bot';

        let reply = "I've received your query. Our team is checking it.";
        if (userText.toLowerCase().includes("royalty")) reply = "You can check your royalty in the Dashboard under 'Earnings'. If it's missing, please raise a ticket.";
        else if (userText.toLowerCase().includes("mcn")) reply = "To join our MCN, you need 10k subs and original content. You can apply via the MCN page.";
        else if (userText.toLowerCase().includes("booking")) reply = "For artist booking, please fill the form on the Artists page or call us directly.";

        botRow.innerHTML = `<div class="msg-bubble">${reply}<div class="chat-time">Just Now</div></div>`;
        chatBox.appendChild(botRow);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}