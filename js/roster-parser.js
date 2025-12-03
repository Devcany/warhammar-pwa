/**
 * NewRecruit.eu Roster JSON Parser
 * Parses army list JSON from NewRecruit.eu into usable data structure
 */

class RosterParser {
  /**
   * Parse NewRecruit.eu JSON roster
   * @param {Object} jsonData - Raw JSON data from NewRecruit.eu
   * @returns {Object} Parsed army data
   */
  parse(jsonData) {
    try {
      const roster = jsonData.roster;

      if (!roster) {
        throw new Error('Invalid roster format: missing roster object');
      }

      return {
        name: roster.name || 'Unnamed Army',
        gameSystem: roster.gameSystemName || 'Warhammer 40,000',
        faction: this.extractFaction(roster),
        points: {
          current: roster.costs?.[0]?.value || 0,
          limit: roster.costLimits?.[0]?.value || 2000
        },
        units: this.extractUnits(roster.forces?.[0]?.selections || []),
        rules: this.extractArmyRules(roster.forces?.[0]?.rules || [])
      };
    } catch (error) {
      console.error('Failed to parse roster:', error);
      throw new Error(`Roster parsing failed: ${error.message}`);
    }
  }

  /**
   * Extract faction from roster
   */
  extractFaction(roster) {
    const catalogueName = roster.forces?.[0]?.catalogueName || roster.catalogueName || '';

    // Extract faction from catalogue name (e.g., "Imperium - Adeptus Astartes - White Scars")
    const parts = catalogueName.split(' - ');
    if (parts.length >= 2) {
      return parts[1]; // "Adeptus Astartes"
    }

    return 'Unknown Faction';
  }

  /**
   * Extract units from selections
   */
  extractUnits(selections) {
    return selections
      .filter(s => s.type === 'model' || s.type === 'unit')
      .filter(s => !s.categories?.some(cat => cat.name === 'Configuration'))
      .map(unit => this.parseUnit(unit))
      .filter(unit => unit !== null);
  }

  /**
   * Parse individual unit
   */
  parseUnit(unit) {
    try {
      return {
        id: unit.id,
        name: unit.name,
        type: unit.type,
        points: unit.costs?.find(c => c.name === 'pts')?.value || 0,
        modelCount: unit.number || 1,
        categories: unit.categories?.map(cat => cat.name) || [],
        stats: this.extractStats(unit.profiles || []),
        weapons: this.extractWeapons(unit.selections || []),
        abilities: this.extractAbilities(unit.profiles || []),
        rules: this.extractRules(unit.rules || [])
      };
    } catch (error) {
      console.warn(`Failed to parse unit ${unit.name}:`, error);
      return null;
    }
  }

  /**
   * Extract stats from profiles
   */
  extractStats(profiles) {
    const unitProfile = profiles.find(p => p.typeName === 'Unit');
    if (!unitProfile) return {};

    const stats = {};
    unitProfile.characteristics?.forEach(char => {
      stats[char.name] = char.$text;
    });
    return stats;
  }

  /**
   * Extract weapons from selections (recursive)
   */
  extractWeapons(selections) {
    const weapons = [];

    const processSelection = (sel) => {
      // Check if this selection has weapon profiles
      if (sel.profiles) {
        sel.profiles.forEach(profile => {
          if (profile.typeName === 'Ranged Weapons' || profile.typeName === 'Melee Weapons') {
            const weapon = {
              name: profile.name,
              type: profile.typeName === 'Ranged Weapons' ? 'ranged' : 'melee',
              count: sel.number || 1
            };

            // Extract weapon characteristics
            profile.characteristics?.forEach(char => {
              weapon[char.name] = char.$text;
            });

            weapons.push(weapon);
          }
        });
      }

      // Recursively process nested selections
      if (sel.selections) {
        sel.selections.forEach(processSelection);
      }
    };

    selections.forEach(processSelection);
    return weapons;
  }

  /**
   * Extract abilities from profiles
   */
  extractAbilities(profiles) {
    return profiles
      .filter(p => p.typeName === 'Abilities')
      .map(ability => ({
        name: ability.name,
        description: ability.characteristics?.[0]?.$text || ''
      }));
  }

  /**
   * Extract rules from unit
   */
  extractRules(rules) {
    return rules.map(rule => ({
      name: rule.name,
      description: rule.description || ''
    }));
  }

  /**
   * Extract army-wide rules
   */
  extractArmyRules(rules) {
    return rules.map(rule => ({
      name: rule.name,
      description: rule.description || ''
    }));
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RosterParser;
}
