import heroImage from "@assets/recipe_hero.svg";
import storyImage from "@assets/recipe_story.svg";

import biryaniImage from "@assets/recipe_biryani_kit.svg";
import nihariImage from "@assets/recipe_nihari_kit.svg";
import karahiImage from "@assets/recipe_karahi_kit.svg";
import seekhKebabImage from "@assets/recipe_seekh_kebab_kit.svg";

export const heroImageUrl = heroImage;
export const storyImageUrl = storyImage;

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: "dinner" | "bbq" | "comfort" | "special";
  size: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  description: string;
  intensity: "light" | "moderate" | "intense";
  occasion: string[];
  isNew?: boolean;
  isBestseller?: boolean;
  reviews?: Review[];
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

const reviewsBiryani: Review[] = [
  {
    name: "Ayesha",
    rating: 5,
    text: "Spices bilkul balanced the. Biryani ka taste restaurant jaisa aya!",
    date: "2 din pehle",
  },
  {
    name: "Hamza",
    rating: 5,
    text: "Ingredients portion perfect tha. Time bhi bacha aur taste bhi amazing.",
    date: "1 hafta pehle",
  },
];

const reviewsNihari: Review[] = [
  {
    name: "Sana",
    rating: 5,
    text: "Nihari masala next level! Family ne bohot tareef ki.",
    date: "3 din pehle",
  },
  {
    name: "Bilal",
    rating: 5,
    text: "Step-by-step guide se recipe bohot easy ho gayi. Repeat order pakka.",
    date: "1 hafta pehle",
  },
];

const reviewsKarahi: Review[] = [
  {
    name: "Zain",
    rating: 5,
    text: "Karahi ka color aur smell perfect. No extra shopping needed.",
    date: "4 din pehle",
  },
  {
    name: "Hira",
    rating: 5,
    text: "Fresh ingredients + spice mix. Dinner 30 minutes mein ready!",
    date: "2 haftay pehle",
  },
];

const reviewsKebab: Review[] = [
  {
    name: "Imran",
    rating: 5,
    text: "Seekh kebab juicy bane. Grill par bhi, pan par bhi great result.",
    date: "5 din pehle",
  },
  {
    name: "Mariam",
    rating: 5,
    text: "Kids ko bohot pasand aya. Next time 2 kits order karungi.",
    date: "2 haftay pehle",
  },
];

export const products: Product[] = [
  {
    id: "chicken-biryani-kit",
    name: "Chicken Biryani Kit",
    subtitle: "Complete Recipe Kit",
    price: 2499,
    originalPrice: 2999,
    image: biryaniImage,
    images: [biryaniImage, biryaniImage, biryaniImage, biryaniImage],
    category: "special",
    size: "Serves 3-4",
    notes: {
      top: ["Basmati rice", "Chicken", "Fried onions"],
      heart: ["Biryani spice mix", "Yogurt base", "Fresh herbs"],
      base: ["You add: oil + water", "Optional: potatoes", "Garnish: lemon"],
    },
    description:
      "Everything you need for authentic Chicken Biryani in one kit.\n\nIncludes a balanced biryani spice mix and a simple step-by-step recipe card.\n\nCook a rich, aromatic biryani without last-minute supermarket runs.",
    intensity: "moderate",
    occasion: ["Dinner", "Family", "Weekend"],
    isBestseller: true,
    reviews: reviewsBiryani,
  },
  {
    id: "beef-nihari-kit",
    name: "Beef Nihari Kit",
    subtitle: "Complete Recipe Kit",
    price: 2799,
    originalPrice: 3299,
    image: nihariImage,
    images: [nihariImage, nihariImage, nihariImage, nihariImage],
    category: "comfort",
    size: "Serves 3-4",
    notes: {
      top: ["Nihari masala", "Ginger/garlic pack", "Garnish mix"],
      heart: ["Thickening mix", "Slow-cook guide", "Chili oil tips"],
      base: ["You add: meat + water", "Optional: marrow", "Serve: naan"],
    },
    description:
      "Deep, slow-cooked nihari flavor made easy.\n\nDesigned for home cooks who want the real taste without measuring 15 spices.\n\nFollow the included recipe card to build a rich gravy, perfect for breakfast or dinner.",
    intensity: "intense",
    occasion: ["Weekend", "Guests", "Comfort Food"],
    isNew: true,
    reviews: reviewsNihari,
  },
  {
    id: "chicken-karahi-kit",
    name: "Chicken Karahi Kit",
    subtitle: "Complete Recipe Kit",
    price: 2299,
    originalPrice: 2699,
    image: karahiImage,
    images: [karahiImage, karahiImage, karahiImage, karahiImage],
    category: "dinner",
    size: "Serves 3-4",
    notes: {
      top: ["Karahi spice mix", "Tomato base pack", "Fresh herbs"],
      heart: ["Ginger julienne", "Green chili pack", "Finishing masala"],
      base: ["You add: chicken + oil", "Optional: cream", "Serve: naan/roti"],
    },
    description:
      "A bold, desi karahi that hits the right notes: tomatoes, heat, and that restaurant-style finish.\n\nQuick to cook, easy to repeat, and perfect for dinner nights.",
    intensity: "moderate",
    occasion: ["Dinner", "Quick Meal", "Family"],
    isBestseller: true,
    reviews: reviewsKarahi,
  },
  {
    id: "seekh-kebab-kit",
    name: "Seekh Kebab Kit",
    subtitle: "Complete Recipe Kit",
    price: 1999,
    originalPrice: 2399,
    image: seekhKebabImage,
    images: [seekhKebabImage, seekhKebabImage, seekhKebabImage, seekhKebabImage],
    category: "bbq",
    size: "Makes 10-12 kebabs",
    notes: {
      top: ["Kebab spice blend", "Binder mix", "Skewer tips"],
      heart: ["Marination guide", "Pan/grill instructions", "Charcoal smoke hack"],
      base: ["You add: mince + onion", "Optional: cheese", "Serve: chutney"],
    },
    description:
      "Juicy seekh kebabs with the right spice balance.\n\nCook on pan, grill, or oven. Includes a simple recipe card that helps you nail texture and taste every time.",
    intensity: "light",
    occasion: ["BBQ", "Snacks", "Guests"],
    reviews: reviewsKebab,
  },
];

export const collections: Collection[] = [
  {
    id: "dinner",
    name: "Dinner Favorites",
    description: "Fast, reliable recipes for everyday dinners",
    image: karahiImage,
    productCount: products.filter((p) => p.category === "dinner").length,
  },
  {
    id: "comfort",
    name: "Comfort Food",
    description: "Rich, slow-cooked classics for cozy nights",
    image: nihariImage,
    productCount: products.filter((p) => p.category === "comfort").length,
  },
  {
    id: "bbq",
    name: "BBQ & Snacks",
    description: "Crowd-pleasers for gatherings and chai time",
    image: seekhKebabImage,
    productCount: products.filter((p) => p.category === "bbq").length,
  },
  {
    id: "special",
    name: "Special Occasions",
    description: "Show-stopper dishes for guests and weekends",
    image: biryaniImage,
    productCount: products.filter((p) => p.category === "special").length,
  },
];

export const featuredProduct = products[0]!;
export const bestsellers = products.filter((p) => p.isBestseller);
export const newArrivals = products.filter((p) => p.isNew);
