/**
 * WarhammAR Database Schema
 * Based on Warhammer 40k 10th Edition
 * Data source: Wahapedia.ru
 */

/**
 * @typedef {Object} UnitStats
 * @property {string} M - Movement (e.g., "6\"")
 * @property {number} T - Toughness
 * @property {string} Sv - Save (e.g., "3+")
 * @property {number} W - Wounds
 * @property {number} Ld - Leadership
 * @property {number} OC - Objective Control
 */

/**
 * @typedef {Object} Weapon
 * @property {string} name - Weapon name
 * @property {string} range - Range (e.g., "24\"", "Melee")
 * @property {string|number} A - Attacks (e.g., "2", "D6")
 * @property {string} skill - BS for ranged, WS for melee (e.g., "3+")
 * @property {number} S - Strength
 * @property {number} AP - Armor Penetration
 * @property {string|number} D - Damage (e.g., "1", "D3")
 * @property {string[]} [keywords] - Weapon keywords (e.g., ["ASSAULT", "RAPID FIRE 1"])
 */

/**
 * @typedef {Object} Ability
 * @property {string} name - Ability name
 * @property {string} type - Ability type ("Faction", "Unit", "Wargear")
 * @property {string} description - Ability description
 */

/**
 * @typedef {Object} Unit
 * @property {string} id - Unique unit identifier
 * @property {string} name - Unit name
 * @property {string} faction - Faction name
 * @property {string} type - Unit type (HQ, Troops, Elites, Fast Attack, Heavy Support, etc.)
 * @property {number} points - Points cost
 * @property {Object} models - Model count
 * @property {number} models.min - Minimum models
 * @property {number} models.max - Maximum models
 * @property {UnitStats} stats - Unit statistics
 * @property {Weapon[]} ranged_weapons - Ranged weapons
 * @property {Weapon[]} melee_weapons - Melee weapons
 * @property {Ability[]} abilities - Unit abilities
 * @property {string[]} keywords - Unit keywords
 * @property {Object} source - Data source information
 * @property {string} source.book - Source book
 * @property {number} [source.page] - Page number
 * @property {string} source.edition - Edition
 * @property {string} source_url - URL to Wahapedia page
 * @property {string} [image_url] - Optional image URL
 */

/**
 * @typedef {Object} Faction
 * @property {string} id - Unique faction identifier
 * @property {string} name - Faction name
 * @property {string} color - Faction primary color (hex)
 * @property {string} icon - Faction emoji icon
 * @property {string} description - Faction description
 * @property {Unit[]} units - Faction units
 */

export const SCHEMA_VERSION = "1.0.0";
export const DATA_SOURCE = "Wahapedia.ru (10th Edition)";
export const LAST_UPDATE = "2025-11-24";
