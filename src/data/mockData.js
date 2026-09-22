// Mock Data for GourmetPulse Restaurant & Management System Demo

export const INITIAL_MENU_ITEMS = [
  {
    id: "dish-1",
    name: "Truffle & Wild Mushroom Tagliatelle",
    category: "Main Course",
    price: 24.99,
    rating: 4.9,
    prepTime: "15 min",
    calories: "620 kcal",
    dietary: ["Veg"],
    isPopular: true,
    isAvailable: true,
    description: "Handcrafted egg tagliatelle tossed in creamy black truffle butter, wild porcini mushrooms, aged Parmigiano-Reggiano, and fresh thyme.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-2",
    name: "Prime Wagyu Gourmet Burger",
    category: "Main Course",
    price: 22.50,
    rating: 4.8,
    prepTime: "12 min",
    calories: "850 kcal",
    dietary: ["Non-Veg"],
    isPopular: true,
    isAvailable: true,
    description: "200g Wagyu beef patty, smoked gouda, caramelised onions, heirloom tomato, truffle aioli served in a toasted brioche bun with rosemary fries.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-3",
    name: "Artisanal Wood-Fired Margherita",
    category: "Gourmet Pizzas",
    price: 18.99,
    rating: 4.9,
    prepTime: "10 min",
    calories: "710 kcal",
    dietary: ["Veg"],
    isPopular: true,
    isAvailable: true,
    description: "San Marzano tomato sauce, fresh Fior di Latte mozzarella, extra virgin olive oil, and sweet basil leaves cooked at 900°F in our oak-fired oven.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-4",
    name: "Charred Tomahawk Ribeye Steak",
    category: "Chef Specials",
    price: 48.00,
    rating: 5.0,
    prepTime: "25 min",
    calories: "980 kcal",
    dietary: ["Non-Veg", "Gluten-Free"],
    isPopular: true,
    isAvailable: true,
    description: "USDA Prime 35-day dry-aged Tomahawk ribeye, seared over Japanese binchotan charcoal, drizzled with chimichurri and garlic herb butter.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-5",
    name: "Omakase Dragon Sushi Roll",
    category: "Starters",
    price: 19.50,
    rating: 4.7,
    prepTime: "15 min",
    calories: "450 kcal",
    dietary: ["Non-Veg"],
    isPopular: false,
    isAvailable: true,
    description: "Tempura king prawn, avocado, cucumber wrapped with flame-seared unagi eel, tobiko caviar, and sweet unagi reduction sauce.",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-6",
    name: "Crispy Birria Beef Tacos",
    category: "Starters",
    price: 16.50,
    rating: 4.8,
    prepTime: "12 min",
    calories: "580 kcal",
    dietary: ["Non-Veg", "Spicy"],
    isPopular: true,
    isAvailable: true,
    description: "Slow-braised shredded beef in guajillo chili broth, dipped tortillas grilled crispy with melted Oaxaca cheese, served with consommé for dipping.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-7",
    name: "Avocado & Burrata Salad Bowl",
    category: "Starters",
    price: 15.99,
    rating: 4.6,
    prepTime: "8 min",
    calories: "390 kcal",
    dietary: ["Veg", "Gluten-Free"],
    isPopular: false,
    isAvailable: true,
    description: "Creamy Puglia burrata, hass avocado, compressed watermelon, organic baby arugula, pine nuts, drizzled with 18-year aged balsamic reduction.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-8",
    name: "Classic Venetian Tiramisu",
    category: "Desserts",
    price: 11.50,
    rating: 4.9,
    prepTime: "5 min",
    calories: "410 kcal",
    dietary: ["Veg"],
    isPopular: true,
    isAvailable: true,
    description: "Savoiardi ladyfingers soaked in dark espresso & dark rum, layered with silky mascarpone cream and dusted with Valrhona cocoa powder.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-9",
    name: "Molten Valrhona Chocolate Lava",
    category: "Desserts",
    price: 12.99,
    rating: 4.9,
    prepTime: "10 min",
    calories: "520 kcal",
    dietary: ["Veg"],
    isPopular: false,
    isAvailable: true,
    description: "Warm dark chocolate cake with a gooey molten center, paired with Madagascar bourbon vanilla bean gelato and raspberry coulis.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "dish-10",
    name: "Smoked Hibiscus & Passionfruit Fizz",
    category: "Drinks",
    price: 9.99,
    rating: 4.8,
    prepTime: "5 min",
    calories: "140 kcal",
    dietary: ["Veg", "Vegan"],
    isPopular: true,
    isAvailable: true,
    description: "Artisanal mocktail crafted with cold-brewed hibiscus tea, fresh passionfruit pulp, lime juice, sparkling botanical water, served over crystal ice.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80"
  }
];

export const INITIAL_TABLES = [
  { id: "T1", name: "Table 01", section: "Main Hall", capacity: 2, status: "Occupied", currentOrder: "ORD-101", waiter: "Marco S." },
  { id: "T2", name: "Table 02", section: "Main Hall", capacity: 4, status: "Available", currentOrder: null, waiter: "Elena R." },
  { id: "T3", name: "Table 03", section: "Main Hall", capacity: 4, status: "Reserved", currentOrder: null, reservedBy: "John Doe (7:30 PM)", waiter: "Marco S." },
  { id: "T4", name: "Table 04", section: "Patio Terrace", capacity: 2, status: "Available", currentOrder: null, waiter: "Elena R." },
  { id: "T5", name: "Table 05", section: "Patio Terrace", capacity: 6, status: "Occupied", currentOrder: "ORD-102", waiter: "Sarah K." },
  { id: "T6", name: "Table 06", section: "VIP Lounge", capacity: 8, status: "Reserved", currentOrder: null, reservedBy: "Corporate Gala (8:00 PM)", waiter: "David P." },
  { id: "T7", name: "Table 07", section: "Romantic Booth", capacity: 2, status: "Available", currentOrder: null, waiter: "David P." },
  { id: "T8", name: "Table 08", section: "Romantic Booth", capacity: 2, status: "Occupied", currentOrder: "ORD-103", waiter: "Sarah K." },
];

export const INITIAL_STAFF = [
  { id: "ST-1", name: "Chef Antoine Laurent", role: "Executive Head Chef", department: "Kitchen", status: "On Shift", avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80", rating: 4.9, activeOrdersCount: 3 },
  { id: "ST-2", name: "Chef Maria Santos", role: "Sous Chef", department: "Kitchen", status: "On Shift", avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80", rating: 4.8, activeOrdersCount: 2 },
  { id: "ST-3", name: "Marco Rossi", role: "Head Sommelier & Waiter", department: "Dining Room", status: "On Shift", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80", rating: 4.9, assignedTables: ["T1", "T3"] },
  { id: "ST-4", name: "Elena Rostova", role: "Senior Floor Waitress", department: "Dining Room", status: "On Shift", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80", rating: 4.7, assignedTables: ["T2", "T4"] },
  { id: "ST-5", name: "Sarah Jenkins", role: "Bar Manager & Mixologist", department: "Bar", status: "On Break", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80", rating: 4.8, assignedTables: ["T5", "T8"] },
  { id: "ST-6", name: "David Park", role: "Restaurant Floor Manager", department: "Management", status: "On Shift", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80", rating: 5.0, assignedTables: ["T6", "T7"] }
];

export const INITIAL_ORDERS = [
  {
    id: "ORD-101",
    tableNo: "Table 01",
    customerName: "Alex Vance",
    type: "Dine-In",
    items: [
      { id: "dish-1", name: "Truffle & Wild Mushroom Tagliatelle", quantity: 1, price: 24.99, notes: "Extra parmesan" },
      { id: "dish-10", name: "Smoked Hibiscus & Passionfruit Fizz", quantity: 2, price: 9.99 }
    ],
    totalAmount: 44.97,
    status: "Preparing", // New, Preparing, Ready, Completed
    createdAt: "10:42 AM",
    paymentStatus: "Paid (Card)",
    chefAssigned: "Chef Antoine Laurent"
  },
  {
    id: "ORD-102",
    tableNo: "Table 05",
    customerName: "Sophia Martinez",
    type: "Dine-In",
    items: [
      { id: "dish-4", name: "Charred Tomahawk Ribeye Steak", quantity: 1, price: 48.00, notes: "Medium Rare" },
      { id: "dish-3", name: "Artisanal Wood-Fired Margherita", quantity: 1, price: 18.99 }
    ],
    totalAmount: 66.99,
    status: "New",
    createdAt: "10:51 AM",
    paymentStatus: "Paid (UPI QR)",
    chefAssigned: "Chef Maria Santos"
  },
  {
    id: "ORD-103",
    tableNo: "Table 08",
    customerName: "Liam Hemsworth",
    type: "Takeaway / Digital",
    items: [
      { id: "dish-2", name: "Prime Wagyu Gourmet Burger", quantity: 2, price: 22.50 },
      { id: "dish-8", name: "Classic Venetian Tiramisu", quantity: 1, price: 11.50 }
    ],
    totalAmount: 56.50,
    status: "Ready",
    createdAt: "10:30 AM",
    paymentStatus: "Paid (Apple Pay)",
    chefAssigned: "Chef Antoine Laurent"
  }
];

export const INITIAL_RESERVATIONS = [
  {
    id: "RES-901",
    name: "Harrison Ford",
    email: "h.ford@example.com",
    phone: "+1 (555) 234-5678",
    guests: 4,
    date: "2026-09-22",
    time: "07:30 PM",
    zone: "Patio Terrace",
    specialRequest: "Anniversary candle setup required",
    status: "Confirmed"
  },
  {
    id: "RES-902",
    name: "Amelia Watson",
    email: "amelia@example.com",
    phone: "+1 (555) 987-6543",
    guests: 2,
    date: "2026-09-22",
    time: "08:15 PM",
    zone: "Romantic Booth",
    specialRequest: "Quiet table preferred",
    status: "Confirmed"
  }
];
