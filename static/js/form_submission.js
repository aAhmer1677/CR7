document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                const name = document.getElementById('fullName').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();
                
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    e.preventDefault();
                    return;
                }
                
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address');
                    e.preventDefault();
                    return;
                }
                
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;
                
            });
        }
    });