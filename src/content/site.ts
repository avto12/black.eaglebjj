/**
 * ─────────────────────────────────────────────────────────────────────────
 *  BLACK EAGLE BJJ — CENTRAL CONTENT CONFIG
 * ─────────────────────────────────────────────────────────────────────────
 *  Everything the page shows lives here. Anything marked `demo: true` is a
 *  design placeholder that MUST be confirmed/replaced by the client before
 *  launch — it renders with a visible "დემო" marker on the page.
 *
 *  Photography: free-licensed images from Unsplash (unsplash.com/license),
 *  used as stand-ins until the team supplies its own photos. To swap, drop
 *  files into /public/photos and replace the `src` values with "/photos/…".
 * ─────────────────────────────────────────────────────────────────────────
 */

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Photo = {
  src: string;
  alt: string;
  /** focal point for object-position, e.g. "50% 30%" */
  focus?: string;
};

export const site = {
  name: "Black Eagle BJJ",
  instagram: {
    handle: "@black.eaglebjj",
    url: "https://www.instagram.com/black.eaglebjj/",
  },
  country: "საქართველო",
};

export const nav = [
  { id: "top", label: "მთავარი" },
  { id: "about", label: "ჩვენ შესახებ" },
  { id: "training", label: "ვარჯიშები" },
  { id: "coaches", label: "მწვრთნელები" },
  { id: "achievements", label: "მიღწევები" },
  { id: "gallery", label: "გალერეა" },
  { id: "contact", label: "კონტაქტი" },
] as const;

export const photos = {
  hero: {
    src: u("1780476870650-5f5ef733c78e"),
    alt: "ორი სპორტსმენი ჭიდაობს ტატამზე სავარჯიშო დარბაზში",
    focus: "50% 45%",
  },
  about: {
    src: u("1682545888368-587f56efd06e"),
    alt: "პარტნიორებთან ვარჯიში დარბაზში — პოზიციის კონტროლი",
    focus: "50% 50%",
  },
  team: {
    src: u("1659137834052-7360235e9db5"),
    alt: "სპორტსმენთა ჯგუფი კიმონოებში",
    focus: "50% 40%",
  },
  cta: {
    src: u("1780476870868-d0e04e940c62"),
    alt: "გრეპლინგის ორთაბრძოლა ტატამზე",
    focus: "50% 50%",
  },
} satisfies Record<string, Photo>;

export const hero = {
  eyebrow: "ბრაზილიური ჯიუ-ჯიტსუ · საქართველო",
  headline: ["დისციპლინით", "ნაჭედი."],
  body: "ბრაზილიური ჯიუ-ჯიტსუს გუნდი, სადაც ძალას ტექნიკა, მოთმინება და პატივისცემა ქმნის — ყოველ ვარჯიშზე, ყოველ ტატამზე.",
  primaryCta: { label: "ვარჯიშები", href: "#training" },
  secondaryCta: { label: "გაიცანი გუნდი", href: "#about" },
};

export const about = {
  kicker: "ჩვენ შესახებ",
  title: ["ტატამი", "არ იტყუება."],
  lead: "Black Eagle BJJ — ეს არის გუნდი ადამიანებისთვის, ვისაც სურს ისწავლოს ბრაზილიური ჯიუ-ჯიტსუ სწორად: ნაბიჯ-ნაბიჯ, საფუძვლებიდან.",
  body: "ჯიუ-ჯიტსუ გასწავლის, რომ ზომა და ძალა ყველაფერს არ წყვეტს. აქ წინსვლა იზომება მოთმინებით, გამეორებით და იმით, თუ როგორ ეხმარები პარტნიორს, რომ ისიც გაძლიერდეს.",
  values: [
    {
      word: "დისციპლინა",
      latin: "Discipline",
      text: "რეგულარული ვარჯიში და მცირე, ყოველდღიური ნაბიჯები — ასე იქმნება ოსტატობა.",
    },
    {
      word: "პატივისცემა",
      latin: "Respect",
      text: "პარტნიორის, მწვრთნელის და ტატამის მიმართ. თითოეული ვარჯიში იწყება და მთავრდება ხელის ჩამორთმევით.",
    },
    {
      word: "ტექნიკა",
      latin: "Technique",
      text: "ბერკეტი, დრო და პოზიცია ძალაზე წინ დგას. ვსწავლობთ გააზრებულად და დეტალებით.",
    },
    {
      word: "ერთობა",
      latin: "Community",
      text: "გუნდი, სადაც დამწყები და გამოცდილი სპორტსმენი ერთსა და იმავე ტატამზე იზრდებიან.",
    },
  ],
};

export type Program = {
  index: string;
  title: string;
  latin: string;
  description: string;
  audience: string;
  photo: Photo;
};

export const training = {
  kicker: "ვარჯიშები",
  title: ["იპოვე", "შენი რიტმი."],
  note: "პროგრამები საილუსტრაციოა და დაზუსტდება გუნდთან ერთად. განრიგი და ფასები — Instagram-ზე.",
  demo: true,
  programs: [
    {
      index: "01",
      title: "ბრაზილიური ჯიუ-ჯიტსუ",
      latin: "Gi",
      description:
        "კლასიკური ჯიუ-ჯიტსუ კიმონოში: პოზიციები, გადასვლები, მტკივნეული და მახრჩობელა ილეთები.",
      audience: "დამწყებები და გამოცდილი",
      photo: {
        src: u("1747331796135-0e2354a712e4"),
        alt: "ორი სპორტსმენი კიმონოში ორთაბრძოლის დროს",
      },
    },
    {
      index: "02",
      title: "No-Gi გრეპლინგი",
      latin: "No-Gi",
      description:
        "ჭიდაობა კიმონოს გარეშე — მეტი სიჩქარე, ზუსტი კონტროლი და ფეხების ილეთები.",
      audience: "საშუალო და მაღალი დონე",
      photo: {
        src: u("1783942767599-4ea5f8f742b7"),
        alt: "სპორტსმენი მტკივნეულ ილეთს ასრულებს ტატამზე",
      },
    },
    {
      index: "03",
      title: "ბავშვთა ჯიუ-ჯიტსუ",
      latin: "Kids",
      description:
        "უსაფრთხო, თამაშზე აგებული ვარჯიში, რომელიც ავითარებს კოორდინაციას, თავდაჯერებულობას და დისციპლინას.",
      audience: "ბავშვები და მოზარდები",
      photo: {
        src: u("1767987656450-13e423052ed3"),
        alt: "ბავშვები ვარჯიშობენ საბრძოლო ხელოვნების კლასში",
      },
    },
    {
      index: "04",
      title: "საშეჯიბრო მომზადება",
      latin: "Competition",
      description:
        "ინტენსიური სპარინგები, ტაქტიკა და ფიზიკური მომზადება ტურნირებისთვის.",
      audience: "სპორტსმენები, მწვრთნელის რეკომენდაციით",
      photo: {
        src: u("1780476870847-1023657f91cb"),
        alt: "ორი სპორტსმენი ჭიდაობს ტურნირზე მაყურებლების წინ",
      },
    },
  ] as Program[],
};

export type Coach = {
  name: string;
  role: string;
  bio: string;
  photo?: Photo;
  demo: boolean;
};

export const coaches = {
  kicker: "მწვრთნელები",
  title: ["ადამიანები", "ტატამის მიღმა."],
  intro:
    "მწვრთნელთა პროფილები ივსება გუნდის მიერ მოწოდებული ინფორმაციით. ქვემოთ — განლაგების ნიმუში.",
  list: [
    {
      name: "მწვრთნელის სახელი",
      role: "მთავარი მწვრთნელი · ქამარი დასაზუსტებელია",
      bio: "მოკლე ბიოგრაფია: გამოცდილება, სპორტული გზა და სწავლების ფილოსოფია. ტექსტი დაემატება დადასტურების შემდეგ.",
      demo: true,
    },
    {
      name: "მწვრთნელის სახელი",
      role: "მწვრთნელი · No-Gi / საშეჯიბრო ჯგუფი",
      bio: "პროფილის ადგილი მეორე მწვრთნელისთვის. ფოტო, როლი და ბიოგრაფია ერთ კონფიგურაციის ფაილში იცვლება.",
      demo: true,
    },
    {
      name: "მწვრთნელის სახელი",
      role: "ბავშვთა ჯგუფის მწვრთნელი",
      bio: "პროფილის ადგილი ბავშვთა პროგრამის მწვრთნელისთვის.",
      demo: true,
    },
  ] as Coach[],
};

export type Result = {
  year: string;
  event: string;
  division: string;
  placing: string;
  link?: string;
  demo: boolean;
};

export const achievements = {
  kicker: "მიღწევები",
  title: ["მოპოვებული", "ტატამზე."],
  intro:
    "გუნდის შედეგები გამოქვეყნდება მხოლოდ დადასტურების შემდეგ — ოფიციალური ტურნირების ოქმებისა და საჯარო პროფილების მიხედვით.",
  results: [
    { year: "20—", event: "ტურნირის დასახელება", division: "კატეგორია · ქამარი · წონა", placing: "—", demo: true },
    { year: "20—", event: "ტურნირის დასახელება", division: "კატეგორია · ქამარი · წონა", placing: "—", demo: true },
    { year: "20—", event: "ტურნირის დასახელება", division: "კატეგორია · ქამარი · წონა", placing: "—", demo: true },
  ] as Result[],
  /** Public platforms where verified athlete/team profiles can be linked. */
  profiles: [
    { label: "Instagram", note: "ტურნირების ფოტოები და ამბები", url: site.instagram.url },
  ],
  photos: [
    {
      src: u("1780476870511-3a707d4350d3"),
      alt: "ორთაბრძოლა ტურნირზე მაყურებლების წინ",
    },
    {
      src: u("1780476870579-d34bebf82194"),
      alt: "სპორტსმენები ჭიდაობენ საშეჯიბრო ტატამზე",
    },
  ] satisfies Photo[],
};

export type GalleryCategory = "training" | "competition" | "team";

export type GalleryItem = Photo & {
  category: GalleryCategory;
  /** aspect ratio as width/height — drives the editorial masonry rhythm */
  ratio: number;
};

export const galleryFilters: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "ყველა" },
  { id: "training", label: "ვარჯიში" },
  { id: "competition", label: "შეჯიბრი" },
  { id: "team", label: "გუნდი" },
];

export const gallery = {
  kicker: "გალერეა",
  title: ["ოფლი,", "ტექნიკა, ტატამი."],
  items: [
    { src: u("1780476870868-d0e04e940c62"), alt: "გრეპლინგის ორთაბრძოლა", category: "competition", ratio: 4 / 5 },
    { src: u("1720730978839-844e7214e1ca"), alt: "სპორტსმენი კიმონოში", category: "team", ratio: 3 / 4 },
    { src: u("1677170202299-d2edadfa76a1"), alt: "ილეთის დამუშავება კიმონოში", category: "training", ratio: 1 },
    { src: u("1780476870511-3a707d4350d3"), alt: "ჭიდაობა ტურნირზე", category: "competition", ratio: 3 / 2 },
    { src: u("1564415315949-7a0c4c73aab4"), alt: "ორი სპორტსმენი კიმონოში", category: "training", ratio: 4 / 5 },
    { src: u("1728498852323-6b91113f9111"), alt: "ვარჯიში დარბაზში", category: "team", ratio: 3 / 2 },
    { src: u("1681923445357-0679553160da"), alt: "შავ-თეთრი კადრი — ილეთი ვარჯიშზე", category: "training", ratio: 3 / 4 },
    { src: u("1780476870579-d34bebf82194"), alt: "შეჯიბრი ტატამზე", category: "competition", ratio: 1 },
    { src: u("1515025617920-e1e674b5033c"), alt: "სპორტსმენები კიმონოებში", category: "team", ratio: 4 / 5 },
    { src: u("1728498942768-b0b86d368ce5"), alt: "ფიზიკური მომზადება დარბაზში", category: "training", ratio: 3 / 2 },
    { src: u("1780476870847-1023657f91cb"), alt: "ორთაბრძოლა მაყურებლების წინ", category: "competition", ratio: 4 / 5 },
    { src: u("1564415299969-9fa66e8e5dde"), alt: "სპორტსმენები დარბაზში", category: "team", ratio: 1 },
  ] as GalleryItem[],
};

export const join = {
  title: ["გახდი", "BLACK EAGLE-ის", "ნაწილი."],
  body: "პირველი ვარჯიში ყველაზე რთულია. მერე კი ტატამი შენი მეორე სახლი ხდება. მოგვწერე Instagram-ზე და გაიგე, როდის შეგიძლია მოსვლა.",
  cta: "მოგვწერე Instagram-ზე",
};

export const contact = {
  kicker: "კონტაქტი",
  items: [
    { label: "Instagram", value: site.instagram.handle, href: site.instagram.url, demo: false },
    { label: "ტელეფონი", value: "+995 ··· ·· ·· ··", demo: true },
    { label: "მისამართი", value: "დარბაზის მისამართი დაემატება", demo: true },
    { label: "განრიგი", value: "ორშ — შაბ · საათები დაზუსტდება", demo: true },
  ] as { label: string; value: string; href?: string; demo: boolean }[],
};
