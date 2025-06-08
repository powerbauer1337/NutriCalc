export function calculateNutrientResults({ waterVolume, growthStage, waterType, selectedFertilizers, fertilizerDatabase, customWaterProfile, NUTRIENT_FIELDS, GROWTH_STAGES, WATER_TYPES, mixedWater }) {
  if (waterVolume <= 0) {
    return { nutrients: {}, contributions: {}, stage: GROWTH_STAGES[growthStage] };
  }
  let baseN = { ca: 0, mg: 0, s: 0, na: 0, cl: 0, no3: 0, so4: 0, po4: 0 };
  let currentEC = 0;
  let basePH = 0;

  if (mixedWater) {
    baseN = {
      ca: mixedWater.ca || 0,
      mg: mixedWater.mg || 0,
      s: 0, // S is not in mixedWater for now
      na: mixedWater.na || 0,
      cl: 0, no3: 0, so4: 0, po4: 0 // Assume these are 0 for mixed water unless specified
    };
    currentEC = mixedWater.ec || 0;
    basePH = mixedWater.ph || 0;
  } else if (waterType === 'custom') {
    baseN = {
      ca: customWaterProfile.ca || 0,
      mg: customWaterProfile.mg || 0,
      s: customWaterProfile.s || 0,
      na: customWaterProfile.na || 0,
      cl: customWaterProfile.cl || 0,
      no3: customWaterProfile.no3 || 0,
      so4: customWaterProfile.so4 || 0,
      po4: customWaterProfile.po4 || 0,
    };
    currentEC = customWaterProfile.baseEC || 0;
    basePH = customWaterProfile.ph || 0; // Assuming customWaterProfile might have pH
  } else {
    const pWater = WATER_TYPES[waterType];
    baseN = { ca: pWater.ca || 0, mg: pWater.mg || 0, s: pWater.s || 0, na: 0, cl: 0, no3: 0, so4: 0, po4: 0 };
    currentEC = pWater.baseEC !== undefined ? pWater.baseEC : 0;
    basePH = pWater.ph || 0; // Assuming WATER_TYPES might have pH
  }

  let tN = NUTRIENT_FIELDS.reduce((acc, f) => { acc[f.key] = 0; return acc; }, {});
  tN.ca = baseN.ca; tN.mg = baseN.mg; tN.s = baseN.s;
  tN.na = baseN.na; tN.cl = baseN.cl; tN.no3 = baseN.no3; tN.so4 = baseN.so4; tN.po4 = baseN.po4;
  tN.ec = currentEC;
  tN.ph = basePH; // Add pH to the results

  let contrib = {};
  let nutrEC = 0;
  (selectedFertilizers || []).forEach(fert => {
    if (!fert.active || !fert.amount || Number(fert.amount) === 0) return;
    const fD = fertilizerDatabase[fert.id];
    if (!fD?.composition) return;
    const cFC = {};
    const fA = Number(fert.amount);
    Object.keys(fD.composition).forEach(nk => {
      const nC = Number(fD.composition[nk]) || 0;
      if (nC === 0 || !NUTRIENT_FIELDS.find(field => field.key === nk)) return;
      let nVppm = (fD.type === 'powder') ? (fA * nC * 10) / waterVolume : (fA * nC) / waterVolume;
      cFC[nk] = nVppm;
      tN[nk] = (tN[nk] || 0) + nVppm;
    });
    contrib[fert.id] = cFC;
  });

  nutrEC = (
    ((tN.n || 0) - (baseN.n || 0)) * 0.007 +
    ((tN.p || 0) - (baseN.p || 0)) * 0.005 +
    ((tN.k || 0) - (baseN.k || 0)) * 0.008 +
    ((tN.ca || 0) - baseN.ca) * 0.006 +
    ((tN.mg || 0) - baseN.mg) * 0.004 +
    ((tN.s || 0) - baseN.s) * 0.003
  );
  tN.ec = currentEC + Math.max(0, nutrEC);
  
  Object.keys(tN).forEach(k => { tN[k] = Math.round(tN[k] * 100) / 100; });
  
  return { nutrients: tN, contributions: contrib, stage: GROWTH_STAGES[growthStage] };
} 