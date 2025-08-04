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
      id: "signature-cocktails",
      title: "Signature Cocktails",
      subtitle: "Kreative Cocktail-Kreationen",
      category: "SIGNATURE COCKTAILS",
      heroImage: "/images/drink/ct-2.webp",
      heroImageAlt: "Signature Cocktail",
      heroTitle: "Lychee Martini",
      heroDescription: "Unser Hauscocktail mit frischen Lychees",
      badge: "Signature",
      badgeClass: "hero-badge",
      drinks: [
        {
          id: "lychee-martini",
          name: "Lychee Martini",
          description: "Premium Vodka, frische Lychees, Rosenblätter",
          price: "€12.50",
          image: "/images/drink/ct-2.webp",
          alt: "Lychee Martini",
        },
        {
          id: "sake-sour",
          name: "Sake Sour",
          description: "Premium Sake, Yuzu, Eiweiß, Shiso",
          price: "€11.00",
          image: "/images/drink/ct-2.webp",
          alt: "Sake Sour",
        },
        {
          id: "asian-spice-mule",
          name: "Asian Spice Mule",
          description: "Vodka, Ingwer, Lemongrass, Chili",
          price: "€10.50",
          image: "/images/drink/ct-2.webp",
          alt: "Asian Spice Mule",
        },
        {
          id: "ginger-passion",
          name: "Ginger Passion",
          description: "Rum, Passionsfrucht, Ingwer, Limette",
          price: "€11.50",
          image: "/placeholder.svg?height=80&width=80&text=Ginger+Passion",
          alt: "Ginger Passion",
        },
        {
          id: "dragon-well",
          name: "Dragon Well",
          description: "Gin, Grüner Tee, Honig, Zitronengras",
          price: "€12.00",
          image: "/placeholder.svg?height=80&width=80&text=Dragon+Well",
          alt: "Dragon Well",
        },
        {
          id: "zen-garden",
          name: "Zen Garden",
          description: "Whisky, Ume, Shiso, Sesam",
          price: "€13.50",
          image: "/placeholder.svg?height=80&width=80&text=Zen+Garden",
          alt: "Zen Garden",
        },
      ],
    },
    {
      id: "signature-cocktails-2",
      title: "Weine & Sake",
      subtitle: "Internationale Auswahl",
      category: "WEINE & SAKE",
      heroImage: "/images/drink/ct-2.webp",
      heroImageAlt: "Premium Wine",
      heroTitle: "Erlesene Weine",
      heroDescription: "Aus den besten Anbaugebieten",
      badge: "Premium",
      badgeClass: "hero-badge wine-badge",
      drinks: [
        {
          id: "riesling-kabinett",
          name: "Riesling Kabinett",
          description: "Deutscher Riesling, trocken, fruchtig",
          price: "€6.50",
          image: "/placeholder.svg?height=80&width=80&text=Riesling",
          alt: "Riesling",
        },
        {
          id: "bordeaux-reserve",
          name: "Bordeaux Reserve",
          description: "Französischer Rotwein, vollmundig",
          price: "€8.50",
          image: "/placeholder.svg?height=80&width=80&text=Bordeaux",
          alt: "Bordeaux",
        },
        {
          id: "chianti-classico",
          name: "Chianti Classico",
          description: "Italienischer Rotwein, elegant",
          price: "€7.80",
          image: "/placeholder.svg?height=80&width=80&text=Chianti",
          alt: "Chianti",
        },
        {
          id: "junmai-sake",
          name: "Junmai Sake",
          description: "Traditioneller japanischer Reiswein",
          price: "€7.00",
          image: "/placeholder.svg?height=80&width=80&text=Junmai+Sake",
          alt: "Junmai Sake",
        },
        {
          id: "daiginjo-premium",
          name: "Daiginjo Premium",
          description: "Premium Sake, besonders rein",
          price: "€12.00",
          image: "/placeholder.svg?height=80&width=80&text=Daiginjo",
          alt: "Daiginjo",
        },
        {
          id: "prosecco-brut",
          name: "Prosecco Brut",
          description: "Italienischer Schaumwein, trocken",
          price: "€6.00",
          image: "/placeholder.svg?height=80&width=80&text=Prosecco",
          alt: "Prosecco",
        },
      ],
    },
    {
      id: "hot-beverages",
      title: "Heisse Getränke",
      subtitle: "Tees & Kaffee-Spezialitäten",
      category: "HEISSE GETRÄNKE",
      heroImage: "/images/drink/ct-2.webp",
      heroImageAlt: "Asian Tea",
      heroTitle: "Asiatische Tees",
      heroDescription: "Authentische Teesorten",
      badge: "Traditionell",
      badgeClass: "hero-badge tea-badge",
      drinks: [
        {
          id: "sencha-gruentee",
          name: "Sencha Grüntee",
          description: "Klassischer japanischer Grüntee",
          price: "€4.50",
          image: "/placeholder.svg?height=80&width=80&text=Sencha",
          alt: "Sencha",
        },
        {
          id: "oolong-premium",
          name: "Oolong Premium",
          description: "Halbfermentierter chinesischer Tee",
          price: "€5.00",
          image: "/placeholder.svg?height=80&width=80&text=Oolong",
          alt: "Oolong",
        },
        {
          id: "jasmin-tee",
          name: "Jasmin Tee",
          description: "Grüner Tee mit Jasminblüten",
          price: "€4.80",
          image: "/placeholder.svg?height=80&width=80&text=Jasmin",
          alt: "Jasmin Tee",
        },
        {
          id: "vietnamese-coffee",
          name: "Vietnamese Coffee",
          description: "Mit kondensierter Milch, heiß oder kalt",
          price: "€5.50",
          image: "/placeholder.svg?height=80&width=80&text=Vietnamese+Coffee",
          alt: "Vietnamese Coffee",
        },
        {
          id: "chai-latte",
          name: "Chai Latte",
          description: "Gewürztee mit aufgeschäumter Milch",
          price: "€4.80",
          image: "/placeholder.svg?height=80&width=80&text=Chai+Latte",
          alt: "Chai Latte",
        },
        {
          id: "matcha-latte",
          name: "Matcha Latte",
          description: "Japanischer Matcha mit Milch",
          price: "€5.20",
          image: "/placeholder.svg?height=80&width=80&text=Matcha",
          alt: "Matcha Latte",
        },
      ],
    },
    {
      id: "fresh-drinks",
      title: "Erfrischungsgetränke",
      subtitle: "Frische Säfte & Mocktails",
      category: "ERFRISCHUNGSGETRÄNKE",
      heroImage: "/images/drink/ct-2.webp",
      heroImageAlt: "Fresh Juice",
      heroTitle: "Frische Säfte",
      heroDescription: "Täglich frisch gepresst",
      badge: "Frisch",
      badgeClass: "hero-badge fresh-badge",
      drinks: [
        {
          id: "mango-lassi",
          name: "Mango Lassi",
          description: "Indisches Joghurtgetränk mit Mango",
          price: "€4.50",
          image: "/placeholder.svg?height=80&width=80&text=Mango+Lassi",
          alt: "Mango Lassi",
        },
        {
          id: "lychee-lemonade",
          name: "Lychee Lemonade",
          description: "Hausgemachte Limonade mit Lychees",
          price: "€4.20",
          image: "/placeholder.svg?height=80&width=80&text=Lychee+Lemonade",
          alt: "Lychee Lemonade",
        },
        {
          id: "passion-fruit-juice",
          name: "Passion Fruit Juice",
          description: "Frischer Passionsfruchtsaft",
          price: "€4.80",
          image: "/placeholder.svg?height=80&width=80&text=Passion+Fruit",
          alt: "Passion Fruit Juice",
        },
        {
          id: "coconut-water",
          name: "Coconut Water",
          description: "Frisches Kokoswasser, natürlich",
          price: "€3.80",
          image: "/placeholder.svg?height=80&width=80&text=Coconut",
          alt: "Coconut Water",
        },
        {
          id: "ginger-lemon-tea",
          name: "Ginger Lemon Tea",
          description: "Ingwer-Zitronen-Tee, heiß oder kalt",
          price: "€4.00",
          image: "/placeholder.svg?height=80&width=80&text=Ginger+Lemon",
          alt: "Ginger Lemon Tea",
        },
        {
          id: "virgin-mojito",
          name: "Virgin Mojito",
          description: "Alkoholfreier Mojito mit frischer Minze",
          price: "€5.50",
          image: "/placeholder.svg?height=80&width=80&text=Virgin+Mojito",
          alt: "Virgin Mojito",
        },
      ],
    },
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
        <div class="drink-item-image">
          <img src="${drink.image}" alt="${drink.alt}">
        </div>
        <div class="drink-item-content">
          <h4 class="drink-name">${drink.name}</h4>
          <p class="drink-description">${drink.description}</p>
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
