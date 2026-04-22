// Application Data - UPDATED WITH NEW RESTAURANTS AND MENU ITEMS
const APP_DATA = {
  // Kombolcha Areas
  areas: [
    { id: "borkena", name: "Berbere Wenz", deliveryFee: 25, time: "25-35 min" },
    { id: "tekile", name: "Shisha-Ber", deliveryFee: 30, time: "30-40 min" },
    {
      id: "merkato",
      name: "University Area",
      deliveryFee: 20,
      time: "20-30 min",
    },
    { id: "kebele01", name: "Ketema", deliveryFee: 25, time: "25-35 min" },
    { id: "kebele02", name: "Kebele 02", deliveryFee: 25, time: "25-35 min" },
    { id: "kebele03", name: "Kebele 03", deliveryFee: 25, time: "25-35 min" },
    { id: "kebele04", name: "Kebele 04", deliveryFee: 30, time: "30-40 min" },
    { id: "shewa ber", name: "Kebele 08", deliveryFee: 35, time: "35-45 min" },
    {
      id: "industry",
      name: "Industry Area",
      deliveryFee: 40,
      time: "40-50 min",
    },
    {
      id: "hospital",
      name: "Around Hospital",
      deliveryFee: 25,
      time: "25-35 min",
    },
    {
      id: "university",
      name: "Kombolcha University",
      deliveryFee: 35,
      time: "35-45 min",
    },
  ],

  // NEW RESTAURANTS IN KOMBOLCHA
  restaurants: [
    {
      id: 1,
      name: "ልዑል መኮንን ሆቴል",
      english: "Leul Mekonen Hotel",
      cuisine: ["ethiopian", "breakfast", "international"],
      rating: 4.7,
      deliveryTime: "20-30 min",
      priceRange: "medium",
      image: "kochaEats/images/leul mekonen hotel1.png",
      location: "shishaber",
      open: true,
      minOrder: 120,
      popularItems: ["Doro Wot", "Kitfo", "Pizza"],
    },
    {
      id: 2,
      name: "የጎፍ ቪው ምግብ ቤት",
      english: "Yegof View Restaurant",
      cuisine: ["ethiopian", "international"],
      rating: 4.5,
      deliveryTime: "25-35 min",
      priceRange: "medium",
      image: "kochaEats/images/yegof view hotel.png",
      location: "shewa ber",
      open: true,
      minOrder: 100,
      popularItems: ["Beef Tibs", "Burger", "Shiro"],
    },
    {
      id: 3,
      name: "ሳኒ ሰይድ ሆቴል",
      english: "Sunny Said Hotel",
      cuisine: ["ethiopian", "fasting", "breakfast"],
      rating: 4.3,
      deliveryTime: "30-40 min",
      priceRange: "low",
      image: "kochaEats/images/sunny side hotel.png",
      location: "Shisha-Ber",
      open: true,
      minOrder: 80,
      popularItems: ["Misir Wot", "Ful", "Chechebsa"],
    },
    {
      id: 4,
      name: "ራውዲ መንዲ ምግብ ቤት",
      english: "Rawdi Mendi Restaurant",
      cuisine: ["ethiopian", "international", "fasting"],
      rating: 4.6,
      deliveryTime: "25-35 min",
      priceRange: "medium",
      image: "kochaEats/images/rawdi mendi restaurant.png",
      location: "Berbere Wenz",
      open: true,
      minOrder: 110,
      popularItems: ["Gomen Besiga", "Chicken Shawarma", "Firfir"],
    },
    {
      id: 5,
      name: "ደብል ትሪ ምግብ ቤት",
      english: "Double Tree Restaurant",
      cuisine: ["international", "ethiopian"],
      rating: 4.4,
      deliveryTime: "35-45 min",
      priceRange: "medium",
      image: "kochaEats/images/double tree.png",
      location: "shisha ber",
      open: true,
      minOrder: 150,
      popularItems: ["Cheeseburger", "Spaghetti", "Signature Kocha Bowl"],
    },
    {
      id: 6,
      name: "አል-ርሳላህ ምግብ ቤት",
      english: "Al-Risallah Restaurant",
      cuisine: ["ethiopian", "fasting", "breakfast"],
      rating: 4.8,
      deliveryTime: "20-30 min",
      priceRange: "low",
      image: "kochaEats/images/al-risallah restaurant.png",
      location: "Kebele 03",
      open: true,
      minOrder: 70,
      popularItems: ["Dulet", "Yegeb Alicha", "Falafel"],
    },
  ],

  // UPDATED MENU ITEMS WITH NEW FOOD LIST
  menuItems: [
    // Leul Mekonen Hotel Menu (ID: 1) - 6 items
    {
      id: 101,
      name: "ዶሮ ወጥ",
      english: "Doro Wot",
      description: "ዶሮ በተለያዩ ቅመሞች ተሰርቶ ",
      price: 220,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/ዶሮ ዋት.png",
      restaurantId: 1,
      rating: 4.9,
      timeOfDay: "lunch",
    },
    {
      id: 102,
      name: "ክትፎ",
      english: "Kitfo",
      description: "በቂቤ የተጠበሰ የበሬ ስጋ ከአይብ እና ጎመን ጋር",
      price: 250,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 1,
      rating: 4.8,
      timeOfDay: "lunch",
    },
    {
      id: 103,
      name: "ፒዛ",
      english: "Margherita Pizza",
      description: "ኢጣሊያን ፒዛ በቶማቶ ሶስ እና ሞዛሬላ ቺዝ",
      price: 200,
      category: "alltime",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Margherita Pizza.png",
      restaurantId: 1,
      rating: 4.5,
      timeOfDay: "all",
    },
    {
      id: 104,
      name: "ፉል ፉል መዳመስ",
      english: "Fuul Foul Medames",
      description: "የፋሲዮሉያ እሸት ከበቆሎ እና ከቅመም ጋር",
      price: 60,
      category: "breakfast",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/beyeayinet.jpg",
      restaurantId: 1,
      rating: 4.6,
      timeOfDay: "breakfast",
    },
    {
      id: 105,
      name: "ጨጨብሳ",
      english: "Chechebsa (Kita Firfir)",
      description: "ከጥፍ ዱቂት የሚሰራ በማር የተጣመረ",
      price: 90,
      category: "breakfast",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/chechebsa.jpg",
      restaurantId: 1,
      rating: 4.4,
      timeOfDay: "breakfast",
    },
    {
      id: 106,
      name: "ሳምቡሳ",
      english: "Sambusa (Lentil or Beef)",
      description: "በቂጣ የተሸፈነ ስጋ ወይም እሸት",
      price: 40,
      category: "alltime",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/sandwiches.jpg",
      restaurantId: 1,
      rating: 4.7,
      timeOfDay: "all",
    },

    // Yegof View Restaurant Menu (ID: 2) - 6 items
    {
      id: 201,
      name: "የበሬ ጥብስ",
      english: "Beef Tibs",
      description: "በሽንኩርት እና በቅመም የተጠበሰ የበሬ ስጋ",
      price: 180,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 2,
      rating: 4.7,
      timeOfDay: "lunch",
    },
    {
      id: 202,
      name: "በርገር",
      english: "Classic Cheeseburger & Fries",
      description: "የበሬ ስጋ በርገር ከፍራይድ ድንች ጋር",
      price: 160,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Classic Cheeseburger & Fries.png",
      restaurantId: 2,
      rating: 4.3,
      timeOfDay: "lunch",
    },
    {
      id: 203,
      name: "ሺሮ ወጥ",
      english: "Shiro Wot",
      description: "የካሮት ዱቂት በበርበሬ ሳሙና",
      price: 100,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/shiro beselata.jpg",
      restaurantId: 2,
      rating: 4.6,
      timeOfDay: "lunch",
    },
    {
      id: 204,
      name: "ፋቲራ በማር",
      english: "Fatira with Honey",
      description: "በማር የተጣመረ ፋቲራ",
      price: 70,
      category: "breakfast",
      type: "ethiopian",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/chechebsa.jpg",
      restaurantId: 2,
      rating: 4.5,
      timeOfDay: "breakfast",
    },
    {
      id: 205,
      name: "ሃምበርገር",
      english: "Hamburger (Single/Double)",
      description: "የበሬ ስጋ ሃምበርገር ነጠላ ወይም ድርብ",
      price: 120,
      category: "alltime",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/sandwiches.jpg",
      restaurantId: 2,
      rating: 4.2,
      timeOfDay: "all",
    },
    {
      id: 206,
      name: "ፍርፍር",
      english: "Firfir",
      description: "እንቁላል እና ከእንጀራ",
      price: 80,
      category: "breakfast",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/spacial firfir.jpg",
      restaurantId: 2,
      rating: 4.3,
      timeOfDay: "breakfast",
    },

    // Sunny Said Hotel Menu (ID: 3) - 6 items
    {
      id: 301,
      name: "ምስር ወጥ",
      english: "Misir Wot",
      description: "የቀይ እሸት በበርበሬ ሳሙና",
      price: 110,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/beyaayinet.jpg",
      restaurantId: 3,
      rating: 4.5,
      timeOfDay: "lunch",
    },
    {
      id: 302,
      name: "ፉል እና እንቁላል",
      english: "Ful & Egg Plate",
      description: "ፉል ከተቀቀለ እንቁላል ጋር",
      price: 75,
      category: "breakfast",
      type: "ethiopian",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/beyeayinet.jpg",
      restaurantId: 3,
      rating: 4.6,
      timeOfDay: "breakfast",
    },
    {
      id: 303,
      name: "ጾም ልዩ ኮምቦ",
      english: "Special Fasting Combo",
      description: "የተለያዩ ጾም ምግቦች አንድ ላይ",
      price: 150,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/shiro beselata.jpg",
      restaurantId: 3,
      rating: 4.7,
      timeOfDay: "lunch",
    },
    {
      id: 304,
      name: "የጥብስ እራት ከእንቁላል",
      english: "Breakfast Tibs with Eggs",
      description: "ጥብስ ከእንቁላል ጋር ለእራት",
      price: 140,
      category: "breakfast",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 3,
      rating: 4.4,
      timeOfDay: "breakfast",
    },
    {
      id: 305,
      name: "ፒዛ ቁራጭ",
      english: "Pizza Slice (Pepperoni or Veggie)",
      description: "ፒዛ ቁራጭ ፔፐሮኒ ወይም አትክልት",
      price: 50,
      category: "alltime",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Margherita Pizza.png",
      restaurantId: 3,
      rating: 4.3,
      timeOfDay: "all",
    },
    {
      id: 306,
      name: "ፋላፈል ውራፕ",
      english: "Falafel Wrap",
      description: "ፋላፈል በጥራጣ እንጀራ",
      price: 65,
      category: "alltime",
      type: "international",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/Falafel Plate.png",
      restaurantId: 3,
      rating: 4.5,
      timeOfDay: "all",
    },

    // Rawdi Mendi Restaurant Menu (ID: 4) - 6 items
    {
      id: 401,
      name: "ጎመን በሲጋ",
      english: "Gomen Besiga",
      description: "የካሮት ጎመን ከበሬ ስጋ ጋር",
      price: 170,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 4,
      rating: 4.6,
      timeOfDay: "lunch",
    },
    {
      id: 402,
      name: "የዶሮ ሻውርማ ሳጥን",
      english: "Chicken Shawarma Platter",
      description: "የዶሮ ሻውርማ ከሩዝ እና ሰላጣ ጋር",
      price: 180,
      category: "lunch",
      type: "international",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/Chicken Shawarma Platter.png",
      restaurantId: 4,
      rating: 4.4,
      timeOfDay: "lunch",
    },
    {
      id: 403,
      name: "የበሬ ቁልፍ ወጥ",
      english: "Key Wot (Beef)",
      description: "በበርበሬ የተደረቀ የበሬ ስጋ",
      price: 190,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/ዶሮ ዋት.png",
      restaurantId: 4,
      rating: 4.7,
      timeOfDay: "lunch",
    },
    {
      id: 404,
      name: "የበግ ጥብስ",
      english: "Lamb Tibs",
      description: "በሽንኩርት የተጠበሰ የበግ ስጋ",
      price: 210,
      category: "dinner",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 4,
      rating: 4.8,
      timeOfDay: "dinner",
    },
    {
      id: 405,
      name: "የአትክልት ልዩ ኮምቦ",
      english: "Special Veggie Combo",
      description: "የተለያዩ አትክልት ምግቦች አንድ ላይ",
      price: 130,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/beyaayinet.jpg",
      restaurantId: 4,
      rating: 4.5,
      timeOfDay: "lunch",
    },
    {
      id: 406,
      name: "ፍራይድ ድንች",
      english: "Side of Fries",
      description: "የተጠበሰ ድንች ክርስፕ",
      price: 45,
      category: "alltime",
      type: "international",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/Classic Cheeseburger & Fries.png",
      restaurantId: 4,
      rating: 4.3,
      timeOfDay: "all",
    },

    // Double Tree Restaurant Menu (ID: 5) - 6 items
    {
      id: 501,
      name: "ስፓጌቲ ቦሎኔዝ",
      english: "Spaghetti Bolognese",
      description: "ኢጣሊያን ስፓጌቲ በቶማቶ ሶስ እና ስጋ",
      price: 170,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Spaghetti Bolognese.png",
      restaurantId: 5,
      rating: 4.4,
      timeOfDay: "lunch",
    },
    {
      id: 502,
      name: "ኮቻ ባውል",
      english: "Signature Kocha Bowl",
      description: "የሩዝ ባውል ከተለያዩ ማሰናጃዎች",
      price: 160,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Signature Kocha Bowl.png",
      restaurantId: 5,
      rating: 4.6,
      timeOfDay: "lunch",
    },
    {
      id: 503,
      name: "ክሪስፒ ዶሮ ሳንድዊች",
      english: "Crispy Chicken Sandwich",
      description: "ክሪስፒ ዶሮ ሳንድዊች ከሰላጣ ጋር",
      price: 140,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Crispy Chicken Sandwich.png",
      restaurantId: 5,
      rating: 4.3,
      timeOfDay: "lunch",
    },
    {
      id: 504,
      name: "የበሬ ቡሪቶ ባውል",
      english: "Beef Burrito Bowl",
      description: "የበሬ ቡሪቶ በሩዝ ባውል",
      price: 180,
      category: "lunch",
      type: "international",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/Burrito.png",
      restaurantId: 5,
      rating: 4.5,
      timeOfDay: "lunch",
    },
    {
      id: 505,
      name: "የአትክልት ፓድ ታይ",
      english: "Vegetable Pad Thai",
      description: "ታይላንዳዊ ፓድ ታይ ከአትክልት",
      price: 150,
      category: "dinner",
      type: "international",
      spicy: true,
      fasting: true,
      image: "kochaEats/images/Vegetable Pad Thai.png",
      restaurantId: 5,
      rating: 4.4,
      timeOfDay: "dinner",
    },
    {
      id: 506,
      name: "የሲዛር ሰላጣ",
      english: "Caesar Salad",
      description: "ሮማይን ሰላጣ በሲዛር ድረሲንግ",
      price: 120,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Chher slad.png",
      restaurantId: 5,
      rating: 4.2,
      timeOfDay: "lunch",
    },

    // Al-Risallah Restaurant Menu (ID: 6) - 6 items
    {
      id: 601,
      name: "ዱሌት",
      english: "Dulet",
      description: "በቂብዴ የተጠበሰ ጨድ, ሆድ እና የበሬ ስጋ",
      price: 160,
      category: "lunch",
      type: "ethiopian",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/tibs with atklt.jpg",
      restaurantId: 6,
      rating: 4.7,
      timeOfDay: "lunch",
    },
    {
      id: 602,
      name: "የገብ አልጫ",
      english: "Yegeb Alicha",
      description: "የቢግ እሸት በኩርኩማ ሳሙና",
      price: 100,
      category: "lunch",
      type: "ethiopian",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/beyeayinet.jpg",
      restaurantId: 6,
      rating: 4.4,
      timeOfDay: "lunch",
    },
    {
      id: 603,
      name: "ቢቢኪው ፑልድ ፖርክ ሳንድዊች",
      english: "BBQ Pulled Pork Sandwich",
      description: "ቢቢኪው የተጎተተ የአሳማ ስጋ ሳንድዊች",
      price: 190,
      category: "lunch",
      type: "international",
      spicy: true,
      fasting: false,
      image: "kochaEats/images/BBQ Pulled Pork Sandwich.jpg",
      restaurantId: 6,
      rating: 4.5,
      timeOfDay: "lunch",
    },
    {
      id: 604,
      name: "የሎሚ ዘይት ዶሮ",
      english: "Lemon Herb Roasted Chicken",
      description: "በሎሚ እና በቅመም የተጠበሰ ዶሮ",
      price: 210,
      category: "dinner",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/Lemon Herb Roasted Chicken.png",
      restaurantId: 6,
      rating: 4.6,
      timeOfDay: "dinner",
    },
    {
      id: 605,
      name: "ፋላፈል ሳጥን",
      english: "Falafel Plate",
      description: "ፋላፈል ከሰላጣ እና ሁሙስ ጋር",
      price: 130,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/Falafel Plate.png",
      restaurantId: 6,
      rating: 4.5,
      timeOfDay: "lunch",
    },
    {
      id: 606,
      name: "እንጀራ",
      english: "Injera",
      description: "በማሰሪያ ቤት የተሰራ እንጀራ",
      price: 25,
      category: "alltime",
      type: "ethiopian",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/beyaayinet.jpg",
      restaurantId: 6,
      rating: 4.9,
      timeOfDay: "all",
    },

    // Additional Popular Items from Various Restaurants
    {
      id: 701,
      name: "የሩዝ ከዶሮ ኑድልስ",
      english: "Rice with Chicken Noodles",
      description: "የሩዝ ከዶሮ እና ኑድልስ ጋር",
      price: 140,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/rise with chiknes nooduls.jpg",
      restaurantId: 2,
      rating: 4.3,
      timeOfDay: "lunch",
    },
    {
      id: 702,
      name: "ፓስታ በሶስ",
      english: "Pasta with Sauce",
      description: "ፓስታ በቶማቶ ሶስ",
      price: 120,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: false,
      image: "kochaEats/images/pasta with souse.jpg",
      restaurantId: 5,
      rating: 4.2,
      timeOfDay: "lunch",
    },
    {
      id: 703,
      name: "ኑድልስ ከአትክልት",
      english: "Noodles with Vegetables",
      description: "ኑድልስ ከተለያዩ አትክልቶች ጋር",
      price: 110,
      category: "lunch",
      type: "international",
      spicy: false,
      fasting: true,
      image: "kochaEats/images/nuduls with vegitables.jpg",
      restaurantId: 3,
      rating: 4.1,
      timeOfDay: "lunch",
    },
  ],

  // Coupons & Offers - UPDATED for 2025
  coupons: [
    {
      id: 1,
      code: "KOCHA25",
      description: "25% ቅናሽ በመጀመሪያ ትዕዛዝ",
      discount: 25,
      type: "percentage",
      minOrder: 150,
      expires: "2025-12-31",
      active: true,
    },
    {
      id: 2,
      code: "FASTING60",
      description: "60 ብር ቅናሽ በጾም ምግብ",
      discount: 60,
      type: "fixed",
      minOrder: 200,
      expires: "2025-04-30",
      active: true,
    },
    {
      id: 3,
      code: "WEEKEND35",
      description: "35% ቅናሽ ቅዳሜ እና እሁድ",
      discount: 35,
      type: "percentage",
      minOrder: 250,
      expires: "2025-12-31",
      active: true,
    },
    {
      id: 4,
      code: "LOYAL50",
      description: "50 ብር ቅናሽ ለታማኝ ደንበኞች",
      discount: 50,
      type: "fixed",
      minOrder: 300,
      expires: "2025-06-30",
      active: true,
    },
    {
      id: 5,
      code: "NEWYEAR40",
      description: "40% ቅናሽ ለአዲስ አመት",
      discount: 40,
      type: "percentage",
      minOrder: 180,
      expires: "2025-01-31",
      active: true,
    },
  ],

  // Translations - UPDATED with new role translations
  translations: {
    am: {
      home: "መግቢያ",
      restaurants: "ምግብ ቤቶች",
      menu: "ምግብ ዝርዝር",
      offers: "ማቅረቢያዎች",
      tracking: "መከታተያ",
      support: "ድጋፍ",
      cart: "ጋሪ",
      login: "ግባ",
      register: "ተመዝገቢ",
      search: "ፈልግ",
      viewAll: "ሁሉንም ይመልከቱ",
      addToCart: "ወደ ጋሪ ጨምር",
      orderNow: "አሁን ይዘዙ",
      delivery: "ማድረሻ",
      minutes: "ደቂቃዎች",
      rating: "ደረጃ",
      price: "ዋጋ",
      apply: "አስጠቀም",
      checkout: "ክፍያ",
      subtotal: "ንዑስ ድምር",
      total: "ጠቅላላ",
      continueShopping: "መግዛት ይቀጥሉ",
      proceedToCheckout: "ወደ ክፍያ ይሂዱ",
      couponDiscount: "ኩፖን ቅናሽ",
      deliveryFee: "የማድረሻ ክፍያ",
      selectArea: "አካባቢዎን ይምረጡ",
      searchPlaceholder: "ምግብ ይፈልጉ...",
      all: "ሁሉም",
      ethiopian: "ኢትዮጵያዊ",
      fasting: "ጾም ምግብ",
      international: "ዓለም አቀፍ",
      beverages: "መጠጦች",
      popular: "ታዋቂ",
      breakfastMenu: "እራት ምግብ",
      lunchTime: "ምሳ ምግብ",
      dinnerTime: "ምሽት ምግብ",
      normalTime: "ሁልጊዜ",
      enterCoupon: "ኩፖን ኮድ ያስገቡ",
      activeCoupons: "ንቁ ኩፖኖች",
      liveChat: "የቀጥታ ውይይት",
      startChat: "ውይይት ይጀምሩ",
      orderHistory: "የትዕዛዝ ታሪክ",
      viewHistory: "ይመልከቱ",
      contactUs: "አግኙን",
      callNow: "ይደውሉ",
      online: "ከመስመር ላይ",
      typeMessage: "መልዕክት ይጻፉ...",
      send: "ላክ",
      customerSupport: "የደንበኞች ድጋፍ",
      emailPlaceholder: "ኢሜይል",
      passwordPlaceholder: "የይለፍ ቃል",
      fullName: "ሙሉ ስም",
      phoneNumber: "ስልክ ቁጥር",
      confirmPassword: "የይለፍ ቃል አረጋግጥ",
      rememberMe: "አስታውሰኝ",
      forgotPassword: "የይለፍ ቃል ረሳኽ?",
      or: "ወይም",
      continueWithGoogle: "በGoogle ይቀጥሉ",
      createAccount: "መለያ ይፍጠሩ",
      acceptTerms: "ውሎችን እቀበላለሁ",
      quickLinks: "ፈጣን አገናኞች",
      company: "ኩባንያ",
      aboutUs: "ስለኛ",
      careers: "ስራዎች",
      partners: "አጋሮች",
      privacy: "የግላዊነት ፖሊሲ",
      terms: "ውሎች",
      getOn: "በ Google Play ላይ",
      downloadOn: "በ App Store ላይ",
      heroDesc: "ከኮምቦልቻ ምርጥ ምግብ ቤቶች ወደ ቤትዎ ፈጣን ማድረሻ",
      featuredDesc: "ከኮምቦልቻ ምርጥ ምግብ ቤቶች ይምረጁ",
      menuDesc: "የባህል እና ዘመናዊ ምግቦች",
      offersDesc: "በየቀኑ ልዩ ቅናሾች እና ኩፖኖች",
      trackingDesc: "ትዕዛዝዎን ከመደርደሪያ እስከ ቤትዎ ይከታተሉ",
      noActiveOrder: "ንቁ ትዕዛዝ የለም",
      trackingPlaceholder: "ትዕዛዝ ሲያደርጉ እዚህ የቀጥታ መከታተያ ያገኛሉ",
      startOrdering: "ትዕዛዝ ይጀምሩ",
      paymentDesc: "ኢንተረስት አልባ ክፍያ ዘዴዎች",
      telebirrDesc: "ከመለያዎ በቀጥታ ይክፈሉ",
      cash: "ጥሬ ገንዘብ",
      cashDesc: "ምግብ ሲደርስ ይክፈሉ",
      cbebirrDesc: "ከንግድ ባንክ ሂሳብዎ",
      amoleDesc: "የኢትዮጵያ ዲጂታል ሒሳብ",
      bankTransfer: "ባንክ ማስተላለፍ",
      bankName: "ባንክ",
      accountName: "ሂሳብ ስም",
      accountNumber: "ሂሳብ ቁጥር",
      branch: "ቅርንጫፍ",
      chatDesc: "ከደጋፊዎቻችን ጋር በቀጥታ ይወያዩ",
      historyDesc: "ያለፉትን ትዕዛዞችዎን ይመልከቱ",
      faqDesc: "ተደጋጋሚ ጥያቄዎች",
      openFaq: "ክፈት",
      contactDesc: "በቀጥታ ያነጋግሩን",
      newsletterDesc: "ለአዲስ ቅናሾች እና ማቅረቢያዎች ይመዝገቡ",
      subscribe: "መዝገብ",
      privacyNote: "ኢሜይልዎን ከሌላ ጋር አንጋራም",
      footerTagline: "ኮምቦልቻ ውስጥ ፈጣን እና አስተማማኝ ምግብ አቅራቢ",
      footerAbout: "ከኮምቦልቻ ምርጥ ምግብ ቤቶች ፈጣን ማድረሻ። የተረጋገጠ ጥራት፣ ፈጣን አገልግሎት",
      supportDesc: "ለማንኛውም ጥያቄ ወይም ችግር እንደርሰዎታለን",
      couponHelp: "የኩፖን ኮድዎን ከላይ ያስገቡ ወይም ከታች አንዱን ይምረጡ",
      useCoupon: "ይህን ኩፖን ይጠቀሙ",
      emptyCart: "ጋሪዎ ባዶ ነው",
      allCuisines: "ሁሉም የምግብ ዓይነቶች",
      ethiopianCuisine: "ኢትዮጵያዊ ምግብ",
      fastingFood: "ጾም ምግብ",
      internationalCuisine: "ዓለም አቀፍ ምግብ",
      topRated: "ከፍተኛ ደረጃ",
      fastDelivery: "ፈጣን ማድረሻ",
      lowPrice: "ትንሽ ዋጋ",
      clear: "አጽዳ",
      user: "ተጠቃሚ",
      rider: "ራይደር",
      admin: "አስተዳዳሪ",
      riderLoginDesc: "ምግብ ማድረሻ ራይደሮች ወደ አገልግሎታችን እንኳን በደህና መጡ",
      adminLoginDesc: "የአስተዳደር አስተዳዳሪዎች ለአስተዳዳር ፓነል ይግቡ",
      riderEmail: "ራይደር ኢሜይል",
      riderPassword: "የራይደር የይለፍ ቃል",
      selectVehicle: "ተሽከርካሪ ዓይነት",
      motorcycle: "ሞተርሳይክል",
      bicycle: "ብስክሌት",
      car: "መኪና",
      vehicleNumber: "ተሽከርካሪ ቁጥር",
      riderLogin: "እንደ ራይደር ግባ",
      adminUsername: "የአስተዳዳር መለያ",
      adminPassword: "የአስተዳዳር የይለፍ ቃል",
      adminCode: "አስተዳዳር ኮድ",
      adminLogin: "እንደ አስተዳዳሪ ግባ",
      viewMenu: "ምግብ ዝርዝር ይመልከቱ",
      allMenu: "ሁሉም",
      spicy: "ሃሪ",
      fastingFood: "ጾም",
      breakfast: "እራት",
      lunch: "ምሳ",
      dinner: "ምሽት",
      alltime: "ሁልጊዜ",
      nameValidationError: "ስም ፊደላት፣ ክፍተቶች፣ ሰረዞች እና ነጥቦች ብቻ ሊይዝ ይችላል",
      nameMinLength: "ስም ቢያንስ 2 ቁምፊዎች መሆን አለበት",
      nameMaxLength: "ስም ከ50 ቁምፊዎች ያነሰ መሆን አለበት",
      nameInvalidStart: "ስም በክፍተት ወይም በልዩ ቁምፊዎች መጀመር ወይም መጨረስ አይችልም",
      nameConsecutive: "ስም ተከታታይ ክፍተቶች ወይም ልዩ ቁምፊዎች ሊኖሩት አይችልም",
      nameMustHaveLetter: "ስም ቢያንስ አንድ ፊደል መያዝ አለበት",
      loginToCheckout: "ትዕዛዝዎን ለማጠናቀቅ ይግቡ ወይም ይመዝገቡ። የጋሪ እቃዎችዎ ይቀመጣሉ!",
      logout: "ውጣ",
      cartCleared: "የጋሪ እቃዎች ተጽድተዋል",
      newUserCartCleared: "አዲስ ተጠቃሚ! የጋሪ እቃዎች ተጽድተዋል። እባክዎ እቃዎችን እንደገና ይምረጡ።",
      addItemsToCart: "እባክዎ እቃዎችን ወደ ጋሪ ይጨምሩ።",
    },
    en: {
      home: "Home",
      restaurants: "Restaurants",
      menu: "Menu",
      offers: "Offers",
      tracking: "Tracking",
      support: "Support",
      cart: "Cart",
      login: "Login",
      register: "Register",
      search: "Search",
      viewAll: "View All",
      addToCart: "Add to Cart",
      orderNow: "Order Now",
      delivery: "Delivery",
      minutes: "Minutes",
      rating: "Rating",
      price: "Price",
      apply: "Apply",
      checkout: "Checkout",
      subtotal: "Subtotal",
      total: "Total",
      continueShopping: "Continue Shopping",
      proceedToCheckout: "Proceed to Checkout",
      couponDiscount: "Coupon Discount",
      deliveryFee: "Delivery Fee",
      selectArea: "Select your area",
      searchPlaceholder: "Search for food...",
      all: "All",
      ethiopian: "Ethiopian",
      fasting: "Fasting Food",
      international: "International",
      beverages: "Beverages",
      popular: "Popular",
      breakfastMenu: "Breakfast Menu",
      lunchTime: "Lunch Menu",
      dinnerTime: "Dinner Menu",
      normalTime: "Anytime",
      enterCoupon: "Enter coupon code",
      activeCoupons: "Active Coupons",
      liveChat: "Live Chat",
      startChat: "Start Chat",
      orderHistory: "Order History",
      viewHistory: "View History",
      contactUs: "Contact Us",
      callNow: "Call Now",
      online: "Online",
      typeMessage: "Type a message...",
      send: "Send",
      customerSupport: "Customer Support",
      emailPlaceholder: "Email",
      passwordPlaceholder: "Password",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      confirmPassword: "Confirm Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      or: "Or",
      continueWithGoogle: "Continue with Google",
      createAccount: "Create Account",
      acceptTerms: "I accept terms & conditions",
      quickLinks: "Quick Links",
      company: "Company",
      aboutUs: "About Us",
      careers: "Careers",
      partners: "Partners",
      privacy: "Privacy Policy",
      terms: "Terms",
      getOn: "Get on",
      downloadOn: "Download on",
      heroDesc: "Fast delivery from Kombolcha's best restaurants to your home",
      featuredDesc: "Choose from Kombolcha's top restaurants",
      menuDesc: "Traditional and modern dishes",
      offersDesc: "Daily special discounts & coupons",
      trackingDesc: "Track your order from kitchen to doorstep",
      noActiveOrder: "No active order",
      trackingPlaceholder:
        "When you place an order, live tracking will appear here",
      startOrdering: "Start Ordering",
      paymentDesc: "Interest-free payment methods",
      telebirrDesc: "Pay directly from your account",
      cash: "Cash",
      cashDesc: "Pay when food arrives",
      cbebirrDesc: "From CBE Bank account",
      amoleDesc: "Ethiopian Digital Wallet",
      bankTransfer: "Bank Transfer",
      bankName: "Bank",
      accountName: "Account Name",
      accountNumber: "Account Number",
      branch: "Branch",
      chatDesc: "Chat directly with our support team",
      historyDesc: "View your past orders",
      faqDesc: "Frequently Asked Questions",
      openFaq: "Open FAQ",
      contactDesc: "Contact us directly",
      newsletterDesc: "Subscribe for new discounts and offers",
      subscribe: "Subscribe",
      privacyNote: "We won't share your email with anyone",
      footerTagline: "Fast and reliable food delivery in Kombolcha",
      footerAbout:
        "Fast delivery from Kombolcha's best restaurants. Guaranteed quality, fast service",
      supportDesc: "We're here to help with any questions or issues",
      couponHelp: "Enter your coupon code above or select one below",
      useCoupon: "Use This Coupon",
      emptyCart: "Your cart is empty",
      allCuisines: "All Cuisines",
      ethiopianCuisine: "Ethiopian Food",
      fastingFood: "Fasting Food",
      internationalCuisine: "International Food",
      topRated: "Top Rated",
      fastDelivery: "Fast Delivery",
      lowPrice: "Low Price",
      clear: "Clear",
      user: "User",
      rider: "Rider",
      admin: "Admin",
      riderLoginDesc: "Food delivery riders, welcome to our service",
      adminLoginDesc: "Administrators, login to access admin panel",
      riderEmail: "Rider Email",
      riderPassword: "Rider Password",
      selectVehicle: "Vehicle Type",
      motorcycle: "Motorcycle",
      bicycle: "Bicycle",
      car: "Car",
      vehicleNumber: "Vehicle Number",
      riderLogin: "Login as Rider",
      adminUsername: "Admin Username",
      adminPassword: "Admin Password",
      adminCode: "Admin Code",
      adminLogin: "Login as Admin",
      viewMenu: "View Menu",
      allMenu: "All",
      spicy: "Spicy",
      fastingFood: "Fasting",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      alltime: "Anytime",
      nameValidationError: "Name can only contain letters, spaces, hyphens, apostrophes, and dots",
      nameMinLength: "Name must be at least 2 characters long",
      nameMaxLength: "Name must be less than 50 characters",
      nameInvalidStart: "Name cannot start or end with spaces or special characters",
      nameConsecutive: "Name cannot have consecutive spaces or special characters",
      nameMustHaveLetter: "Name must contain at least one letter",
      loginToCheckout: "Login or register to complete your order. Your cart items will be saved!",
      logout: "Logout",
      cartCleared: "Cart has been cleared",
      newUserCartCleared: "New user detected! Cart cleared. Please add items to cart again.",
      addItemsToCart: "Please add items to your cart.",
    },
  },
};

// ==============================
// Backend Connection Check
// ==============================
function checkBackendConnection() {
  fetch('/api/health-check', {
    method: 'GET',
    timeout: 5000
  })
  .then(response => {
    if (response.ok) {
      console.log('✅ Backend server is running');
      return true;
    } else {
      console.log('❌ Backend server responded with error');
      return false;
    }
  })
  .catch(error => {
    console.log('❌ Backend server is not running');
    showBackendInstructions();
    return false;
  });
}

function showBackendInstructions() {
  // Only show once per session
  if (sessionStorage.getItem('backend_instructions_shown')) {
    return;
  }
  
  sessionStorage.setItem('backend_instructions_shown', 'true');
  
  setTimeout(() => {
    app.showToast("Backend server not running. Using offline mode for demo.", "info");
    
    // Show detailed instructions in console
    console.log(`
🚀 TO START THE BACKEND SERVER:
1. Open terminal/command prompt
2. Navigate to: kochaEats2/backend/
3. Run: npm install (first time only)
4. Run: npm start
5. Server will start on http://localhost:3000
    `);
  }, 2000);
}

// ==============================
// SECURITY HELPER FUNCTIONS
// ==============================

// Full name validation - only letters, spaces, hyphens, and apostrophes
function isValidFullName(name) {
  // Remove extra spaces and trim
  const cleanName = name.trim().replace(/\s+/g, ' ');
  
  // Check minimum length (at least 2 characters)
  if (cleanName.length < 2) {
    return {
      isValid: false,
      message: "Name must be at least 2 characters long"
    };
  }
  
  // Check maximum length
  if (cleanName.length > 50) {
    return {
      isValid: false,
      message: "Name must be less than 50 characters"
    };
  }
  
  // Allow letters (including Amharic), spaces, hyphens, apostrophes, and dots
  const nameRegex = /^[a-zA-Z\u1200-\u137F\s\-'.]+$/;
  
  if (!nameRegex.test(cleanName)) {
    return {
      isValid: false,
      message: "Name can only contain letters, spaces, hyphens, apostrophes, and dots"
    };
  }
  
  // Check that name doesn't start or end with space, hyphen, or apostrophe
  if (/^[\s\-'.]|[\s\-'.]$/.test(cleanName)) {
    return {
      isValid: false,
      message: "Name cannot start or end with spaces or special characters"
    };
  }
  
  // Check for consecutive spaces or special characters
  if (/[\s\-'.]{2,}/.test(cleanName)) {
    return {
      isValid: false,
      message: "Name cannot have consecutive spaces or special characters"
    };
  }
  
  // Check that name has at least one letter
  if (!/[a-zA-Z\u1200-\u137F]/.test(cleanName)) {
    return {
      isValid: false,
      message: "Name must contain at least one letter"
    };
  }
  
  return {
    isValid: true,
    message: "Valid name",
    cleanName: cleanName
  };
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Vehicle number validation
function isValidVehicleNumber(vehicleNumber) {
  const vehicleRegex = /^[A-Z0-9]{1,3}-[A-Z0-9]{4,6}$/i;
  return vehicleRegex.test(vehicleNumber.toUpperCase());
}

// Password strength validation
function isStrongPassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid:
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar,
    requirements: {
      length: password.length >= minLength,
      upperCase: hasUpperCase,
      lowerCase: hasLowerCase,
      numbers: hasNumbers,
      specialChar: hasSpecialChar,
    },
  };
}

// Phone number validation (Ethiopian format)
function isValidPhoneNumber(phone) {
  const phoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

// Generate secure ID
function generateSecureId() {
  return "rider_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// Format vehicle number
function formatVehicleNumber(number) {
  return number.toUpperCase().replace(/\s+/g, "");
}

// Validate phone from email
function validatePhone(email) {
  const prefixes = ["+25191", "+25192", "+25193", "+25194"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000);
  return `${prefix}${randomNumber}`;
}

// ==============================
// Application State Manager
// ==============================
class AppState {
  constructor() {
    this.cart = this.loadFromStorage("cart") || [];
    this.user = this.loadFromStorage("user") || null;
    this.coupon = this.loadFromStorage("coupon") || null;
    this.location = this.loadFromStorage("location") || null;
    this.paymentMethod = this.loadFromStorage("paymentMethod") || "telebirr";
    this.language = this.loadFromStorage("language") || "am";
    this.orders = this.loadFromStorage("orders") || [];
    this.currentOrder = null;
    this.currentRestaurantFilter = "all";
    this.currentMenuFilter = "all";
    this.currentSubCategory = "allMenu";
    this.failedLoginAttempts = this.loadFromStorage("failedLoginAttempts") || 0;
    this.lastFailedLogin = this.loadFromStorage("lastFailedLogin") || null;
  }

  loadFromStorage(key) {
    try {
      const item = localStorage.getItem(`kochaeats_${key}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error("Error loading from storage:", e);
      return null;
    }
  }

  saveToStorage(key, value) {
    try {
      localStorage.setItem(`kochaeats_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to storage:", e);
    }
  }

  saveCart() {
    this.saveToStorage("cart", this.cart);
    this.updateCartUI();
  }

  saveUser() {
    this.saveToStorage("user", this.user);
  }

  addToCart(item, quantity = 1, options = {}) {
    const existingItem = this.cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.options) === JSON.stringify(options)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...item,
        quantity,
        options,
        addedAt: new Date().toISOString(),
      });
    }

    this.saveCart();
    
    // Show different messages based on login status
    if (!this.user) {
      this.showToast(`${item.english} added! Login to view cart and checkout.`, "warning");
    } else {
      this.showToast(`${item.english} added to cart!`, "success");
    }
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
    this.saveCart();
    this.showToast("Item removed from cart", "info");
  }

  updateQuantity(itemId, newQuantity) {
    const item = this.cart.find((item) => item.id === itemId);
    if (item) {
      if (newQuantity < 1) {
        this.removeFromCart(itemId);
      } else {
        item.quantity = newQuantity;
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.coupon = null;
    this.saveCart();
  }

  getCartSubtotal() {
    return this.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getDeliveryFee() {
    if (!this.location) return 25;
    const area = APP_DATA.areas.find((a) => a.id === this.location);
    return area ? area.deliveryFee : 25;
  }

  getCouponDiscount() {
    if (!this.coupon) return 0;

    const subtotal = this.getCartSubtotal();
    if (subtotal < this.coupon.minOrder) return 0;

    if (this.coupon.type === "percentage") {
      return subtotal * (this.coupon.discount / 100);
    } else {
      return this.coupon.discount;
    }
  }

  getCartTotal() {
    const subtotal = this.getCartSubtotal();
    const delivery = this.getDeliveryFee();
    const discount = this.getCouponDiscount();

    return subtotal + delivery - discount;
  }

  applyCoupon(code) {
    const coupon = APP_DATA.coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase() && c.active
    );

    if (!coupon) {
      this.showToast("Invalid coupon code", "error");
      return false;
    }

    if (new Date(coupon.expires) < new Date()) {
      this.showToast("Coupon has expired", "error");
      return false;
    }

    if (this.getCartSubtotal() < coupon.minOrder) {
      this.showToast(
        `Minimum order of ETB ${coupon.minOrder} required`,
        "error"
      );
      return false;
    }

    this.coupon = coupon;
    this.saveToStorage("coupon", coupon);
    this.showToast("Coupon applied successfully!", "success");
    return true;
  }

  removeCoupon() {
    this.coupon = null;
    this.saveToStorage("coupon", null);
    this.showToast("Coupon removed", "info");
  }

  updateCartUI() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById("cartCount");
    if (cartCountElement) {
      cartCountElement.textContent = count;
    }
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : type === "warning"
                ? "exclamation-triangle"
                : "info-circle"
            }"></i>
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        `;

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 5000);

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.remove();
    });
  }

  setLanguage(lang) {
    this.language = lang;
    this.saveToStorage("language", lang);
    this.updateLanguage();
  }

  updateLanguage() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (
        APP_DATA.translations[this.language] &&
        APP_DATA.translations[this.language][key]
      ) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          element.placeholder = APP_DATA.translations[this.language][key];
        } else {
          element.textContent = APP_DATA.translations[this.language][key];
        }
      }
    });

    document.querySelectorAll(".amharic-font").forEach((el) => {
      el.style.display = this.language === "am" ? "block" : "none";
    });
    document.querySelectorAll(".english-text").forEach((el) => {
      el.style.display = this.language === "en" ? "block" : "none";
    });
  }

  isAccountLocked() {
    if (this.lastFailedLogin) {
      const lockTime = new Date(this.lastFailedLogin);
      const now = new Date();
      const diffMinutes = (now - lockTime) / (1000 * 60);

      if (this.failedLoginAttempts >= 5 && diffMinutes < 15) {
        return true;
      }

      if (diffMinutes >= 15) {
        this.failedLoginAttempts = 0;
        this.lastFailedLogin = null;
        this.saveToStorage("failedLoginAttempts", 0);
        this.saveToStorage("lastFailedLogin", null);
      }
    }
    return false;
  }

  recordFailedLogin() {
    this.failedLoginAttempts++;
    this.lastFailedLogin = new Date().toISOString();
    this.saveToStorage("failedLoginAttempts", this.failedLoginAttempts);
    this.saveToStorage("lastFailedLogin", this.lastFailedLogin);
  }

  resetFailedLogins() {
    this.failedLoginAttempts = 0;
    this.lastFailedLogin = null;
    this.saveToStorage("failedLoginAttempts", 0);
    this.saveToStorage("lastFailedLogin", null);
  }
}

// Initialize Application
const app = new AppState();

// ==============================
// ENHANCED FUNCTIONS
// ==============================

// Password strength visual feedback
function updatePasswordStrength(password) {
  const strength = isStrongPassword(password);
  const indicator = document.getElementById("passwordStrength");

  if (!indicator) return;

  let strengthClass = "strength-weak";
  let strengthText = "Weak";

  if (strength.isValid) {
    strengthClass = "strength-strong";
    strengthText = "Strong";
  } else if (
    strength.requirements.length &&
    strength.requirements.upperCase &&
    strength.requirements.lowerCase &&
    strength.requirements.numbers
  ) {
    strengthClass = "strength-good";
    strengthText = "Good";
  } else if (
    strength.requirements.length &&
    strength.requirements.upperCase &&
    strength.requirements.lowerCase
  ) {
    strengthClass = "strength-medium";
    strengthText = "Medium";
  }

  indicator.innerHTML = `
        <div class="password-strength">
            <div class="strength-bar ${strengthClass}"></div>
        </div>
        <span class="strength-text">${strengthText}</span>
    `;
}

// Scroll to top button
function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Image zoom functionality
function initImageZoom() {
  document.addEventListener("click", function (e) {
    const img = e.target.closest(
      ".menu-item-image img, .cart-item-image img, .restaurant-image img"
    );
    if (img && !img.closest(".image-zoom-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "image-zoom-overlay";

      const zoomedImg = document.createElement("img");
      zoomedImg.src = img.src;
      zoomedImg.alt = img.alt;
      zoomedImg.className = "zoomed-image";

      overlay.appendChild(zoomedImg);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => overlay.remove());
    }
  });
}

// Initialize enhancements
function initEnhancements() {
  initScrollToTop();
  initImageZoom();

  // Update password strength in real-time
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach((input) => {
    input.addEventListener("input", function () {
      updatePasswordStrength(this.value);
    });
  });

  // Add real-time name validation
  const nameInput = document.getElementById("registerName");
  if (nameInput) {
    nameInput.addEventListener("input", function () {
      const nameValidation = isValidFullName(this.value);
      
      // Remove existing validation classes
      this.classList.remove("valid", "invalid");
      
      // Remove existing error message
      const existingError = this.parentNode.querySelector(".validation-error");
      if (existingError) {
        existingError.remove();
      }
      
      if (this.value.trim().length > 0) {
        if (nameValidation.isValid) {
          this.classList.add("valid");
          // Update the input value with cleaned name
          if (nameValidation.cleanName !== this.value) {
            this.value = nameValidation.cleanName;
          }
        } else {
          this.classList.add("invalid");
          
          // Add error message
          const errorDiv = document.createElement("div");
          errorDiv.className = "validation-error";
          errorDiv.textContent = nameValidation.message;
          this.parentNode.appendChild(errorDiv);
        }
      }
    });

    // Also validate on blur (when user leaves the field)
    nameInput.addEventListener("blur", function () {
      if (this.value.trim().length > 0) {
        const nameValidation = isValidFullName(this.value);
        if (nameValidation.isValid && nameValidation.cleanName !== this.value) {
          this.value = nameValidation.cleanName;
        }
      }
    });
  }
}

// ==============================
// DOM Ready Initialization
// ==============================
document.addEventListener("DOMContentLoaded", function () {
  // Check backend connection
  checkBackendConnection();
  
  // Initialize all components
  initializeLanguage();
  initializeRestaurants();
  initializeMenuCategories();
  initializeMenu();
  initializeCoupons();
  initializeCart();
  initializeAuth();
  initializeEnhancedAuth();
  initializeAllButtons();
  initializeEventListeners();
  loadRestaurantImages();
  initializeGoogleMap();
  initEnhancements();

  // Update UI
  app.updateCartUI();
  app.updateLanguage();
  
  // Initialize UI state based on login status
  if (app.user) {
    updateUIAfterLogin();
  } else {
    updateUIAfterLogout();
  }
});

// ==============================
// Language System
// ==============================
function initializeLanguage() {
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.dataset.lang;
      langButtons.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      app.setLanguage(lang);
    });
  });

  document
    .querySelector(`.lang-btn[data-lang="${app.language}"]`)
    ?.classList.add("active");
}

// ==============================
// Restaurants System - UPDATED WITH NEW RESTAURANTS
// ==============================
function initializeRestaurants() {
  const grid = document.getElementById("restaurantGrid");
  if (!grid) return;

  grid.innerHTML = APP_DATA.restaurants
    .map(
      (restaurant) => `
        <div class="restaurant-card">
            <div class="restaurant-image">
                <img src="${restaurant.image}" alt="${
        restaurant.english
      }" loading="lazy">
            </div>
            <div class="restaurant-content">
                <h3 class="restaurant-name amharic-font">${restaurant.name}</h3>
                <p class="restaurant-english">${restaurant.english}</p>
                <div class="restaurant-cuisine">
                    <i class="fas fa-utensils"></i>
                    <span>${restaurant.cuisine
                      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
                      .join(", ")}</span>
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-rating">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}</span>
                    </div>
                    <span class="restaurant-delivery">
                        <i class="fas fa-clock"></i>
                        ${restaurant.deliveryTime}
                    </span>
                </div>
                <div class="restaurant-footer">
                    <span class="restaurant-price">Min: ETB ${
                      restaurant.minOrder
                    }</span>
                    <button class="view-menu-btn" data-id="${restaurant.id}">
                        <i class="fas fa-eye"></i>
                        <span data-i18n="viewMenu">View Menu</span>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// ==============================
// Menu Categories System
// ==============================
function initializeMenuCategories() {
  const menuCategories = document.querySelector(".menu-categories");
  if (!menuCategories) return;

  menuCategories.innerHTML = `
    <button class="menu-cat-btn active" data-category="all">
      <i class="fas fa-star"></i>
      <span data-i18n="popular">Popular</span>
    </button>
    <button class="menu-cat-btn" data-category="breakfast">
      <i class="fas fa-egg"></i>
      <span data-i18n="breakfastMenu">Breakfast</span>
    </button>
    <button class="menu-cat-btn" data-category="lunch">
      <i class="fas fa-utensils"></i>
      <span data-i18n="lunchTime">Lunch</span>
    </button>
    <button class="menu-cat-btn" data-category="dinner">
      <i class="fas fa-moon"></i>
      <span data-i18n="dinnerTime">Dinner</span>
    </button>
    <button class="menu-cat-btn" data-category="alltime">
      <i class="fas fa-clock"></i>
      <span data-i18n="normalTime">Anytime</span>
    </button>
  `;

  document.querySelectorAll(".menu-cat-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".menu-cat-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;
      app.currentMenuFilter = category;
      app.currentSubCategory = "allMenu";

      showMenuSubCategories(category);
      filterMenuBySubCategory(category, "allMenu");
      app.showToast(`Showing ${category} items`, "info");
    });
  });
}

// ==============================
// Menu Subcategories
// ==============================
function showMenuSubCategories(category) {
  const menuSection = document.querySelector(".menu-section");
  if (!menuSection) return;

  const existingSubCats = document.querySelector(".menu-subcategories");
  if (existingSubCats) {
    existingSubCats.remove();
  }

  let subcategories = [];

  switch (category) {
    case "all":
      subcategories = [
        { id: "allMenu", icon: "fas fa-utensils", label: "All" },
        { id: "ethiopian", icon: "fas fa-pepper-hot", label: "Ethiopian" },
        { id: "international", icon: "fas fa-globe", label: "International" },
        { id: "spicy", icon: "fas fa-fire", label: "Spicy" },
        { id: "fasting", icon: "fas fa-leaf", label: "Fasting" },
      ];
      break;

    case "breakfast":
      subcategories = [
        { id: "allMenu", icon: "fas fa-utensils", label: "All" },
        { id: "traditional", icon: "fas fa-home", label: "Traditional" },
        { id: "eggs", icon: "fas fa-egg", label: "Eggs & Sides" },
        { id: "beverages", icon: "fas fa-coffee", label: "Beverages" },
      ];
      break;

    case "lunch":
      subcategories = [
        { id: "allMenu", icon: "fas fa-utensils", label: "All" },
        { id: "ethiopian", icon: "fas fa-pepper-hot", label: "Ethiopian" },
        { id: "international", icon: "fas fa-globe", label: "International" },
        { id: "spicy", icon: "fas fa-fire", label: "Spicy" },
        { id: "fasting", icon: "fas fa-leaf", label: "Fasting" },
      ];
      break;

    case "dinner":
      subcategories = [
        { id: "allMenu", icon: "fas fa-utensils", label: "All" },
        { id: "appetizers", icon: "fas fa-share-alt", label: "Appetizers" },
        { id: "stews", icon: "fas fa-utensil-spoon", label: "Stews & Wat" },
        { id: "grilled", icon: "fas fa-fire", label: "Grilled" },
      ];
      break;

    case "alltime":
      subcategories = [
        { id: "allMenu", icon: "fas fa-utensils", label: "All" },
        { id: "quickbites", icon: "fas fa-clock", label: "Quick Bites" },
        { id: "salads", icon: "fas fa-leaf", label: "Salads & Bowls" },
      ];
      break;
  }

  const subCatContainer = document.createElement("div");
  subCatContainer.className = "menu-subcategories";

  subCatContainer.innerHTML = subcategories
    .map(
      (sub) => `
    <button class="menu-subcat-btn ${sub.id === "allMenu" ? "active" : ""}" 
            data-subcategory="${sub.id}">
      <i class="${sub.icon}"></i>
      <span>${sub.label}</span>
    </button>
  `
    )
    .join("");

  const menuCategories = document.querySelector(".menu-categories");
  if (menuCategories) {
    menuCategories.parentNode.insertBefore(
      subCatContainer,
      menuCategories.nextSibling
    );
  }

  document.querySelectorAll(".menu-subcat-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".menu-subcat-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const subCategory = this.dataset.subcategory;
      app.currentSubCategory = subCategory;

      filterMenuBySubCategory(app.currentMenuFilter, subCategory);
      app.showToast(`Showing ${this.textContent.trim()} items`, "info");
    });
  });
}

// ==============================
// Filter menu by subcategory
// ==============================
function filterMenuBySubCategory(category, subCategory) {
  let filteredItems = APP_DATA.menuItems;

  if (category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category);
  }

  if (subCategory !== "allMenu") {
    filteredItems = filteredItems.filter((item) => {
      switch (subCategory) {
        case "ethiopian":
          return item.type === "ethiopian";
        case "international":
          return item.type === "international";
        case "spicy":
          return item.spicy === true;
        case "fasting":
          return item.fasting === true;
        case "traditional":
          return item.category === "breakfast" && item.type === "ethiopian";
        case "eggs":
          const eggTerms = ["egg", "እንቁላል", "eggs", "firfir"];
          return (
            item.category === "breakfast" &&
            eggTerms.some(
              (term) =>
                item.name.toLowerCase().includes(term) ||
                item.english.toLowerCase().includes(term)
            )
          );
        case "beverages":
          const beverageTerms = ["coffee", "tea", "ቡና", "ሻህ", "ሻሂ", "shah"];
          return beverageTerms.some(
            (term) =>
              item.name.toLowerCase().includes(term) ||
              item.english.toLowerCase().includes(term)
          );
        case "appetizers":
          return item.price < 100;
        case "stews":
          const stewTerms = ["wat", "ወጥ", "stew", "soup", "shiro", "ሺሮ"];
          return stewTerms.some(
            (term) =>
              item.name.toLowerCase().includes(term) ||
              item.english.toLowerCase().includes(term)
          );
        case "grilled":
          const grilledTerms = [
            "tibs",
            "ጥብስ",
            "grilled",
            "sautéed",
            "fried",
            "kitfo",
            "ክትፎ",
          ];
          return grilledTerms.some(
            (term) =>
              item.name.toLowerCase().includes(term) ||
              item.english.toLowerCase().includes(term)
          );
        case "quickbites":
          return item.price < 80;
        case "salads":
          const saladTerms = ["salad", "bowl", "gomen", "ጎመን"];
          return saladTerms.some(
            (term) =>
              item.name.toLowerCase().includes(term) ||
              item.english.toLowerCase().includes(term)
          );
        default:
          return true;
      }
    });
  }

  updateFilteredMenuDisplay(filteredItems);
}

// ==============================
// Update filtered menu display
// ==============================
function updateFilteredMenuDisplay(items) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="no-items-message">
        <i class="fas fa-utensils"></i>
        <h4>No menu items found</h4>
        <p>Try selecting a different category</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map(
      (item) => `
        <div class="menu-item">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.english}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'">
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-name amharic-font">${item.name}</h3>
                <p class="menu-item-english">${item.english}</p>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-meta">
                    <span class="menu-item-category">${
                      item.category.charAt(0).toUpperCase() +
                      item.category.slice(1)
                    }</span>
                    ${
                      item.spicy
                        ? '<span class="menu-item-spicy"><i class="fas fa-pepper-hot"></i> <span data-i18n="spicy">Spicy</span></span>'
                        : ""
                    }
                    ${
                      item.fasting
                        ? '<span class="menu-item-fasting"><i class="fas fa-leaf"></i> <span data-i18n="fastingFood">Fasting</span></span>'
                        : ""
                    }
                </div>
                <div class="menu-item-footer">
                    <span class="menu-item-price">ETB ${item.price}</span>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <i class="fas fa-plus"></i>
                        <span data-i18n="addToCart">Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  app.updateLanguage();
}

// ==============================
// Menu System
// ==============================
function initializeMenu() {
  showMenuSubCategories("all");
  filterMenuBySubCategory("all", "allMenu");
}

function updateMenuDisplay(
  restaurantId = null,
  category = "all",
  subCategory = "allMenu"
) {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  let filteredItems = APP_DATA.menuItems;

  if (restaurantId) {
    filteredItems = filteredItems.filter(
      (item) => item.restaurantId === restaurantId
    );
    updateFilteredMenuDisplay(filteredItems);
  } else {
    filterMenuBySubCategory(category, subCategory);
  }
}

// ==============================
// Coupons System
// ==============================
function initializeCoupons() {
  const grid = document.getElementById("couponsGrid");
  if (!grid) return;

  grid.innerHTML = APP_DATA.coupons
    .filter((c) => c.active)
    .map(
      (coupon) => `
        <div class="coupon-card">
            <div class="coupon-code">${coupon.code}</div>
            <p class="coupon-desc">${coupon.description}</p>
            <div class="coupon-details">
                <p><i class="fas fa-tag"></i> ${
                  coupon.type === "percentage"
                    ? `${coupon.discount}% OFF`
                    : `ETB ${coupon.discount} OFF`
                }</p>
                <p><i class="fas fa-calendar"></i> Valid until: ${
                  coupon.expires
                }</p>
                <p><i class="fas fa-shopping-cart"></i> Min order: ETB ${
                  coupon.minOrder
                }</p>
            </div>
            <button class="use-coupon-btn" data-code="${coupon.code}">
                <i class="fas fa-check-circle"></i>
                <span data-i18n="useCoupon">Use This Coupon</span>
            </button>
        </div>
    `
    )
    .join("");
}

// ==============================
// Cart System
// ==============================
function initializeCart() {
  updateCartModal();
}

function updateCartModal() {
  const cartItems = document.getElementById("cartItems");
  const subtotal = document.getElementById("cartSubtotal");
  const delivery = document.getElementById("cartDelivery");
  const discount = document.getElementById("cartDiscount");
  const total = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("proceedCheckout");

  if (!cartItems) return;

  if (app.cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p data-i18n="emptyCart">Your cart is empty</p>
            </div>
        `;
  } else {
    // Add login reminder if user is not logged in
    let loginReminder = "";
    if (!app.user) {
      loginReminder = `
        <div class="login-reminder">
          <div class="alert alert-info">
            <i class="fas fa-info-circle"></i>
            <span data-i18n="loginToCheckout">Login or register to complete your order. Your cart items will be saved!</span>
          </div>
        </div>
      `;
    }

    cartItems.innerHTML = loginReminder + app.cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.english}" 
                         onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop'">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.english}</h4>
                    <p class="cart-item-price">ETB ${item.price} × ${item.quantity}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `
      )
      .join("");
  }

  // Update checkout button text based on login status
  if (checkoutBtn) {
    const btnText = checkoutBtn.querySelector("span");
    const btnIcon = checkoutBtn.querySelector("i");
    
    if (!app.user && app.cart.length > 0) {
      btnIcon.className = "fas fa-sign-in-alt";
      btnText.textContent = app.language === "am" ? "ግባ እና ይዘዙ" : "Login & Order";
      checkoutBtn.classList.add("login-required");
    } else {
      btnIcon.className = "fas fa-credit-card";
      btnText.textContent = app.language === "am" ? "ክፍያ" : "Checkout";
      checkoutBtn.classList.remove("login-required");
    }
  }

  // Update cart button text based on login status
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    const cartText = cartBtn.querySelector(".cart-text");
    if (cartText) {
      // Initially always show "Cart" text, regardless of login status
      cartText.textContent = app.language === "am" ? "ጋሪ" : "Cart";
      cartBtn.classList.remove("login-required");
      
      // Only change to "Login" if user tries to interact with cart while not logged in
      // This will be handled by cart click event listener
    }
  }

  if (subtotal)
    subtotal.textContent = `ETB ${app.getCartSubtotal().toFixed(2)}`;
  if (delivery) delivery.textContent = `ETB ${app.getDeliveryFee().toFixed(2)}`;
  if (discount)
    discount.textContent = `-ETB ${app.getCouponDiscount().toFixed(2)}`;
  if (total) total.textContent = `ETB ${app.getCartTotal().toFixed(2)}`;
}

// ==============================
// Enhanced Auth System
// ==============================
function initializeEnhancedAuth() {
  const roleTabs = document.querySelectorAll(".role-tab");
  const roleForms = document.querySelectorAll(".role-form");

  roleTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const role = this.dataset.role;

      roleTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      roleForms.forEach((form) => {
        form.classList.remove("active");
        if (form.id === `${role}Form`) {
          form.classList.add("active");
        }
      });

      if (role === "user") {
        const loginTab = document.getElementById("loginTab");
        if (loginTab) loginTab.click();
      }
    });
  });

  const submitRiderLogin = document.getElementById("submitRiderLogin");
  if (submitRiderLogin) {
    submitRiderLogin.addEventListener("click", handleRiderLogin);
  }

  const submitAdminLogin = document.getElementById("submitAdminLogin");
  if (submitAdminLogin) {
    submitAdminLogin.addEventListener("click", handleAdminLogin);
  }

  const riderEmail = document.getElementById("riderEmail");
  const riderPassword = document.getElementById("riderPassword");
  const vehicleNumber = document.getElementById("vehicleNumber");

  if (riderEmail) {
    riderEmail.addEventListener("blur", function () {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = "#dc3545";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (vehicleNumber) {
    vehicleNumber.addEventListener("input", function () {
      const value = this.value.toUpperCase();
      if (value && !isValidVehicleNumber(value)) {
        this.style.borderColor = "#dc3545";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (riderPassword) {
    riderPassword.addEventListener("input", function () {
      const strength = isStrongPassword(this.value);
      const strengthIndicator = document.getElementById("passwordStrength");
      if (strengthIndicator) {
        if (this.value.length === 0) {
          strengthIndicator.innerHTML = "";
        } else if (!strength.isValid) {
          strengthIndicator.innerHTML = `
            <small style="color: #dc3545;">
              <i class="fas fa-exclamation-circle"></i> Password must contain:
              ${!strength.requirements.length ? "8+ characters, " : ""}
              ${!strength.requirements.upperCase ? "uppercase, " : ""}
              ${!strength.requirements.lowerCase ? "lowercase, " : ""}
              ${!strength.requirements.numbers ? "numbers, " : ""}
              ${!strength.requirements.specialChar ? "special characters" : ""}
            </small>
          `;
        } else {
          strengthIndicator.innerHTML = `
            <small style="color: #28a745;">
              <i class="fas fa-check-circle"></i> Strong password
            </small>
          `;
        }
      }
    });
  }
}

// ==============================
// RIDER LOGIN HANDLER
// ==============================
function handleRiderLogin() {
  if (app.isAccountLocked()) {
    app.showToast(
      "Account temporarily locked. Try again in 15 minutes.",
      "error"
    );
    return;
  }

  const email = document.getElementById("riderEmail")?.value.trim();
  const password = document.getElementById("riderPassword")?.value;
  const vehicleType = document.getElementById("vehicleType")?.value;
  const vehicleNumber = document.getElementById("vehicleNumber")?.value.trim();

  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address");
  }

  if (!password) {
    errors.push("Password is required");
  } else {
    const strength = isStrongPassword(password);
    if (!strength.isValid) {
      errors.push(
        "Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters"
      );
    }
  }

  if (!vehicleType) {
    errors.push("Please select vehicle type");
  }

  if (!vehicleNumber) {
    errors.push("Vehicle number is required");
  } else if (!isValidVehicleNumber(vehicleNumber)) {
    errors.push(
      "Please enter valid vehicle number (e.g., 3-12345 or AA-12345)"
    );
  }

  if (errors.length > 0) {
    app.showToast(errors.join(", "), "error");
    return;
  }

  const validRiderCodes = [
    "R-1000",
    "R-1001",
    "R-1002",
    "R-1003",
    "R-1004",
    "R-1005",
    "R-1006",
    "R-1007",
    "R-1008",
    "R-1009",
    "R-1010",
    "R-1011",
    "R-1012",
    "R-1013",
    "R-1014",
    "R-1015",
  ];

  const riderCode =
    validRiderCodes[Math.floor(Math.random() * validRiderCodes.length)];
  const riderNames = [
    "Abebe Tesfaye",
    "Mekdes Haile",
    "Solomon Bekele",
    "Yordanos Getachew",
    "Tewodros Mengistu",
    "Hana Assefa",
    "Daniel Girma",
    "Selamawit Mulu",
    "Kebede Worku",
    "Marta Hailu",
    "Samuel Tekle",
    "Mulugeta Abate",
  ];

  const riderName = riderNames[Math.floor(Math.random() * riderNames.length)];

  const formattedVehicleNumber = formatVehicleNumber(vehicleNumber);

  app.user = {
    id: generateSecureId(),
    name: riderName,
    email: email,
    phone: validatePhone(email),
    role: "rider",
    riderCode: riderCode,
    vehicle: {
      type: vehicleType,
      number: formattedVehicleNumber,
      verified: true,
    },
    status: "active",
    joinedDate: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    permissions: ["view_orders", "update_status", "view_earnings"],
    rating: 4.5 + Math.random() * 0.5,
    totalDeliveries: Math.floor(Math.random() * 500) + 50,
    earnings: Math.floor(Math.random() * 50000) + 10000,
  };

  app.resetFailedLogins();
  
  // Clear cart for rider login (riders don't need customer cart items)
  app.clearCart();
  
  app.saveUser();
  app.showToast(
    `Rider login successful! Welcome ${riderName} (${riderCode})`,
    "success"
  );

  closeModal("authModal");

  // Update UI after successful rider login
  updateUIAfterLogin();

  setTimeout(() => {
    app.showToast(
      `Welcome ${app.user.name}! Ready to deliver orders. Rider Code: ${riderCode}`,
      "info"
    );
  }, 1000);
}

// ==============================
// ADMIN LOGIN HANDLER - BASIC VERSION
// ==============================
function handleAdminLogin() {
  // Get form values
  var username = document.getElementById("adminUsername").value;
  var password = document.getElementById("adminPassword").value;
  var adminCode = document.getElementById("adminCode").value;

  // Basic validation
  if (!username) {
    app.showToast("Please enter username", "error");
    return;
  }
  
  if (!password) {
    app.showToast("Please enter password", "error");
    return;
  }
  
  if (!adminCode) {
    app.showToast("Please enter admin code", "error");
    return;
  }

  // Check admin code
  if (adminCode !== "KOCHA2025") {
    app.showToast("Wrong admin code", "error");
    return;
  }

  // Create simple request to backend
  var requestData = {
    email: username,
    password: password
  };

  // Send to backend using basic fetch
  fetch('/api/login-admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    if (data.success) {
      // Login worked - save user info
      app.user = {
        id: data.data.admin_id,
        name: data.data.full_name,
        email: data.data.email,
        phone: data.data.phone,
        role: "admin"
      };

      // Show success message
      app.showToast("Admin login successful!", "success");
      
      // Close login form
      closeModal("authModal");
      
      // Go to admin page
      app.showView("admin");
    } else {
      
      // Login failed - show error
      app.showToast("Login failed: " + data.message, "error");
    }
  })
  .catch(function(error) {
    // Connection error
    app.showToast("Connection error", "error");
  });

}

// ==============================
// LOGOUT HANDLER
// ==============================
function handleLogout() {
  // Confirm logout action
  const confirmLogout = confirm(
    app.language === "am" 
      ? "እርግጠኛ ነዎት መውጣት ይፈልጋሉ?" 
      : "Are you sure you want to logout?"
  );
  
  if (!confirmLogout) {
    return;
  }

  // Clear user data
  app.user = null;
  app.saveUser();
  
  // IMPORTANT: Clear cart when user logs out
  // This ensures the next user starts with a fresh cart
  app.clearCart();
  
  // Clear any sensitive data
  app.saveToStorage("rememberedEmail", null);
  
  // Update UI elements
  updateUIAfterLogout();
  
  // Show success message
  app.showToast(
    app.language === "am" 
      ? "በተሳካ ሁኔታ ወጥተዋል! የጋሪ እቃዎች ተጽድተዋል።" 
      : "Successfully logged out! Cart has been cleared.", 
    "success"
  );
  
  // Close any open modals
  document.querySelectorAll(".modal.show").forEach((modal) => {
    modal.classList.remove("show");
  });
}

function updateUIAfterLogout() {
  // Update auth button to show login
  const authBtn = document.getElementById("authBtn");
  if (authBtn) {
    authBtn.innerHTML = `
      <i class="fas fa-user"></i>
      <span data-i18n="login">${app.language === "am" ? "ግባ/ተመዝገቢ" : "Login/Register"}</span>
    `;
    authBtn.classList.remove("hidden");
    authBtn.classList.add("visible");
  }
  
  // Hide logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.classList.remove("visible");
    logoutBtn.classList.add("hidden");
  }
  
  // Keep cart button showing "Cart" text even after logout
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    const cartText = cartBtn.querySelector(".cart-text");
    if (cartText) {
      // Keep showing "Cart" text, don't change to "Login"
      cartText.textContent = app.language === "am" ? "ጋሪ" : "Cart";
      cartBtn.classList.remove("login-required");
    }
  }
  
  // Update cart modal if open
  updateCartModal();
  
  // Update language for all elements
  app.updateLanguage();
}

function checkAndClearCartForNewUser(newUserId, newUserEmail) {
  // Get the previous user info from localStorage
  const previousUser = app.loadFromStorage("user");
  
  // If there was a previous user and it's different from the new user
  if (previousUser && (previousUser.id !== newUserId || previousUser.email !== newUserEmail)) {
    // Clear the cart for the new user
    app.clearCart();
    
    // Show message about cart clearing using translations
    setTimeout(() => {
      const message = APP_DATA.translations[app.language]?.newUserCartCleared || 
                     "New user detected! Cart cleared. Please add items to cart again.";
      app.showToast(message, "info");
    }, 1500);
    
    return true; // Cart was cleared
  }
  
  return false; // No cart clearing needed
}

function updateUIAfterLogin() {
  // Update auth button to show user name
  const authBtn = document.getElementById("authBtn");
  if (authBtn && app.user) {
    if (app.user.role === "rider") {
      authBtn.innerHTML = `
        <i class="fas fa-motorcycle"></i> 
        <span class="rider-badge">${app.user.name} (Rider)</span>
      `;
    } else if (app.user.role === "admin") {
      authBtn.innerHTML = `
        <i class="fas fa-user-shield"></i> 
        <span class="admin-badge">${app.user.name} (Admin)</span>
      `;
    } else {
      authBtn.innerHTML = `
        <i class="fas fa-user"></i> 
        <span>${app.user.name}</span>
      `;
    }
    authBtn.classList.remove("hidden");
    authBtn.classList.add("visible");
  }
  
  // Show logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.classList.remove("hidden");
    logoutBtn.classList.add("visible");
  }
  
  // Update cart button to show cart
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    const cartText = cartBtn.querySelector(".cart-text");
    if (cartText) {
      cartText.textContent = app.language === "am" ? "ጋሪ" : "Cart";
      cartBtn.classList.remove("login-required");
    }
  }
  
  // Update cart modal
  updateCartModal();
  
  // Update language for all elements
  app.updateLanguage();
}

// ==============================
// CLOSE MODAL HELPER
// ==============================
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("show");
}
 
// ==============================
// USER AUTH SYSTEM
// ==============================
function initializeAuth() {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active");
      registerTab.classList.remove("active");
      loginForm.classList.add("active");
      registerForm.classList.remove("active");
    });

    registerTab.addEventListener("click", () => {
      registerTab.classList.add("active");
      loginTab.classList.remove("active");
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    });
  }

  const submitLogin = document.getElementById("submitLogin");
  if (submitLogin) {
    submitLogin.addEventListener("click", handleLogin);
  }

  const submitRegister = document.getElementById("submitRegister");
  if (submitRegister) {
    submitRegister.addEventListener("click", handleRegister);
  }

  const googleLogin = document.getElementById("googleLogin");
  if (googleLogin) {
    googleLogin.addEventListener("click", () => {
      app.showToast("Google login feature coming soon!", "info");
    });
  }

  const registerEmail = document.getElementById("registerEmail");
  const registerPhone = document.getElementById("registerPhone");
  const registerPassword = document.getElementById("registerPassword");
  const registerConfirm = document.getElementById("registerConfirm");

  if (registerEmail) {
    registerEmail.addEventListener("blur", function () {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = "#dc3545";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (registerPhone) {
    registerPhone.addEventListener("blur", function () {
      if (this.value && !isValidPhoneNumber(this.value)) {
        this.style.borderColor = "#dc3545";
      } else {
        this.style.borderColor = "";
      }
    });
  }

  if (registerPassword) {
    registerPassword.addEventListener("input", function () {
      const strength = isStrongPassword(this.value);
      const passwordStrength = document.getElementById("passwordStrength");
      if (passwordStrength) {
        if (this.value.length === 0) {
          passwordStrength.innerHTML = "";
        } else if (!strength.isValid) {
          let requirements = [];
          if (!strength.requirements.length) requirements.push("8+ characters");
          if (!strength.requirements.upperCase)
            requirements.push("uppercase letter");
          if (!strength.requirements.lowerCase)
            requirements.push("lowercase letter");
          if (!strength.requirements.numbers) requirements.push("number");
          if (!strength.requirements.specialChar)
            requirements.push("special character");

          passwordStrength.innerHTML = `
            <small style="color: #dc3545;">
              <i class="fas fa-exclamation-circle"></i> Needs: ${requirements.join(
                ", "
              )}
            </small>
          `;
        } else {
          passwordStrength.innerHTML = `
            <small style="color: #28a745;">
              <i class="fas fa-check-circle"></i> Strong password
            </small>
          `;
        }
      }
    });
  }

  if (registerConfirm) {
    registerConfirm.addEventListener("input", function () {
      const password = registerPassword?.value;
      const confirm = this.value;

      if (password && confirm && password !== confirm) {
        this.style.borderColor = "#dc3545";
      } else {
        this.style.borderColor = "";
      }
    });
  }
}

function handleLogin() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value;
  const rememberMe = document.getElementById("rememberMe")?.checked;

  // STRICT VALIDATION FOR CHECKOUT ACCESS
  if (!email || !password) {
    app.showToast("Email and password are required for checkout access", "error");
    return;
  }

  if (!isValidEmail(email)) {
    app.showToast("Please enter a valid email address (example@domain.com)", "error");
    return;
  }

  if (password.length < 6) {
    app.showToast("Password must be at least 6 characters long", "error");
    return;
  }

  if (app.isAccountLocked()) {
    app.showToast(
      "Account temporarily locked. Try again in 15 minutes.",
      "error"
    );
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById("submitLogin");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
  submitBtn.disabled = true;

  // 🔥 CONNECT TO BACKEND API
  console.log('📤 Sending login request to backend...');
  
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('📥 Backend response:', data);
    
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    if (data.success) {
      // Login successful - VALIDATE USER DATA
      app.resetFailedLogins();
      
      // Ensure we have complete user data
      if (!data.data.full_name || !data.data.email || !data.data.phone) {
        app.showToast("Incomplete user profile. Please contact support.", "error");
        return;
      }
      
      // Check if this is a different user and clear cart if needed
      const cartCleared = checkAndClearCartForNewUser(data.data.user_id, data.data.email);
      
      app.user = {
        id: data.data.user_id,
        name: data.data.full_name,
        email: data.data.email,
        phone: data.data.phone,
        role: "user",
        verified: true,
        joinedDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        rememberMe: rememberMe,
        totalOrders: Math.floor(Math.random() * 50) + 5,
        totalSpent: Math.floor(Math.random() * 10000) + 1000,
        favoriteRestaurants: APP_DATA.restaurants.slice(0, 3).map((r) => r.id),
      };

      app.saveUser();
      
      // Show appropriate welcome message
      if (cartCleared) {
        app.showToast(`Welcome back ${data.data.full_name}! Cart cleared for new session.`, "success");
      } else {
        app.showToast(`Login successful! Welcome back ${data.data.full_name}!`, "success");
      }

      // Close auth modal
      closeModal("authModal");
      
      // Remove checkout message if it exists
      const checkoutMessage = document.querySelector(".checkout-message");
      if (checkoutMessage) {
        checkoutMessage.remove();
      }
      
      // Validate user information before proceeding
      const userValidation = validateUserForCheckout();
      
      // If user has items in cart and user info is valid, show cart modal
      if (app.cart.length > 0) {
        if (userValidation.isValid) {
          setTimeout(() => {
            document.getElementById("cartModal").classList.add("show");
            updateCartModal();
            app.showToast("Welcome back! Your cart is ready for checkout.", "success");
          }, 500);
        } else {
          setTimeout(() => {
            showLoginRequiredModal();
            app.showToast("Please complete your profile information", "warning");
          }, 500);
        }
      } else {
        // No items in cart, just show success message
        app.showToast("Login successful! You can now add items to cart.", "success");
      }

      if (rememberMe) {
        app.saveToStorage("rememberedEmail", email);
      }

      closeModal("authModal");

      // Update UI after successful login
      updateUIAfterLogin();
    } else {
      // Login failed
      app.recordFailedLogin();
      const attemptsLeft = 5 - app.failedLoginAttempts;

      if (attemptsLeft > 0) {
        app.showToast(`${data.message} ${attemptsLeft} attempts remaining.`, "error");
      } else {
        app.showToast("Account locked for 15 minutes due to multiple failed attempts.", "error");
      }
    }
  })
  .catch(error => {
    console.error('❌ Login error:', error);
    
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // FALLBACK: Check if user exists locally
    console.log('Backend not available, checking local storage...');
    
    // Try to find user in localStorage (for demo purposes)
    const savedUsers = JSON.parse(localStorage.getItem('kochaeats_registered_users') || '[]');
    const foundUser = savedUsers.find(user => user.email === email);
    
    if (foundUser) {
      // User found locally
      app.resetFailedLogins();
      
      // Check if this is a different user and clear cart if needed
      const cartCleared = checkAndClearCartForNewUser(foundUser.id, foundUser.email);
      
      app.user = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: "user",
        verified: false,
        registeredAt: foundUser.registeredAt,
        lastLogin: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        favoriteRestaurants: [],
      };

      app.saveUser();
      
      // Show appropriate welcome message
      if (cartCleared) {
        app.showToast(`Welcome back ${foundUser.name}! Cart cleared for new session.`, "success");
      } else {
        app.showToast(`Login successful! Welcome back ${foundUser.name}!`, "success");
      }

      // Close auth modal
      closeModal("authModal");
      
      // Update UI after successful fallback login
      updateUIAfterLogin();
      
      // Remove checkout message if it exists
      const checkoutMessage = document.querySelector(".checkout-message");
      if (checkoutMessage) {
        checkoutMessage.remove();
      }
      
      // Validate user information before proceeding
      const userValidation = validateUserForCheckout();
      
      // If user has items in cart and user info is valid, show cart modal
      if (app.cart.length > 0) {
        if (userValidation.isValid) {
          setTimeout(() => {
            document.getElementById("cartModal").classList.add("show");
            updateCartModal();
            app.showToast("Welcome back! Your cart is ready for checkout.", "success");
          }, 500);
        } else {
          setTimeout(() => {
            showLoginRequiredModal();
            app.showToast("Please complete your profile information", "warning");
          }, 500);
        }
      } else {
        // No items in cart, just show success message
        app.showToast("Login successful! You can now add items to cart.", "success");
      }

      // Clear form
      document.getElementById("loginEmail").value = "";
      document.getElementById("loginPassword").value = "";
      
    } else {
      // User not found
      app.showToast("User not found. Please register first or check your credentials.", "error");
    }
  });
}

function handleRegister() {
  const name = document.getElementById("registerName")?.value.trim();
  const email = document.getElementById("registerEmail")?.value.trim();
  const phone = document.getElementById("registerPhone")?.value.trim();
  const password = document.getElementById("registerPassword")?.value;
  const confirm = document.getElementById("registerConfirm")?.value;
  const acceptTerms = document.getElementById("acceptTerms")?.checked;

  const errors = [];

  // STRICT VALIDATION FOR CHECKOUT REQUIREMENT
  if (!name || !email || !phone || !password || !confirm) {
    errors.push("All fields are required for checkout access");
  }

  // Validate full name with enhanced checking
  if (name) {
    const nameValidation = isValidFullName(name);
    if (!nameValidation.isValid) {
      errors.push(`Name: ${nameValidation.message}`);
    }
  } else {
    errors.push("Full name is required");
  }

  // Validate email
  if (email) {
    if (!isValidEmail(email)) {
      errors.push("Please enter a valid email address (example@domain.com)");
    }
  } else {
    errors.push("Email address is required");
  }

  // Validate phone with enhanced checking
  if (phone) {
    if (!isValidPhoneNumber(phone)) {
      errors.push("Please enter a valid Ethiopian phone number (+251XXXXXXXXX or 09XXXXXXXX)");
    }
  } else {
    errors.push("Phone number is required");
  }

  // Validate password strength
  if (password) {
    const strength = isStrongPassword(password);
    if (!strength.isValid) {
      errors.push("Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters");
    }
  } else {
    errors.push("Password is required");
  }

  // Validate password confirmation
  if (password && confirm) {
    if (password !== confirm) {
      errors.push("Passwords do not match");
    }
  } else if (!confirm) {
    errors.push("Password confirmation is required");
  }

  // Validate terms acceptance
  if (!acceptTerms) {
    errors.push("Please accept terms & conditions to proceed");
  }

  // Show errors if any
  if (errors.length > 0) {
    app.showToast(errors.join(". "), "error");
    return;
  }

  // Use cleaned name for registration
  const nameValidation = isValidFullName(name);
  const cleanedName = nameValidation.cleanName || name;

  // Show loading state
  const submitBtn = document.getElementById("submitRegister");
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
  submitBtn.disabled = true;

  //  CONNECT TO BACKEND API
  console.log(' Sending registration request to backend...');
  
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      full_name: cleanedName,
      email: email,
      phone: phone,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(' Backend response:', data);
    
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    if (data.success) {
      // Registration successful - VALIDATE USER DATA
      if (!data.data.full_name || !data.data.email) {
        app.showToast("Registration failed. Incomplete user data.", "error");
        return;
      }
      
      // Clear cart for new user registration
      app.clearCart();
      
      app.user = {
        id: data.data.user_id,
        name: data.data.full_name,
        email: data.data.email,
        phone: phone,
        role: "user",
        verified: false,
        registeredAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        favoriteRestaurants: [],
      };

      app.saveUser();
      app.showToast("Registration successful! Welcome to KochaEats! Please add items to your cart.", "success");

      // Close auth modal
      closeModal("authModal");
      
      // Remove checkout message if it exists
      const checkoutMessage = document.querySelector(".checkout-message");
      if (checkoutMessage) {
        checkoutMessage.remove();
      }
      
      // Validate user information before proceeding
      const userValidation = validateUserForCheckout();
      
      // If user has items in cart and user info is valid, show cart modal
      if (app.cart.length > 0) {
        if (userValidation.isValid) {
          setTimeout(() => {
            document.getElementById("cartModal").classList.add("show");
            updateCartModal();
            app.showToast("Welcome! Your cart is ready for checkout.", "success");
          }, 500);
        } else {
          setTimeout(() => {
            showLoginRequiredModal();
            app.showToast("Please complete your profile information", "warning");
          }, 500);
        }
      } else {
        // No items in cart, just show success message
        app.showToast("Registration successful! You can now add items to cart.", "success");
      }

      // Clear form
      document.getElementById("registerName").value = "";
      document.getElementById("registerEmail").value = "";
      document.getElementById("registerPhone").value = "";
      document.getElementById("registerPassword").value = "";
      document.getElementById("registerConfirm").value = "";
      document.getElementById("acceptTerms").checked = false;

      closeModal("authModal");

      // Update UI after successful registration
      updateUIAfterLogin();

      setTimeout(() => {
        app.showToast("Welcome email sent! Please verify your account.", "info");
      }, 1500);
    } else {
      // Registration failed
      app.showToast(data.message, "error");
    }
  })
  .catch(error => {
    console.error(' Registration error:', error);
    
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // FALLBACK: Create user locally when backend is not available
    console.log('Backend not available, creating user locally...');
    
    // Clear cart for new user registration
    app.clearCart();
    
    app.user = {
      id: Date.now(), // Use timestamp as ID
      name: cleanedName,
      email: email,
      phone: phone,
      role: "user",
      verified: false,
      registeredAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      favoriteRestaurants: [],
    };

    app.saveUser();
    app.showToast("Registration successful! Welcome to KochaEats! Please add items to your cart.", "success");

    // Save user to local registry for login fallback
    const savedUsers = JSON.parse(localStorage.getItem('kochaeats_registered_users') || '[]');
    savedUsers.push({
      id: app.user.id,
      name: app.user.name,
      email: app.user.email,
      phone: app.user.phone,
      registeredAt: app.user.registeredAt
    });
    localStorage.setItem('kochaeats_registered_users', JSON.stringify(savedUsers));

    // Close auth modal
    closeModal("authModal");
    
    // Update UI after successful fallback registration
    updateUIAfterLogin();
    
    // Remove checkout message if it exists
    const checkoutMessage = document.querySelector(".checkout-message");
    if (checkoutMessage) {
      checkoutMessage.remove();
    }
    
    // Validate user information before proceeding
    const userValidation = validateUserForCheckout();
    
    // If user has items in cart and user info is valid, show cart modal
    if (app.cart.length > 0) {
      if (userValidation.isValid) {
        setTimeout(() => {
          document.getElementById("cartModal").classList.add("show");
          updateCartModal();
          app.showToast("Welcome! Your cart is ready for checkout.", "success");
        }, 500);
      } else {
        setTimeout(() => {
          showLoginRequiredModal();
          app.showToast("Please complete your profile information", "warning");
        }, 500);
      }
    } else {
      // No items in cart, just show success message
      app.showToast("Registration successful! You can now add items to cart.", "success");
    }

    // Clear form
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPhone").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("registerConfirm").value = "";
    document.getElementById("acceptTerms").checked = false;
  });
}

// ==============================
// Initialize All Interactive Buttons
// ==============================
function initializeAllButtons() {
  const clearFiltersBtn = document.getElementById("clearFilters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function () {
      const cuisineFilter = document.getElementById("cuisineFilter");
      const sortFilter = document.getElementById("sortFilter");

      if (cuisineFilter) cuisineFilter.value = "";
      if (sortFilter) sortFilter.value = "rating";

      app.currentRestaurantFilter = "all";
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.classList.remove("active");
        if (btn.dataset.category === "all") {
          btn.classList.add("active");
        }
      });

      initializeRestaurants();
      app.showToast("Filters cleared successfully", "success");
    });
  }

  const viewAllRestaurantsBtn = document.getElementById("viewAllRestaurants");
  if (viewAllRestaurantsBtn) {
    viewAllRestaurantsBtn.addEventListener("click", function () {
      document
        .getElementById("restaurants")
        .scrollIntoView({ behavior: "smooth" });
      app.showToast("Viewing all restaurants", "info");
    });
  }

  const viewHistoryBtn = document.getElementById("viewHistoryBtn");
  if (viewHistoryBtn) {
    viewHistoryBtn.addEventListener("click", function () {
      if (app.orders.length === 0) {
        app.showToast("No order history found", "info");
        return;
      }

      const modal = document.createElement("div");
      modal.className = "modal show";
      modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="amharic-font">የትዕዛዝ ታሪክ</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="order-history">
              ${app.orders
                .map(
                  (order) => `
                <div class="order-history-item ${order.status}">
                  <div class="order-header">
                    <div>
                      <strong>Order #${order.id}</strong>
                      <span class="order-date">${new Date(
                        order.createdAt
                      ).toLocaleDateString()}</span>
                    </div>
                    <span class="order-status ${order.status}">${
                    order.status
                  }</span>
                  </div>
                  <div class="order-details">
                    <p>Items: ${order.items.length}</p>
                    <p>Total: ETB ${order.total.toFixed(2)}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      modal
        .querySelector(".close-modal")
        .addEventListener("click", () => modal.remove());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  }

  const openFaqBtn = document.getElementById("openFaqBtn");
  if (openFaqBtn) {
    openFaqBtn.addEventListener("click", function () {
      const modal = document.createElement("div");
      modal.className = "modal show";
      modal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-header">
            <h3 class="amharic-font">ተደጋጋሚ ጥያቄዎች (FAQ)</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="faq-list">
              <div class="faq-item">
                <h4>ምግብ እንዴት እዘዝ ይቻላል?</h4>
                <p>አካባቢዎን ይምረጡ፣ ምግብ ይፈልጉ እና ወደ ጋሪ ያክሉ።</p>
              </div>
              <div class="faq-item">
                <h4>የማድረሻ ክፍያ ስንት ነው?</h4>
                <p>ETB 20-40 የሚደርስ በአካባቢዎ ላይ የተመሰረተ ነው።</p>
              </div>
              <div class="faq-item">
                <h4>ክፍያ እንዴት ይደረጋል?</h4>
                <p>TeleBirr፣ ጥሬ ገንዘብ፣ CBE Birr፣ Amole።</p>
              </div>
              <div class="faq-item">
                <h4>ምግብ እስከ መቼ ማድረስ ይችላሉ?</h4>
                <p>ከጠዋት 6:00 እስከ ሌሊት 11:00 ድረስ እያለም እንሰራለን።</p>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      modal
        .querySelector(".close-modal")
        .addEventListener("click", () => modal.remove());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
    });
  }

  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const platform = this.querySelector(".fab").className.split("-")[1];
      app.showToast(`Following us on ${platform}`, "info");
    });
  });

  document.querySelectorAll(".app-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      app.showToast("App download coming soon!", "info");
    });
  });

  document.querySelectorAll(".footer-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  document
    .querySelectorAll('.footer-col .footer-links a[href="#"]')
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const text = this.textContent;
        app.showToast(`${text} page - Coming Soon!`, "info");
      });
    });
}

// ==============================
// Event Listeners
// ==============================
function initializeEventListeners() {
  console.log("Initializing event listeners...");

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mainNav = document.getElementById("mainNav");

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");

  if (cartBtn && cartModal) {
    console.log("Cart button found, adding event listener...");
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Cart button clicked!");
      
      // REQUIRE LOGIN BEFORE SHOWING CART
      if (!app.user || !app.user.name || !app.user.email || !app.user.phone) {
        app.showToast("Please login to view your cart", "error");
        
        // Show login required modal instead of cart
        showLoginRequiredModal();
        return;
      }

      // Additional validation for user information completeness
      const userValidation = validateUserForCheckout();
      if (!userValidation.isValid) {
        app.showToast("Please complete your profile to access cart", "error");
        showLoginRequiredModal();
        return;
      }
      
      // If user is valid, show cart
      updateCartModal();
      cartModal.classList.add("show");
    });
  } else {
    console.error("Cart button or modal not found!");
  }

  const authBtn = document.getElementById("authBtn");
  const authModal = document.getElementById("authModal");

  if (authBtn && authModal) {
    console.log("Auth button found, adding event listener...");
    authBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Auth button clicked!");
      authModal.classList.add("show");
    });
  } else {
    console.error("Auth button or modal not found!");
  }

  // Logout button event listener
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    console.log("Logout button found, adding event listener...");
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Logout button clicked!");
      handleLogout();
    });
  } else {
    console.error("Logout button not found!");
  }

  const locationSelect = document.getElementById("locationSelect");
  if (locationSelect) {
    locationSelect.addEventListener("change", function () {
      app.location = this.value;
      app.saveToStorage("location", app.location);
      const area = APP_DATA.areas.find((a) => a.id === app.location);
      if (area) {
        app.showToast(
          `Delivery to ${area.name}: ETB ${area.deliveryFee}, ${area.time}`,
          "info"
        );
      }
    });
  }

  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".category-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;
      app.currentRestaurantFilter = category;
      filterRestaurantsByCategory(category);
    });
  });

  document.addEventListener("click", function (e) {
    const addBtn = e.target.closest(".add-to-cart-btn");
    if (addBtn) {
      const itemId = parseInt(addBtn.dataset.id);
      const item = APP_DATA.menuItems.find((item) => item.id === itemId);
      if (item) {
        app.addToCart(item);
        updateCartModal();
      }
    }

    const couponBtn = e.target.closest(".use-coupon-btn");
    if (couponBtn) {
      const code = couponBtn.dataset.code;
      document.getElementById("couponInput").value = code;
      applyCoupon();
    }

    const viewMenuBtn = e.target.closest(".view-menu-btn");
    if (viewMenuBtn) {
      const restaurantId = parseInt(viewMenuBtn.dataset.id);
      const restaurant = APP_DATA.restaurants.find(
        (r) => r.id === restaurantId
      );
      if (restaurant) {
        const restaurantMenu = APP_DATA.menuItems
          .filter((item) => item.restaurantId === restaurantId)
          .slice(0, 4);

        const grid = document.getElementById("menuGrid");
        if (grid) {
          grid.innerHTML = restaurantMenu
            .map(
              (item) => `
                <div class="menu-item">
                    <div class="menu-item-image">
                        <img src="${item.image}" alt="${
                item.english
              }" loading="lazy"
                             onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'">
                    </div>
                    <div class="menu-item-content">
                        <h3 class="menu-item-name amharic-font">${
                          item.name
                        }</h3>
                        <p class="menu-item-english">${item.english}</p>
                        <p class="menu-item-desc">${item.description}</p>
                        <div class="menu-item-meta">
                            <span class="menu-item-category">${
                              item.category.charAt(0).toUpperCase() +
                              item.category.slice(1)
                            }</span>
                            ${
                              item.spicy
                                ? '<span class="menu-item-spicy"><i class="fas fa-pepper-hot"></i> Spicy</span>'
                                : ""
                            }
                            ${
                              item.fasting
                                ? '<span class="menu-item-fasting"><i class="fas fa-leaf"></i> Fasting</span>'
                                : ""
                            }
                        </div>
                        <div class="menu-item-footer">
                            <span class="menu-item-price">ETB ${
                              item.price
                            }</span>
                            <button class="add-to-cart-btn" data-id="${
                              item.id
                            }">
                                <i class="fas fa-plus"></i>
                                <span data-i18n="addToCart">Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            `
            )
            .join("");

          app.showToast(`Showing menu from ${restaurant.english}`, "info");
          document
            .getElementById("menu")
            .scrollIntoView({ behavior: "smooth" });

          document.querySelectorAll(".menu-cat-btn").forEach((btn) => {
            btn.classList.remove("active");
            if (btn.dataset.category === "all") {
              btn.classList.add("active");
            }
          });

          showMenuSubCategories("all");
        }
      }
    }

    const minusBtn = e.target.closest(".quantity-btn.minus");
    if (minusBtn) {
      const itemId = parseInt(minusBtn.dataset.id);
      const item = app.cart.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        app.updateQuantity(itemId, item.quantity - 1);
        updateCartModal();
      } else if (item) {
        app.removeFromCart(itemId);
        updateCartModal();
      }
    }

    const plusBtn = e.target.closest(".quantity-btn.plus");
    if (plusBtn) {
      const itemId = parseInt(plusBtn.dataset.id);
      app.updateQuantity(
        itemId,
        app.cart.find((item) => item.id === itemId).quantity + 1
      );
      updateCartModal();
    }

    const removeBtn = e.target.closest(".remove-btn");
    if (removeBtn) {
      const itemId = parseInt(removeBtn.dataset.id);
      app.removeFromCart(itemId);
      updateCartModal();
    }
  });

  const applyCouponBtn = document.getElementById("applyCouponBtn");
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", applyCoupon);
  }

  document.querySelectorAll(".payment-method-card").forEach((card) => {
    card.addEventListener("click", function () {
      document
        .querySelectorAll(".payment-method-card")
        .forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      app.paymentMethod = this.dataset.method;
      app.saveToStorage("paymentMethod", app.paymentMethod);
    });
  });

  const proceedCheckout = document.getElementById("proceedCheckout");
  if (proceedCheckout) {
    proceedCheckout.addEventListener("click", handleCheckout);
  }

  const continueShopping = document.getElementById("continueShopping");
  if (continueShopping) {
    continueShopping.addEventListener("click", () => closeModal("cartModal"));
  }

  const startOrderBtn = document.getElementById("startOrderBtn");
  if (startOrderBtn) {
    startOrderBtn.addEventListener("click", () => {
      document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });
  }

  const startChatBtn = document.getElementById("startChatBtn");
  if (startChatBtn) {
    startChatBtn.addEventListener("click", () => {
      openChatModal();
    });
  }

  const contactBtn = document.getElementById("contactBtn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      window.location.href = "tel:+251912345678";
    });
  }

  const subscribeBtn = document.getElementById("subscribeBtn");
  if (subscribeBtn) {
    subscribeBtn.addEventListener("click", () => {
      const email = document.getElementById("newsletterEmail")?.value;
      if (email && email.includes("@")) {
        app.showToast("Thank you for subscribing!", "success");
        document.getElementById("newsletterEmail").value = "";
      } else {
        app.showToast("Please enter a valid email", "error");
      }
    });
  }

  document.querySelectorAll(".close-modal").forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) modal.classList.remove("show");
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("show");
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.show").forEach((modal) => {
        modal.classList.remove("show");
      });
    }
  });

  console.log("Event listeners initialized!");
}

// ==============================
// Filter Functions
// ==============================
function filterRestaurantsByCategory(category) {
  const grid = document.getElementById("restaurantGrid");
  if (!grid) return;

  let filteredRestaurants = APP_DATA.restaurants;

  if (category !== "all") {
    filteredRestaurants = APP_DATA.restaurants.filter((restaurant) =>
      restaurant.cuisine.includes(category)
    );
  }

  grid.innerHTML = filteredRestaurants
    .map(
      (restaurant) => `
        <div class="restaurant-card">
            <div class="restaurant-image">
                <img src="${restaurant.image}" alt="${
        restaurant.english
      }" loading="lazy" 
                     onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'">
            </div>
            <div class="restaurant-content">
                <h3 class="restaurant-name amharic-font">${restaurant.name}</h3>
                <p class="restaurant-english">${restaurant.english}</p>
                <div class="restaurant-cuisine">
                    <i class="fas fa-utensils"></i>
                    <span>${restaurant.cuisine
                      .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
                      .join(", ")}</span>
                </div>
                <div class="restaurant-info">
                    <div class="restaurant-rating">
                        <i class="fas fa-star"></i>
                        <span>${restaurant.rating}</span>
                    </div>
                    <span class="restaurant-delivery">
                        <i class="fas fa-clock"></i>
                        ${restaurant.deliveryTime}
                    </span>
                </div>
                <div class="restaurant-footer">
                    <span class="restaurant-price">Min: ETB ${
                      restaurant.minOrder
                    }</span>
                    <button class="view-menu-btn" data-id="${restaurant.id}">
                        <i class="fas fa-eye"></i>
                        <span data-i18n="viewMenu">View Menu</span>
                    </button>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  app.showToast(
    `Showing ${category === "all" ? "all" : category} restaurants`,
    "info"
  );
}

// ==============================
// Search Functionality
// ==============================
function performSearch() {
  const query = document.getElementById("searchInput")?.value.toLowerCase();
  if (!query) return;

  const results = APP_DATA.menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.english.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  if (results.length > 0) {
    app.showToast(`Found ${results.length} items for "${query}"`, "info");

    updateFilteredMenuDisplay(results);
    document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
  } else {
    app.showToast("No results found", "info");
  }
}

// ==============================
// Coupon Functions
// ==============================
function applyCoupon() {
  const codeInput = document.getElementById("couponInput");
  const code = codeInput?.value.trim();

  if (!code) {
    app.showToast("Please enter a coupon code", "error");
    return;
  }

  if (app.applyCoupon(code)) {
    updateCartModal();
    codeInput.value = "";
  }
}

// ==============================
// Modal Functions
// ==============================
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("show");
}

// ==============================
// Checkout Functions
// ==============================
function handleCheckout() {
  if (app.cart.length === 0) {
    app.showToast("Your cart is empty", "error");
    return;
  }

  // STRICT LOGIN REQUIREMENT - Must have valid user with complete information
  if (!app.user || !app.user.name || !app.user.email || !app.user.phone) {
    app.showToast("Please login with valid information to place your order", "error");
    
    // Close cart modal and open auth modal
    closeModal("cartModal");
    setTimeout(() => {
      showLoginRequiredModal();
    }, 300);
    return;
  }

  // Additional validation for user information completeness
  if (app.user.name.length < 2 || !isValidEmail(app.user.email) || !isValidPhoneNumber(app.user.phone)) {
    app.showToast("Please complete your profile with valid information", "error");
    
    // Close cart modal and open auth modal for profile completion
    closeModal("cartModal");
    setTimeout(() => {
      showLoginRequiredModal();
    }, 300);
    return;
  }

  // Check if delivery area is selected
  if (!app.location) {
    app.showToast("Please select delivery area", "error");
    
    // Focus on location selector
    const locationSelect = document.getElementById("locationSelect");
    if (locationSelect) {
      locationSelect.focus();
      locationSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // If all validations pass, proceed to checkout
  showCheckoutModal();
}

function showLoginRequiredModal() {
  const authModal = document.getElementById("authModal");
  
  // Clear any existing checkout messages
  const existingMessage = authModal.querySelector(".checkout-message");
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Add prominent checkout requirement message
  const modalBody = authModal.querySelector(".modal-body");
  if (modalBody) {
    const checkoutMessage = document.createElement("div");
    checkoutMessage.className = "checkout-message";
    checkoutMessage.innerHTML = `
      <div class="alert alert-warning checkout-required">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="checkout-message-content">
          <h4>Login Required to Complete Order</h4>
          <p>Please login or register with valid information to proceed with your order:</p>
          <ul>
            <li><i class="fas fa-check"></i> Valid full name (letters only)</li>
            <li><i class="fas fa-check"></i> Valid email address</li>
            <li><i class="fas fa-check"></i> Valid phone number</li>
            <li><i class="fas fa-check"></i> Secure password</li>
          </ul>
          <p><strong>Your cart items are saved and waiting!</strong></p>
        </div>
      </div>
    `;
    modalBody.insertBefore(checkoutMessage, modalBody.firstChild);
  }
  
  // Focus on login form by default
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  
  if (loginTab && registerTab && loginForm && registerForm) {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
  }
  
  // Show the auth modal
  authModal.classList.add("show");
  
  // Focus on email input for better UX
  setTimeout(() => {
    const emailInput = document.getElementById("loginEmail");
    if (emailInput) {
      emailInput.focus();
    }
  }, 500);
}

function validateUserForCheckout() {
  // Comprehensive validation before allowing checkout
  if (!app.user) {
    return {
      isValid: false,
      message: "Please login to continue"
    };
  }
  
  // Validate name
  if (!app.user.name || app.user.name.length < 2) {
    return {
      isValid: false,
      message: "Please provide a valid full name"
    };
  }
  
  const nameValidation = isValidFullName(app.user.name);
  if (!nameValidation.isValid) {
    return {
      isValid: false,
      message: "Please provide a valid full name (letters only)"
    };
  }
  
  // Validate email
  if (!app.user.email || !isValidEmail(app.user.email)) {
    return {
      isValid: false,
      message: "Please provide a valid email address"
    };
  }
  
  // Validate phone
  if (!app.user.phone || !isValidPhoneNumber(app.user.phone)) {
    return {
      isValid: false,
      message: "Please provide a valid phone number"
    };
  }
  
  return {
    isValid: true,
    message: "User information is valid"
  };
}

function showCheckoutModal() {
  const checkoutModal = document.getElementById("checkoutModal");
  const modalBody = checkoutModal.querySelector(".modal-body");
  
  if (!modalBody) return;

  // Create checkout content
  modalBody.innerHTML = `
    <div class="checkout-content">
      <!-- Order Summary -->
      <div class="checkout-section">
        <h4><i class="fas fa-receipt"></i> Order Summary</h4>
        <div class="order-summary">
          ${app.cart.map(item => `
            <div class="summary-item">
              <span class="item-name">${item.english}</span>
              <span class="item-quantity">×${item.quantity}</span>
              <span class="item-price">ETB ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          `).join('')}
          
          <div class="summary-totals">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>ETB ${app.getCartSubtotal().toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Delivery Fee:</span>
              <span>ETB ${app.getDeliveryFee().toFixed(2)}</span>
            </div>
            ${app.coupon ? `
              <div class="summary-row discount">
                <span>Discount (${app.coupon.code}):</span>
                <span>-ETB ${app.getCouponDiscount().toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <span><strong>Total:</strong></span>
              <span><strong>ETB ${app.getCartTotal().toFixed(2)}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div class="checkout-section">
        <h4><i class="fas fa-user"></i> Customer Information</h4>
        <div class="customer-info">
          <p><strong>Name:</strong> ${app.user.name}</p>
          <p><strong>Email:</strong> ${app.user.email}</p>
          <p><strong>Phone:</strong> ${app.user.phone}</p>
          <p><strong>Delivery Area:</strong> ${APP_DATA.areas.find(a => a.id === app.location)?.name || app.location}</p>
        </div>
      </div>

      <!-- Payment Method Selection -->
      <div class="checkout-section">
        <h4><i class="fas fa-credit-card"></i> Select Payment Method</h4>
        <div class="payment-methods-checkout">
          
          <!-- TeleBirr -->
          <div class="payment-option ${app.paymentMethod === 'telebirr' ? 'active' : ''}" data-method="telebirr">
            <div class="payment-header">
              <i class="fas fa-mobile-alt"></i>
              <span>TeleBirr</span>
              <div class="payment-radio">
                <input type="radio" name="paymentMethod" value="telebirr" ${app.paymentMethod === 'telebirr' ? 'checked' : ''}>
              </div>
            </div>
            <div class="payment-details">
              <p>Pay directly from your TeleBirr account</p>
              <div class="payment-steps">
                <p><i class="fas fa-phone"></i> Dial 127#</p>
                <p><i class="fas fa-arrow-right"></i> Select Pay Bill</p>
                <p><i class="fas fa-hashtag"></i> Enter Merchant Code: 12345</p>
              </div>
            </div>
          </div>

          <!-- CBE Birr -->
          <div class="payment-option ${app.paymentMethod === 'cbebirr' ? 'active' : ''}" data-method="cbebirr">
            <div class="payment-header">
              <i class="fas fa-university"></i>
              <span>CBE Birr</span>
              <div class="payment-radio">
                <input type="radio" name="paymentMethod" value="cbebirr" ${app.paymentMethod === 'cbebirr' ? 'checked' : ''}>
              </div>
            </div>
            <div class="payment-details">
              <p>Transfer to our CBE Bank account</p>
              <div class="bank-details">
                <div class="bank-info">
                  <p><strong>Bank:</strong> Commercial Bank of Ethiopia</p>
                  <p><strong>Account Name:</strong> KochaEats Food Delivery</p>
                  <p><strong>Account Number:</strong> <span class="account-number">1000609876534</span></p>
                  <p><strong>Branch:</strong> Kombolcha Branch</p>
                </div>
                <button class="copy-account-btn" onclick="copyAccountNumber()">
                  <i class="fas fa-copy"></i> Copy Account Number
                </button>
              </div>
            </div>
          </div>

          <!-- Cash on Delivery -->
          <div class="payment-option ${app.paymentMethod === 'cash' ? 'active' : ''}" data-method="cash">
            <div class="payment-header">
              <i class="fas fa-money-bill-wave"></i>
              <span>Cash on Delivery</span>
              <div class="payment-radio">
                <input type="radio" name="paymentMethod" value="cash" ${app.paymentMethod === 'cash' ? 'checked' : ''}>
              </div>
            </div>
            <div class="payment-details">
              <p>Pay with cash when your order arrives</p>
              <div class="cash-note">
                <i class="fas fa-info-circle"></i>
                <span>Please have exact change ready</span>
              </div>
            </div>
          </div>

          <!-- Amole -->
          <div class="payment-option ${app.paymentMethod === 'amole' ? 'active' : ''}" data-method="amole">
            <div class="payment-header">
              <i class="fas fa-gem"></i>
              <span>Amole</span>
              <div class="payment-radio">
                <input type="radio" name="paymentMethod" value="amole" ${app.paymentMethod === 'amole' ? 'checked' : ''}>
              </div>
            </div>
            <div class="payment-details">
              <p>Pay using your Amole digital wallet</p>
              <div class="payment-steps">
                <p><i class="fas fa-mobile-alt"></i> Open Amole app</p>
                <p><i class="fas fa-qrcode"></i> Scan QR code or enter merchant ID</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Place Order Button -->
      <div class="checkout-actions">
        <button class="btn-outline" onclick="closeModal('checkoutModal')">
          <i class="fas fa-arrow-left"></i>
          <span>Back to Cart</span>
        </button>
        <button class="btn-primary btn-lg" id="placeOrderBtn">
          <i class="fas fa-check-circle"></i>
          <span>Place Order - ETB ${app.getCartTotal().toFixed(2)}</span>
        </button>
      </div>
    </div>
  `;

  // Add event listeners for payment method selection
  modalBody.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      modalBody.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
      
      // Add active class to clicked option
      this.classList.add('active');
      
      // Update radio button
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        app.paymentMethod = radio.value;
        app.saveToStorage("paymentMethod", app.paymentMethod);
      }
    });
  });

  // Add event listener for place order button
  const placeOrderBtn = modalBody.querySelector('#placeOrderBtn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', completeOrder);
  }

  // Show the modal
  checkoutModal.classList.add('show');
}

function copyAccountNumber() {
  const accountNumber = "1000609876534";
  
  // Try to use the modern clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(accountNumber).then(() => {
      app.showToast("Account number copied to clipboard!", "success");
    }).catch(() => {
      fallbackCopyTextToClipboard(accountNumber);
    });
  } else {
    fallbackCopyTextToClipboard(accountNumber);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    app.showToast("Account number copied to clipboard!", "success");
  } catch (err) {
    app.showToast("Failed to copy account number", "error");
  }
  
  document.body.removeChild(textArea);
}

function completeOrder() {
  // Validate payment method is selected
  if (!app.paymentMethod) {
    app.showToast("Please select a payment method", "error");
    return;
  }

  // Create order
  const order = {
    id: Date.now(),
    items: [...app.cart],
    subtotal: app.getCartSubtotal(),
    deliveryFee: app.getDeliveryFee(),
    discount: app.getCouponDiscount(),
    total: app.getCartTotal(),
    paymentMethod: app.paymentMethod,
    deliveryArea: app.location,
    customerInfo: {
      name: app.user.name,
      email: app.user.email,
      phone: app.user.phone
    },
    coupon: app.coupon,
    status: "preparing",
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes from now
  };

  // Save order
  app.currentOrder = order;
  app.orders.push(order);
  app.saveToStorage("orders", app.orders);
  
  // Clear cart and coupon
  app.clearCart();

  // Close checkout modal
  closeModal("checkoutModal");
  
  // Show success message with payment instructions
  let successMessage = `Order #${order.id} placed successfully!`;
  
  if (app.paymentMethod === 'cbebirr') {
    successMessage += ` Please transfer ETB ${order.total.toFixed(2)} to account 1000609876534`;
  } else if (app.paymentMethod === 'telebirr') {
    successMessage += ` Please complete payment via TeleBirr`;
  } else if (app.paymentMethod === 'cash') {
    successMessage += ` Prepare ETB ${order.total.toFixed(2)} in cash`;
  }
  
  app.showToast(successMessage, "success");

  // Show order tracking
  setTimeout(() => {
    showOrderTracking(order);
  }, 1000);
}

// ==============================
// Order Tracking
// ==============================
function showOrderTracking(order) {
  const trackingBox = document.getElementById("trackingBox");
  if (!trackingBox) return;

  trackingBox.innerHTML = `
        <div class="tracking-active">
            <div class="tracking-header">
                <h4>Order #${order.id}</h4>
                <span class="tracking-status">${
                  order.status.charAt(0).toUpperCase() + order.status.slice(1)
                }</span>
            </div>
            <div class="tracking-steps">
                <div class="tracking-step active">
                    <div class="step-icon"><i class="fas fa-utensils"></i></div>
                    <div class="step-content">
                        <h5>Order Received</h5>
                        <p>Restaurant is preparing your food</p>
                    </div>
                </div>
                <div class="tracking-step">
                    <div class="step-icon"><i class="fas fa-motorcycle"></i></div>
                    <div class="step-content">
                        <h5>On the Way</h5>
                        <p>Rider is delivering your order</p>
                    </div>
                </div>
                <div class="tracking-step">
                    <div class="step-icon"><i class="fas fa-home"></i></div>
                    <div class="step-content">
                        <h5>Delivered</h5>
                        <p>Your food has arrived!</p>
                    </div>
                </div>
            </div>
            <div class="tracking-info">
                <p><strong>Delivery to:</strong> ${
                  APP_DATA.areas.find((a) => a.id === order.deliveryArea)
                    ?.name || "Your location"
                }</p>
                <p><strong>Payment:</strong> ${order.paymentMethod.toUpperCase()}</p>
                <p><strong>Total:</strong> ETB ${order.total.toFixed(2)}</p>
            </div>
        </div>
    `;

  simulateOrderProgress();
}

function simulateOrderProgress() {
  const steps = document.querySelectorAll(".tracking-step");
  let currentStep = 0;

  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      steps[currentStep].classList.add("active");
      currentStep++;

      if (currentStep === steps.length) {
        clearInterval(interval);
        app.showToast("Order delivered! Enjoy your meal!", "success");
      }
    }
  }, 3000);
}

// ==============================
// Chat Functions
// ==============================
function openChatModal() {
  const chatModal = document.getElementById("chatModal");
  const chatMessages = document.getElementById("chatMessages");

  if (chatModal && chatMessages) {
    chatMessages.innerHTML = `
            <div class="chat-message support">
                <div class="message-content">Hello! How can I help you today?</div>
                <span class="message-time">${new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
            </div>
        `;

    chatModal.classList.add("show");

    const chatInput = document.getElementById("chatInput");
    if (chatInput) {
      chatInput.focus();

      chatInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          sendChatMessage();
        }
      });
    }

    const sendBtn = document.getElementById("sendMessage");
    if (sendBtn) {
      sendBtn.addEventListener("click", sendChatMessage);
    }
  }
}

function sendChatMessage() {
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");

  if (!input || !messages || !input.value.trim()) return;

  const message = input.value.trim();

  messages.innerHTML += `
        <div class="chat-message user">
            <div class="message-content">${message}</div>
            <span class="message-time">${new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}</span>
        </div>
    `;

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {
    const responses = [
      "I understand. Is there anything else I can help with?",
      "Thank you for letting me know. We'll look into it.",
      "I'll help you with that right away.",
      "Is there anything specific you'd like to know?",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    messages.innerHTML += `
            <div class="chat-message support">
                <div class="message-content">${response}</div>
                <span class="message-time">${new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}</span>
            </div>
        `;

    messages.scrollTop = messages.scrollHeight;
  }, 1000);
}

// ==============================
// Image Loading
// ==============================
function loadRestaurantImages() {
  console.log("Images loaded with fallback support");
}

// ==============================
// Google Map Integration
// ==============================
function initializeGoogleMap() {
  const mapContainer = document.getElementById("mapContainer");
  if (!mapContainer) return;

  const kombolchaLocation = "Kombolcha,+Ethiopia";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
    kombolchaLocation
  )}&zoom=14&maptype=roadmap`;

  mapContainer.innerHTML = `
    <iframe 
      src="${mapUrl}"
      width="100%" 
      height="400" 
      style="border:0;" 
      allowfullscreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  `;
}

// ==============================
// Global Initialization
// ==============================
window.kochaEats = app;

window.addEventListener("load", function () {
  console.log("Page fully loaded, checking buttons...");

  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");

  if (cartBtn) {
    console.log("Re-attaching cart button listener");
    cartBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      // REQUIRE LOGIN BEFORE SHOWING CART
      if (!app.user || !app.user.name || !app.user.email || !app.user.phone) {
        app.showToast("Please login to view your cart", "error");
        
        // Show login required modal instead of cart
        showLoginRequiredModal();
        return;
      }

      // Additional validation for user information completeness
      const userValidation = validateUserForCheckout();
      if (!userValidation.isValid) {
        app.showToast("Please complete your profile to access cart", "error");
        showLoginRequiredModal();
        return;
      }
      
      // If user is valid, show cart
      updateCartModal();
      if (cartModal) {
        cartModal.classList.add("show");
      }
    };
  }

  const authBtn = document.getElementById("authBtn");
  const authModal = document.getElementById("authModal");

  if (authBtn) {
    console.log("Re-attaching auth button listener");
    authBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (authModal) {
        authModal.classList.add("show");
      }
    };
  }

  // Re-attach logout button listener
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    console.log("Re-attaching logout button listener");
    logoutBtn.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      handleLogout();
    };
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (e) {
    if (
      e.target.closest(".menu-item-image") ||
      e.target.closest(".cart-item-image")
    ) {
      const image =
        e.target.closest(".menu-item-image") ||
        e.target.closest(".cart-item-image");
      image.classList.toggle("zoomed");
    }
  });

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".menu-item-image") &&
      !e.target.closest(".cart-item-image")
    ) {
      const zoomedImages = document.querySelectorAll(
        ".menu-item-image.zoomed, .cart-item-image.zoomed"
      );
      zoomedImages.forEach((img) => img.classList.remove("zoomed"));
    }
  });
});
// Page loader
window.addEventListener("load", function () {
  const loader = document.getElementById("pageLoader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000);
});

// Initialize scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initialize stats toggle
const statsToggle = document.getElementById("statsToggle");
const statsBadge = document.getElementById("statsBadge");
if (statsToggle && statsBadge) {
  statsToggle.addEventListener("click", () => {
    statsBadge.classList.toggle("active");
  });

  document.querySelector(".close-stats")?.addEventListener("click", () => {
    statsBadge.classList.remove("active");
  });
}

// Initialize quick order button
const quickOrderBtn = document.getElementById("quickOrderBtn");
const quickOrderModal = document.getElementById("quickOrderModal");
if (quickOrderBtn && quickOrderModal) {
  quickOrderBtn.addEventListener("click", () => {
    quickOrderModal.classList.add("show");
  });
}

