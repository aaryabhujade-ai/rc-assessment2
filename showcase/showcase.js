/**
 * Auralis Nova Showcase Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Editions Dataset
  const editions = [
    {
      id: 0,
      title: "Silence, Shattered",
      subheading: "Global Flagship Launch Campaign",
      editionLabel: "EDITION 01 · OBSIDIAN & 24K GOLD",
      concept: "A single pulse of acoustic energy shatters black volcanic glass. Obsidian, deep charcoal & 24K gold.",
      imageSrc: "../assets/outputs/auralis_nova_hero_key_visual.png",
      tag: "Edition 01: Obsidian & 24K Gold (Flagship Hero)",
      seed: "447606998181262",
      steps: "25",
      cfg: "1.0",
      resolution: "1376 × 768 px",
      prompt: `A photorealistic, ultra-premium cinematic advertising poster for a luxury wireless headphone brand, wide 16:9 landscape format, art-directed like a global flagship product launch campaign.

CONCEPT:
A single pulse of sound from the headphones has shattered a wall of black volcanic glass. The moment is frozen in time: power, precision and silence captured in one frame.

HERO PRODUCT (right side, dominant):
One pair of premium over-ear wireless headphones floats mid-air in the right half of the frame, centered around the right third, angled in a dynamic three-quarter view and tilted about 15 degrees. It fills roughly 50% of the frame height and is razor sharp. Colorway: OBSIDIAN & 24K GOLD.
- Headband: a seamless, single-piece arc in deep glossy obsidian black with a mirror-like lacquer finish, and an underside cushioned in fine black protein leather with precise gold stitching.
- Sliders and hinges: slim, polished 24-karat gold metal with machined bevelled edges and engraved precision detailing.
- Earcups: oval, matte obsidian black, with an outer face of a fine micro-perforated acoustic mesh in a subtle radial pattern and a razor-thin warm-gold luminous light ring glowing around the outer edge.
- Ear cushions: plush memory foam wrapped in soft black protein leather with visible natural grain and fine stitching.
- Branding: a tiny, elegant engraved "AURALIS" wordmark in gold on the earcup.
Flawless industrial design, physically accurate metal reflectance, realistic leather micro-texture, no visible buttons or cables.`
    },
    {
      id: 1,
      title: "Defy The Gravity",
      subheading: "Cybernetic Acoustic Series",
      editionLabel: "EDITION 02 · TITANIUM & EMERALD",
      concept: "Engineered for another dimension. Concentric floating magnetic rings and emerald cyber-luminescence.",
      imageSrc: "../assets/outputs/auralis_nova_campaign_gravity.png",
      tag: "Edition 02: Cyber Titanium & Emerald",
      seed: "447606998181262",
      steps: "25",
      cfg: "1.0",
      resolution: "1376 × 768 px",
      prompt: `Create an ultra-premium futuristic advertising poster for AURALIS NOVA, a luxury headphone brand, in wide 16:9 landscape format. The visual direction blends advanced aerospace titanium engineering with glowing emerald acoustic particle fields.`
    },
    {
      id: 2,
      title: "Beyond Silence",
      subheading: "Haute Horlogerie Acoustic Edition",
      editionLabel: "EDITION 03 · PEARL & ROSE GOLD",
      concept: "Comfort without limits. Sound without boundaries. Alabaster pearl leather, rose gold, and faceted amethyst crystals.",
      imageSrc: "../assets/outputs/auralis_nova_campaign_beyond.png",
      tag: "Edition 03: Alabaster Pearl & Rose Gold",
      seed: "447606998181262",
      steps: "25",
      cfg: "1.0",
      resolution: "1376 × 768 px",
      prompt: `Create a breathtaking ultra-luxury cinematic advertising poster for AURALIS NOVA, a fictional premium wireless headphone brand, in wide 16:9 landscape format. Luxury aesthetics featuring alabaster pearl, warm champagne rose gold, and raw refractive crystal formations.`
    },
    {
      id: 3,
      title: "Feel The Undertow",
      subheading: "Liquid Dynamics Edition",
      editionLabel: "EDITION 04 · JADE & LIQUID GLASS",
      concept: "Sound in another dimension. Flowing aquatic ribbons and caustic glass reflections under studio strobe.",
      imageSrc: "../assets/outputs/auralis_nova_campaign_undertow.png",
      tag: "Edition 04: Jade & Liquid Glass",
      seed: "447606998181262",
      steps: "25",
      cfg: "1.0",
      resolution: "1376 × 768 px",
      prompt: `Ultra-premium photorealistic cinematic product advertising poster for AURALIS NOVA, an exclusive flagship wireless headphone, wide 16:9 landscape composition with spiralling fluid glass ribbons and aquatic green light refraction.`
    },
    {
      id: 4,
      title: "Own The Moment",
      subheading: "Solar Acoustics 02",
      editionLabel: "EDITION 05 · SOLAR BRONZE & COPPER",
      concept: "Precision you can feel. Brushed bronze, amber acoustic ring, and warm cinematic studio illumination.",
      imageSrc: "../assets/outputs/auralis_nova_campaign_solar.png",
      tag: "Edition 05: Solar Bronze & Copper",
      seed: "447606998181262",
      steps: "25",
      cfg: "1.0",
      resolution: "1376 × 768 px",
      prompt: `High-end photorealistic cinematic product advertising poster for AURALIS NOVA, a premium wireless headphone collection, wide 16:9 landscape composition with solar bronze finish, warm amber rim lighting, and acoustic circular halo.`
    }
  ];

  let currentEditionIndex = 0;

  // DOM Elements
  const activeImg = document.getElementById('activeKeyVisualImg');
  const campaignHeadline = document.getElementById('campaignHeadline');
  const campaignSubheading = document.getElementById('campaignSubheading');
  const campaignConcept = document.getElementById('campaignConcept');
  const activeEditionTag = document.getElementById('activeEditionTag');
  const positivePromptBox = document.getElementById('positivePromptBox');
  const seedDisplay = document.getElementById('seedDisplay');
  const cards = document.querySelectorAll('.edition-card');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const btnCloseLightbox = document.getElementById('btnCloseLightbox');
  const btnZoomToggle = document.getElementById('btnZoomToggle');
  const btnToggleMagnify = document.getElementById('btnToggleMagnify');
  const imageWrapper = document.getElementById('imageWrapper');

  // Edition Switch Handler
  function setEdition(index) {
    if (index < 0 || index >= editions.length) return;
    currentEditionIndex = index;
    const ed = editions[index];

    // Update active card styling
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });

    // Fade out and swap
    activeImg.style.opacity = '0.3';
    setTimeout(() => {
      activeImg.src = ed.imageSrc;
      activeImg.alt = `Auralis Nova - ${ed.title}`;
      activeImg.style.opacity = '1';
    }, 150);

    // Update text
    campaignHeadline.innerHTML = `<strong>${ed.title}.</strong> The Auralis Nova Key Visual`;
    campaignSubheading.textContent = ed.subheading;
    campaignConcept.textContent = ed.concept;
    activeEditionTag.textContent = ed.tag;
    positivePromptBox.textContent = ed.prompt;
    seedDisplay.textContent = `Seed: ${ed.seed}`;
  }

  // Card click events
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-edition'), 10);
      setEdition(idx);
    });
  });

  // Lightbox Modal
  function openLightbox() {
    lightboxImg.src = editions[currentEditionIndex].imageSrc;
    lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
  }

  btnZoomToggle.addEventListener('click', openLightbox);
  btnToggleMagnify.addEventListener('click', openLightbox);
  btnCloseLightbox.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  // Interactive Magnifier on Hover
  let isMagnified = false;
  imageWrapper.addEventListener('mousemove', (e) => {
    if (!isMagnified) return;
    const rect = imageWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    activeImg.style.transformOrigin = `${x}% ${y}%`;
  });

  imageWrapper.addEventListener('click', () => {
    isMagnified = !isMagnified;
    if (isMagnified) {
      activeImg.style.transform = 'scale(2.2)';
      imageWrapper.style.cursor = 'zoom-out';
    } else {
      activeImg.style.transform = 'scale(1)';
      imageWrapper.style.cursor = 'zoom-in';
    }
  });

  // Copy Buttons
  function setupCopyButton(btnId, targetElementId, originalText = 'Copy') {
    const btn = document.getElementById(btnId);
    const target = document.getElementById(targetElementId);
    if (!btn || !target) return;

    btn.addEventListener('click', () => {
      const textToCopy = target.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        btn.textContent = 'Copied!';
        btn.style.background = '#D4A64A';
        btn.style.color = '#0A0A0B';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 1800);
      }).catch(() => {
        btn.textContent = 'Error';
      });
    });
  }

  setupCopyButton('btnCopyPositive', 'positivePromptBox', 'Copy Prompt');
  setupCopyButton('btnCopyNegative', 'negativePromptBox', 'Copy Negative');

  // Swatch copy HEX
  document.querySelectorAll('.swatch-card').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      const hex = swatch.getAttribute('data-hex');
      const hexLabel = swatch.querySelector('.swatch-hex');
      const origText = hexLabel.textContent;
      navigator.clipboard.writeText(hex).then(() => {
        hexLabel.textContent = 'Copied!';
        setTimeout(() => {
          hexLabel.textContent = origText;
        }, 1400);
      });
    });
  });
});
