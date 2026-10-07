// Catalog data for GearLoop (sample data)
window.GL_CITIES = ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Indore"];

window.GL_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "console", label: "🎮 Consoles" },
  { id: "vr", label: "🥽 VR" },
  { id: "camera", label: "📷 Cameras" },
  { id: "drone", label: "🚁 Drones" },
  { id: "laptop", label: "💻 Laptops" },
  { id: "audio", label: "🎧 Audio" }
];

// day / week / month = rental price (INR); deposit refundable
window.GL_PRODUCTS = [
  { id: 1,  name: "PlayStation 5 (Disc)",       cat: "console", emoji: "🎮", day: 399, week: 2299, month: 6999, deposit: 5000, rating: 4.9, reviews: 312, tag: "Popular", desc: "Next-gen console with ultra-fast SSD, 4K output and a DualSense controller.", specs: ["825GB SSD", "4K 60fps", "1 controller", "HDMI cable"], cities: "all", color: ["#dbeafe", "#bfdbfe"] },
  { id: 2,  name: "PlayStation 5 Digital + 2 Controllers", cat: "console", emoji: "🕹️", day: 449, week: 2599, month: 7799, deposit: 5000, rating: 4.8, reviews: 188, tag: "", desc: "Digital edition bundled with an extra controller for couch co-op.", specs: ["825GB SSD", "2 controllers", "Pre-installed games"], cities: "all", color: ["#e0e7ff", "#c7d2fe"] },
  { id: 3,  name: "Xbox Series X",               cat: "console", emoji: "🎮", day: 379, week: 2199, month: 6599, deposit: 5000, rating: 4.8, reviews: 204, tag: "", desc: "Powerful 4K console with Quick Resume and a huge game catalog.", specs: ["1TB SSD", "4K 120fps", "1 controller"], cities: "all", color: ["#dcfce7", "#bbf7d0"] },
  { id: 4,  name: "Xbox Series S",               cat: "console", emoji: "🎮", day: 249, week: 1399, month: 4299, deposit: 3000, rating: 4.6, reviews: 141, tag: "Budget pick", desc: "Compact all-digital console. Great for casual gaming sessions.", specs: ["512GB SSD", "1440p", "1 controller"], cities: "all", color: ["#f0fdf4", "#dcfce7"] },
  { id: 5,  name: "Nintendo Switch OLED",        cat: "console", emoji: "🎲", day: 299, week: 1699, month: 4999, deposit: 3000, rating: 4.9, reviews: 267, tag: "Portable", desc: "Hybrid console with a vivid 7-inch OLED screen. Play docked or on the go.", specs: ["64GB", "Joy-Con pair", "Dock included"], cities: "all", color: ["#fee2e2", "#fecaca"] },
  { id: 6,  name: "Steam Deck 512GB",            cat: "console", emoji: "📱", day: 349, week: 1999, month: 5999, deposit: 4000, rating: 4.7, reviews: 96,  tag: "", desc: "Handheld gaming PC to play your PC library anywhere.", specs: ["512GB NVMe", "7\" display", "Carry case"], cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad"], color: ["#e2e8f0", "#cbd5e1"] },
  { id: 7,  name: "Meta Quest 3 VR Headset",     cat: "vr",      emoji: "🥽", day: 499, week: 2899, month: 8499, deposit: 6000, rating: 4.8, reviews: 175, tag: "Hot", desc: "Mixed-reality headset with crisp lenses and wireless freedom.", specs: ["128GB", "2 controllers", "Wireless"], cities: "all", color: ["#ede9fe", "#ddd6fe"] },
  { id: 8,  name: "PlayStation VR2",             cat: "vr",      emoji: "🥽", day: 549, week: 3199, month: 9499, deposit: 7000, rating: 4.6, reviews: 58,  tag: "", desc: "Immersive VR for PS5 with eye tracking and haptic feedback.", specs: ["4K HDR OLED", "Sense controllers"], cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Pune"], color: ["#e0f2fe", "#bae6fd"] },
  { id: 9,  name: "Sony Alpha a6400 Mirrorless", cat: "camera",  emoji: "📷", day: 699, week: 3999, month: 11999, deposit: 10000, rating: 4.8, reviews: 143, tag: "Creator", desc: "Fast autofocus mirrorless camera with a 16-50mm kit lens.", specs: ["24MP", "4K video", "Kit lens", "2 batteries"], cities: "all", color: ["#fef9c3", "#fef08a"] },
  { id: 10, name: "GoPro HERO 12 Black",         cat: "camera",  emoji: "🎥", day: 349, week: 1999, month: 5999, deposit: 4000, rating: 4.8, reviews: 221, tag: "Travel", desc: "Rugged action camera with stabilised 5.3K video and waterproof body.", specs: ["5.3K", "Waterproof 10m", "Mounts kit"], cities: "all", color: ["#cffafe", "#a5f3fc"] },
  { id: 11, name: "Canon EOS 200D II DSLR",      cat: "camera",  emoji: "📸", day: 599, week: 3399, month: 9999, deposit: 8000, rating: 4.7, reviews: 109, tag: "", desc: "Beginner-friendly DSLR for portraits, travel and events.", specs: ["24MP", "18-55mm lens", "Bag included"], cities: "all", color: ["#ffedd5", "#fed7aa"] },
  { id: 12, name: "DJI Mini 3 Pro Drone",        cat: "drone",   emoji: "🚁", day: 799, week: 4499, month: 12999, deposit: 12000, rating: 4.9, reviews: 132, tag: "Popular", desc: "Sub-250g foldable drone with 4K HDR video and obstacle sensing.", specs: ["4K/60fps", "34 min flight", "3 batteries"], cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai"], color: ["#e0f2fe", "#7dd3fc"] },
  { id: 13, name: "DJI Air 3 Fly More Combo",    cat: "drone",   emoji: "🛸", day: 1099, week: 6299, month: 17999, deposit: 18000, rating: 4.8, reviews: 61, tag: "Pro", desc: "Dual-camera drone for cinematic shots with long flight time.", specs: ["Dual camera", "46 min flight", "RC 2 remote"], cities: ["Bengaluru", "Mumbai", "Delhi NCR"], color: ["#ccfbf1", "#99f6e4"] },
  { id: 14, name: "MacBook Air M2",              cat: "laptop",  emoji: "💻", day: 599, week: 3299, month: 9499, deposit: 15000, rating: 4.9, reviews: 118, tag: "", desc: "Light, silent and fast. Ideal for editing, coding or travel.", specs: ["8GB / 256GB", "13.6\" display", "Charger"], cities: "all", color: ["#f1f5f9", "#e2e8f0"] },
  { id: 15, name: "Gaming Laptop RTX 4060",      cat: "laptop",  emoji: "🖥️", day: 699, week: 3999, month: 11499, deposit: 15000, rating: 4.7, reviews: 87,  tag: "Hot", desc: "144Hz gaming laptop with an RTX 4060 GPU and 16GB RAM.", specs: ["RTX 4060", "16GB / 512GB", "144Hz"], cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"], color: ["#fae8ff", "#f5d0fe"] },
  { id: 16, name: "Noise-Cancelling Headphones", cat: "audio",   emoji: "🎧", day: 199, week: 1099, month: 3199, deposit: 3000, rating: 4.8, reviews: 154, tag: "", desc: "Premium over-ear headphones with industry-leading noise cancellation.", specs: ["30hr battery", "Bluetooth", "Case"], cities: "all", color: ["#fce7f3", "#fbcfe8"] },
  { id: 17, name: "Portable Bluetooth Party Speaker", cat: "audio", emoji: "🔊", day: 299, week: 1699, month: 4799, deposit: 3500, rating: 4.7, reviews: 99, tag: "Party", desc: "Loud, waterproof speaker with lights. Perfect for trips and gatherings.", specs: ["20hr battery", "IPX7", "Mic input"], cities: "all", color: ["#ffe4e6", "#fecdd3"] },
  { id: 18, name: "Racing Wheel & Pedals Set",   cat: "console", emoji: "🏎️", day: 349, week: 1999, month: 5799, deposit: 5000, rating: 4.6, reviews: 44,  tag: "", desc: "Force-feedback racing wheel with pedals. Works with consoles and PC.", specs: ["Force feedback", "Pedals", "Clamp mount"], cities: ["Bengaluru", "Mumbai", "Delhi NCR", "Pune"], color: ["#fef3c7", "#fde68a"] }
];

window.GL_FAQ = [
  { q: "How does renting work?", a: "Pick a product, choose how many days you need and place the order. We deliver it to your address, and pick it up on your return date." },
  { q: "What is the security deposit?", a: "A fully refundable amount collected with your order. It is returned within 2–3 working days after the item is picked up in good condition." },
  { q: "Is delivery free?", a: "Delivery and pickup are free on orders above ₹999. Smaller orders have a flat ₹99 delivery fee." },
  { q: "Can I extend my rental?", a: "Yes. Message our support team before your return date and we will extend it at the same daily rate." },
  { q: "What if the product gets damaged?", a: "Normal wear is fine. For damage beyond normal use, repair costs are adjusted against the deposit." },
  { q: "Which documents do I need?", a: "A government photo ID and a working phone number are enough for most items. High-value items may need an address proof." }
];
