<script>
    // Navigation Toggle for Mobile
    document.querySelector('.nav-toggle').addEventListener('click', function() {
        const nav = document.querySelector('.main-nav');
        // Simple toggle: agar display:none hai to block kar do
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            // Flexbox ka use karein chote screen par vertical navigation ke liye
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '60px'; /* Header height ke anusaar badlein */
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.backgroundColor = '#fff';
            nav.style.zIndex = '100';
            nav.style.boxShadow = '0 4px 4px rgba(0, 0, 0, 0.1)';
        }
    });
</script>
