/**
 * WarhammAR Unit Database
 * Main entry point for all faction data
 * Data source: Wahapedia.ru (10th Edition)
 */

import { SPACE_MARINES } from './factions/space-marines.js';

export const DATABASE = {
    version: "1.0.0",
    edition: "10th",
    lastUpdate: "2025-11-24",
    source: "Wahapedia.ru",
    attribution: "Unit data from Wahapedia.ru - Community maintained Warhammer 40k database",
    license: "Fair Use for personal app",
    
    factions: [
        SPACE_MARINES
        // More factions to be added:
        // ORKS (10 units) - Coming next
        // NECRONS (10 units)
        // TAU (8 units)
        // CHAOS (7 units)
    ],
    
    // Helper functions
    getAllUnits() {
        return this.factions.flatMap(f => f.units);
    },
    
    getFaction(factionId) {
        return this.factions.find(f => f.id === factionId);
    },
    
    getUnit(unitId) {
        return this.getAllUnits().find(u => u.id === unitId);
    },
    
    searchUnits(searchTerm) {
        const term = searchTerm.toLowerCase();
        return this.getAllUnits().filter(u => 
            u.name.toLowerCase().includes(term) ||
            u.faction.toLowerCase().includes(term) ||
            u.type.toLowerCase().includes(term) ||
            u.keywords.some(k => k.toLowerCase().includes(term))
        );
    },
    
    filterByFaction(factionId) {
        const faction = this.getFaction(factionId);
        return faction ? faction.units : [];
    },
    
    filterByType(type) {
        return this.getAllUnits().filter(u => u.type === type);
    },
    
    getStats() {
        return {
            totalFactions: this.factions.length,
            totalUnits: this.getAllUnits().length,
            unitsByFaction: this.factions.map(f => ({
                faction: f.name,
                count: f.units.length
            })),
            unitsByType: ['HQ', 'Troops', 'Elites', 'Fast Attack', 'Heavy Support'].map(type => ({
                type,
                count: this.filterByType(type).length
            }))
        };
    }
};

// Export for browser usage (no module system)
if (typeof window !== 'undefined') {
    window.WarhammARDatabase = DATABASE;
}

export default DATABASE;
