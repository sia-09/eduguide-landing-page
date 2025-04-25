// 📊 Animated Counter for Stats Section
const counters = document.querySelectorAll(".counter");
let hasCounted = false;

function animateCounters() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 100;

    const update = () => {
      const current = +counter.innerText.replace(/,/g, '');
      if (current < target) {
        counter.innerText = Math.ceil(current + increment).toLocaleString();
        setTimeout(update, 20);
      } else {
        counter.innerText = target.toLocaleString();
      }
    };
    update();
  });
}

// Trigger when stats section enters viewport
window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats");
  const sectionPos = statsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (!hasCounted && sectionPos < screenPos) {
    hasCounted = true;
    animateCounters();
  }
});

// Optional: Scroll fade-in (for future enhancements)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});
