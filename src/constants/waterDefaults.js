export const WATER_DEFAULTS = {
  tapWater: {
    name: 'Leitungswasser',
    ph: 7.5,
    ec: 0.5, // mS/cm
    ca: 50,  // mg/L
    mg: 10,  // mg/L
    na: 20,  // mg/L
    s: 5, // Default for Tap Water
    fe: 0.05, // Default for Tap Water
    mn: 0.02, // Default for Tap Water
    zn: 0.01, // Default for Tap Water
    cu: 0.005, // Default for Tap Water
    b: 0.01, // Default for Tap Water
    mo: 0.001, // Default for Tap Water
  },
  roWater: {
    name: 'Umkehrosmosewasser',
    ph: 6.5,
    ec: 0.05,
    ca: 0,
    mg: 0,
    na: 0,
    s: 0,
    fe: 0,
    mn: 0,
    zn: 0,
    cu: 0,
    b: 0,
    mo: 0,
  },
}; 