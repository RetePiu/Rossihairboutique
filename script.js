document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Before/After via Range Slider ---
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        const slider = card.querySelector('[data-compare]');
        const rangeInput = card.querySelector('.compare-range');
        
        if (!slider || !rangeInput) return;

        const afterImgContainer = slider.querySelector('.comparison-after');
        const handle = slider.querySelector('.slider-handle');

        // Function to update the comparison based on a percentage value
        const updateComparison = (percent) => {
            afterImgContainer.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        };

        // Range input drives the comparison
        rangeInput.addEventListener('input', (e) => {
            updateComparison(e.target.value);
        });

        // Also allow dragging directly on the image
        const moveSlider = (e) => {
            const rect = slider.getBoundingClientRect();
            let x;

            if (e.type === 'mousemove') {
                x = e.clientX - rect.left;
            } else if (e.type === 'touchmove') {
                x = e.touches[0].clientX - rect.left;
            }

            let positionPercentage = (x / rect.width) * 100;
            if (positionPercentage < 0) positionPercentage = 0;
            if (positionPercentage > 100) positionPercentage = 100;

            updateComparison(positionPercentage);
            // Keep the range input in sync
            rangeInput.value = positionPercentage;
        };

        slider.addEventListener('mousemove', moveSlider);
        slider.addEventListener('touchmove', moveSlider);
    });

    // --- Copy Address to Clipboard ---
    const copyBtn = document.getElementById('copyBtn');
    const addressEl = document.getElementById('address');

    if (copyBtn && addressEl) {
        copyBtn.addEventListener('click', () => {
            const tempText = addressEl.innerText;
            navigator.clipboard.writeText(tempText).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = 'Copiato!';
                copyBtn.style.color = '#10B981';

                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.style.color = 'var(--accent)';
                }, 2000);
            }).catch(err => {
                console.error('Copy failed: ', err);
            });
        });
    }

    // --- Subtle Navbar Shadow on Scroll ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

});
