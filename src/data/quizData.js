// src/data/quizData.js

// PDF এবং HSC লেভেলের রিয়েল প্রশ্নগুলোর বেস কালেকশন
const baseQuestions = {
  physics_math: [
    {
      q: "If the area of a circle is 49π, what is the perimeter of one quadrant of the circle?",
      o: ["14", "14π", "14π+14", "7π/2+14"],
      a: "7π/2+14",
    },
    {
      q: "A particle falls freely from rest through a distance d. Its speed is then:",
      o: ["d√g", "-√2gd", "√(gd)/2", "√2gd"],
      a: "√2gd",
    },
    {
      q: "If a beam of wavelength 663 nm is incident on sodium metal, what is the work function? (h=6.63x10^-34, c=3x10^8)",
      o: ["3x10^-19 J", "3x10^-34 J", "2x10^-34 J", "5.6x10^-19 J"],
      a: "3x10^-19 J",
    },
    {
      q: "The root of the equation x³ - 30x² + 108x - 104 = 0 is:",
      o: [
        "no real roots",
        "exactly one root",
        "three distinct real roots",
        "a repeated root",
      ],
      a: "three distinct real roots",
    },
    {
      q: "If the forces acting on a moving body cancel each other out, the body will:",
      o: [
        "move in a circle",
        "slow down to a steady slower speed",
        "speed up to a faster speed",
        "be brought to a state of rest",
      ],
      a: "be brought to a state of rest",
    },
    {
      q: "What is the internal resistance of a 11V source if current is 2A and external resistance is 5Ω?",
      o: ["5Ω", "1/5Ω", "0.5Ω", "2Ω"],
      a: "0.5Ω",
    },
    {
      q: "For what values of real number does the quadratic equation x² + ax + a = 1 have real roots?",
      o: ["a ≠ 2", "a > 2", "a = 2", "a < 2"],
      a: "a = 2",
    },
    {
      q: "If A = 100i - 56j and B = k, then the orthogonal projection of A along B is:",
      o: ["3", "0", "2", "-1"],
      a: "0",
    },
    {
      q: "Which of the following is the focus of parabola x² = y?",
      o: ["(0, 0)", "(1/4, 0)", "(0, 1/4)", "(0, 2)"],
      a: "(0, 1/4)",
    },
    {
      q: "Find the area between curves y = x² and y = x.",
      o: ["1/6", "2/6", "1", "6"],
      a: "1/6",
    },
  ],
  biology_chemistry: [
    {
      q: "Which of the following is a nitrogen-fixing symbiotic organism in legumes?",
      o: ["Mycorrhiza", "Rhizobium", "Azotobacter", "Cyanobacteria"],
      a: "Rhizobium",
    },
    {
      q: "Which pigment absorbs light energy during photosynthesis?",
      o: ["Hemoglobin", "Insulin", "Chlorophyll", "Myoglobin"],
      a: "Chlorophyll",
    },
    {
      q: "The shape of DNA is:",
      o: ["Circular", "Double helix", "Straight rod", "Triangle"],
      a: "Double helix",
    },
    {
      q: "In known elements, the maximum number is of:",
      o: ["metals", "non metals", "metalloids", "gases"],
      a: "metals",
    },
    {
      q: "In a nuclear reactor, chain reaction is controlled by introducing:",
      o: ["cadmium rod", "iron rod", "platinum rod", "graphite rod"],
      a: "cadmium rod",
    },
    {
      q: "Which acid is present in lemon?",
      o: ["Marlic Acid", "Citric Acid", "Lactic Acid", "Tartaric Acid"],
      a: "Citric Acid",
    },
    {
      q: "Which of the following is an example of an electron withdrawing group?",
      o: ["-NO2", "-NH2", "-OCH3", "-CH3"],
      a: "-NO2",
    },
    {
      q: "Which of the following elements shows maximum electronegativity?",
      o: ["F", "Cl", "O", "N"],
      a: "F",
    },
    {
      q: "In DNA, adenine (A) pairs with which base?",
      o: ["Guanine", "Cytosine", "Thymine", "Uracil"],
      a: "Thymine",
    },
    {
      q: "Which hormone regulates blood glucose levels by promoting glucose uptake into cells?",
      o: ["Insulin", "Glucagon", "Thyroxine", "Adrenaline"],
      a: "Insulin",
    },
  ],
  business_commerce: [
    {
      q: "Tk 800 becomes Tk 956 in 3 years at a certain rate of simple interest. If the rate increases by 4%, what amount will it become?",
      o: ["Tk 1020.80", "Tk 1025", "Tk 1052", "Tk 1000"],
      a: "Tk 1052",
    },
    {
      q: "The salaries of A, B, and C are in the ratio of 1:2:3. The salary of B and C together is Tk 6000. By what percent is C's salary more than A's?",
      o: ["100", "50", "200", "150"],
      a: "200",
    },
    {
      q: "A man's weekly salary is x Tk. He saves y Tk. What fraction of his weekly salary does he spend?",
      o: ["x/y", "(x-y)/x", "(y-x)/x", "(x-y)/y"],
      a: "(x-y)/x",
    },
    {
      q: "In making a television set, costs for labour and materials are in ratio 3:2. The manufacturer sells for Tk. 15,000 to make a gain of 25%. What is the cost of materials?",
      o: ["1600", "3200", "4800", "6000"],
      a: "4800",
    },
    {
      q: "A recipe calls for 3kg of sugar for every 6 kg of flour. If 60kg of this sweet has to be prepared, how much sugar is required?",
      o: ["30", "20", "40", "15"],
      a: "20",
    },
    {
      q: "The cost of manufacturing X units is (9000+400X). The selling amount is 500X. What is the least number of products to break-even?",
      o: ["10", "18", "45", "90"],
      a: "90",
    },
    {
      q: "A pure fruit juice is made by mixing orange and mango juice in the ratio of 9:2. If 189 litres of orange juice are used, how many litres of mango juice is needed?",
      o: ["42", "43", "48", "94"],
      a: "42",
    },
    {
      q: "Successive discount of 10%, 20% and 50% will be equivalent to a single discount of:",
      o: ["16%", "64%", "80%", "70%"],
      a: "64%",
    },
    {
      q: "If the price of 3 tables and 4 chairs is Tk 3300. With the same money one can buy 2 tables and 10 chairs. Price of 1 table and 1 chair is:",
      o: ["Tk 940", "Tk 1050", "Tk 1140", "Tk 1250"],
      a: "Tk 1050",
    },
    {
      q: "If y% of x is 29. Then x = ?",
      o: ["2900", "29x/y", "2900/y", "29xy"],
      a: "2900/y",
    },
  ],
  arts_law: [
    {
      q: "Because of the overwhelming influence of Bangla-language poets Rabindranath Tagore and Kazi Nazrul Islam, Bangladesh has...",
      o: [
        "taken longer to assume its role in English literature",
        "abandoned Bangla language",
        "rejected world literature",
        "diminished Bangla production",
      ],
      a: "taken longer to assume its role in English literature",
    },
    {
      q: "Find the odd one out: Water, Earth, Fire, Book, Air",
      o: ["Water", "Earth", "Fire", "Book"],
      a: "Book",
    },
    {
      q: "One of the many _____ of eating foods without artificial ingredients is an improved complexion.",
      o: ["Benefits", "Beneficial", "Beneficiary", "Beneficially"],
      a: "Benefits",
    },
    {
      q: "He talks as if he _____ a specialist in this matter.",
      o: ["Had been", "Was", "Were", "Has been"],
      a: "Were",
    },
    {
      q: "What is the old name of Dhaka?",
      o: ["Jahangirnagar", "Sonargaon", "Islampur", "Dacca"],
      a: "Jahangirnagar",
    },
    {
      q: "Which country is the first acceptor of Bangladesh?",
      o: ["India", "Bhutan", "Srilanka", "Russia"],
      a: "Bhutan",
    },
    {
      q: "The word 'OBDURATE' means:",
      o: ["Careless", "Contrary", "Callus", "Stubborn"],
      a: "Stubborn",
    },
    {
      q: "Who was the designer of the central Shahid Minar of Bangladesh?",
      o: ["Nazrul Islam", "Hamidur Rahman", "Lui-I-Khan", "Hasima Reza"],
      a: "Hamidur Rahman",
    },
    {
      q: "The antonym of 'INFLATE' is:",
      o: ["Converge", "Inhibit", "Minimize", "Detect"],
      a: "Minimize",
    },
    {
      q: "Which global association proposed the world's first Carbon Tariff?",
      o: ["European Union", "G-20", "NATO", "G-7"],
      a: "European Union",
    },
  ],
};

// এই ফাংশনটি আমাদের বেস প্রশ্নগুলোকে ডুপ্লিকেট করে প্রতি ক্যাটাগরিতে ১৫০+ প্রশ্নের একটি বিশাল ডেমো ব্যাংক তৈরি করবে
const generateLargeBank = () => {
  const largeBank = {};
  for (const category in baseQuestions) {
    let expanded = [];
    let idCounter = 1;
    // বেস প্রশ্নগুলোকে ১৫ বার লুপ করে ১৫০ প্রশ্নের ব্যাংক বানানো হচ্ছে (টেস্টিংয়ের জন্য)
    for (let i = 0; i < 15; i++) {
      baseQuestions[category].forEach((item) => {
        expanded.push({
          id: `${category}_${idCounter}`,
          question: item.q,
          options: item.o,
          answer: item.a,
        });
        idCounter++;
      });
    }
    largeBank[category] = expanded;
  }
  return largeBank;
};

export const fullQuestionBank = generateLargeBank();

// নো-রিপিট মক টেস্টের জন্য অ্যালগরিদম
export function getNonRepeatingQuestions(category, num = 10) {
  const allQs = fullQuestionBank[category] || [];

  // LocalStorage থেকে আগের মক টেস্টে ব্যবহৃত হওয়া প্রশ্নগুলোর ID বের করা
  const usedIdsStr = localStorage.getItem(`used_qs_${category}`);
  let usedIds = usedIdsStr ? JSON.parse(usedIdsStr) : [];

  // যদি দেখা যায় যে পর্যাপ্ত নতুন প্রশ্ন নেই, তখন ব্যবহৃত লিস্ট ক্লিয়ার করে রিফ্রেশ করা হবে (আপনার রিকোয়ারমেন্ট অনুযায়ী)
  if (allQs.length - usedIds.length < num) {
    usedIds = []; // রিসেট
  }

  // যেগুলো এখনো ব্যবহৃত হয়নি সেগুলোকে আলাদা করা
  const availableQs = allQs.filter((q) => !usedIds.includes(q.id));

  // শাফেল করা (Randomize)
  const shuffled = availableQs.sort(() => 0.5 - Math.random());

  // ১০টি প্রশ্ন কাটা
  const selectedQs = shuffled.slice(0, num);

  // নতুন নির্বাচিত প্রশ্নগুলোর ID LocalStorage এ সেভ করা যাতে পরবর্তীতে আর না আসে
  const newUsedIds = [...usedIds, ...selectedQs.map((q) => q.id)];
  localStorage.setItem(`used_qs_${category}`, JSON.stringify(newUsedIds));

  return selectedQs;
}

// স্টাডি মোডের জন্য নির্দিষ্ট ক্যাটাগরির সব প্রশ্ন আনা
export function getAllQuestionsForStudy(category) {
  // স্টাডি মোডে ডুপ্লিকেট দেখার দরকার নেই, তাই শুধু বেস কোয়েশ্চনগুলো পাঠালেই হবে
  return baseQuestions[category] || [];
}
