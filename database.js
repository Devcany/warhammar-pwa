/**
 * WarhammAR Unit Database - Standalone Bundle
 * Data source: Wahapedia.ru (10th Edition)
 * No module system required - works in browser
 */

const WARHAMMER_DATABASE = {
    version: "1.0.0",
    edition: "10th",
    lastUpdate: "2025-11-24",
    source: "Wahapedia.ru",
    attribution: "Unit data from Wahapedia.ru - Community maintained Warhammer 40k database",
    license: "Fair Use for personal app",
    sourceUrl: "https://wahapedia.ru/wh40k10ed/",
    
    factions: [
        // SPACE MARINES
        {
            id: "space-marines",
            name: "Space Marines",
            color: "#0051a5",
            icon: "⚔️",
            description: "The Adeptus Astartes are humanity's greatest warriors.",
            
            units: [
                // HQ
                {
                    id: "sm-captain",
                    name: "Captain",
                    faction: "Space Marines",
                    type: "HQ",
                    points: 80,
                    models: { min: 1, max: 1 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 5, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Master-crafted boltgun", range: "24\"", A: 4, skill: "2+", S: 4, AP: 0, D: 2 },
                        { name: "Master-crafted power weapon", range: "Melee", A: 6, skill: "2+", S: 5, AP: -2, D: 2 }
                    ],
                    abilities: ["Oath of Moment", "Rites of Battle", "Lead by Example"],
                    keywords: ["Infantry", "Character", "Imperium", "Captain"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Captain"
                },
                {
                    id: "sm-librarian",
                    name: "Librarian",
                    faction: "Space Marines",
                    type: "HQ",
                    points: 75,
                    models: { min: 1, max: 1 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 4, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Smite", range: "24\"", A: "D6", skill: "3+", S: 5, AP: -1, D: "D3" },
                        { name: "Force weapon", range: "Melee", A: 4, skill: "3+", S: 6, AP: -1, D: "D3" }
                    ],
                    abilities: ["Oath of Moment", "Psychic Hood"],
                    keywords: ["Infantry", "Character", "Psyker", "Librarian"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Librarian"
                },
                
                // TROOPS
                {
                    id: "sm-intercessor-squad",
                    name: "Intercessor Squad",
                    faction: "Space Marines",
                    type: "Troops",
                    points: 90,
                    models: { min: 5, max: 10 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 2, Ld: 6, OC: 2 },
                    weapons: [
                        { name: "Bolt rifle", range: "24\"", A: 2, skill: "3+", S: 4, AP: -1, D: 1 },
                        { name: "Close combat weapon", range: "Melee", A: 3, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Bolter Discipline"],
                    keywords: ["Infantry", "Battleline", "Imperium", "Intercessor"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Intercessor-Squad"
                },
                {
                    id: "sm-tactical-squad",
                    name: "Tactical Squad",
                    faction: "Space Marines",
                    type: "Troops",
                    points: 90,
                    models: { min: 5, max: 10 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 2, Ld: 6, OC: 2 },
                    weapons: [
                        { name: "Boltgun", range: "24\"", A: 2, skill: "3+", S: 4, AP: 0, D: 1 },
                        { name: "Close combat weapon", range: "Melee", A: 2, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Adaptable"],
                    keywords: ["Infantry", "Battleline", "Tactical"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Tactical-Squad"
                },
                {
                    id: "sm-incursor-squad",
                    name: "Incursor Squad",
                    faction: "Space Marines",
                    type: "Troops",
                    points: 100,
                    models: { min: 5, max: 10 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 2, Ld: 6, OC: 2 },
                    weapons: [
                        { name: "Occulus bolt carbine", range: "24\"", A: 2, skill: "3+", S: 4, AP: 0, D: 1 },
                        { name: "Close combat weapon", range: "Melee", A: 3, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Multi-spectrum Array", "Paired Combat Blades"],
                    keywords: ["Infantry", "Battleline", "Phobos", "Incursor"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Incursor-Squad"
                },
                
                // ELITES
                {
                    id: "sm-terminator-squad",
                    name: "Terminator Squad",
                    faction: "Space Marines",
                    type: "Elites",
                    points: 200,
                    models: { min: 5, max: 10 },
                    stats: { M: "5\"", T: 5, Sv: "2+", W: 3, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Storm bolter", range: "24\"", A: 2, skill: "3+", S: 4, AP: 0, D: 1 },
                        { name: "Power fist", range: "Melee", A: 3, skill: "3+", S: 8, AP: -2, D: 2 }
                    ],
                    abilities: ["Oath of Moment", "Terminators (4++ save)", "Teleport Strike"],
                    keywords: ["Infantry", "Terminator"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Terminator-Squad"
                },
                {
                    id: "sm-bladeguard-veterans",
                    name: "Bladeguard Veterans",
                    faction: "Space Marines",
                    type: "Elites",
                    points: 90,
                    models: { min: 3, max: 6 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 3, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Heavy bolt pistol", range: "18\"", A: 1, skill: "3+", S: 4, AP: -1, D: 1 },
                        { name: "Master-crafted power weapon", range: "Melee", A: 4, skill: "3+", S: 5, AP: -2, D: 2 }
                    ],
                    abilities: ["Oath of Moment", "Storm Shield (4++ save)", "Swords of the Imperium"],
                    keywords: ["Infantry", "Bladeguard"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Bladeguard-Veterans"
                },
                {
                    id: "sm-dreadnought",
                    name: "Dreadnought",
                    faction: "Space Marines",
                    type: "Elites",
                    points: 145,
                    models: { min: 1, max: 1 },
                    stats: { M: "6\"", T: 9, Sv: "2+", W: 8, Ld: 6, OC: 3 },
                    weapons: [
                        { name: "Assault cannon", range: "24\"", A: 6, skill: "3+", S: 6, AP: 0, D: 1 },
                        { name: "Dreadnought combat weapon", range: "Melee", A: 5, skill: "3+", S: 12, AP: -2, D: 3 }
                    ],
                    abilities: ["Oath of Moment", "Duty Eternal"],
                    keywords: ["Vehicle", "Walker", "Dreadnought"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Dreadnought"
                },
                {
                    id: "sm-primaris-apothecary",
                    name: "Primaris Apothecary",
                    faction: "Space Marines",
                    type: "Elites",
                    points: 55,
                    models: { min: 1, max: 1 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 4, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Absolver bolt pistol", range: "18\"", A: 1, skill: "3+", S: 5, AP: -1, D: 2 },
                        { name: "Close combat weapon", range: "Melee", A: 4, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Narthecium", "Combat Restoratives"],
                    keywords: ["Infantry", "Character", "Apothecary"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Primaris-Apothecary"
                },
                
                // FAST ATTACK
                {
                    id: "sm-assault-squad",
                    name: "Assault Squad",
                    faction: "Space Marines",
                    type: "Fast Attack",
                    points: 110,
                    models: { min: 5, max: 10 },
                    stats: { M: "12\"", T: 4, Sv: "3+", W: 2, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Bolt pistol", range: "12\"", A: 1, skill: "3+", S: 4, AP: 0, D: 1 },
                        { name: "Chainsword", range: "Melee", A: 4, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Hammer of Wrath"],
                    keywords: ["Infantry", "Fly", "Jump Pack", "Assault"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Assault-Squad"
                },
                {
                    id: "sm-outrider-squad",
                    name: "Outrider Squad",
                    faction: "Space Marines",
                    type: "Fast Attack",
                    points: 75,
                    models: { min: 3, max: 6 },
                    stats: { M: "12\"", T: 5, Sv: "3+", W: 4, Ld: 6, OC: 2 },
                    weapons: [
                        { name: "Twin bolt rifle", range: "24\"", A: 2, skill: "3+", S: 4, AP: -1, D: 1 },
                        { name: "Close combat weapon", range: "Melee", A: 3, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Turbo-boost"],
                    keywords: ["Mounted", "Fly", "Outrider"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Outrider-Squad"
                },
                
                // HEAVY SUPPORT
                {
                    id: "sm-devastator-squad",
                    name: "Devastator Squad",
                    faction: "Space Marines",
                    type: "Heavy Support",
                    points: 105,
                    models: { min: 5, max: 10 },
                    stats: { M: "6\"", T: 4, Sv: "3+", W: 2, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Heavy bolter", range: "36\"", A: 3, skill: "3+", S: 5, AP: -1, D: 2 },
                        { name: "Missile launcher", range: "48\"", A: "D6", skill: "3+", S: 9, AP: -2, D: "D6" }
                    ],
                    abilities: ["Oath of Moment", "Signum"],
                    keywords: ["Infantry", "Devastator"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Devastator-Squad"
                },
                {
                    id: "sm-predator-annihilator",
                    name: "Predator Annihilator",
                    faction: "Space Marines",
                    type: "Heavy Support",
                    points: 130,
                    models: { min: 1, max: 1 },
                    stats: { M: "10\"", T: 10, Sv: "3+", W: 11, Ld: 6, OC: 3 },
                    weapons: [
                        { name: "Predator twin lascannon", range: "48\"", A: 2, skill: "3+", S: 12, AP: -3, D: "D6+1" },
                        { name: "Lascannon", range: "48\"", A: 1, skill: "3+", S: 12, AP: -3, D: "D6+1" }
                    ],
                    abilities: ["Oath of Moment", "Annihilator"],
                    keywords: ["Vehicle", "Predator"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Predator-Annihilator"
                },
                {
                    id: "sm-repulsor-executioner",
                    name: "Repulsor Executioner",
                    faction: "Space Marines",
                    type: "Heavy Support",
                    points: 220,
                    models: { min: 1, max: 1 },
                    stats: { M: "10\"", T: 12, Sv: "3+", W: 16, Ld: 6, OC: 5 },
                    weapons: [
                        { name: "Macro plasma incinerator", range: "36\"", A: "D6+1", skill: "3+", S: 8, AP: -3, D: 2 },
                        { name: "Twin heavy bolter", range: "36\"", A: 3, skill: "3+", S: 5, AP: -1, D: 2 }
                    ],
                    abilities: ["Oath of Moment", "Executioner"],
                    keywords: ["Vehicle", "Transport", "Fly", "Repulsor"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Repulsor-Executioner"
                },
                {
                    id: "sm-eradicator-squad",
                    name: "Eradicator Squad",
                    faction: "Space Marines",
                    type: "Heavy Support",
                    points: 95,
                    models: { min: 3, max: 6 },
                    stats: { M: "5\"", T: 6, Sv: "3+", W: 3, Ld: 6, OC: 1 },
                    weapons: [
                        { name: "Melta rifle", range: "18\"", A: 1, skill: "3+", S: 9, AP: -4, D: "D6" },
                        { name: "Close combat weapon", range: "Melee", A: 3, skill: "3+", S: 4, AP: 0, D: 1 }
                    ],
                    abilities: ["Oath of Moment", "Total Obliteration"],
                    keywords: ["Infantry", "Gravis", "Eradicator"],
                    source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Eradicator-Squad"
                }
            ]
        }
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
        if (!searchTerm) return this.getAllUnits();
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
            totalPoints: this.getAllUnits().reduce((sum, u) => sum + u.points, 0),
            unitsByFaction: this.factions.map(f => ({
                faction: f.name,
                count: f.units.length,
                points: f.units.reduce((sum, u) => sum + u.points, 0)
            })),
            unitsByType: ['HQ', 'Troops', 'Elites', 'Fast Attack', 'Heavy Support'].map(type => ({
                type,
                count: this.filterByType(type).length
            }))
        };
    }
};

// Make available globally
if (typeof window !== 'undefined') {
    window.WARHAMMER_DATABASE = WARHAMMER_DATABASE;
}
