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
  seasonCategory: "Year round" | "Spring" | "Summer" | "Fall" | "Winter";
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
    seasonCategory: "Summer",
    summary:
      "A mossy ridgeline loop with sweeping views over alpine valleys and old-growth forest.",
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
    seasonCategory: "Year round",
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
    seasonCategory: "Summer",
    summary:
      "A demanding high-country traverse rewarded with exposed granite and wildflower meadows.",
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
    seasonCategory: "Fall",
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
    seasonCategory: "Year round",
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
    seasonCategory: "Summer",
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
  {
    slug: "hemlock-lakes-loop",
    name: "Hemlock Lakes Loop",
    region: "Alpine Lakes Wilderness",
    state: "WA",
    difficulty: "Moderate",
    distanceMi: 8.3,
    elevationFt: 1560,
    rating: 4.8,
    reviewCount: 324,
    durationHrs: 4.5,
    routeType: "Loop",
    season: "Jul – Oct",
    seasonCategory: "Summer",
    summary:
      "A chain of alpine lakes beneath granite ramparts, with one of the best swims in the Cascades.",
    description:
      "The trail climbs through forest to a high lake basin surrounded by steep walls. The water stays cold well into August, but the midroute lake at mile 4.2 is shallow enough for a quick dip on a hot day.",
    image: img("photo-1501785888041-af3ef285b470"),
    tags: ["Alpine lakes", "Swimming", "Wildflowers"],
    elevation: profile(1800, 3360),
    waypoints: [
      { name: "Trailhead", mi: 0, note: "NW Forest Pass, 20 spaces" },
      { name: "Lower hemlock", mi: 2.4, note: "First lake viewpoint" },
      { name: "Swim lake", mi: 4.2, note: "Best swimming, campsites" },
      { name: "Upper basin", mi: 6.7, note: "Rocky shore, optional scramble" },
    ],
  },
  {
    slug: "cannon-beach-bluffs",
    name: "Cannon Beach Bluffs",
    region: "Oregon Coast",
    state: "OR",
    difficulty: "Easy",
    distanceMi: 2.4,
    elevationFt: 340,
    rating: 4.6,
    reviewCount: 489,
    durationHrs: 1,
    routeType: "Out & back",
    season: "Year round",
    seasonCategory: "Year round",
    summary: "A short, windblown coastal walk ending at a sweeping Pacific viewpoint.",
    description:
      "Perfect for a sunset stop or a quick leg-stretch after a long drive. The path is mostly boardwalk and gravel, then opens onto a bluff with unobstructed views of the ocean and Haystack Rock.",
    image: img("photo-1507525428034-b723cf961d3e"),
    tags: ["Coastal", "Sunset", "Family friendly"],
    elevation: profile(120, 460),
    waypoints: [
      { name: "Parking", mi: 0, note: "Street parking, arrive early" },
      { name: "Bluff overlook", mi: 1.2, note: "Main viewpoint" },
      { name: "North point", mi: 2.4, note: "Turnaround, benches" },
    ],
  },
  {
    slug: "blue-glacier-ramble",
    name: "Blue Glacier Ramble",
    region: "Mount Rainier",
    state: "WA",
    difficulty: "Hard",
    distanceMi: 12.4,
    elevationFt: 3120,
    rating: 4.7,
    reviewCount: 145,
    durationHrs: 7.5,
    routeType: "Out & back",
    season: "Jul – Sep",
    seasonCategory: "Summer",
    summary: "A long alpine approach to ice-blue glacial views and wildflower-filled meadows.",
    description:
      "This route gains elevation fast, then levels out into a broad valley with views of the Nisqually Glacier. The glacial flour turns streams milky blue. Snowfields linger late — bring an ice axe if you’re early season.",
    image: img("photo-1506905925346-21bda4d32df4"),
    tags: ["Glacier", "Alpine", "Wildflowers"],
    elevation: profile(2400, 5520),
    waypoints: [
      { name: "Longmire lot", mi: 0, note: "National Park fee" },
      { name: "Forest border", mi: 3.1, note: "Last tree cover" },
      { name: "Glacier overlook", mi: 6.2, note: "Best views, exposed" },
      { name: "Upper meadow", mi: 12.4, note: "Turnaround" },
    ],
  },
  {
    slug: "misty-falls-canyon",
    name: "Misty Falls Canyon",
    region: "Columbia River Gorge",
    state: "OR",
    difficulty: "Moderate",
    distanceMi: 5.7,
    elevationFt: 890,
    rating: 4.5,
    reviewCount: 267,
    durationHrs: 2.5,
    routeType: "Loop",
    season: "Mar – Nov",
    seasonCategory: "Spring",
    summary: "A misty, waterfall-filled canyon loop with rich moss walls and fern gardens.",
    description:
      "Best in spring when the canyon holds fog and the falls are strongest. The lower section can be muddy, but the upper canyon is drier and lined with rare ferns. Several short spur trails lead to unnamed falls.",
    image: img("photo-1545569341-9eb8b30979d9"),
    tags: ["Waterfall", "Canyon", "Rainforest"],
    elevation: profile(640, 1530),
    waypoints: [
      { name: "Gate lot", mi: 0, note: "$5 day use" },
      { name: "First fall", mi: 1.1, note: "15 ft cascade" },
      { name: "Upper moss garden", mi: 3.4, note: "Best photo spot" },
      { name: "Canyon exit", mi: 5.7, note: "Steep paved descent" },
    ],
  },
  {
    slug: "high-desert-rim",
    name: "High Desert Rim",
    region: "John Day",
    state: "OR",
    difficulty: "Hard",
    distanceMi: 14.5,
    elevationFt: 2180,
    rating: 4.3,
    reviewCount: 78,
    durationHrs: 8,
    routeType: "Point to point",
    season: "Mar – May",
    seasonCategory: "Spring",
    summary: "A brutal but beautiful east-side traverse across painted ridges and sagebrush flats.",
    description:
      "Little shade, erratic weather, and relentless sun — but the geology is unmatched. Bring extra water, a wind layer, and a sun hoody. Best done with a shuttle because there's no easy loop return.",
    image: img("photo-1473580044384-7ba9967e16a0"),
    tags: ["Desert", "Geology", "Shuttle required"],
    elevation: profile(1200, 3380),
    waypoints: [
      { name: "Warm Springs", mi: 0, note: "Permit required" },
      { name: "Painted hills", mi: 4.8, note: "Photo stop" },
      { name: "Rim rock", mi: 9.3, note: "Exposed finish" },
      { name: "Highway 19", mi: 14.5, note: "Shuttle pickup" },
    ],
  },
  {
    slug: "saltwater-creek",
    name: "Saltwater Creek",
    region: "Olympic Peninsula",
    state: "WA",
    difficulty: "Easy",
    distanceMi: 3.8,
    elevationFt: 480,
    rating: 4.9,
    reviewCount: 612,
    durationHrs: 1.5,
    routeType: "Loop",
    season: "Year round",
    seasonCategory: "Year round",
    summary: "A short rainforest ramble to an estuary where salt meets fresh water.",
    description:
      "Boardwalk keeps your feet dry through the worst of the bog. The estuary at mile 2.1 attracts bald eagles and spawning salmon in fall. Benches and interpretive signs make this a great family stop.",
    image: img("photo-1444464666168-49d633b86797"),
    tags: ["Estuary", "Birding", "Boardwalk"],
    elevation: profile(260, 740),
    waypoints: [
      { name: "Nature center", mi: 0, note: "Restrooms, maps" },
      { name: "Beaver dam", mi: 1.4, note: "Good wildlife viewing" },
      { name: "Estuary", mi: 2.1, note: "Salmon, eagles" },
      { name: "Loop bridge", mi: 3.8, note: "Return to center" },
    ],
  },
  {
    slug: "sunrise-rim-trail",
    name: "Sunrise Rim Trail",
    region: "Mount Rainier",
    state: "WA",
    difficulty: "Moderate",
    distanceMi: 5.9,
    elevationFt: 1240,
    rating: 4.7,
    reviewCount: 398,
    durationHrs: 3,
    routeType: "Loop",
    season: "Jun – Oct",
    seasonCategory: "Summer",
    summary: "A high-elevation loop around Sunrise with wildflower meadows and glacial views.",
    description:
      "This loop stays above 5,000 feet for most of its length, opening onto meadows that burst with lupine and paintbrush in July. Emmons Glacier dominates the eastern skyline. Afternoon thunderstorms are common — start early.",
    image: img("photo-1520638023360-6def43369781"),
    tags: ["Wildflowers", "Glacier views", "Alpine"],
    elevation: profile(5200, 6440),
    waypoints: [
      { name: "Sunrise lodge", mi: 0, note: "Parking fee, food available" },
      { name: "Emmons viewpoint", mi: 2.1, note: "Best glacier views" },
      { name: "Flower bowl", mi: 4.3, note: "Peak bloom July" },
      { name: "Loop return", mi: 5.9, note: "Gravel descent" },
    ],
  },
  {
    slug: "cape-kiwanda-dunes",
    name: "Cape Kiwanda Dunes",
    region: "Oregon Coast",
    state: "OR",
    difficulty: "Moderate",
    distanceMi: 2.1,
    elevationFt: 520,
    rating: 4.5,
    reviewCount: 356,
    durationHrs: 1.5,
    routeType: "Out & back",
    season: "Year round",
    seasonCategory: "Year round",
    summary: "A steep dune climb rewarded with a hidden beach and sea stack views.",
    description:
      "The climb up the sand dune is short but surprisingly hard — pole your way up like you're in the Sahara. The payoff is a quiet beach framed by cliffs and sea stacks. Watch the tide, because high water can block the return path.",
    image: img("photo-1500534314209-a25ddb2bd429"),
    tags: ["Coastal", "Dunes", "Beach"],
    elevation: profile(80, 600),
    waypoints: [
      { name: "Dune parking", mi: 0, note: "Street parking, small lot" },
      { name: "Dune crest", mi: 0.6, note: "Best views, wind" },
      { name: "Hidden beach", mi: 1.5, note: "Tide dependent" },
    ],
  },
  {
    slug: "silver-stag-pass",
    name: "Silver Stag Pass",
    region: "Central Cascades",
    state: "WA",
    difficulty: "Hard",
    distanceMi: 16.8,
    elevationFt: 4160,
    rating: 4.6,
    reviewCount: 89,
    durationHrs: 9,
    routeType: "Point to point",
    season: "Jul – Sep",
    seasonCategory: "Summer",
    summary:
      "An epic high pass crossing with remote meadows and one of the best stargazing camps in the state.",
    description:
      "Not for beginners. The approach is a long, steady grind, then the pass itself is rocky and occasionally route-finding in fog. If you camp, the basin on the far side is quiet, green, and protected from wind.",
    image: img("photo-1519681393784-d120267933ba"),
    tags: ["Backpacking", "Alpine", "Remote"],
    elevation: profile(2800, 6960),
    waypoints: [
      { name: "Lower TH", mi: 0, note: "Gravel, high-clearance helpful" },
      { name: "Moraine lake", mi: 5.4, note: "Good water, campsites" },
      { name: "Silver Pass", mi: 8.4, note: "6,960 ft, rocky" },
      { name: "Upper TH", mi: 16.8, note: "Shuttle required" },
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
      {
        id: "map",
        label: "Topo map + compass",
        note: "Offline backup for dead phones",
        essential: true,
      },
      {
        id: "headlamp",
        label: "Headlamp + spare batteries",
        note: "Even on day hikes",
        essential: true,
      },
      { id: "firstaid", label: "First aid kit", note: "Blister care, tape, meds", essential: true },
      {
        id: "whistle",
        label: "Emergency whistle",
        note: "Carries further than a shout",
        essential: false,
      },
      {
        id: "beacon",
        label: "Satellite messenger",
        note: "For routes with no signal",
        essential: false,
      },
    ],
  },
  {
    id: "clothing",
    title: "Clothing layers",
    items: [
      {
        id: "shell",
        label: "Waterproof shell",
        note: "Weather turns fast above treeline",
        essential: true,
      },
      {
        id: "insulation",
        label: "Insulating midlayer",
        note: "Fleece or synthetic puffy",
        essential: true,
      },
      {
        id: "socks",
        label: "Spare wool socks",
        note: "Dry feet, fewer blisters",
        essential: false,
      },
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
      {
        id: "boots",
        label: "Broken-in boots",
        note: "Never debut boots on a big day",
        essential: true,
      },
      {
        id: "poles",
        label: "Trekking poles",
        note: "Saves knees on steep descents",
        essential: false,
      },
      {
        id: "spikes",
        label: "Microspikes",
        note: "Shoulder season snow and ice",
        essential: false,
      },
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
  {
    id: 5,
    author: "Nina Patel",
    initials: "NP",
    trail: "Hemlock Lakes Loop",
    date: "3 days ago",
    rating: 5,
    body: "The swim lake was worth every switchback. Water was cold, but the sun was strong enough to make it feel like a gift. Arrived before 8am and had the place mostly to ourselves.",
    conditions: "Sunny, 72°F, calm",
    likes: 89,
  },
  {
    id: 6,
    author: "Jake Moreno",
    initials: "JM",
    trail: "Cannon Beach Bluffs",
    date: "4 days ago",
    rating: 5,
    body: "Brought visitors from out of town and they couldn't believe this was a real hike. Sunset was unreal. Just watch the parking — the main lot fills by noon in summer.",
    conditions: "Clear, 64°F, breeze",
    likes: 56,
  },
  {
    id: 7,
    author: "Elena Torres",
    initials: "ET",
    trail: "Blue Glacier Ramble",
    date: "6 days ago",
    rating: 4,
    body: "Glacial flour makes the streams look like melted blue paint. Worth the climb, but I wouldn't do it in rain — the upper basin gets hammered by storms.",
    conditions: "High clouds, 55°F",
    likes: 34,
  },
  {
    id: 8,
    author: "Owen Park",
    initials: "OP",
    trail: "Misty Falls Canyon",
    date: "1 week ago",
    rating: 4,
    body: "The unnamed falls at mile 3.4 was the real highlight. Not on the map, but follow the faint boot path and you'll find a 30-foot cascade with a cave behind it.",
    conditions: "Overcast, 58°F",
    likes: 102,
  },
];

export const plannedHikes = [
  {
    id: 1,
    trail: "Larch Basin Circuit",
    slug: "larch-basin-circuit",
    date: "Oct 04",
    party: 3,
    gearReady: 82,
  },
  {
    id: 2,
    trail: "Granite Peak Traverse",
    slug: "granite-peak-traverse",
    date: "Oct 19",
    party: 2,
    gearReady: 45,
  },
  {
    id: 3,
    trail: "Silver Creek Falls",
    slug: "silver-creek-falls",
    date: "Nov 02",
    party: 5,
    gearReady: 100,
  },
  {
    id: 4,
    trail: "Hemlock Lakes Loop",
    slug: "hemlock-lakes-loop",
    date: "Sep 21",
    party: 4,
    gearReady: 68,
  },
  {
    id: 5,
    trail: "Cannon Beach Bluffs",
    slug: "cannon-beach-bluffs",
    date: "Aug 15",
    party: 6,
    gearReady: 95,
  },
  {
    id: 6,
    trail: "Blue Glacier Ramble",
    slug: "blue-glacier-ramble",
    date: "Aug 02",
    party: 2,
    gearReady: 33,
  },
];

export const activityLog = [
  { month: "Apr", miles: 24 },
  { month: "May", miles: 38 },
  { month: "Jun", miles: 51 },
  { month: "Jul", miles: 44 },
  { month: "Aug", miles: 67 },
  { month: "Sep", miles: 58 },
];
