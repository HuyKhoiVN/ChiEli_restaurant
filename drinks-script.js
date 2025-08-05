// Drinks Carousel Script
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("drinksCarouselTrack")
  const prevBtn = document.getElementById("drinksCarouselPrev")
  const nextBtn = document.getElementById("drinksCarouselNext")
  const indicators = document.getElementById("drinksCarouselIndicators")

  if (!track || !prevBtn || !nextBtn) return

  const slides = track.querySelectorAll(".drinks-slide")
  let currentIndex = 0
  let itemsPerView = getItemsPerView()
  let totalPages = Math.ceil(slides.length / itemsPerView)

  // Get items per view based on screen size
  function getItemsPerView() {
    return window.innerWidth >= 992 ? 3 : 1 // 3 on desktop, 1 on mobile
  }

  // Create indicators
  function createIndicators() {
    indicators.innerHTML = ""
    for (let i = 0; i < totalPages; i++) {
      const indicator = document.createElement("button")
      indicator.className = "btn btn-sm btn-outline-primary rounded-circle p-2"
      indicator.style.width = "12px"
      indicator.style.height = "12px"
      indicator.style.padding = "0"
      indicator.addEventListener("click", () => goToPage(i))
      indicators.appendChild(indicator)
    }
    updateIndicators()
  }

  // Update active indicator
  function updateIndicators() {
    const indicatorBtns = indicators.querySelectorAll("button")
    indicatorBtns.forEach((btn, index) => {
      if (index === currentIndex) {
        btn.classList.remove("btn-outline-primary")
        btn.classList.add("btn-primary")
      } else {
        btn.classList.remove("btn-primary")
        btn.classList.add("btn-outline-primary")
      }
    })
  }

  // Update carousel position
  function updateCarousel() {
    const slideWidth = 100 / itemsPerView
    const translateX = -(currentIndex * slideWidth * itemsPerView)
    track.style.transform = `translateX(${translateX}%)`

    // Update button states
    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= totalPages - 1

    updateIndicators()
  }

  // Go to specific page
  function goToPage(pageIndex) {
    currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1))
    updateCarousel()
  }

  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  }

  // Next slide
  function nextSlide() {
    if (currentIndex < totalPages - 1) {
      currentIndex++
      updateCarousel()
    }
  }

  // Handle window resize
  function handleResize() {
    const newItemsPerView = getItemsPerView()
    if (newItemsPerView !== itemsPerView) {
      itemsPerView = newItemsPerView
      totalPages = Math.ceil(slides.length / itemsPerView)
      currentIndex = Math.min(currentIndex, totalPages - 1)
      createIndicators()
      updateCarousel()
    }
  }

  // Touch/Swipe support for mobile
  let startX = 0
  let isDragging = false

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    isDragging = true
  })

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return
    e.preventDefault()
  })

  track.addEventListener("touchend", (e) => {
    if (!isDragging) return
    isDragging = false

    const endX = e.changedTouches[0].clientX
    const diffX = startX - endX

    // Swipe threshold
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide() // Swipe left - next
      } else {
        prevSlide() // Swipe right - previous
      }
    }
  })

  // Event listeners
  prevBtn.addEventListener("click", prevSlide)
  nextBtn.addEventListener("click", nextSlide)
  window.addEventListener("resize", handleResize)

  // Initialize
  createIndicators()
  updateCarousel()

  // Set initial flex layout for slides
  slides.forEach((slide) => {
    slide.style.flex = `0 0 ${100 / itemsPerView}%`
    slide.style.maxWidth = `${100 / itemsPerView}%`
  })

  // Update flex on resize
  window.addEventListener("resize", () => {
    setTimeout(() => {
      const currentItemsPerView = getItemsPerView()
      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${100 / currentItemsPerView}%`
        slide.style.maxWidth = `${100 / currentItemsPerView}%`
      })
    }, 100)
  })

  // Add drink card hover effects
  const drinkCards = document.querySelectorAll(".drink-card")
  drinkCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.03)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add pairing card hover effects
  const pairingCards = document.querySelectorAll(".pairing-card")
  pairingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})


const drinksData = {
  categories: [
    {
      "id": "signature-cocktails",
      "title": "Apéritif",
      "subtitle": "Frische und spritzige Aperitif-Getränke",
      "category": "APÉRITIF",
      "heroImage": "/images/drink/drinkcate1.jpg",
      "heroImageAlt": "Apéritif",
      "heroTitle": "Aperol Spritz",
      "heroDescription": "Aperol, Prosecco – klassisch erfrischend",
      "badge": "Apéritif",
      "badgeClass": "hero-badge",
      "drinks": [
        { "id": "aperol-spritz", "name": "Aperol Spritz", "description": "Aperol, Prosecco", "price": "€6.90", "image": "/images/drink/ct1_aperol-spritz", "alt": "Aperol Spritz" },
        { "id": "lillet-wild-berry", "name": "Lillet Wild Berry", "description": "Lillet Blanc, Russian Wild Berry", "price": "€6.90", "image": "/images/drink/ct1_lillet-wild-berry", "alt": "Lillet Wild Berry" },
        { "id": "hugo", "name": "Hugo", "description": "Prosecco, Holunder Sirup, Minze", "price": "€6.90", "image": "/images/drink/ct1_hugo", "alt": "Hugo" },
        { "id": "lychee-spritz", "name": "Lychee Spritz", "description": "Prosecco, Lychee, Minze", "price": "€6.90", "image": "/images/drink/ct1_lychee-spritz", "alt": "Lychee Spritz" },
        { "id": "guava-spritz", "name": "Guava Spritz", "description": "Guave, Prosecco", "price": "€6.90", "image": "/images/drink/ct1_guava-spritz", "alt": "Guava Spritz" },
        { "id": "gin-tonic", "name": "Gin Tonic", "description": "Gin, Minze, Tonic Water", "price": "€6.90", "image": "/images/drink/ct1_gin-tonic", "alt": "Gin Tonic" },
        { "id": "gin-basil", "name": "Gin Basil", "description": "Gin, Thai Basilikum, Ginger Ale", "price": "€6.90", "image": "/images/drink/ct1_gin-basil", "alt": "Gin Basil" }
      ]
    },
    {
      "id": "signature-cocktails",
      "title": "Mocktails",
      "subtitle": "Alkoholfreie Cocktail-Kreationen",
      "category": "MOCKTAILS",
      "heroImage": "/images/drink/drinkcate2.jpg",
      "heroImageAlt": "Mocktails",
      "heroTitle": "Virgin Mojito",
      "heroDescription": "Limette, Rohrzucker, Minze, Soda – alkoholfrei erfrischend",
      "badge": "Mocktail",
      "badgeClass": "hero-badge",
      "drinks": [
        { "id": "virgin-mojito", "name": "Virgin Mojito", "description": "Limette, Rohrzucker, Minze, Soda", "price": "€7.90", "image": "/images/drink/ct2_virgin-mojito", "alt": "Virgin Mojito" },
        { "id": "berry-lime", "name": "Berry Lime", "description": "Limette, frische Beeren, Rohrzucker, Ginger Ale, Minze", "price": "€7.90", "image": "/images/drink/ct2_berry-lime", "alt": "Berry Lime" },
        { "id": "chi-eli-eistee", "name": "Chi Eli Eistee", "description": "Grüner Tee, Limette, Apfel, Wassermelone", "price": "€7.90", "image": "/images/drink/ct2_chi-eli-eistee", "alt": "Chi Eli Eistee" },
        { "id": "virgin-colada", "name": "Virgin Colada", "description": "Orange, Ananas, Sahne, Kokos", "price": "€7.90", "image": "/images/drink/ct2_virgin-colada", "alt": "Virgin Colada" }
      ]
    },
    {
      "id": "signature-cocktails",
      "title": "Cocktails",
      "subtitle": "Beliebte Cocktail-Klassiker",
      "category": "COCKTAILS",
      "heroImage": "/images/drink/drinkcate3.webp",
      "heroImageAlt": "Cocktails",
      "heroTitle": "Mojito",
      "heroDescription": "Havana Club, Minze, Rohrzucker, Limette, Soda",
      "badge": "Cocktail",
      "badgeClass": "hero-badge",
      "drinks": [
        { "id": "mojito", "name": "Mojito", "description": "Havana Club, Minze, Rohrzucker, Limette, Soda", "price": "€10.50", "image": "/images/drink/ct3_mojito", "alt": "Mojito" },
        { "id": "pina-colada", "name": "Piña Colada", "description": "Bacardi, Ananas, Sahne, Kokos", "price": "€10.50", "image": "/images/drink/ct3_pina-colada", "alt": "Piña Colada" },
        { "id": "passion-lychee-caipiroschka", "name": "Passion Lychee Caipiroschka", "description": "Vodka, Lychee, Maracuja, Grenadine, Limette", "price": "€10.50", "image": "/images/drink/ct3_passion-lychee-caipiroschka", "alt": "Passion Lychee Caipiroschka" },
        { "id": "mai-tai", "name": "Mai Tai", "description": "Myers Rum, Bacardi, Cointreau, Apricot Brandy, Mandel Grenadine, Rohrzucker, Limette", "price": "€11.90", "image": "/images/drink/ct3_mai-tai", "alt": "Mai Tai" }
      ]
    },
    {
      "id": "signature-cocktails",
      "title": "Bier",
      "subtitle": "Biere aus aller Welt",
      "category": "BIER",
      "heroImage": "/images/drink/drinkcate4.jpg",
      "heroImageAlt": "Bier",
      "heroTitle": "Asia Bier",
      "heroDescription": "Saigon Bier, Asahi",
      "badge": "Beer",
      "badgeClass": "hero-badge",
      "drinks": [
        { "id": "asia-bier", "name": "Asia Bier (0.3l)", "description": "Saigon Bier, Asahi", "price": "€4.50", "image": "/images/drink/ct4_asia-bier", "alt": "Asia Bier" },
        { "id": "pils", "name": "Pils (0.3l)", "description": "Beck’s", "price": "€4.50", "image": "/images/drink/ct4_pils", "alt": "Pils" },
        { "id": "alkoholfrei-beck", "name": "Alkoholfrei (0.3l)", "description": "Beck’s Blue", "price": "€4.50", "image": "/images/drink/ct4_alkoholfrei-beck", "alt": "Alkoholfrei Beck’s Blue" },
        { "id": "weissbier", "name": "Weißbier (0.5l)", "description": "Ayinger Bräuweisse", "price": "€4.90", "image": "/images/drink/ct4_weissbier", "alt": "Weißbier" },
        { "id": "alkoholfrei-schneider", "name": "Alkoholfrei (0.5l)", "description": "Schneider Weisse", "price": "€4.90", "image": "/images/drink/ct4_alkoholfrei-schneider", "alt": "Alkoholfrei Schneider Weisse" },
        { "id": "helles", "name": "Helles (0.5l)", "description": "Ayinger Langer Hell", "price": "€4.90", "image": "/images/drink/ct4_helles", "alt": "Helles" },
        { "id": "dunkel", "name": "Dunkel (0.5l)", "description": "König Ludwig Dunkel", "price": "€4.90", "image": "/images/drink/ct4_dunkel", "alt": "Dunkel" },
        { "id": "dunkel-weissbier", "name": "Dunkel Weissbier (0.5l)", "description": "Franziskaner Weissbier", "price": "€4.90", "image": "/images/drink/ct4_dunkel-weissbier", "alt": "Dunkel Weissbier" },
        { "id": "natur-radler", "name": "Natur Radler (0.5l)", "description": "", "price": "€4.90", "image": "/images/drink/ct4_natur-radler", "alt": "Natur Radler" }
      ]
    },
    // {
    //   "id": "signature-cocktails",
    //   "title": "Säfte",
    //   "subtitle": "Frische Fruchtsäfte",
    //   "category": "SÄFTE",
    //   "heroImage": "/images/drink/drinkcate5",
    //   "heroImageAlt": "Säfte",
    //   "heroTitle": "Mango Saft",
    //   "heroDescription": "Frischer Mango Saft – erfrischend und fruchtig",
    //   "badge": "Juice",
    //   "badgeClass": "hero-badge",
    //   "drinks": [
    //     { "id": "mango", "name": "Mango (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_mango", "alt": "Mango Saft" },
    //     { "id": "mango-04", "name": "Mango (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_mango-04", "alt": "Mango Saft" },
    //     { "id": "lychee", "name": "Lychee (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_lychee", "alt": "Lychee Saft" },
    //     { "id": "lychee-04", "name": "Lychee (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_lychee-04", "alt": "Lychee Saft" },
    //     { "id": "ananas", "name": "Ananas (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_ananas", "alt": "Ananas Saft" },
    //     { "id": "ananas-04", "name": "Ananas (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_ananas-04", "alt": "Ananas Saft" },
    //     { "id": "maracuja", "name": "Maracuja (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_maracuja", "alt": "Maracuja Saft" },
    //     { "id": "maracuja-04", "name": "Maracuja (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_maracuja-04", "alt": "Maracuja Saft" },
    //     { "id": "apfel", "name": "Apfel (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_apfel", "alt": "Apfel Saft" },
    //     { "id": "apfel-04", "name": "Apfel (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_apfel-04", "alt": "Apfel Saft" },
    //     { "id": "guave", "name": "Guave (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_guave", "alt": "Guave Saft" },
    //     { "id": "guave-04", "name": "Guave (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_guave-04", "alt": "Guave Saft" },
    //     { "id": "johannisbeere", "name": "Johannisbeere (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_johannisbeere", "alt": "Johannisbeere Saft" },
    //     { "id": "johannisbeere-04", "name": "Johannisbeere (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_johannisbeere-04", "alt": "Johannisbeere Saft" },
    //     { "id": "rhabarber", "name": "Rhabarber (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct5_rhabarber", "alt": "Rhabarber Saft" },
    //     { "id": "rhabarber-04", "name": "Rhabarber (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct5_rhabarber-04", "alt": "Rhabarber Saft" },
    //     { "id": "saftschorle", "name": "Saftschorle (0.2l)", "description": "", "price": "€2.90", "image": "/images/drink/ct5_saftschorle", "alt": "Saftschorle" },
    //     { "id": "saftschorle-04", "name": "Saftschorle (0.4l)", "description": "", "price": "€3.90", "image": "/images/drink/ct5_saftschorle-04", "alt": "Saftschorle" }
    //   ]
    // },
    // {
    //   "id": "signature-cocktails",
    //   "title": "Softdrinks",
    //   "subtitle": "Erfrischende Softgetränke",
    //   "category": "SOFTDRINKS",
    //   "heroImage": "/images/drink/drinkcate6",
    //   "heroImageAlt": "Softdrinks",
    //   "heroTitle": "Coca Cola",
    //   "heroDescription": "Klassische Coca Cola – eiskalt serviert",
    //   "badge": "Softdrink",
    //   "badgeClass": "hero-badge",
    //   "drinks": [
    //     { "id": "coca-cola", "name": "Coca Cola (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct6_coca-cola", "alt": "Coca Cola" },
    //     { "id": "coca-cola-04", "name": "Coca Cola (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct6_coca-cola-04", "alt": "Coca Cola" },
    //     { "id": "coca-cola-zero", "name": "Coca Cola Zero (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct6_coca-cola-zero", "alt": "Coca Cola Zero" },
    //     { "id": "coca-cola-zero-04", "name": "Coca Cola Zero (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct6_coca-cola-zero-04", "alt": "Coca Cola Zero" },
    //     { "id": "fanta", "name": "Fanta (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct6_fanta", "alt": "Fanta" },
    //     { "id": "fanta-04", "name": "Fanta (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct6_fanta-04", "alt": "Fanta" },
    //     { "id": "sprite", "name": "Sprite (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct6_sprite", "alt": "Sprite" },
    //     { "id": "sprite-04", "name": "Sprite (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct6_sprite-04", "alt": "Sprite" },
    //     { "id": "mezzo-mix", "name": "Mezzo Mix (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct6_mezzo-mix", "alt": "Mezzo Mix" },
    //     { "id": "mezzo-mix-04", "name": "Mezzo Mix (0.4l)", "description": "", "price": "€4.90", "image": "/images/drink/ct6_mezzo-mix-04", "alt": "Mezzo Mix" }
    //   ]
    // },
    // {
    //   "id": "signature-cocktails",
    //   "title": "Wasser",
    //   "subtitle": "Natürliches Mineralwasser",
    //   "category": "WASSER",
    //   "heroImage": "/images/drink/drinkcate7",
    //   "heroImageAlt": "Wasser",
    //   "heroTitle": "Adelholzener Perlend",
    //   "heroDescription": "Spritziges Mineralwasser aus Adelholzener",
    //   "badge": "Water",
    //   "badgeClass": "hero-badge",
    //   "drinks": [
    //     { "id": "adelholzener-perlend", "name": "Adelholzener Perlend (0.25l)", "description": "", "price": "€3.50", "image": "/images/drink/ct7_adelholzener-perlend", "alt": "Adelholzener Perlend" },
    //     { "id": "adelholzener-perlend-075", "name": "Adelholzener Perlend (0.75l)", "description": "", "price": "€6.90", "image": "/images/drink/ct7_adelholzener-perlend-075", "alt": "Adelholzener Perlend" },
    //     { "id": "adelholzener-still", "name": "Adelholzener Still (0.25l)", "description": "", "price": "€3.50", "image": "/images/drink/ct7_adelholzener-still", "alt": "Adelholzener Still" },
    //     { "id": "adelholzener-still-075", "name": "Adelholzener Still (0.75l)", "description": "", "price": "€6.90", "image": "/images/drink/ct7_adelholzener-still-075", "alt": "Adelholzener Still" }
    //   ]
    // },
    // {
    //   "id": "signature-cocktails",
    //   "title": "Schweppes",
    //   "subtitle": "Schweppes Erfrischungsgetränke",
    //   "category": "SCHWEPPES",
    //   "heroImage": "/images/drink/drinkcate8",
    //   "heroImageAlt": "Schweppes",
    //   "heroTitle": "Tonic Water",
    //   "heroDescription": "Bitter-spritziges Tonic Water von Schweppes",
    //   "badge": "Schweppes",
    //   "badgeClass": "hero-badge",
    //   "drinks": [
    //     { "id": "tonic-water", "name": "Tonic Water (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct8_tonic-water", "alt": "Tonic Water" },
    //     { "id": "ginger-ale", "name": "Ginger Ale (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct8_ginger-ale", "alt": "Ginger Ale" },
    //     { "id": "russian-wildberry", "name": "Russian Wildberry (0.2l)", "description": "", "price": "€3.50", "image": "/images/drink/ct8_russian-wildberry", "alt": "Russian Wildberry" }
    //   ]
    // },
    // {
    //   "id": "signature-cocktails",
    //   "title": "Tee",
    //   "subtitle": "Warme Teespezialitäten",
    //   "category": "TEE",
    //   "heroImage": "/images/drink/drinkcate9",
    //   "heroImageAlt": "Tee",
    //   "heroTitle": "Grüner Tee",
    //   "heroDescription": "Aromatischer grüner Tee – frisch gebrüht",
    //   "badge": "Tea",
    //   "badgeClass": "hero-badge",
    //   "drinks": [
    //     { "id": "gruner-tee", "name": "Grüner Tee (0.33l)", "description": "", "price": "€3.90", "image": "/images/drink/ct9_gruner-tee", "alt": "Grüner Tee" },
    //     { "id": "jasmin-tee", "name": "Jasmin Tee (0.33l)", "description": "", "price": "€3.90", "image": "/images/drink/ct9_jasmin-tee", "alt": "Jasmin Tee" },
    //     { "id": "frischer-minz-tee", "name": "Frischer Minz Tee (0.33l)", "description": "", "price": "€3.90", "image": "/images/drink/ct9_frischer-minz-tee", "alt": "Frischer Minz Tee" },
    //     { "id": "frischer-ingwer-tee", "name": "Frischer Ingwer Tee (0.33l)", "description": "", "price": "€3.90", "image": "/images/drink/ct9_frischer-ingwer-tee", "alt": "Frischer Ingwer Tee" },
    //     { "id": "frischer-zitronengrass-tee", "name": "Frischer Zitronengrass Tee (0.33l)", "description": "", "price": "€3.90", "image": "/images/drink/ct9_frischer-zitronengrass-tee", "alt": "Frischer Zitronengrass Tee" }
    //   ]
    // }
  ],

}

class DrinksRenderer {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId)
    this.data = data
    this.init()
  }

  init() {
    if (!this.container) {
      console.error("Container not found")
      return
    }
    this.renderDrinksCategories()
  }

  renderDrinksCategories() {
    const categoriesHTML = this.data.categories
      .map((category, index) => {
        return this.renderCategory(category, index)
      })
      .join("")

    this.container.innerHTML = categoriesHTML
  }

  renderCategory(category, index) {
    const isOdd = index % 2 == 0;
    console.log(`render category #${index} (${category.title}), isOdd=${index % 2 == 0}`);

    const sectionClass = "cocktail-hero-section";

    return `
      <div class="${sectionClass} mb-5" id="${category.id}-section">
        <div class="row g-0 align-items-center">
          ${isOdd ? this.renderImageFirst(category) : this.renderMenuFirst(category)}
        </div>
      </div>
    `
  }

  renderImageFirst(category) {
    return `
      <!-- Hero Image -->
      <div class="col-lg-6">
        ${this.renderHeroImage(category)}
      </div>
      
      <!-- Drinks Menu -->
      <div class="col-lg-6">
        ${this.renderDrinksMenu(category)}
      </div>
    `
  }

  renderMenuFirst(category) {
    return `
      <!-- Drinks Menu -->
      <div class="col-lg-6 ">
        ${this.renderDrinksMenu(category)}
      </div>
      
      <!-- Hero Image -->
      <div class="col-lg-6">
        ${this.renderHeroImage(category)}
      </div>
    `
  }

  renderHeroImage(category) {
    return `
      <div class="hero-image-container">
        <img src="${category.heroImage}" 
             alt="${category.heroImageAlt}" 
             class="hero-cocktail-image">
        <div class="hero-image-overlay">
          <h3 class="hero-drink-name">${category.heroTitle}</h3>
        </div>
      </div>
    `
  }

  renderDrinksMenu(category) {
    return `
      <div class="drinks-menu-container">
       
        <div class="drinks-list" id="${category.id}-drinks-list">
          ${this.renderDrinksList(category.drinks)}
        </div>
      </div>
    `
  }

  renderDrinksList(drinks) {
    return drinks.map((drink) => this.renderDrinkItem(drink)).join("")
  }

  renderDrinkItem(drink) {
    return `
      <div class="drink-item" id="${drink.id}">
        
        <div class="drink-item-content">
          <h4 class="drink-name">${drink.name}</h4>
          <p class="drink-description text-white">${drink.description}</p>
        </div>
        <div class="drink-price">${drink.price}</div>
      </div>
    `
  }

  // Method to get category by ID
  getCategoryById(categoryId) {
    return this.data.categories.find((category) => category.id === categoryId)
  }

  // Method to get drink by ID within a category
  getDrinkById(categoryId, drinkId) {
    const category = this.getCategoryById(categoryId)
    if (!category) return null
    return category.drinks.find((drink) => drink.id === drinkId)
  }

  // Method to update drink price
  updateDrinkPrice(categoryId, drinkId, newPrice) {
    const drink = this.getDrinkById(categoryId, drinkId)
    if (drink) {
      drink.price = newPrice
      const drinkElement = document.getElementById(drinkId)
      if (drinkElement) {
        const priceElement = drinkElement.querySelector(".drink-price")
        if (priceElement) {
          priceElement.textContent = newPrice
        }
      }
    }
  }

  // Method to add new drink to category
  addDrinkToCategory(categoryId, newDrink) {
    const category = this.getCategoryById(categoryId)
    if (category) {
      category.drinks.push(newDrink)
      const drinksList = document.getElementById(`${categoryId}-drinks-list`)
      if (drinksList) {
        drinksList.innerHTML += this.renderDrinkItem(newDrink)
      }
    }
  }

  // Method to remove drink from category
  removeDrinkFromCategory(categoryId, drinkId) {
    const category = this.getCategoryById(categoryId)
    if (category) {
      const drinkIndex = category.drinks.findIndex((drink) => drink.id === drinkId)
      if (drinkIndex > -1) {
        category.drinks.splice(drinkIndex, 1)
        const drinkElement = document.getElementById(drinkId)
        if (drinkElement) {
          drinkElement.remove()
        }
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  const drinksRenderer = new DrinksRenderer("drinks-highlights-container", drinksData)
  window.drinksRenderer = drinksRenderer
})
