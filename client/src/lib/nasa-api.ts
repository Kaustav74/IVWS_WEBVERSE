const NASA_API_KEY = 'EQsIBIvphcfU9kByQzzGOjEgkhbtVbPWba4bbfeA';
const NASA_BASE_URL = 'https://api.nasa.gov';

export interface AstronomyPictureData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface NearEarthObject {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
}

export interface ConstellationData {
  name: string;
  description: string;
  stars: Array<{
    name: string;
    ra: number; // Right Ascension
    dec: number; // Declination
    magnitude: number;
  }>;
  mythology?: string;
  season?: string;
  hemisphere?: string;
}

// Fetch Astronomy Picture of the Day
export async function getAstronomyPicture(date?: string): Promise<AstronomyPictureData> {
  const url = new URL(`${NASA_BASE_URL}/planetary/apod`);
  url.searchParams.append('api_key', NASA_API_KEY);
  if (date) {
    url.searchParams.append('date', date);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }
  
  return response.json();
}

// Fetch Near Earth Objects (for celestial events)
export async function getNearEarthObjects(startDate: string, endDate: string): Promise<NearEarthObject[]> {
  const url = new URL(`${NASA_BASE_URL}/neo/rest/v1/feed`);
  url.searchParams.append('start_date', startDate);
  url.searchParams.append('end_date', endDate);
  url.searchParams.append('api_key', NASA_API_KEY);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`NASA API error: ${response.statusText}`);
  }
  
  const data = await response.json();
  const objects: NearEarthObject[] = [];
  
  // Flatten the date-keyed objects
  Object.values(data.near_earth_objects).forEach((dateObjects: any) => {
    objects.push(...dateObjects);
  });
  
  return objects;
}

// Enhanced constellation data with real astronomical information
export const CONSTELLATION_DATA: ConstellationData[] = [
  {
    name: "Orion",
    description: "The Hunter constellation, one of the most recognizable patterns in the night sky. Contains the famous Orion Nebula (M42).",
    mythology: "In Greek mythology, Orion was a great hunter. The constellation represents Orion facing Taurus the Bull.",
    season: "Winter",
    hemisphere: "Both",
    stars: [
      { name: "Betelgeuse", ra: 88.8, dec: 7.4, magnitude: 0.5 },
      { name: "Rigel", ra: 78.6, dec: -8.2, magnitude: 0.1 },
      { name: "Bellatrix", ra: 81.3, dec: 6.3, magnitude: 1.6 },
      { name: "Mintaka", ra: 83.0, dec: -0.3, magnitude: 2.2 },
      { name: "Alnilam", ra: 84.1, dec: -1.2, magnitude: 1.7 },
      { name: "Alnitak", ra: 85.2, dec: -1.9, magnitude: 1.8 },
      { name: "Saiph", ra: 86.9, dec: -9.7, magnitude: 2.1 }
    ]
  },
  {
    name: "Ursa Major",
    description: "The Great Bear, containing the famous Big Dipper asterism. Used for navigation as it points to Polaris.",
    mythology: "In Greek mythology, this represents Callisto, who was transformed into a bear by Zeus's jealous wife Hera.",
    season: "Spring",
    hemisphere: "Northern",
    stars: [
      { name: "Dubhe", ra: 165.9, dec: 61.8, magnitude: 1.8 },
      { name: "Merak", ra: 165.5, dec: 56.4, magnitude: 2.3 },
      { name: "Phecda", ra: 178.5, dec: 53.7, magnitude: 2.4 },
      { name: "Megrez", ra: 183.9, dec: 57.0, magnitude: 3.3 },
      { name: "Alioth", ra: 193.5, dec: 55.9, magnitude: 1.8 },
      { name: "Mizar", ra: 200.9, dec: 54.9, magnitude: 2.3 },
      { name: "Alkaid", ra: 206.9, dec: 49.3, magnitude: 1.9 }
    ]
  },
  {
    name: "Cassiopeia",
    description: "The Queen constellation, forming a distinctive 'W' shape. Contains several star clusters and nebulae.",
    mythology: "Named after the vain queen Cassiopeia in Greek mythology, who boasted about her beauty.",
    season: "Autumn",
    hemisphere: "Northern",
    stars: [
      { name: "Caph", ra: 9.2, dec: 59.1, magnitude: 2.3 },
      { name: "Schedar", ra: 10.1, dec: 56.5, magnitude: 2.2 },
      { name: "Gamma Cassiopeiae", ra: 14.2, dec: 60.7, magnitude: 2.5 },
      { name: "Ruchbah", ra: 22.8, dec: 57.8, magnitude: 2.7 },
      { name: "Segin", ra: 25.7, dec: 63.7, magnitude: 3.4 }
    ]
  },
  {
    name: "Leo",
    description: "The Lion constellation, featuring the bright star Regulus. Best visible in spring evenings.",
    mythology: "Represents the Nemean Lion killed by Hercules as his first labor.",
    season: "Spring",
    hemisphere: "Both",
    stars: [
      { name: "Regulus", ra: 152.1, dec: 11.9, magnitude: 1.4 },
      { name: "Denebola", ra: 177.3, dec: 14.6, magnitude: 2.1 },
      { name: "Algieba", ra: 154.9, dec: 19.8, magnitude: 2.6 },
      { name: "Zosma", ra: 169.6, dec: 20.5, magnitude: 2.6 },
      { name: "Ras Elased Australis", ra: 149.1, dec: 23.8, magnitude: 2.9 },
      { name: "Adhafera", ra: 156.5, dec: 23.4, magnitude: 3.4 }
    ]
  }
];

// Convert Right Ascension and Declination to screen coordinates
export function convertToScreenCoordinates(
  ra: number, 
  dec: number, 
  screenWidth: number, 
  screenHeight: number,
  centerRA: number = 180, // Center the view around this RA
  centerDec: number = 0   // Center the view around this Dec
): { x: number; y: number } {
  // Normalize RA to 0-360 range
  const normalizedRA = ((ra - centerRA + 180) % 360 + 360) % 360 - 180;
  
  // Convert to screen coordinates (simplified projection)
  const x = ((normalizedRA + 180) / 360) * screenWidth;
  const y = ((90 - dec) / 180) * screenHeight;
  
  return { 
    x: Math.max(0, Math.min(screenWidth, x)), 
    y: Math.max(0, Math.min(screenHeight, y)) 
  };
}