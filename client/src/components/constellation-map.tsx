import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Info, Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { CONSTELLATION_DATA, convertToScreenCoordinates, getAstronomyPicture, type ConstellationData, type AstronomyPictureData } from "@/lib/nasa-api";

export default function ConstellationMap() {
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);
  const [constellations, setConstellations] = useState<ConstellationData[]>(CONSTELLATION_DATA);
  const [astronomyPicture, setAstronomyPicture] = useState<AstronomyPictureData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollY = useParallax();

  useEffect(() => {
    const fetchAstronomyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch today's astronomy picture for background context
        const apod = await getAstronomyPicture();
        setAstronomyPicture(apod);
        
        // Use the pre-defined constellation data with real star positions
        setConstellations(CONSTELLATION_DATA);
        
      } catch (err) {
        console.error('Error fetching NASA data:', err);
        setError('Unable to fetch current astronomy data. Using cached constellation information.');
        // Fallback to static constellation data
        setConstellations(CONSTELLATION_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronomyData();
  }, []);

  // Convert constellation data to screen coordinates
  const processedConstellations = constellations.map(constellation => {
    const screenStars = constellation.stars.map(star => {
      const screenPos = convertToScreenCoordinates(star.ra, star.dec, 100, 100);
      return {
        ...star,
        x: screenPos.x,
        y: screenPos.y,
        size: Math.max(2, 6 - star.magnitude) // Brighter stars (lower magnitude) = larger size
      };
    });

    // Generate connections based on star positions (simplified for major stars)
    const connections: Array<{ from: number; to: number }> = [];
    if (constellation.name === "Orion") {
      // Belt stars and major connections
      connections.push(
        { from: 0, to: 3 }, // Betelgeuse to belt
        { from: 1, to: 3 }, // Rigel to belt
        { from: 3, to: 4 }, // Belt connections
        { from: 4, to: 5 },
        { from: 2, to: 6 }  // Bellatrix to Saiph
      );
    } else if (constellation.name === "Ursa Major") {
      // Big Dipper pattern
      for (let i = 0; i < screenStars.length - 1; i++) {
        connections.push({ from: i, to: i + 1 });
      }
      if (screenStars.length >= 4) {
        connections.push({ from: 3, to: 0 }); // Close the bowl
      }
    } else if (constellation.name === "Cassiopeia") {
      // W pattern
      for (let i = 0; i < Math.min(5, screenStars.length - 1); i++) {
        connections.push({ from: i, to: i + 1 });
      }
    } else if (constellation.name === "Leo") {
      // Sickle and body
      for (let i = 0; i < Math.min(4, screenStars.length - 1); i++) {
        connections.push({ from: i, to: i + 1 });
      }
      if (screenStars.length > 5) {
        connections.push({ from: 0, to: 5 }); // Main body connection
      }
    }

    return {
      ...constellation,
      stars: screenStars,
      connections,
      color: constellation.name === "Orion" ? "#F59E0B" :
             constellation.name === "Ursa Major" ? "#10B981" :
             constellation.name === "Cassiopeia" ? "#EC4899" :
             constellation.name === "Leo" ? "#F59E0B" : "#60A5FA"
    };
  });

  const selectedConstellationData = processedConstellations.find(c => c.name === selectedConstellation);

  return (
    <section className="py-12 sm:py-20 px-4 relative bg-gradient-to-r from-cosmic-purple/20 to-space-blue/20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-8 bg-gradient-to-r from-stellar-gold to-aurora-green bg-clip-text text-transparent">
            Interactive Night Sky
          </h2>
          <p className="text-lg sm:text-xl visible-text max-w-3xl mx-auto mb-6 sm:mb-12 px-4">
            Click on the stars to explore real constellations with NASA astronomical data
          </p>
          {astronomyPicture && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-space-blue/60 backdrop-blur-md rounded-lg p-4 max-w-2xl mx-auto mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <Star className="text-stellar-gold" size={20} />
                <span className="text-stellar-gold font-semibold">Today's Astronomy Highlight</span>
              </div>
              <p className="visible-text text-sm">{astronomyPicture.title}</p>
            </motion.div>
          )}
          {error && (
            <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg p-3 max-w-2xl mx-auto mb-6">
              <p className="text-yellow-200 text-sm">{error}</p>
            </div>
          )}
        </motion.div>
        
        {/* Interactive Constellation Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
          className="relative bg-gradient-to-br from-space-blue/80 to-cosmic-purple/80 rounded-3xl p-4 sm:p-8 border border-stellar-gold/40 max-w-6xl mx-auto backdrop-blur-md"
        >
          <div className="aspect-video bg-gradient-to-br from-space-blue/90 to-cosmic-purple/90 rounded-2xl relative overflow-hidden border border-stellar-gold/20">
            {/* Background stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-space-blue/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-stellar-gold">
                  <Loader2 className="animate-spin" size={24} />
                  <span>Loading NASA astronomical data...</span>
                </div>
              </div>
            )}

            {/* Constellation stars and lines */}
            {!loading && processedConstellations.map((constellation, index) => (
              <div
                key={constellation.name}
                className={`absolute inset-0 ${selectedConstellation === constellation.name ? 'constellation-active' : ''}`}
              >
                {/* Constellation lines */}
                <svg className="absolute inset-0 w-full h-full constellation-lines">
                  {constellation.connections.map((connection, connIndex) => {
                    const fromStar = constellation.stars[connection.from];
                    const toStar = constellation.stars[connection.to];
                    return (
                      <motion.line
                        key={connIndex}
                        x1={`${fromStar.x}%`}
                        y1={`${fromStar.y}%`}
                        x2={`${toStar.x}%`}
                        y2={`${toStar.y}%`}
                        stroke={constellation.color}
                        strokeWidth="2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ 
                          pathLength: selectedConstellation === constellation.name ? 1 : 0,
                          opacity: selectedConstellation === constellation.name ? 0.8 : 0
                        }}
                        transition={{ duration: 1, delay: connIndex * 0.2 }}
                      />
                    );
                  })}
                </svg>

                {/* Constellation stars */}
                {constellation.stars.map((star, starIndex) => (
                  <motion.div
                    key={starIndex}
                    className="absolute rounded-full cursor-pointer constellation-star z-10"
                    style={{ 
                      top: `${star.y}%`, 
                      left: `${star.x}%`,
                      width: `${star.size}px`,
                      height: `${star.size}px`,
                      backgroundColor: constellation.color,
                      boxShadow: `0 0 ${star.size * 2}px ${constellation.color}`
                    }}
                    whileHover={{ scale: 1.5 }}
                    animate={{ 
                      opacity: [0.7, 1, 0.7],
                      scale: selectedConstellation === constellation.name ? 1.3 : 1
                    }}
                    transition={{ 
                      opacity: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.3 }
                    }}
                    onClick={() => setSelectedConstellation(
                      selectedConstellation === constellation.name ? null : constellation.name
                    )}
                    title={`${star.name} (${constellation.name})`}
                  />
                ))}
              </div>
            ))}
            
            {/* Instruction overlay when no constellation selected */}
            {!loading && !selectedConstellation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Search className="mx-auto text-stellar-gold" size={48} />
                  </motion.div>
                  <p className="visible-text text-lg sm:text-xl font-semibold mb-2">Click on the stars</p>
                  <p className="text-gray-300 text-sm sm:text-base">to explore NASA astronomical data</p>
                </div>
              </motion.div>
            )}
            
            {/* Constellation info panel */}
            {selectedConstellationData && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className="absolute top-4 right-4 bg-space-blue/90 backdrop-blur-md border border-stellar-gold/40 rounded-2xl p-4 sm:p-6 max-w-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg sm:text-xl font-semibold visible-text">
                    {selectedConstellationData.name}
                  </h3>
                  <button
                    onClick={() => setSelectedConstellation(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <p className="visible-text text-sm mb-3 leading-relaxed">
                  {selectedConstellationData.description}
                </p>
                {selectedConstellationData.mythology && (
                  <p className="text-gray-300 text-xs mb-3 italic">
                    {selectedConstellationData.mythology}
                  </p>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-400">
                    <div>{selectedConstellationData.stars.length} stars</div>
                    {selectedConstellationData.season && (
                      <div>Best seen: {selectedConstellationData.season}</div>
                    )}
                    {selectedConstellationData.hemisphere && (
                      <div>Hemisphere: {selectedConstellationData.hemisphere}</div>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-stellar-gold to-aurora-green text-space-blue rounded-full hover:scale-105 transition-transform"
                >
                  <Info className="mr-1" size={14} />
                  View NASA Details
                </Button>
              </motion.div>
            )}
          </div>
          
          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-4 sm:gap-8 text-sm"
          >
            <div className="flex items-center">
              <div className="w-3 h-3 bg-stellar-gold rounded-full mr-2 shadow-glow"></div>
              <span className="visible-text">Navigation Stars</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-aurora-green rounded-full mr-2 shadow-glow"></div>
              <span className="visible-text">Major Constellations</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-nebula-pink rounded-full mr-2 shadow-glow"></div>
              <span className="visible-text">Royal Constellations</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
