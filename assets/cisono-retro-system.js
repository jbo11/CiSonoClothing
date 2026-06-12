(() => {
  const initRetroSystem = () => {
    document.querySelectorAll('[data-cisono-retro]').forEach((root) => {
      if (root.dataset.retroReady === 'true') return;
      root.dataset.retroReady = 'true';

      const bar = root.querySelector('[data-retro-bar]');
      const skip = root.querySelector('[data-retro-skip]');
      let value = 0;

      const complete = () => {
        value = 100;
        if (bar) bar.style.width = '100%';
        root.classList.add('is-loaded');
      };

      const timer = window.setInterval(() => {
        value = Math.min(100, value + Math.floor(Math.random() * 12) + 5);
        if (bar) bar.style.width = `${value}%`;
        if (value >= 100) {
          window.clearInterval(timer);
          window.setTimeout(complete, 260);
        }
      }, 120);

      if (skip) {
        skip.addEventListener('click', () => {
          window.clearInterval(timer);
          complete();
        });
      }

      const revealTargets = root.querySelectorAll('[data-retro-reveal]');
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16 }
      );

      revealTargets.forEach((target) => revealObserver.observe(target));

      const imageStack = root.querySelector('.cisono-retro__image-stack');
      if (imageStack) {
        imageStack.addEventListener('pointermove', (event) => {
          const rect = imageStack.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          imageStack.style.setProperty('--retro-x', `${x * 18}px`);
          imageStack.style.setProperty('--retro-y', `${y * 18}px`);
        });
      }

      root.querySelectorAll('[data-retro-float]').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty('--float-x', `${x * 10}px`);
          card.style.setProperty('--float-y', `${y * -10}px`);
        });

        card.addEventListener('pointerleave', () => {
          card.style.setProperty('--float-x', '0px');
          card.style.setProperty('--float-y', '0px');
        });
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRetroSystem);
  } else {
    initRetroSystem();
  }

  document.addEventListener('shopify:section:load', initRetroSystem);
})();
