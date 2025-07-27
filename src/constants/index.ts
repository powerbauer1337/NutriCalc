// Storage keys
export const LOCAL_STORAGE_KEY_GEMINI_API_KEY = 'nutricalc_gemini_api_key';
export const LOCAL_STORAGE_KEY_CUSTOM_FERTILIZERS = 'nutricalc_custom_fertilizers';
export const LOCAL_STORAGE_KEY_CUSTOM_WATER = 'nutricalc_custom_water';

// Tab IDs
export const TAB_BASIC = 'basic';
export const TAB_ADVANCED = 'advanced';
export const TAB_ANALYSIS = 'analysis';
export const TAB_CUSTOM_FERTILIZER = 'customFertilizer';
export const TAB_SETTINGS = 'settings';
export const TAB_REFERENCES = 'references';
export const TAB_MIXING_ASSISTANT = 'mixingassistant';
export const TAB_WATERING_SCHEDULER = 'watering';

// Tab configuration
export const TABS_CONFIG = [
  { id: TAB_BASIC, label: 'Setup' },
  { id: TAB_ADVANCED, label: 'Details' },
  { id: TAB_ANALYSIS, label: 'Analyse' },
  { id: TAB_CUSTOM_FERTILIZER, label: 'Dünger' },
  { id: TAB_SETTINGS, label: 'Einstellungen' },
  { id: TAB_MIXING_ASSISTANT, label: 'Misch-Assistent' },
  { id: TAB_WATERING_SCHEDULER, label: 'Gießplaner' },
  { id: TAB_REFERENCES, label: 'Referenzen' },
];

interface GrowthStageConfig {
  name: string;
  n: { min: number; max: number };
  p: { min: number; max: number };
  k: { min: number; max: number };
  ec: { min: number; max: number };
  ph: { min: number; max: number };
}

interface GrowthStages {
  [key: string]: GrowthStageConfig;
}

// Growth stages configuration
export const GROWTH_STAGES: GrowthStages = {
  early_veg: {
    name: 'Frühe Vegetation',
    n: [100, 150],
    p: [30, 50],
    k: [100, 150],
    ec: [0.8, 1.2],
    ph: [5.5, 6.5],
  },
  late_veg: {
    name: 'Späte Vegetation',
    n: [150, 200],
    p: [50, 70],
    k: [150, 200],
    ec: [1.2, 1.6],
    ph: [5.5, 6.5],
  },
  early_flower: {
    name: 'Frühe Blüte',
    n: [100, 150],
    p: [70, 90],
    k: [200, 250],
    ec: [1.4, 1.8],
    ph: [5.5, 6.5],
  },
  mid_flower: {
    name: 'Mittlere Blüte',
    n: [80, 120],
    p: [90, 110],
    k: [250, 300],
    ec: [1.6, 2.0],
    ph: [5.5, 6.5],
  },
  late_flower: {
    name: 'Späte Blüte',
    n: [50, 80],
    p: [110, 130],
    k: [300, 350],
    ec: [1.8, 2.2],
    ph: [5.5, 6.5],
  },
};

interface WaterType {
  name: string;
}

interface WaterTypes {
  [key: string]: WaterType;
}

// Water types configuration
export const WATER_TYPES: WaterTypes = {
  ro: { name: 'Umkehrosmose' },
  tap: { name: 'Leitungswasser' },
  custom: { name: 'Eigenes Profil' },
};

interface NutrientField {
  key: string;
  label: string;
}

// Nutrient fields configuration
export const NUTRIENT_FIELDS: NutrientField[] = [
  { key: 'n', label: 'Stickstoff (N)' },
  { key: 'p', label: 'Phosphor (P)' },
  { key: 'k', label: 'Kalium (K)' },
  { key: 'ca', label: 'Calcium (Ca)' },
  { key: 'mg', label: 'Magnesium (Mg)' },
  { key: 's', label: 'Schwefel (S)' },
  { key: 'fe', label: 'Eisen (Fe)' },
  { key: 'mn', label: 'Mangan (Mn)' },
  { key: 'zn', label: 'Zink (Zn)' },
  { key: 'cu', label: 'Kupfer (Cu)' },
  { key: 'b', label: 'Bor (B)' },
  { key: 'mo', label: 'Molybdän (Mo)' },
  { key: 'ec', label: 'EC' },
];

interface FertilizerComposition {
  n: number;
  p: number;
  k: number;
  ca: number;
  mg: number;
  s: number;
  b: number;
  cu: number;
  fe: number;
  mn: number;
  mo: number;
  zn: number;
}

interface FertilizerData {
  name: string;
  type: 'liquid' | 'powder';
  unit: 'ml' | 'g';
  description?: string;
  composition: FertilizerComposition;
}

interface FertilizerDatabase {
  [key: string]: FertilizerData;
}

// Base fertilizer database
export const BASE_FERTILIZER_DATABASE: FertilizerDatabase = {
  atami_ata_calmag: {
    name: 'Atami ATA CalMag',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 72.616,
      p: 0,
      k: 0,
      ca: 60.87224,
      mg: 18.8739,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0.3756,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_ata_clean: {
    name: 'Atami ATA Clean',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 10.36,
      p: 101.159702,
      k: 65.581649,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0.3885,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_ata_terra_leaves: {
    name: 'Atami ATA Terra Leaves',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 23.69,
      p: 4.944412,
      k: 23.942968,
      ca: 0,
      mg: 6.83199,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_ata_terra_max: {
    name: 'Atami ATA Terra Max',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 24.42,
      p: 8.719272,
      k: 35.939358,
      ca: 0,
      mg: 4.68531,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_bcuzz_bloom_stimulator: {
    name: "Atami B'cuzz Bloom Stimulator",
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 0.998,
      p: 0.78394896,
      k: 1.98849504,
      ca: 1.997996,
      mg: 1.203588,
      s: 0.51896,
      b: 0,
      cu: 0.00499,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0.00499,
    },
  },
  atami_bcuzz_blossom_builder: {
    name: "Atami B'cuzz Blossom Builder",
    type: 'liquid',
    unit: 'ml',
    description: '',
    composition: {
      n: 0,
      p: 108.017728,
      k: 254.0412,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_bcuzz_coco_nutrition_a: {
    name: "Atami B'cuzz Coco Nutrition A",
    type: 'liquid',
    unit: 'ml',
    description: '',
    composition: {
      n: 60.75,
      p: 0,
      k: 50.43465,
      ca: 48.6486,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_bcuzz_coco_nutrition_b: {
    name: "Atami B'cuzz Coco Nutrition B",
    type: 'liquid',
    unit: 'ml',
    description: '',
    composition: {
      n: 0,
      p: 19.847472,
      k: 56.636244,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  atami_bcuzz_premium_plant_powder: {
    name: "Atami B'cuzz Premium Plant Powder",
    type: 'powder',
    unit: 'g',
    description: '',
    composition: {
      n: 90,
      p: 30.548,
      k: 141.134,
      ca: 28.6,
      mg: 18.09,
      s: 0,
      b: 0.2,
      cu: 0.004,
      fe: 0.9,
      mn: 0.4,
      mo: 0.03,
      zn: 0.5,
    },
  },
  athena_blended_bloom_a: {
    name: 'Athena Blended Bloom A',
    type: 'liquid',
    unit: 'ml',
    description: '',
    composition: {
      n: 47.8,
      p: 0,
      k: 49.60445,
      ca: 38.27824,
      mg: 2.0320497,
      s: 0,
      b: 0.1195,
      cu: 0,
      fe: 0.717,
      mn: 0.15535,
      mo: 0.008365,
      zn: 0.053775,
    },
  },
  athena_blended_bloom_b: {
    name: 'Athena Blended Bloom B',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 8.078,
      p: 30.216336,
      k: 47.90254,
      ca: 0,
      mg: 10.8554472,
      s: 15.002,
      b: 0,
      cu: 0.0577,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  athena_blended_camg: {
    name: 'Athena Blended CaMg',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 22.24,
      p: 0,
      k: 0,
      ca: 23.375352,
      mg: 12.23057664,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0.6672,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  athena_blended_grow_a: {
    name: 'Athena Blended Grow A',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 48.36,
      p: 0,
      k: 10.037118,
      ca: 50.828778,
      mg: 2.29643505,
      s: 0,
      b: 0.1209,
      cu: 0,
      fe: 0.7254,
      mn: 0.15717,
      mo: 0.008463,
      zn: 0.054405,
    },
  },
  athena_blended_grow_b: {
    name: 'Athena Blended Grow B',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 11.4,
      p: 14.92488,
      k: 47.3214,
      ca: 0,
      mg: 10.1531934,
      s: 14.82,
      b: 0,
      cu: 0.057,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  athena_blended_pk: {
    name: 'Athena Blended PK',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 0,
      p: 26.655312,
      k: 63.38577,
      ca: 0,
      mg: 14.6404179,
      s: 22.905,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  athena_pro_bloom: {
    name: 'Athena Pro Bloom',
    type: 'powder',
    unit: 'g',
    composition: {
      n: 0,
      p: 52.368,
      k: 199.248,
      ca: 0,
      mg: 30.0294,
      s: 90,
      b: 0,
      cu: 0,
      fe: 1,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  athena_pro_core: {
    name: 'Athena Pro Core',
    type: 'powder',
    unit: 'g',
    composition: {
      n: 140,
      p: 0,
      k: 0,
      ca: 170.17,
      mg: 0,
      s: 0,
      b: 0.15,
      cu: 0.1,
      fe: 0.7,
      mn: 0.25,
      mo: 0.02,
      zn: 0.1,
    },
  },
  athena_pro_fade: {
    name: 'Athena Pro Fade',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 0,
      p: 0,
      k: 0,
      ca: 44.52448,
      mg: 0,
      s: 0,
      b: 0.1112,
      cu: 0.0556,
      fe: 0.6672,
      mn: 0.14456,
      mo: 0.007784,
      zn: 0.05004,
    },
  },
  athena_pro_grow: {
    name: 'Athena Pro Grow',
    type: 'powder',
    unit: 'g',
    composition: {
      n: 20,
      p: 34.912,
      k: 166.04,
      ca: 0,
      mg: 30.0294,
      s: 80,
      b: 0,
      cu: 0,
      fe: 1,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_alg_a_mic: {
    name: 'BioBizz Alg-a-mic',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 2.088,
      p: 0.9112032,
      k: 1.7334576,
      ca: 1.045044,
      mg: 1.04502312,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_bio_bloom: {
    name: 'BioBizz Bio Bloom',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 21.1464,
      p: 30.24828048,
      k: 38.65809696,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_bio_grow: {
    name: 'BioBizz Bio Grow',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 54.6,
      p: 17.0196,
      k: 64.7556,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_bio_heaven: {
    name: 'BioBizz Bio Heaven',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 12.288,
      p: 0.13406208,
      k: 0.17002496,
      ca: 2.855424,
      mg: 0.1234944,
      s: 0,
      b: 0.1024,
      cu: 0,
      fe: 2.56,
      mn: 0,
      mo: 0,
      zn: 0.03072,
    },
  },
  biobizz_calmag: {
    name: 'BioBizz CalMag',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 0,
      p: 0,
      k: 0,
      ca: 35.31528,
      mg: 12.055176,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_fish_mix: {
    name: 'BioBizz Fish Mix',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 61.1,
      p: 5.332808,
      k: 40.580176,
      ca: 0,
      mg: 0,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_root_juice: {
    name: 'BioBizz Root Juice',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 2.3092,
      p: 0.8762912,
      k: 1.08357704,
      ca: 0,
      mg: 0.0605412,
      s: 0,
      b: 0,
      cu: 0,
      fe: 0,
      mn: 0,
      mo: 0,
      zn: 0,
    },
  },
  biobizz_top_max: {
    name: 'BioBizz Top Max',
    type: 'liquid',
    unit: 'ml',
    composition: {
      n: 1.7068,
      p: 0.8762912,
      k: 1.16692912,
      ca: 0,
      mg: 0.1816236,
      s: 0,
      b: 0.11044,
      cu: 0.01004,
      fe: 0.1004,
      mn: 0,
      mo: 0,
      zn: 0.03012,
    },
  },
};

// Recipe version
export const RECIPE_VERSION = '1.0.0';
