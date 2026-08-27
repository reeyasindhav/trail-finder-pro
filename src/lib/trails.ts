export type Difficulty = "Easy" | "Moderate" | "Hard";

export type Trail = {
  slug: string;
  name: string;
  region: string;
  state: string;
  difficulty: Difficulty;
  distanceMi: number;
  elevationFt: number;
  rating: number;
  reviewCount: number;
  durationHrs: number;
  routeType: "Loop" | "Out & back" | "Point to point";
  season: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  elevation: { mi: number; ft: number }[];
  waypoints: { name: string; mi: number; note: string }[];
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=70`;

function profile(base: number, peak: number, points = 14) {
  return Array.from({ length: points }, (_, i) => {
    const t = i / (points - 1);
    const bump = Math.sin(t * Math.PI) ** 1.4;
    const noise = Math.sin(t * 12 + base) * (peak - base) * 0.04;
    return { mi: +(t * 10).toFixed(1), ft: Math.round(base + bump * (peak - base) + noise) };
  });
}

export const trails: Trail[] = [
  {
    slug: "raven-rock-loop",
    name: "Raven Rock Loop",
    region: "North Cascades",
    state: "WA",
    difficulty: "Moderate",
    distanceMi: 6.8,
    elevationFt: 1420,
    rating: 4.9,
    reviewCount: 412,
    durationHrs: 3.5,
    routeType: "Loop",
    season: "Jun – Oct",
    summary: "A mossy ridgeline loop with sweeping views over alpine valleys and old-growth forest.",
    description:
      "Raven Rock climbs steadily through cedar and hemlock before breaking onto an exposed basalt ridge. The final mile traverses a wildflower bench with uninterrupted views across the valley. Footing is loose in two short scree sections — poles help on the descent.",
    image: img("photo-1441974231531-c6227db76b6e"),
    tags: ["Old growth", "Ridgeline", "Dog friendly"],
    elevation: profile(1100, 2520),
    waypoints: [
      { name: "Trailhead", mi: 0, note: "Gravel lot, 18 spaces, vault toilet" },
      { name: "Cedar Flats", mi: 1.8, note: "Last reliable water" },
      { name: "Raven Rock", mi: 4.1, note: "Summit views, exposed and windy" },
      { name: "Loop return", mi: 6.8, note: "Steep switchbacks, loose scree" },
    ],
  },
  {
    slug: "cedar-fern-trail",
    name: "Cedar & Fern Trail",
    region: "Olympic Peninsula",
    state: "WA",
    difficulty: "Easy",
    distanceMi: 4.2,
    elevationFt: 620,
    rating: 4.7,
    reviewCount: 286,
    durationHrs: 2,
    routeType: "Out & back",
    season: "Year round",
    summary: "A lush, shaded walk through towering cedar groves and fern-lined creek beds.",
    description:
      "One of the gentlest introductions to temperate rainforest hiking. Wide, well-graded tread the whole way, with two footbridges over a clear creek. Excellent in rain — the canopy shelters most of the route.",
    image: img("photo-1470071459604-3b5ec3a7fe05"),
    tags: ["Family friendly", "Rainforest", "Waterfall"],
    elevation: profile(320, 940),
    waypoints: [
      { name: "Visitor center", mi: 0, note: "Paved parking, maps available" },
      { name: "First bridge", mi: 0.9, note: "Creek crossing" },
      { name: "Fern hollow", mi: 2.1, note: "Turnaround, benches" },
    ],
  },
  {
    slug: "granite-peak-traverse",
    name: "Granite Peak Traverse",
    region: "Snoqualmie Pass",
    state: "WA",
    difficulty: "Hard",
    distanceMi: 9.6,
    elevationFt: 2840,
    rating: 4.8,
    reviewCount: 173,
    durationHrs: 6,
    routeType: "Point to point",
    season: "Jul – Sep",
    summary: "A demanding high-country traverse rewarded with exposed granite and wildflower meadows.",
    description:
      "A serious day out. Sustained climbing for the first four miles, then a rocky traverse with mild scrambling and real exposure in two spots. Snow lingers in the north-facing gully into July — check recent reports before committing.",
    image: img("photo-1464822759023-fed622ff2c3b"),
    tags: ["Scramble", "Alpine", "Exposure"],
    elevation: profile(2100, 5300),
    waypoints: [
      { name: "Lower trailhead", mi: 0, note: "Permit required, self-issue" },
      { name: "Talus field", mi: 3.4, note: "Route finding needed" },
      { name: "Granite Peak", mi: 6.2, note: "5,300 ft summit" },
      { name: "Upper lot", mi: 9.6, note: "Shuttle pickup" },
    ],
  },
  {
    slug: "larch-basin-circuit",
    name: "Larch Basin Circuit",
    region: "Okanogan",
    state: "WA",
    difficulty: "Moderate",
    distanceMi: 7.5,
    elevationFt: 1780,
    rating: 4.6,
    reviewCount: 208,
    durationHrs: 4,
    routeType: "Loop",
    season: "Sep – Oct",
    summary: "Golden larch groves ringing a quiet alpine basin — the best two weeks of autumn.",
    description:
      "Crowded at peak larch, serene otherwise. The climb is consistent but never brutal, and the basin makes an ideal lunch stop. Start early; the lot fills before 7am in October.",
    image: img("photo-1483728642387-6c3bdd6c93e5"),
    tags: ["Fall colors", "Alpine lake", "Photography"],
    elevation: profile(4200, 6100),
    waypoints: [
      { name: "Basin trailhead", mi: 0, note: "Northwest Forest Pass" },
      { name: "Larch bench", mi: 2.6, note: "Golden larch stands" },
      { name: "Basin lake", mi: 4.3, note: "Camping permitted" },
    ],
  },
  {
    slug: "silver-creek-falls",
    name: "Silver Creek Falls",
    region: "Mount Hood",
    state: "OR",
    difficulty: "Easy",
    distanceMi: 3.1,
    elevationFt: 410,
    rating: 4.5,
    reviewCount: 521,
    durationHrs: 1.5,
    routeType: "Loop",
    season: "Year round",
    summary: "A short canyon loop past three waterfalls, including one you can walk behind.",
    description:
      "Popular for good reason. Stone steps descend into a mossy basalt canyon with continuous water views. Slick when wet — traction is worth carrying in winter.",
    image: img("photo-1447752875215-b2761acb3c5d"),
    tags: ["Waterfall", "Family friendly", "Shaded"],
    elevation: profile(600, 1010),
    waypoints: [
      { name: "South lot", mi: 0, note: "Day-use fee" },
      { name: "Lower falls", mi: 0.7, note: "Walk-behind viewpoint" },
      { name: "Canyon rim", mi: 2.4, note: "Stair climb out" },
    ],
  },
  {
    slug: "windward-ridge",
    name: "Windward Ridge",
    region: "Columbia Gorge",
    state: "OR",
    difficulty: "Hard",
    distanceMi: 11.2,
    elevationFt: 3260,
    rating: 4.4,
    reviewCount: 96,
    durationHrs: 7,
    routeType: "Out & back",
    season: "May – Oct",
    summary: "Relentless switchbacks up an open ridge with gorge views the whole way up.",
    description:
      "No shade, no water, no let-up — but the payoff is a panorama across the entire gorge. Carry three liters minimum and start before the heat.",
    image: img("photo-1476514525535-07fb3b4ae5f1"),
    tags: ["Exposed", "Big views", "Training hike"],
    elevation: profile(300, 3560),
    waypoints: [
      { name: "River trailhead", mi: 0, note: "Free parking, fills early" },
      { name: "Switchback wall", mi: 2.8, note: "42 switchbacks" },
      { name: "Ridge summit", mi: 5.6, note: "Turnaround" },
    ],
  },
];

export const getTrail = (slug: string) => trails.find((t) => t.slug === slug);

export const difficultyMeta: Record<Difficulty, { color: string; blurb: string; level: number }> = {
  Easy: { color: "var(--easy)", blurb: "Gentle grade, well-maintained tread", level: 1 },
  Moderate: { color: "var(--moderate)", blurb: "Sustained climbing, uneven footing", level: 2 },
  Hard: { color: "var(--hard)", blurb: "Steep, exposed, or technical terrain", level: 3 },
};

export type GearItem = { id: string; label: string; note: string; essential: boolean };
export type GearCategory = { id: string; title: string; items: GearItem[] };

export const gearChecklist: GearCategory[] = [
  {
    id: "navigation",
    title: "Navigation & safety",
    items: [
      { id: "map", label: "Topo map + compass", note: "Offline backup for dead phones", essential: true },
      { id: "headlamp", label: "Headlamp + spare batteries", note: "Even on day hikes", essential: true },
      { id: "firstaid", label: "First aid kit", note: "Blister care, tape, meds", essential: true },
      { id: "whistle", label: "Emergency whistle", note: "Carries further than a shout", essential: false },
      { id: "beacon", label: "Satellite messenger", note: "For routes with no signal", essential: false },
    ],
  },
  {
    id: "clothing",
    title: "Clothing layers",
    items: [
      { id: "shell", label: "Waterproof shell", note: "Weather turns fast above treeline", essential: true },
      { id: "insulation", label: "Insulating midlayer", note: "Fleece or synthetic puffy", essential: true },
      { id: "socks", label: "Spare wool socks", note: "Dry feet, fewer blisters", essential: false },
      { id: "hat", label: "Sun hat + gloves", note: "Both, in most seasons", essential: false },
    ],
  },
  {
    id: "sustenance",
    title: "Water & food",
    items: [
      { id: "water", label: "2–3 L water", note: "More on exposed routes", essential: true },
      { id: "filter", label: "Water filter", note: "If sources are reliable", essential: false },
      { id: "snacks", label: "Trail snacks", note: "200 kcal per hour of moving", essential: true },
    ],
  },
  {
    id: "traction",
    title: "Footing & traction",
    items: [
      { id: "boots", label: "Broken-in boots", note: "Never debut boots on a big day", essential: true },
      { id: "poles", label: "Trekking poles", note: "Saves knees on steep descents", essential: false },
      { id: "spikes", label: "Microspikes", note: "Shoulder season snow and ice", essential: false },
    ],
  },
];

export const communityPosts = [
  {
    id: 1,
    author: "Maya Okonkwo",
    initials: "MO",
    trail: "Granite Peak Traverse",
    date: "2 days ago",
    rating: 5,
    body: "Snow gully is fully melted out as of this week. Scrambling section is solid rock, but the exposure is real — I wouldn't take a nervous first-timer up there.",
    conditions: "Dry, 68°F, light wind",
    likes: 42,
  },
  {
    id: 2,
    author: "Dev Raman",
    initials: "DR",
    trail: "Larch Basin Circuit",
    date: "5 days ago",
    rating: 4,
    body: "Larches are about 70% turned. Another week and it'll be peak. Lot was completely full by 6:45am on Saturday — go midweek if you can.",
    conditions: "Clear, 41°F at basin",
    likes: 118,
  },
  {
    id: 3,
    author: "Sana Ellis",
    initials: "SE",
    trail: "Cedar & Fern Trail",
    date: "1 week ago",
    rating: 5,
    body: "Took two kids (6 and 9) and they loved it. The second footbridge is out — there's an easy rock hop 30 yards upstream instead.",
    conditions: "Drizzle, muddy tread",
    likes: 27,
  },
  {
    id: 4,
    author: "Tomas Iversen",
    initials: "TI",
    trail: "Windward Ridge",
    date: "1 week ago",
    rating: 4,
    body: "Brutal in the afternoon sun. Started at 5:30am and it was genuinely pleasant until mile four. Three liters was exactly enough, not a sip more.",
    conditions: "Hot, 91°F, no shade",
    likes: 64,
  },
];

export const plannedHikes = [
  { id: 1, trail: "Larch Basin Circuit", slug: "larch-basin-circuit", date: "Oct 04", party: 3, gearReady: 82 },
  { id: 2, trail: "Granite Peak Traverse", slug: "granite-peak-traverse", date: "Oct 19", party: 2, gearReady: 45 },
  { id: 3, trail: "Silver Creek Falls", slug: "silver-creek-falls", date: "Nov 02", party: 5, gearReady: 100 },
];

export const activityLog = [
  { month: "Apr", miles: 24 },
  { month: "May", miles: 38 },
  { month: "Jun", miles: 51 },
  { month: "Jul", miles: 44 },
  { month: "Aug", miles: 67 },
  { month: "Sep", miles: 58 },
];
