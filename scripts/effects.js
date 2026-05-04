/* ================================================================
   Vision OS — Enhanced Interactions | portfolio-fadljevic
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    /* ─── Custom Cursor ────────────────────────────────────────── */
    if (!isTouch) {
        const dot  = document.createElement('div');
        const ring = document.createElement('div');
        dot.className  = 'cursor-dot';
        ring.className = 'cursor-ring';
        document.body.append(dot, ring);
        document.body.classList.add('has-custom-cursor');

        let mx = window.innerWidth  / 2;
        let my = window.innerHeight / 2;
        let rx = mx, ry = my;

        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top  = my + 'px';
        });

        (function trackRing() {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(trackRing);
        })();

        document.addEventListener('mouseleave', () => document.body.classList.add('cursor-hidden'));
        document.addEventListener('mouseenter', () => document.body.classList.remove('cursor-hidden'));

        function bindHover(selector) {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });
        }
        bindHover([
            'a', 'button', '.menu-item', '.project-card', '.portfolio-item',
            '.filter-btn', '.tech-icon', '.tool-icon', '.language-selector',
            '.view-more', '.experience-entry', '.education-entry'
        ].join(', '));
    }

    /* ─── Ambient Mouse Light ──────────────────────────────────── */
    if (!isTouch) {
        const light = document.createElement('div');
        light.className = 'ambient-light';
        document.body.appendChild(light);
        light.style.left = (window.innerWidth  / 2) + 'px';
        light.style.top  = (window.innerHeight / 2) + 'px';

        document.addEventListener('mousemove', e => {
            light.style.left = e.clientX + 'px';
            light.style.top  = e.clientY + 'px';
        });
    }

    /* ─── 3D Card Tilt ─────────────────────────────────────────── */
    // title-box excluded to avoid conflicting with transitions.js transforms
    if (!isTouch) {
        document.querySelectorAll('.tech-box, .tools-box, .experience-box, .education').forEach(card => {
            card.classList.add('tilt-card');

            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left)  / r.width  - 0.5;
                const y = (e.clientY - r.top)    / r.height - 0.5;
                card.style.transform =
                    `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale(1.012)`;
            });

            card.addEventListener('mouseleave', () => {
                card.classList.add('tilt-reset');
                card.style.transform =
                    'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
                setTimeout(() => card.classList.remove('tilt-reset'), 650);
            });
        });
    }

    /* ─── Magnetic Menu Items ──────────────────────────────────── */
    if (!isTouch) {
        document.querySelectorAll('.side-menu .menu-item').forEach(item => {
            item.addEventListener('mousemove', e => {
                const r = item.getBoundingClientRect();
                const x = e.clientX - r.left - r.width  / 2;
                const y = e.clientY - r.top  - r.height / 2;
                item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translate(0, 0)';
            });
        });
    }

    /* ─── Portfolio Section Transition ────────────────────────── */
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;
            // Run after script.js has toggled the active class
            setTimeout(() => {
                const target = document.querySelector(`.portfolio-section.${filter}`);
                if (!target) return;

                target.classList.remove('animate-in');
                void target.offsetWidth; // force reflow to replay animation
                target.classList.add('animate-in');

                staggerReveal(target.querySelectorAll('.portfolio-item'));
            }, 55);
        });
    });

    /* ─── Stagger helper (CSS-animation based — no inline opacity risk) ─ */
    function staggerReveal(items) {
        items.forEach((el, i) => {
            el.style.animationDelay = (i * 55) + 'ms';
            el.classList.remove('stagger-in');
            void el.offsetWidth; // trigger reflow so animation replays
            el.classList.add('stagger-in');
        });
    }

    /* ─── Stagger when portfolio view becomes active ───────────── */
    const contentEl = document.querySelector('.content');
    if (contentEl) {
        new MutationObserver(mutations => {
            for (const m of mutations) {
                if (m.attributeName === 'class' && contentEl.classList.contains('portfolio')) {
                    const active = document.querySelector('.portfolio-section.active');
                    if (active) {
                        setTimeout(() => staggerReveal(active.querySelectorAll('.portfolio-item')), 480);
                    }
                    break;
                }
            }
        }).observe(contentEl, { attributes: true });
    }
});
