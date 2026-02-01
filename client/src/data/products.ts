import heroImage from "@assets/Hero_Background_Image_1768218982773.webp";
import storyImage from "@assets/Story_Page_Image_1768218982772.webp";
import elixirImage1 from "@assets/9PM_ELIXIR-1_1768053712780.webp";
import elixirImage2 from "@assets/9PM_ELIXIR-3_1768053712781.webp";
import elixirImage3 from "@assets/STILL_ELIXIR_SQUARE_02_2048x2048_727d1231-3503-4b5e-8fdb-34fe_1768053712781.webp";
import elixirImage4 from "@assets/STILL_ELIXIR_SQUARE_05_2048x2048_797b89d5-33ab-4c36-a9ce-10e8_1768053712782.webp";
import rebelImage1 from "@assets/Untitled_design_52_1768055966989.webp";
import rebelImage2 from "@assets/Untitled_design_-_2024-12-31T113526.184_1768055966989.webp";
import rebelImage3 from "@assets/Untitled_design_57_1768055966988.webp";
import rebelImage4 from "@assets/Untitled_design_58_1768055966988.webp";
import blackImage1 from "@assets/9PM-Product-01_1768056559665.webp";
import blackImage2 from "@assets/24_9PM_1768056559666.webp";
import blackImage3 from "@assets/28_9PM_1768056559666.webp";
import blackImage4 from "@assets/03_9PM_1768056579122.webp";
import giftSetImage1 from "@assets/9PMfront_0f7ea5b3-2265-4c9c-b4c4-084c2fec5879_1_1768057063079.webp";
import giftSetImage2 from "@assets/9PMside_7a61d417-7eb4-411d-8f3f-628bef89c32c_1768057063080.webp";
import giftSetImage3 from "@assets/9PMtop_33595370-c99a-410f-a31b-d7c78db87efd_1768057063080.webp";

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
  category: "men" | "women" | "unisex" | "special";
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

const elixirReviews: Review[] = [
  {
    name: "Ahmed Ali",
    rating: 5,
    text: "9PM Elixir ki khushboo zabardast hai. Poora din rehti hai. Afnan ki service bhi behtreen!",
    date: "2 din pehle",
  },
  {
    name: "Imran Khan",
    rating: 5,
    text: "Yeh perfume waqai lajawab hai. 9PM Elixir laganay ke baad har koi poochta hai ke kaun sa perfume hai.",
    date: "5 din pehle",
  },
  {
    name: "Faisal Mahmood",
    rating: 5,
    text: "Order aglay din hi pohanch gaya. 9PM Elixir ki khushboo 10 ghantay se zyada rahi. Bohot khush hoon!",
    date: "1 hafta pehle",
  },
  {
    name: "Bilal Ahmed",
    rating: 5,
    text: "Afnan Perfumes se pehli baar kharida. Packing umda thi aur 9PM Elixir asli hai. Zaroor lein!",
    date: "1 hafta pehle",
  },
  {
    name: "Hassan Raza",
    rating: 5,
    text: "Shaadi par 9PM Elixir lagaya. Sab ne tareef ki. Lasting power zabardast hai.",
    date: "2 haftay pehle",
  },
  {
    name: "Abdullah",
    rating: 5,
    text: "Behtreen khushboo! 9PM Elixir ne meri tawaqaat se barh kar kaam kiya. Shukriya Afnan!",
    date: "2 haftay pehle",
  },
  {
    name: "Muhammad Aslam",
    rating: 5,
    text: "COD suhlat bohot achi hai. 9PM Elixir mehngay perfumes jaisa hai lekin qeemat munasib.",
    date: "3 haftay pehle",
  },
  {
    name: "Tariq Mahmood",
    rating: 5,
    text: "Office mein rozana istemal karta hoon. 9PM Elixir ki compliments bohot milti hain.",
    date: "3 haftay pehle",
  },
  {
    name: "Saad Khan",
    rating: 5,
    text: "Dobara order kar raha hoon. 9PM Elixir meri favourite khushboo ban gayi. Afnan behtreen!",
    date: "1 mahina pehle",
  },
  {
    name: "Aamir Hussain",
    rating: 5,
    text: "Shaam ko lagao toh raat tak rehay. 9PM Elixir ka naam bhi perfect hai!",
    date: "1 mahina pehle",
  },
  {
    name: "Zain ul Abideen",
    rating: 5,
    text: "Lahore mein aglay din delivery mil gayi. 9PM Elixir original hai. Bohot mutmaeen hoon.",
    date: "1 mahina pehle",
  },
  {
    name: "Kamran Akhtar",
    rating: 5,
    text: "Maine kai perfume try kiye lekin 9PM Elixir jaisa koi nahi. Must buy!",
    date: "1 mahina pehle",
  },
];

const rebelReviews: Review[] = [
  {
    name: "Usman Ghani",
    rating: 5,
    text: "9PM Rebel bohot fresh aur young feel deta hai. Fruity notes zabardast hain!",
    date: "3 din pehle",
  },
  {
    name: "Awais Ahmed",
    rating: 5,
    text: "Afnan ki delivery bohot fast hai. 9PM Rebel ki khushboo poore din rehti hai. Highly recommend!",
    date: "4 din pehle",
  },
  {
    name: "Shahzaib Khan",
    rating: 5,
    text: "Office ke liye perfect hai 9PM Rebel. Har koi poochta hai kaun si fragrance lagayi hai.",
    date: "1 hafta pehle",
  },
  {
    name: "Ali Raza",
    rating: 5,
    text: "Pehle 9PM Elixir liya tha, ab 9PM Rebel bhi le liya. Dono kamaal hain!",
    date: "1 hafta pehle",
  },
  {
    name: "Fahad Malik",
    rating: 5,
    text: "9PM Rebel ki apple aur vanilla ki combination lajawab hai. Bohot compliments miltay hain.",
    date: "2 haftay pehle",
  },
  {
    name: "Hamza Shah",
    rating: 5,
    text: "Afnan Perfumes ki quality behtreen hai. 9PM Rebel meri daily wear ban gayi.",
    date: "2 haftay pehle",
  },
  {
    name: "Waqas Ali",
    rating: 5,
    text: "Karachi mein next day delivery mil gayi. 9PM Rebel original hai aur lasting power kamaal.",
    date: "2 haftay pehle",
  },
  {
    name: "Danish Iqbal",
    rating: 5,
    text: "Young aur sophisticated dono ek saath! 9PM Rebel ne impress kar diya.",
    date: "3 haftay pehle",
  },
  {
    name: "Rizwan Ahmed",
    rating: 5,
    text: "COD option bohot achi hai. 9PM Rebel ki qeemat bhi reasonable hai quality ke hisab se.",
    date: "3 haftay pehle",
  },
  {
    name: "Junaid Hassan",
    rating: 5,
    text: "9PM Rebel lagaya dating par, bohot taarif mili. Ab yahi meri signature scent hai!",
    date: "1 mahina pehle",
  },
  {
    name: "Asad Mahmood",
    rating: 5,
    text: "Packing premium thi. 9PM Rebel ki amber aur vanilla base notes zabardast hain.",
    date: "1 mahina pehle",
  },
  {
    name: "Farhan Akram",
    rating: 5,
    text: "Afnan se pehli baar order kiya. 9PM Rebel ne disappoint nahi kiya. 5 star!",
    date: "1 mahina pehle",
  },
];

const blackReviews: Review[] = [
  {
    name: "Nabeel Khan",
    rating: 5,
    text: "9PM Black bohot bold aur masculine hai. Office aur party dono ke liye perfect!",
    date: "2 din pehle",
  },
  {
    name: "Yasir Ali",
    rating: 5,
    text: "Afnan ki service zabardast hai. 9PM Black ki khushboo 8+ ghantay rehti hai. Highly recommend!",
    date: "3 din pehle",
  },
  {
    name: "Adeel Hussain",
    rating: 5,
    text: "9PM Black lagaya interview mein. Confidence level alag hi tha! Behtreen choice.",
    date: "1 hafta pehle",
  },
  {
    name: "Mohsin Raza",
    rating: 5,
    text: "Pehle 9PM Elixir use karta tha, ab 9PM Black bhi le liya. Dono kamaal!",
    date: "1 hafta pehle",
  },
  {
    name: "Shoaib Ahmed",
    rating: 5,
    text: "9PM Black ki bergamot aur pear ki opening bohot refreshing hai. Love it!",
    date: "1 hafta pehle",
  },
  {
    name: "Zahid Mehmood",
    rating: 5,
    text: "Islamabad mein same day delivery mili. 9PM Black original hai. Very happy!",
    date: "2 haftay pehle",
  },
  {
    name: "Rehan Malik",
    rating: 5,
    text: "9PM Black meri wife ko bhi bohot pasand aayi. Ab dono use kartay hain!",
    date: "2 haftay pehle",
  },
  {
    name: "Arshad Iqbal",
    rating: 5,
    text: "COD ki wajah se order karna asaan tha. 9PM Black ki quality top notch hai.",
    date: "2 haftay pehle",
  },
  {
    name: "Sohail Abbas",
    rating: 5,
    text: "9PM Black lagao toh compliments milti rehti hain. Signature scent ban gayi meri.",
    date: "3 haftay pehle",
  },
  {
    name: "Kashif Nadeem",
    rating: 5,
    text: "Packing premium thi, perfume original. 9PM Black mardana khushboo hai!",
    date: "3 haftay pehle",
  },
  {
    name: "Irfan Haider",
    rating: 5,
    text: "9PM Black ki mint aur lavender heart notes lajawab hain. Fresh feel aata hai.",
    date: "1 mahina pehle",
  },
  {
    name: "Nauman Sheikh",
    rating: 5,
    text: "Afnan Perfumes se teen baar order kiya. 9PM Black sab se best hai mere liye!",
    date: "1 mahina pehle",
  },
];

const giftSetReviews: Review[] = [
  {
    name: "Salman Qureshi",
    rating: 5,
    text: "9PM Gift Set behtreen hai! Perfume, deodorant aur shower gel teeno ki quality zabardast.",
    date: "2 din pehle",
  },
  {
    name: "Hamid Raza",
    rating: 5,
    text: "Apne bhai ko birthday par Gift Set diya. Bohot khush hua! Complete package hai.",
    date: "3 din pehle",
  },
  {
    name: "Omer Farooq",
    rating: 5,
    text: "9PM Gift Set mein shower gel bhi lajawab hai. Nahane ke baad khushboo rehti hai!",
    date: "5 din pehle",
  },
  {
    name: "Jawad Ali",
    rating: 5,
    text: "Is qeemat mein teeno products milna kamaal hai. Afnan ki value for money!",
    date: "1 hafta pehle",
  },
  {
    name: "Babar Azam",
    rating: 5,
    text: "Deodorant aur perfume dono lagao toh poora din khushboo rehti hai. Best combo!",
    date: "1 hafta pehle",
  },
  {
    name: "Umar Akmal",
    rating: 5,
    text: "Gift Set ki packing premium hai. Gift ke liye perfect choice. Sab ne tareef ki.",
    date: "1 hafta pehle",
  },
  {
    name: "Shahid Afridi",
    rating: 5,
    text: "9PM Gift Set liya shaadi ki shopping mein. Complete grooming solution mil gaya!",
    date: "2 haftay pehle",
  },
  {
    name: "Wahab Riaz",
    rating: 5,
    text: "Shower gel se perfume aur deodorant ki khushboo aur enhance hoti hai. Smart!",
    date: "2 haftay pehle",
  },
  {
    name: "Azhar Ali",
    rating: 5,
    text: "Afnan ki delivery fast thi. 9PM Gift Set original aur sealed mila. Very happy!",
    date: "2 haftay pehle",
  },
  {
    name: "Sarfraz Ahmed",
    rating: 5,
    text: "Teen products ek saath is price mein! 9PM Gift Set bohot value for money hai.",
    date: "3 haftay pehle",
  },
  {
    name: "Shadab Khan",
    rating: 5,
    text: "Apne liye liya tha lekin itna acha laga ke doston ke liye bhi order kar diya!",
    date: "3 haftay pehle",
  },
  {
    name: "Hasan Ali",
    rating: 5,
    text: "COD se order kiya. 9PM Gift Set exactly pictures jaisa tha. Perfume + deo + gel kamaal!",
    date: "1 mahina pehle",
  },
];

export const products: Product[] = [
  {
    id: "9pm-elixir",
    name: "9PM Elixir",
    subtitle: "Parfum Intense",
    price: 3500,
    image: elixirImage1,
    images: [elixirImage1, elixirImage2, elixirImage3, elixirImage4],
    category: "men",
    size: "100ml",
    notes: {
      top: ["Nutmeg", "Elemi", "Cardamome"],
      heart: ["Pimento", "Lavandin", "Leather"],
      base: ["Ciste", "Labdanum", "Patchouli", "Vanilla"],
    },
    description:
      "9PM Elixir is a captivating symphony of warmth, depth, and refined allure. It opens with a luminous spice that feels both vibrant and mysterious, setting the tone for a fragrance that commands attention. It opens with a warm, spiced brightness that commands attention, unfolding into a smooth, slightly aromatic heart wrapped in a subtle, smoky sophistication. As it settles, rich and creamy undertones emerge, leaving a trail that is deep, sensual, and magnetic. Sophisticated and addictive, this fragrance is crafted for those who move through the evening with effortless confidence, leaving a lasting impression wherever they go.",
    intensity: "intense",
    occasion: ["Evening", "Formal", "Special Events"],
    isBestseller: true,
    reviews: elixirReviews,
  },
  {
    id: "9pm-rebel",
    name: "9PM Rebel",
    subtitle: "Eau de Parfum",
    price: 3199,
    image: rebelImage1,
    images: [rebelImage1, rebelImage2, rebelImage3, rebelImage4],
    category: "men",
    size: "100ml",
    notes: {
      top: ["Bergamot", "Lavandin", "Cinnamon", "Apple"],
      heart: ["Muguet", "Orange Blossom"],
      base: ["Patchouli", "Amber", "Vanilla", "Tonka Bean"],
    },
    description:
      "Indulge in the captivating allure of 9PM Rebel, a fragrance that adds a new dimension to the iconic 9 Collection. This exquisite creation exudes a refined elegance through its premium fruity, woody, and ambary notes, offering a young and sophisticated scent experience.",
    intensity: "moderate",
    occasion: ["Day", "Casual", "Date Night"],
    isNew: true,
    reviews: rebelReviews,
  },
  {
    id: "9pm-black",
    name: "9PM Black",
    subtitle: "Eau de Parfum",
    price: 2999,
    originalPrice: 3599,
    image: blackImage1,
    images: [blackImage1, blackImage2, blackImage3, blackImage4],
    category: "men",
    size: "100ml",
    notes: {
      top: ["Nutmeg", "Elemi", "Cardamome"],
      heart: ["Pimento", "Lavandin", "Leather"],
      base: ["Ciste", "Labdanum", "Patchouli", "Vanilla"],
    },
    description:
      "9PM Black is a bold and provocative men's fragrance that exudes masculinity, sensuality, and sophistication. Perfect for the modern man, this captivating scent opens with refreshing top notes of bergamot and pear, offering a crisp and invigorating introduction. As the fragrance develops, the heart notes of mint, lavender, and cinnamon add depth, complexity, and a touch of spice, creating a dynamic and unique scent profile.\n",
    intensity: "intense",
    occasion: ["Evening", "Business", "Date Night"],
    isBestseller: true,
    reviews: blackReviews,
  },
  {
    id: "9pm-gift-set",
    name: "Gift Set 9PM Homme",
    subtitle: "Gift Set",
    price: 4499,
    image: giftSetImage1,
    images: [giftSetImage1, giftSetImage2, giftSetImage3],
    category: "special",
    size: "Gift Set",
    notes: {
      top: ["Bergamot", "Lavender", "Cinnamon", "Apple"],
      heart: ["Muguet", "Orange Blossom"],
      base: ["Patchouli", "Amber", "Vanilla", "Tonka Bean"],
    },
    description:
      "The 9pm Gift Set, an ensemble featuring a 100ml EDP, 150ml deodorant, and 150ml shower gel. The fragrance opens with bergamot, lavender, cinnamon, and apple, followed by muguet and orange blossom. Base notes of patchouli, amber, vanilla, and tonka bean leave a warm, sophisticated trail. Ideal for those who appreciate refined elegance.\n\n**GIFT SET INCLUDING:**\n• **9 PM 100ML EDP**\n• **DEODORANT 150ML**\n• **SHOWER GEL 150ML**",
    intensity: "moderate",
    occasion: ["Gift", "Special Occasions", "Complete Grooming"],
    isBestseller: true,
    reviews: giftSetReviews,
  },
];

export const collections: Collection[] = [
  {
    id: "men",
    name: "For Him",
    description:
      "Bold, sophisticated fragrances crafted for the modern gentleman",
    image: elixirImage1,
    productCount: products.filter((p) => p.category === "men").length,
  },
  {
    id: "women",
    name: "For Her",
    description: "Elegant, captivating scents that celebrate feminine grace",
    image: rebelImage1,
    productCount: products.filter((p) => p.category === "women").length,
  },
  {
    id: "special",
    name: "Special Occasions",
    description: "Extraordinary fragrances for life's most memorable moments",
    image: giftSetImage1,
    productCount: products.filter((p) => p.category === "special").length,
  },
];

export const featuredProduct = products.find((p) => p.id === "9pm-black")!;
export const bestsellers = products.filter((p) => p.isBestseller);
export const newArrivals = products.filter((p) => p.isNew);
