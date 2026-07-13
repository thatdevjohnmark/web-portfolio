/**
 * RB19 2023 Victory Journey — Race Data
 *
 * All 22 Grand Prix races in the 2023 F1 season, ordered
 * chronologically. Red Bull won 21 of the 22 races.
 */

export interface RaceEnv {
  sky: string;
  horizon: string;
  ground: string;
  accent: string;
  mood: string;
}

export interface RaceWin {
  round: number;
  winNumber: number;      // sequential RBR win (0 = non-win race)
  gp: string;
  shortName: string;
  circuit: string;
  location: string;
  country: string;
  flag: string;
  date: string;
  driver: string;
  driverShort: string;
  p2: string;
  p3: string;
  pole: boolean;
  fastestLap: boolean;
  pts: number;            // RBR constructors pts AFTER this race
  cumulativeWins: number;
  consecutiveWins: number;
  env: RaceEnv;
}

export const RACE_WINS: RaceWin[] = [
  {
    round: 1, winNumber: 1,
    gp: 'Bahrain Grand Prix', shortName: 'BAHRAIN',
    circuit: 'Bahrain International Circuit', location: 'Sakhir', country: 'Bahrain', flag: '🇧🇭',
    date: '5 Mar 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Sergio Pérez', p3: 'Fernando Alonso', pole: true, fastestLap: false,
    pts: 44, cumulativeWins: 1, consecutiveWins: 1,
    env: { sky: '#0a0518', horizon: '#1a0a2e', ground: '#0d0820', accent: '#7b4fc8', mood: 'Desert Night' },
  },
  {
    round: 2, winNumber: 2,
    gp: 'Saudi Arabian Grand Prix', shortName: 'SAUDI ARABIA',
    circuit: 'Jeddah Corniche Circuit', location: 'Jeddah', country: 'Saudi Arabia', flag: '🇸🇦',
    date: '19 Mar 2023', driver: 'Sergio Pérez', driverShort: 'PER',
    p2: 'Max Verstappen', p3: 'Fernando Alonso', pole: false, fastestLap: true,
    pts: 87, cumulativeWins: 2, consecutiveWins: 2,
    env: { sky: '#08080f', horizon: '#1a1428', ground: '#0f0c1a', accent: '#5533bb', mood: 'Street Night' },
  },
  {
    round: 3, winNumber: 3,
    gp: 'Australian Grand Prix', shortName: 'AUSTRALIA',
    circuit: 'Albert Park Circuit', location: 'Melbourne', country: 'Australia', flag: '🇦🇺',
    date: '2 Apr 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lewis Hamilton', p3: 'Fernando Alonso', pole: true, fastestLap: false,
    pts: 131, cumulativeWins: 3, consecutiveWins: 3,
    env: { sky: '#091822', horizon: '#0f2a3a', ground: '#0a1e28', accent: '#1a88c8', mood: 'Bright Afternoon' },
  },
  {
    round: 4, winNumber: 4,
    gp: 'Azerbaijan Grand Prix', shortName: 'AZERBAIJAN',
    circuit: 'Baku City Circuit', location: 'Baku', country: 'Azerbaijan', flag: '🇦🇿',
    date: '30 Apr 2023', driver: 'Sergio Pérez', driverShort: 'PER',
    p2: 'Max Verstappen', p3: 'Lance Stroll', pole: true, fastestLap: false,
    pts: 173, cumulativeWins: 4, consecutiveWins: 4,
    env: { sky: '#050a1a', horizon: '#0a1530', ground: '#060e22', accent: '#2244cc', mood: 'City Dusk' },
  },
  {
    round: 5, winNumber: 5,
    gp: 'Miami Grand Prix', shortName: 'MIAMI',
    circuit: 'Miami International Autodrome', location: 'Miami', country: 'USA', flag: '🇺🇸',
    date: '7 May 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Fernando Alonso', p3: 'George Russell', pole: false, fastestLap: false,
    pts: 206, cumulativeWins: 5, consecutiveWins: 5,
    env: { sky: '#0a1520', horizon: '#1a2f40', ground: '#0d1e2e', accent: '#00c4e8', mood: 'Miami Neon' },
  },
  {
    round: 6, winNumber: 6,
    gp: 'Monaco Grand Prix', shortName: 'MONACO',
    circuit: 'Circuit de Monaco', location: 'Monte Carlo', country: 'Monaco', flag: '🇲🇨',
    date: '28 May 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Fernando Alonso', p3: 'Esteban Ocon', pole: false, fastestLap: false,
    pts: 237, cumulativeWins: 6, consecutiveWins: 6,
    env: { sky: '#06101e', horizon: '#0e2040', ground: '#081428', accent: '#4488ff', mood: 'Marina Shimmer' },
  },
  {
    round: 7, winNumber: 7,
    gp: 'Spanish Grand Prix', shortName: 'SPAIN',
    circuit: 'Circuit de Barcelona-Catalunya', location: 'Barcelona', country: 'Spain', flag: '🇪🇸',
    date: '4 Jun 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lewis Hamilton', p3: 'George Russell', pole: true, fastestLap: false,
    pts: 272, cumulativeWins: 7, consecutiveWins: 7,
    env: { sky: '#0c1408', horizon: '#1a2a10', ground: '#0e1a0a', accent: '#88cc44', mood: 'Mediterranean Sun' },
  },
  {
    round: 8, winNumber: 8,
    gp: 'Canadian Grand Prix', shortName: 'CANADA',
    circuit: 'Circuit Gilles Villeneuve', location: 'Montreal', country: 'Canada', flag: '🇨🇦',
    date: '18 Jun 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Fernando Alonso', p3: 'Lewis Hamilton', pole: true, fastestLap: true,
    pts: 311, cumulativeWins: 8, consecutiveWins: 8,
    env: { sky: '#081014', horizon: '#10202c', ground: '#0a1820', accent: '#22aacc', mood: 'Northern Sky' },
  },
  {
    round: 9, winNumber: 9,
    gp: 'Austrian Grand Prix', shortName: 'AUSTRIA',
    circuit: 'Red Bull Ring', location: 'Spielberg', country: 'Austria', flag: '🇦🇹',
    date: '2 Jul 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Charles Leclerc', p3: 'Sergio Pérez', pole: true, fastestLap: false,
    pts: 354, cumulativeWins: 9, consecutiveWins: 9,
    env: { sky: '#061008', horizon: '#102a14', ground: '#081410', accent: '#44cc66', mood: 'Alpine Green' },
  },
  {
    round: 10, winNumber: 10,
    gp: 'British Grand Prix', shortName: 'GREAT BRITAIN',
    circuit: 'Silverstone Circuit', location: 'Silverstone', country: 'UK', flag: '🇬🇧',
    date: '9 Jul 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lando Norris', p3: 'Sergio Pérez', pole: true, fastestLap: false,
    pts: 397, cumulativeWins: 10, consecutiveWins: 10,
    env: { sky: '#0a0e14', horizon: '#141e28', ground: '#0c121c', accent: '#aabbcc', mood: 'Overcast Coolness' },
  },
  {
    round: 11, winNumber: 11,
    gp: 'Hungarian Grand Prix', shortName: 'HUNGARY',
    circuit: 'Hungaroring', location: 'Budapest', country: 'Hungary', flag: '🇭🇺',
    date: '23 Jul 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lando Norris', p3: 'Sergio Pérez', pole: true, fastestLap: false,
    pts: 440, cumulativeWins: 11, consecutiveWins: 11,
    env: { sky: '#0e0a04', horizon: '#2a1c08', ground: '#180e04', accent: '#cc8822', mood: 'Eastern Warmth' },
  },

  {
    round: 12, winNumber: 12,
    gp: 'Belgian Grand Prix', shortName: 'BELGIUM',
    circuit: 'Circuit de Spa-Francorchamps', location: 'Spa', country: 'Belgium', flag: '🇧🇪',
    date: '30 Jul 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Sergio Pérez', p3: 'Carlos Sainz', pole: true, fastestLap: false,
    pts: 481, cumulativeWins: 12, consecutiveWins: 12,
    env: { sky: '#060c04', horizon: '#0e1e08', ground: '#08100a', accent: '#55aa33', mood: 'Ardennes Forest' },
  },
  {
    round: 13, winNumber: 13,
    gp: 'Dutch Grand Prix', shortName: 'NETHERLANDS',
    circuit: 'Circuit Zandvoort', location: 'Zandvoort', country: 'Netherlands', flag: '🇳🇱',
    date: '27 Aug 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Fernando Alonso', p3: 'Pierre Gasly', pole: true, fastestLap: false,
    pts: 524, cumulativeWins: 13, consecutiveWins: 13,
    env: { sky: '#050a14', horizon: '#0a1828', ground: '#071020', accent: '#ee6600', mood: 'North Sea Haze' },
  },
  {
    round: 14, winNumber: 14,
    gp: 'Italian Grand Prix', shortName: 'ITALY',
    circuit: 'Autodromo Nazionale Monza', location: 'Monza', country: 'Italy', flag: '🇮🇹',
    date: '3 Sep 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Sergio Pérez', p3: 'Carlos Sainz', pole: true, fastestLap: false,
    pts: 567, cumulativeWins: 14, consecutiveWins: 14,
    env: { sky: '#060a04', horizon: '#101a0a', ground: '#080c06', accent: '#66bb44', mood: 'Monza Forest' },
  },
  {
    round: 15, winNumber: 0,
    gp: 'Singapore Grand Prix', shortName: 'SINGAPORE',
    circuit: 'Marina Bay Street Circuit', location: 'Singapore', country: 'Singapore', flag: '🇸🇬',
    date: '17 Sep 2023', driver: 'Carlos Sainz', driverShort: 'SAI',
    p2: 'Lando Norris', p3: 'Lewis Hamilton', pole: false, fastestLap: false,
    pts: 567, cumulativeWins: 14, consecutiveWins: 0,
    env: { sky: '#020610', horizon: '#06101e', ground: '#040810', accent: '#4466ff', mood: 'Night Circuit' },
  },
  {
    round: 16, winNumber: 15,
    gp: 'Japanese Grand Prix', shortName: 'JAPAN',
    circuit: 'Suzuka International Racing Course', location: 'Suzuka', country: 'Japan', flag: '🇯🇵',
    date: '24 Sep 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lando Norris', p3: 'Oscar Piastri', pole: false, fastestLap: false,
    pts: 607, cumulativeWins: 15, consecutiveWins: 1,
    env: { sky: '#0a0608', horizon: '#200c14', ground: '#140810', accent: '#ffaacc', mood: 'Cherry Blossom' },
  },
  {
    round: 17, winNumber: 16,
    gp: 'Qatar Grand Prix', shortName: 'QATAR',
    circuit: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', flag: '🇶🇦',
    date: '8 Oct 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lando Norris', p3: 'George Russell', pole: true, fastestLap: false,
    pts: 652, cumulativeWins: 16, consecutiveWins: 2,
    env: { sky: '#0a0608', horizon: '#1e1004', ground: '#14080a', accent: '#ffaa22', mood: 'Desert Twilight' },
  },
  {
    round: 18, winNumber: 17,
    gp: 'United States Grand Prix', shortName: 'UNITED STATES',
    circuit: 'Circuit of the Americas', location: 'Austin', country: 'USA', flag: '🇺🇸',
    date: '22 Oct 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lewis Hamilton', p3: 'Lando Norris', pole: true, fastestLap: false,
    pts: 695, cumulativeWins: 17, consecutiveWins: 3,
    env: { sky: '#0c0804', horizon: '#241606', ground: '#180e04', accent: '#dd6600', mood: 'Texas Sunset' },
  },
  {
    round: 19, winNumber: 18,
    gp: 'Mexico City Grand Prix', shortName: 'MEXICO',
    circuit: 'Autodromo Hermanos Rodriguez', location: 'Mexico City', country: 'Mexico', flag: '🇲🇽',
    date: '29 Oct 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lewis Hamilton', p3: 'Charles Leclerc', pole: true, fastestLap: false,
    pts: 738, cumulativeWins: 18, consecutiveWins: 4,
    env: { sky: '#050a08', horizon: '#0a1c10', ground: '#06120a', accent: '#22cc66', mood: 'High Altitude' },
  },
  {
    round: 20, winNumber: 19,
    gp: 'São Paulo Grand Prix', shortName: 'SÃO PAULO',
    circuit: 'Autodromo Jose Carlos Pace', location: 'São Paulo', country: 'Brazil', flag: '🇧🇷',
    date: '5 Nov 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Lando Norris', p3: 'Fernando Alonso', pole: false, fastestLap: false,
    pts: 777, cumulativeWins: 19, consecutiveWins: 5,
    env: { sky: '#06060a', horizon: '#100814', ground: '#0a060e', accent: '#886688', mood: 'Interlagos Storm' },
  },
  {
    round: 21, winNumber: 20,
    gp: 'Las Vegas Grand Prix', shortName: 'LAS VEGAS',
    circuit: 'Las Vegas Strip Circuit', location: 'Las Vegas', country: 'USA', flag: '🇺🇸',
    date: '18 Nov 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Charles Leclerc', p3: 'Sergio Pérez', pole: false, fastestLap: false,
    pts: 797, cumulativeWins: 20, consecutiveWins: 6,
    env: { sky: '#020208', horizon: '#080420', ground: '#04020e', accent: '#cc44ff', mood: 'Neon Circus' },
  },
  {
    round: 22, winNumber: 21,
    gp: 'Abu Dhabi Grand Prix', shortName: 'ABU DHABI',
    circuit: 'Yas Marina Circuit', location: 'Abu Dhabi', country: 'UAE', flag: '🇦🇪',
    date: '26 Nov 2023', driver: 'Max Verstappen', driverShort: 'VER',
    p2: 'Charles Leclerc', p3: 'George Russell', pole: true, fastestLap: false,
    pts: 860, cumulativeWins: 21, consecutiveWins: 7,
    env: { sky: '#040a12', horizon: '#0a1a2a', ground: '#061020', accent: '#44aaff', mood: 'Yas Marina Blue' },
  },
];

// ── Derived helpers ───────────────────────────────────────────
export const TOTAL_ROUNDS = 22;
export const TOTAL_WINS   = 21;

/** Given journey progress 0→1, return the race index currently "passing" (0-based). */
export function progressToRaceIndex(t: number): number {
  return Math.min(
    RACE_WINS.length - 1,
    Math.floor(t * RACE_WINS.length)
  );
}

/** Fraction within the current race segment (0→1). */
export function progressWithinRace(t: number): number {
  const segment = 1 / RACE_WINS.length;
  const idx     = progressToRaceIndex(t);
  return (t - idx * segment) / segment;
}
