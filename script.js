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
    "Aarti Films Hits",
    "Aarti Films Jhanki",
    "Abhishek Chhaliya Official",
    "Ahir Brand",
    "Avinash Madhur Official",
    "Beat Box Bhakti",
    "BVD Music World",
    "Deep Shree Entertainment",
    "Deepshree Music",
    "Deepu Singh",
    "Gudiya Jhaki Official",
    "Ishu Tilakdhari Official",
    "Lovkush Arpita Official",
    "Mayur Bharat Raas",
    "Neha Singh Music",
    "R.S Films Bhojpuri",
    "Rang Mahal Studios",
    "Shivam chhaliya Official",
    "Siddhi Vinayak Films",
    "Siddhi Vinayak Films Bhakti",
    "Vikash Bhardwaj Official",
    "Vishnu Music World"
];

// Specific Data for Each Channel (Stats & Bio & Links)
const partnerDetails = {
    "Aarti Films Hits": {
        tagline: "Trending Bhojpuri Songs & Official Videos",
        about: "Welcome to Aarti Films Hits, your ultimate destination for trending Bhojpuri songs, romantic hits, and official music videos that define passion, emotion, and entertainment. Join the community that lives and breathes Bhojpuri music every day!\n\nSubscribe Now for regular updates on new releases, trending hits, and exclusive premieres!\n\nDigital Manager - R.S Films Group\nDigital Enquiry: info.rsfilmsofficial@gmail.com",
        stats: { subs: "911", views: "212,714", videos: "57" },
        contact: "info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/Pg2qpq3WPcq5io41KT9OCrr-e8TKwrxCf81pZS3nwGUA6qIzwCm0VUy3rbuD-JUFqB19ppGA068=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@AartiFilmsHits",
            instagram: "https://instagram.com/aartifilms099",
            facebook: "https://facebook.com/people/AARTI-FILMS/100064133170179"
        }
    },
    "Aarti Films Jhanki": {
        tagline: "Devotional Videos & Jhanki Songs",
        about: "We bring you soul-touching devotional videos filled with faith, devotion, and Indian cultural traditions — including stunning Radha Krishna Jhanki Song, soulful Bhajans, and mesmerizing spiritual events. Our mission is to spread the message of devotion and showcase the beauty of Indian culture to the world.\n\nManaged By - R.S Fims Group\nContact Us - +91 9792946666 | info.rsfilmsofficial@gmail.com\n\nSubscribe now and immerse yourself in the colors of devotion. Radhe Radhe",
        stats: { subs: "920", views: "331,544", videos: "28" },
        contact: "+91 9792946666 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/EChckhiUBUcATT9qxmO1S939tG6aB0rkm2vCwoVtu1j_vHSx0Dm3E_ioNJ_15eb0cD3-TX8pbw=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@AartiFilmsJhanki"
        }
    },
    "Abhishek Chhaliya Official": {
        tagline: "Devotional Songs & Jhanki Videos",
        about: "Welcome to Abhishek Chhaliya Official – Your ultimate destination for soulful and divine experiences through Indian devotional songs and mesmerizing jhanki videos of Radha Krishna, Shankar Parvati, and other beloved deities.\n\nHere you will find peaceful Bhajans, Aartis, and captivating spiritual storytelling that transport you to a world of devotion and tranquility.\n\nManaged By – R.S Films Group\nContact Us – info.rsfilmsofficial@gmail.com\nFor Trade Enquiry – +91 7505550383",
        stats: { subs: "8.58K", views: "3,095,732", videos: "48" },
        contact: "+91 9792946666 | info.rsfilmsofficial@gmail.com | +91 7505550383",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/fKTZedIsKb_ZiQPB8iM0kO7KpX620JKqdP7zk-4OICJecObld-JcNfWpkrcQGLNpVFec-lcp=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@AbhishekChhaliyaOfficial"
        }
    },
    "Ahir Brand": {
        tagline: "Bhojpuri Music Brand",
        about: "CONTACT\n1. \"अहिर ब्रांड\" में अपना गाना रिलीज़ करने के लिए कॉल करें (10 Baje se 8 Baje tak) अगर कॉल नहीं लगता है तो WhatsApp करे.\n2. गाना फ्रेश होना चाहिए किसीके के या कंपनी के ट्रैक पे नहीं होना चाहिए.\n3. कंपनी में विडियो और ऑडियो रिलीज़ करने के लिए कोई चार्ज नहीं लिया जाता है अगर कोई आपसे बोले तो उसका कम्प्लेन कंपनी में करें.",
        stats: { subs: "3.59K", views: "488,569", videos: "57" },
        contact: "9792946666",
        managedBy: "Ahir Brand",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/M8QYWlymBo8ABPfT86NSzrMjdGXPc9BLupYR01FIJRr6_qXAj_99P36G2f-Cu7SMWPu7wBw=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@ahirbrandofficial"
        }
    },
    "Avinash Madhur Official": {
        tagline: "Official Channel",
        about: "आप सभी दर्शको को मेरा सादर प्रणाम🙏\nमै Avinash Yadav \"Madhur\" तहे दिल से आप सभी का धन्यबाद करता हूँ।\n\nFor Trade Enquiry :- Call Us :- + 9839233977\nManaged By – R.S Films Group\nContact Us – info.rsfilmsofficial@gmail.com",
        stats: { subs: "7.1K", views: "--", videos: "348" },
        contact: "+9839233977 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Artist",
        typeClass: "artist",
        logo: "https://yt3.googleusercontent.com/LH5BIAqoHtqBp4-ZThmNeZFHVitRAn4Fy5WndTmRGBgMt56P1hLJSh33ZBRwpyvgY7oOoMYc=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@AvinashYadavMadhur",
            facebook: "https://facebook.com/AvinashYadavMadhur",
            instagram: "https://instagram.com/avinashmadhurji?igsh=MWowMW4yNnY1NWtnZQ=="
        }
    },
    "Beat Box Bhakti": {
        tagline: "Devotion Meets Rhythm",
        about: "Beat Box Bhakti – Where Devotion Meets Rhythm!\nWelcome to Beat Box Bhakti, a unique fusion of ancient devotion and modern beatboxing!\n\nअगर आप वीडियो रिलीज करना चाहते है तो आप हमे संपर्क कर सकते हैं।\nCalling Time- 09:00am to 09:00 pm\nContact- 9648813008",
        stats: { subs: "3.51K", views: "934,362", videos: "263" },
        contact: "9648813008",
        managedBy: "Beat Box Bhakti",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/3M8K77yvCC6LoAD_lgi_GrwJroFBKP0R0DalqZvSV21WCDAigdMdzv5t2LYVme-86iBjIhao=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@beatboxbhakti01"
        }
    },
    "BVD Music World": {
        tagline: "Bhojpuri Videos & Bhakti",
        about: "Welcome to BVD Music World – your ultimate destination for Bhojpuri Videos & Music.\n\nManaged By: R.S Films Group\nEmail: info.rsfilmsofficial@gmail.com",
        stats: { subs: "333", views: "24,129", videos: "18" },
        contact: "info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/LeaYEq2o33miA6NZ3JSlNKV0PK9valyiid_SLtaN53WaoRAm8MMLDZpnncwHDakegdS40jHX=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@BVDMusicWorld"
        }
    },
    "Deep Shree Entertainment": {
        tagline: "Devotional Music & Spiritual Vibes",
        about: "Welcome to Deep Shree Entertainment.\nWe bring you soul-touching Bhajans, Aartis, Mantras, Chants, and Spiritual Songs dedicated to all Hindu deities.\n\nDeep Shree Entertainment — Where Music Meets Devotion.",
        stats: { subs: "4.55K", views: "431,740", videos: "159" },
        contact: "",
        managedBy: "Deep Shree Entertainment",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/-1HzKAj5HIoyhQqzluOoy-JEkbfbDgmEMpIw0McrxMyx0DYeXTlDqxsP_dceclnqNm1xtWOGMQ=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@DeepShreeEntertainment"
        }
    },
    "Deepshree Music": {
        tagline: "Official Channel",
        about: "Welcome To My Channel Deepshree Music\nThis is the official YouTube channel of Deepshree Music.",
        stats: { subs: "1.93K", views: "282,219", videos: "81" },
        contact: "",
        managedBy: "Deepshree Music",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/WrC2hmmFin7Ppwxs5LGrPklXCIe2ijY5LmLIxjhVKHmWH7A5xLXTTWDjBiWKoU2PvMNJV9g5yg=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@DeepshreeMusic"
        }
    },
    "Deepu Singh": {
        tagline: "Official Awadhi & Rangdari Channel 🎶",
        about: "Deepu Singh\nAwadhi, Rangdari aur Devotional songs ka official music channel 🎶 Yahan aapko milenge original gaane, powerful lyrics aur quality music videos.\n\nManaged By: R.S Films Group\nLove & Respect – Deepu Singh",
        stats: { subs: "142", views: "2,785", videos: "5" },
        contact: "",
        managedBy: "R.S Films Group",
        type: "Artist",
        typeClass: "artist",
        logo: "https://yt3.ggpht.com/Jth0OnLYmXu5WUSev8GkO3NQcSUHRx7R7tLBwoblYNc_0POVbfATPq081XbKpKch0Z1hsteD5QQ=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@DeepuSinghofficial",
            instagram: "https://instagram.com/deepusinghoffcial",
            facebook: "https://facebook.com/profile.php?id=100070323337914"
        }
    },
    "Gudiya Jhaki Official": {
        tagline: "Jhanki & Devotional Content",
        about: "Our YouTube Channel Gudiya Jhakhi Official brings devotional content related to Radha Krishan, Fagan Geet, dehati bhakti bhajan, dancing bhakti songs, jagran songs and lots more related to devotional.\n\nManaged By - R.S Films Group\nEmail : info.rsfilmsofficial@gmail.com\nMo no : +91 91615 29116",
        stats: { subs: "64.9K", views: "31,332,258", videos: "204" },
        contact: "info.rsfilmsofficial@gmail.com | +91 91615 29116",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/lVqjn9OS-6_pFAdiGDg8sBVejzboInkyDeG0n3IHFsze3Q4WgpWOLn6niY3ZDpHPgA3ttskr6w=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@gudiyajhakiofficial",
            instagram: "https://instagram.com/gudiyaprinceofficial",
            facebook: "https://facebook.com/gudiyajhankiofficial"
        }
    },
    "Ishu Tilakdhari Official": {
        tagline: "Soulful Jhankis & Devotion",
        about: "Welcome to Ishu Tilakdhari Official – your spiritual destination for soulful jhankis and devotional content.\n\nFor Trade Enquiry - 6386505230, 8604287605\nManaged By - R.S Films Group\nContact Us - info.rsfilmsofficial@gmail.com",
        stats: { subs: "7.56K", views: "2,320,896", videos: "23" },
        contact: "6386505230, 8604287605 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/OrMWdIKQH7rvSRzfqxqMz06G5NVwKfWCbHxbjF_NwWyWWngOOPjxvvDG3feq3a_JhT7T1g8YtQ=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@IshuTilakdhariOfficial",
            instagram: "https://instagram.com/ishutilakdhari/?hl=en",
            facebook: "https://facebook.com/people/Ishu-Tilakdhari/100023361700549/?paipv=0",
            vlogs: "https://youtube.com/@IshuTilakdhariKanpur/featured"
        }
    },
    "Lovkush Arpita Official": {
        tagline: "Divya Bhakti Sangeet",
        about: "\"Lovkush Arpita Official\"\nदिव्य भक्ति संगीत के लिए आपके पवित्र स्थान।\n\nManaged By - R.S Films\nMo No - +91 91405 69766\nContact Us - info.rsfilmsofficial@gmail.com",
        stats: { subs: "2.43K", views: "712,667", videos: "33" },
        contact: "+91 91405 69766 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/npw4cRt6YxrYvp6UbB5S7D1Xa24Qg89OLH1peV5Lxom9CVc2n7zN84DbHVg0u5FTFfjP69BWGPQ=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@LovkushArpitaOfficial"
        }
    },
    "Mayur Bharat Raas": {
        tagline: "Jhanki, Bhajans & Spiritual Presentations",
        about: "Welcome to Mayur Bharat Raas – A Divine Devotional Channel\n\nContact For Any Jhanki Program: +91 6394 853 086\nManaged By: R.S Films Group\nEmail: info.rsfilmsofficial@gmail.com",
        stats: { subs: "9.43K", views: "3,655,736", videos: "405" },
        contact: "+91 6394853086 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/J-g0ko4VdfMvdWXVo4hk4e5WbN-lPRRwQ2GeD3mNx6rLw_R8meIuFXhK2F3s7eFZF34VpJZ_Ew=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@mayurbharatraas",
            instagram: "https://instagram.com/mayur_bharat_raas/?hl=en",
            facebook: "https://facebook.com/mayur.bharat.79"
        }
    },
    "Neha Singh Music": {
        tagline: "Soulful Melodies & Beats",
        about: "Welcome to Neha Singh Music!\nYour ultimate destination for soulful melodies, energetic beats, and heart-touching songs.\n\nDigital Manager - R.S Films Group\nContact Us: info.rsfilmsofficial@gmail.com",
        stats: { subs: "240", views: "15,330", videos: "21" },
        contact: "info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Artist",
        typeClass: "artist",
        logo: "https://yt3.ggpht.com/MUcxhtXRZy9_unyJebk2orOYt-eDJHbCMAlONAB9DUAc2JX9uyLDxXiray99E0PINPnZmemx=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@NehaSinghMusic1"
        }
    },
    "R.S Films Bhojpuri": {
        tagline: "Bhojpuri Albums & Films",
        about: "R.S Films Bhojpuri में अपना गाना रिलीज़ करने के लिए कॉल करें (10 Baje se 8 Baje tak).\n\nContact: info.rsfilmsofficial@gmail.com\nContact For BHOJPURI ALBUMS & FILM LUCKNOW - 9792946666",
        stats: { subs: "20.6K", views: "6,042,008", videos: "223" },
        contact: "9792946666 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/pYa-GJZ4ns3_wTNwgy5X9XnKEPf8dX536fVShkRUTlvaazkmfeIIkacjXqqUWMbAnOBjo5h1pA=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@RSFilmsBhojpuri",
            instagram: "https://instagram.com/r.sfilmsbhojpuri",
            facebook: "https://facebook.com/r.sfilmsbhojpuri"
        }
    },
    "Rang Mahal Studios": {
        tagline: "Bhajans, Devotional Songs & Spiritual Music",
        about: "Welcome to Rang Mahal Studios. Dive into the divine world of Bhajans, Devotional Songs, and Spiritual Music.\n\nDigital Manager: R.S Films Group\nEmail: info.rsfilmsofficial@gmail.com",
        stats: { subs: "11.4K", views: "2,551,961", videos: "98" },
        contact: "info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/BoByVMbY6RqMuWNp6o6-qFf_Nm6jDIi6blDP_3N5237BvIBCsxIDC_DrPU3FzJpDYcHww194t20=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@rangmahalstudios",
            instagram: "https://instagram.com/rangmahalstudios",
            facebook: "https://facebook.com/rangmahalstu"
        }
    },
    "Shivam chhaliya Official": {
        tagline: "Jhanki & Devotional Content",
        about: "Welcome to Shivam chhaliya Official – your spiritual destination for soulful jhankis and devotional content.\n\nFor Trade Enquiry - 7007376969-8604304341\nManaged By - SHREYANSH DIGITAL (LUCKNOW UP)",
        stats: { subs: "118K", views: "34,891,360", videos: "214" },
        contact: "7007376969 | 8604304341",
        managedBy: "SHREYANSH DIGITAL (LUCKNOW UP)",
        type: "Artist",
        typeClass: "artist",
        logo: "https://yt3.ggpht.com/GIeKZ71fBXrup-N2WgBdtMopodViz6XB-sjdLmW3IQiFQs8l3lwUGvxxsixSX_GwaeUbLs75lA=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@shivamchhaliyaofficial",
            instagram: "https://instagram.com/shivam_chhaliya_official?igsh=MW5vbjc4aWJ5ZGRzeA==",
            facebook: "https://facebook.com/profile.php?id=100008744467616&mibextid=ZbWKwL"
        }
    },
    "Siddhi Vinayak Films": {
        tagline: "Soulful & Vibrant Bhojpuri Music",
        about: "Siddhi Vinayak Films – your ultimate destination for soulful and vibrant Bhojpuri music!\n\nTrade Enquiry: 7068636112\nDigital Head - R.S FILMS GROUP\nContact Us - info.rsfilmsofficial@gmail.com",
        stats: { subs: "3.08K", views: "390,289", videos: "53" },
        contact: "7068636112 | info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/5c92PpSJmxTKGft5Iw79dsPwNoN-FKeFM1UF0oFNNea-0-ciX8Cz7n54onVs5KHIaXKq2a_x=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@SiddhiVinayakFilmsBhojpuri",
            facebook: "https://facebook.com/SiddhiVinayakFilms01",
            bhakti: "https://youtube.com/@SiddhiVinayakFilmsBhakti"
        }
    },
    "Siddhi Vinayak Films Bhakti": {
        tagline: "Devotional Music",
        about: "Welcome to Siddhi Vinayak Film Bhakti, your ultimate destination for soulful and divine devotional music.\n\nTrade Enquiry: 7068636112\nManaged By - R.S FILMS Group\nContact Us - siddhivinayakfilmbhakti@gmail.com",
        stats: { subs: "16.6K", views: "5,628,973", videos: "53" },
        contact: "7068636112 | siddhivinayakfilmbhakti@gmail.com",
        managedBy: "R.S Films Group",
        type: "Devotional",
        typeClass: "devotional",
        logo: "https://yt3.ggpht.com/v7iRazHsl3LUmew_yc1NU5Fp5Zo-R1X41KLaxMNOZQAporBRo94eFGLEFfM1J-vGuATQOJhiNg=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@SiddhiVinayakFilmsBhakti"
        }
    },
    "Vikash Bhardwaj Official": {
        tagline: "Rangdari Songs Ka Asli Adda",
        about: "Vikash Bhardwaj Official – Rangdari Songs Ka Asli Adda!\n\nDigital Partner: R.S Films Group\nContact Us - info.rsfilmsofficial@gmail.com / +91 9792946666",
        stats: { subs: "4.2K", views: "371,566", videos: "26" },
        contact: "info.rsfilmsofficial@gmail.com | +91 9792946666",
        managedBy: "R.S Films Group",
        type: "Artist",
        typeClass: "artist",
        logo: "https://yt3.ggpht.com/pEthLLrSIdifVxm5Z_Nxi_7mmxBv_dPVTbX6bTeACLP35YYHIYkB1HWKwVZswtNs3eVX329Lsw=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@Vikashbhardwajofficial1",
            instagram: "https://instagram.com/pt.vikash_bhardwaj_thekedaar"
        }
    },
    "Vishnu Music World": {
        tagline: "Awadhi Rangdari Songs",
        about: "Welcome to Vishnu Music World! Yahaan aapko milte hain real Awadhi Rangdari songs — desi swag, strong beats aur ekdum alag attitude ke saath.\n\nManaged By- R.S Films Group\nE Mail- info.rsfilmsofficial@gmail.com",
        stats: { subs: "16K", views: "596,808", videos: "14" },
        contact: "info.rsfilmsofficial@gmail.com",
        managedBy: "R.S Films Group",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/ElbQzJVKoYI2PGLs9xszqaZC6sm0-CAUBuDo3vyYZfKrMto_Ds5wSUPI_-cB9W_uK2gk6PGp=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "https://www.youtube.com/@Vishnu_music_world",
            facebook: "https://facebook.com/share/1XJF1vA4q2",
            instagram: "https://instagram.com/vishnukumar094?igsh=OXRwanp2dmwwYTkw"
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
    "Shivam chhaliya Official": [
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
    ],
    "Deepu Singh": [
        "BAHF93C3MSg", "UuGPBzO0-jc"
    ]
};

// Specific Logos for Partners
const partnerLogos = {
    "Aarti Films Hits": "https://yt3.ggpht.com/Pg2qpq3WPcq5io41KT9OCrr-e8TKwrxCf81pZS3nwGUA6qIzwCm0VUy3rbuD-JUFqB19ppGA068=s176-c-k-c0x00ffffff-no-rj-mo",
    "Aarti Films Jhanki": "https://yt3.ggpht.com/EChckhiUBUcATT9qxmO1S939tG6aB0rkm2vCwoVtu1j_vHSx0Dm3E_ioNJ_15eb0cD3-TX8pbw=s176-c-k-c0x00ffffff-no-rj-mo",
    "Abhishek Chhaliya Official": "https://yt3.ggpht.com/fKTZedIsKb_ZiQPB8iM0kO7KpX620JKqdP7zk-4OICJecObld-JcNfWpkrcQGLNpVFec-lcp=s176-c-k-c0x00ffffff-no-rj-mo",
    "Ahir Brand": "https://yt3.ggpht.com/M8QYWlymBo8ABPfT86NSzrMjdGXPc9BLupYR01FIJRr6_qXAj_99P36G2f-Cu7SMWPu7wBw=s176-c-k-c0x00ffffff-no-rj-mo",
    "Avinash Madhur Official": "https://yt3.googleusercontent.com/LH5BIAqoHtqBp4-ZThmNeZFHVitRAn4Fy5WndTmRGBgMt56P1hLJSh33ZBRwpyvgY7oOoMYc=s176-c-k-c0x00ffffff-no-rj-mo",
    "Beat Box Bhakti": "https://yt3.ggpht.com/3M8K77yvCC6LoAD_lgi_GrwJroFBKP0R0DalqZvSV21WCDAigdMdzv5t2LYVme-86iBjIhao=s176-c-k-c0x00ffffff-no-rj-mo",
    "BVD Music World": "https://yt3.ggpht.com/LeaYEq2o33miA6NZ3JSlNKV0PK9valyiid_SLtaN53WaoRAm8MMLDZpnncwHDakegdS40jHX=s176-c-k-c0x00ffffff-no-rj-mo",
    "Deep Shree Entertainment": "https://yt3.ggpht.com/-1HzKAj5HIoyhQqzluOoy-JEkbfbDgmEMpIw0McrxMyx0DYeXTlDqxsP_dceclnqNm1xtWOGMQ=s176-c-k-c0x00ffffff-no-rj-mo",
    "Deepshree Music": "https://yt3.ggpht.com/WrC2hmmFin7Ppwxs5LGrPklXCIe2ijY5LmLIxjhVKHmWH7A5xLXTTWDjBiWKoU2PvMNJV9g5yg=s176-c-k-c0x00ffffff-no-rj-mo",
    "Deepu Singh": "https://yt3.ggpht.com/Jth0OnLYmXu5WUSev8GkO3NQcSUHRx7R7tLBwoblYNc_0POVbfATPq081XbKpKch0Z1hsteD5QQ=s176-c-k-c0x00ffffff-no-rj-mo",
    "Gudiya Jhaki Official": "https://yt3.ggpht.com/lVqjn9OS-6_pFAdiGDg8sBVejzboInkyDeG0n3IHFsze3Q4WgpWOLn6niY3ZDpHPgA3ttskr6w=s176-c-k-c0x00ffffff-no-rj-mo",
    "Ishu Tilakdhari Official": "https://yt3.ggpht.com/OrMWdIKQH7rvSRzfqxqMz06G5NVwKfWCbHxbjF_NwWyWWngOOPjxvvDG3feq3a_JhT7T1g8YtQ=s176-c-k-c0x00ffffff-no-rj-mo",
    "Lovkush Arpita Official": "https://yt3.ggpht.com/npw4cRt6YxrYvp6UbB5S7D1Xa24Qg89OLH1peV5Lxom9CVc2n7zN84DbHVg0u5FTFfjP69BWGPQ=s176-c-k-c0x00ffffff-no-rj-mo",
    "Mayur Bharat Raas": "https://yt3.ggpht.com/J-g0ko4VdfMvdWXVo4hk4e5WbN-lPRRwQ2GeD3mNx6rLw_R8meIuFXhK2F3s7eFZF34VpJZ_Ew=s176-c-k-c0x00ffffff-no-rj-mo",
    "Neha Singh Music": "https://yt3.ggpht.com/MUcxhtXRZy9_unyJebk2orOYt-eDJHbCMAlONAB9DUAc2JX9uyLDxXiray99E0PINPnZmemx=s176-c-k-c0x00ffffff-no-rj-mo",
    "R.S Films Bhojpuri": "https://yt3.ggpht.com/pYa-GJZ4ns3_wTNwgy5X9XnKEPf8dX536fVShkRUTlvaazkmfeIIkacjXqqUWMbAnOBjo5h1pA=s176-c-k-c0x00ffffff-no-rj-mo",
    "Rang Mahal Studios": "https://yt3.ggpht.com/BoByVMbY6RqMuWNp6o6-qFf_Nm6jDIi6blDP_3N5237BvIBCsxIDC_DrPU3FzJpDYcHww194t20=s176-c-k-c0x00ffffff-no-rj-mo",
    "Shivam chhaliya Official": "https://yt3.ggpht.com/GIeKZ71fBXrup-N2WgBdtMopodViz6XB-sjdLmW3IQiFQs8l3lwUGvxxsixSX_GwaeUbLs75lA=s176-c-k-c0x00ffffff-no-rj-mo",
    "Siddhi Vinayak Films": "https://yt3.ggpht.com/5c92PpSJmxTKGft5Iw79dsPwNoN-FKeFM1UF0oFNNea-0-ciX8Cz7n54onVs5KHIaXKq2a_x=s176-c-k-c0x00ffffff-no-rj-mo",
    "Siddhi Vinayak Films Bhakti": "https://yt3.ggpht.com/v7iRazHsl3LUmew_yc1NU5Fp5Zo-R1X41KLaxMNOZQAporBRo94eFGLEFfM1J-vGuATQOJhiNg=s176-c-k-c0x00ffffff-no-rj-mo",
    "Vikash Bhardwaj Official": "https://yt3.ggpht.com/pEthLLrSIdifVxm5Z_Nxi_7mmxBv_dPVTbX6bTeACLP35YYHIYkB1HWKwVZswtNs3eVX329Lsw=s176-c-k-c0x00ffffff-no-rj-mo",
    "Vishnu Music World": "https://yt3.ggpht.com/ElbQzJVKoYI2PGLs9xszqaZC6sm0-CAUBuDo3vyYZfKrMto_Ds5wSUPI_-cB9W_uK2gk6PGp=s176-c-k-c0x00ffffff-no-rj-mo"
};

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
        managedBy: "R.S Films Group",
        type: "Music",
        typeClass: "music",
        logo: "https://yt3.ggpht.com/Pg2qpq3WPcq5io41KT9OCrr-e8TKwrxCf81pZS3nwGUA6qIzwCm0VUy3rbuD-JUFqB19ppGA068=s176-c-k-c0x00ffffff-no-rj-mo",
        links: {
            youtube: "#"
        }
    };

    const managedBy = details.managedBy ? String(details.managedBy) : 'R.S Films Group';

    // Generate Social Links HTML
    let linksHTML = '';
    if (details.links) {
        linksHTML = '<div style="margin-top:20px; display:flex; gap:10px; flex-wrap:wrap;">';
        Object.keys(details.links).forEach(k => {
            const v = details.links[k];
            if (!v || v === '#') return;
            const key = String(k).toLowerCase();
            const label = String(k).replace(/_/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
            if (key === 'youtube') linksHTML += `<a href="${v}" target="_blank" class="cta-nav" style="font-size: 0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #FF0000, #c4302b);"><i class="fab fa-youtube"></i> Channel</a>`;
            else if (key === 'instagram') linksHTML += `<a href="${v}" target="_blank" class="cta-nav" style="font-size: 0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);"><i class="fab fa-instagram"></i> Instagram</a>`;
            else if (key === 'facebook') linksHTML += `<a href="${v}" target="_blank" class="cta-nav" style="font-size: 0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #3b5998, #1877f2);"><i class="fab fa-facebook"></i> Facebook</a>`;
            else linksHTML += `<a href="${v}" target="_blank" class="cta-nav" style="font-size: 0.8rem; padding:8px 15px; display:inline-flex; align-items:center; gap:5px; background:linear-gradient(45deg, #111, #444);"><i class="fas fa-link"></i> ${label}</a>`;
        });
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
            <p style="color:#555; font-size:0.95rem; line-height:1.6; margin-bottom:20px; white-space: pre-line;">${details.about}</p>

            <h4 style="font-family: var(--font-head); margin-bottom:10px; color:#111;">Official Links</h4>
            ${linksHTML}

            <div style="background:#f4f4f4; padding:20px; border-radius:15px; margin-top:25px; border-left: 5px solid var(--primary); box-shadow:0 5px 15px rgba(0,0,0,0.05);">
                <h4 style="font-family: var(--font-head); margin-bottom:10px; color:#111; text-transform:uppercase;">Managed By</h4>
                <div style="font-size:1.1rem; color:#111; font-weight:800; margin-bottom:10px;">${managedBy}</div>
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
        const d = (partnerDetails && partnerDetails[client]) ? partnerDetails[client] : {};
        const logoUrl = d.logo ? String(d.logo) : (partnerLogos[client] ? partnerLogos[client] : "https://dummyimage.com/600x600/eee/000&text=" + client.charAt(0));

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

        function getPartnerVideoIds(name) {
            if (typeof partnerSpecificVideos === 'undefined' || !partnerSpecificVideos) return [];
            if (partnerSpecificVideos[name]) return partnerSpecificVideos[name];
            const lower = String(name || '').toLowerCase();
            const keys = Object.keys(partnerSpecificVideos);
            const matchKey = keys.find(k => String(k).toLowerCase() === lower);
            return matchKey ? partnerSpecificVideos[matchKey] : [];
        }

        // Check if specific videos exist for this partner (e.g., Ahir Brand)
        const specificVids = getPartnerVideoIds(data.name);

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