/**
 * Space Marines Database
 * Data source: Wahapedia.ru - Warhammer 40k 10th Edition
 * Faction: Adeptus Astartes (Space Marines)
 */

export const SPACE_MARINES = {
    id: "space-marines",
    name: "Space Marines",
    color: "#0051a5",
    icon: "⚔️",
    description: "The Adeptus Astartes, also known as Space Marines, are humanity's greatest warriors. Genetically enhanced super-soldiers created from the gene-seed of the Primarchs.",
    
    units: [
        // HQ Units
        {
            id: "sm-captain",
            name: "Captain",
            faction: "Space Marines",
            type: "HQ",
            points: 80,
            models: { min: 1, max: 1 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 5,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Bolt pistol",
                    range: "12\"",
                    A: 1,
                    skill: "2+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["PISTOL"]
                },
                {
                    name: "Master-crafted boltgun",
                    range: "24\"",
                    A: 4,
                    skill: "2+",
                    S: 4,
                    AP: 0,
                    D: 2,
                    keywords: ["RAPID FIRE 1"]
                }
            ],
            melee_weapons: [
                {
                    name: "Master-crafted power weapon",
                    range: "Melee",
                    A: 6,
                    skill: "2+",
                    S: 5,
                    AP: -2,
                    D: 2,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Rites of Battle",
                    type: "Unit",
                    description: "While this model is leading a unit, each time a model in that unit makes an attack, add 1 to the Hit roll."
                },
                {
                    name: "Lead by Example",
                    type: "Unit",
                    description: "Once per battle, after this unit fails a Battle-shock test, it can pass that test instead."
                }
            ],
            keywords: ["Infantry", "Character", "Imperium", "Tacticus", "Captain"],
            source: {
                book: "Codex: Space Marines",
                page: 91,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Captain"
        },

        {
            id: "sm-librarian",
            name: "Librarian",
            faction: "Space Marines",
            type: "HQ",
            points: 75,
            models: { min: 1, max: 1 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 4,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Bolt pistol",
                    range: "12\"",
                    A: 1,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["PISTOL"]
                },
                {
                    name: "Smite",
                    range: "24\"",
                    A: "D6",
                    skill: "3+",
                    S: 5,
                    AP: -1,
                    D: "D3",
                    keywords: ["PSYCHIC", "DEVASTATING WOUNDS"]
                }
            ],
            melee_weapons: [
                {
                    name: "Force weapon",
                    range: "Melee",
                    A: 4,
                    skill: "3+",
                    S: 6,
                    AP: -1,
                    D: "D3",
                    keywords: ["PSYCHIC"]
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Psychic Hood",
                    type: "Unit",
                    description: "While this model is leading a unit, models in that unit have the Feel No Pain 4+ ability against Psychic Attacks."
                }
            ],
            keywords: ["Infantry", "Character", "Psyker", "Imperium", "Tacticus", "Librarian"],
            source: {
                book: "Codex: Space Marines",
                page: 94,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Librarian"
        },

        // Troops
        {
            id: "sm-intercessor-squad",
            name: "Intercessor Squad",
            faction: "Space Marines",
            type: "Troops",
            points: 90,
            models: { min: 5, max: 10 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 2,
                Ld: 6,
                OC: 2
            },
            ranged_weapons: [
                {
                    name: "Bolt rifle",
                    range: "24\"",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: -1,
                    D: 1,
                    keywords: ["ASSAULT", "HEAVY"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 3,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Bolter Discipline",
                    type: "Unit",
                    description: "Each time a model in this unit makes a ranged attack with a bolt weapon, add 1 to the Hit roll if the target is within half range."
                }
            ],
            keywords: ["Infantry", "Battleline", "Imperium", "Tacticus", "Intercessor Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 142,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Intercessor-Squad"
        },

        {
            id: "sm-tactical-squad",
            name: "Tactical Squad",
            faction: "Space Marines",
            type: "Troops",
            points: 90,
            models: { min: 5, max: 10 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 2,
                Ld: 6,
                OC: 2
            },
            ranged_weapons: [
                {
                    name: "Boltgun",
                    range: "24\"",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["RAPID FIRE 1"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Adaptable",
                    type: "Unit",
                    description: "Each time a model in this unit makes an attack, re-roll a Hit roll of 1."
                }
            ],
            keywords: ["Infantry", "Battleline", "Imperium", "Tactical Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 149,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Tactical-Squad"
        },

        {
            id: "sm-incursor-squad",
            name: "Incursor Squad",
            faction: "Space Marines",
            type: "Troops",
            points: 100,
            models: { min: 5, max: 10 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 2,
                Ld: 6,
                OC: 2
            },
            ranged_weapons: [
                {
                    name: "Occulus bolt carbine",
                    range: "24\"",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["ASSAULT", "IGNORES COVER"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 3,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Multi-spectrum Array",
                    type: "Unit",
                    description: "Ranged weapons equipped by models in this unit have the [IGNORES COVER] ability."
                },
                {
                    name: "Paired Combat Blades",
                    type: "Unit",
                    description: "Each time a model in this unit makes a melee attack, add 1 to the Hit roll."
                }
            ],
            keywords: ["Infantry", "Battleline", "Smoke", "Imperium", "Phobos", "Incursor Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 139,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Incursor-Squad"
        },

        // Elites
        {
            id: "sm-terminator-squad",
            name: "Terminator Squad",
            faction: "Space Marines",
            type: "Elites",
            points: 200,
            models: { min: 5, max: 10 },
            stats: {
                M: "5\"",
                T: 5,
                Sv: "2+",
                W: 3,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Storm bolter",
                    range: "24\"",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["RAPID FIRE 2"]
                }
            ],
            melee_weapons: [
                {
                    name: "Power fist",
                    range: "Melee",
                    A: 3,
                    skill: "3+",
                    S: 8,
                    AP: -2,
                    D: 2,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Terminators",
                    type: "Unit",
                    description: "Models in this unit have a 4+ invulnerable save."
                },
                {
                    name: "Teleport Strike",
                    type: "Unit",
                    description: "During deployment, you can set up this unit in teleportarium reserves instead of on the battlefield."
                }
            ],
            keywords: ["Infantry", "Imperium", "Terminator", "Terminator Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 145,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Terminator-Squad"
        },

        {
            id: "sm-bladeguard-veterans",
            name: "Bladeguard Veterans",
            faction: "Space Marines",
            type: "Elites",
            points: 90,
            models: { min: 3, max: 6 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 3,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Heavy bolt pistol",
                    range: "18\"",
                    A: 1,
                    skill: "3+",
                    S: 4,
                    AP: -1,
                    D: 1,
                    keywords: ["PISTOL"]
                }
            ],
            melee_weapons: [
                {
                    name: "Master-crafted power weapon",
                    range: "Melee",
                    A: 4,
                    skill: "3+",
                    S: 5,
                    AP: -2,
                    D: 2,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Storm Shield",
                    type: "Wargear",
                    description: "Models in this unit have a 4+ invulnerable save."
                },
                {
                    name: "Swords of the Imperium",
                    type: "Unit",
                    description: "Each time a model in this unit makes a melee attack, add 1 to the Wound roll."
                }
            ],
            keywords: ["Infantry", "Imperium", "Bladeguard", "Bladeguard Veterans"],
            source: {
                book: "Codex: Space Marines",
                page: 114,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Bladeguard-Veterans"
        },

        {
            id: "sm-dreadnought",
            name: "Dreadnought",
            faction: "Space Marines",
            type: "Elites",
            points: 145,
            models: { min: 1, max: 1 },
            stats: {
                M: "6\"",
                T: 9,
                Sv: "2+",
                W: 8,
                Ld: 6,
                OC: 3
            },
            ranged_weapons: [
                {
                    name: "Assault cannon",
                    range: "24\"",
                    A: 6,
                    skill: "3+",
                    S: 6,
                    AP: 0,
                    D: 1,
                    keywords: ["DEVASTATING WOUNDS"]
                }
            ],
            melee_weapons: [
                {
                    name: "Dreadnought combat weapon",
                    range: "Melee",
                    A: 5,
                    skill: "3+",
                    S: 12,
                    AP: -2,
                    D: 3,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Duty Eternal",
                    type: "Unit",
                    description: "Each time an attack is allocated to this model, subtract 1 from the Damage characteristic of that attack (to a minimum of 1)."
                }
            ],
            keywords: ["Vehicle", "Walker", "Smoke", "Imperium", "Dreadnought"],
            source: {
                book: "Codex: Space Marines",
                page: 118,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Dreadnought"
        },

        {
            id: "sm-primaris-apothecary",
            name: "Primaris Apothecary",
            faction: "Space Marines",
            type: "Elites",
            points: 55,
            models: { min: 1, max: 1 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 4,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Absolver bolt pistol",
                    range: "18\"",
                    A: 1,
                    skill: "3+",
                    S: 5,
                    AP: -1,
                    D: 2,
                    keywords: ["PISTOL"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 4,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Narthecium",
                    type: "Unit",
                    description: "While this model is leading a unit, in your Command phase, you can return 1 destroyed model (excluding Character models) to that unit."
                },
                {
                    name: "Combat Restoratives",
                    type: "Unit",
                    description: "Once per battle, at the start of any phase, this model can use this ability. If it does, until the end of the phase, add 1 to the Toughness characteristic of all models in this model's unit."
                }
            ],
            keywords: ["Infantry", "Character", "Imperium", "Tacticus", "Primaris Apothecary"],
            source: {
                book: "Codex: Space Marines",
                page: 96,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Primaris-Apothecary"
        },

        // Fast Attack
        {
            id: "sm-assault-squad",
            name: "Assault Squad",
            faction: "Space Marines",
            type: "Fast Attack",
            points: 110,
            models: { min: 5, max: 10 },
            stats: {
                M: "12\"",
                T: 4,
                Sv: "3+",
                W: 2,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Bolt pistol",
                    range: "12\"",
                    A: 1,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: ["PISTOL"]
                }
            ],
            melee_weapons: [
                {
                    name: "Chainsword",
                    range: "Melee",
                    A: 4,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Hammer of Wrath",
                    type: "Unit",
                    description: "Each time this unit ends a Charge move, select one enemy unit within Engagement Range of it and roll one D6: on a 2-5, that enemy unit suffers 1 mortal wound; on a 6, that enemy unit suffers D3 mortal wounds."
                }
            ],
            keywords: ["Infantry", "Fly", "Jump Pack", "Imperium", "Assault Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 107,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Assault-Squad"
        },

        {
            id: "sm-outrider-squad",
            name: "Outrider Squad",
            faction: "Space Marines",
            type: "Fast Attack",
            points: 75,
            models: { min: 3, max: 6 },
            stats: {
                M: "12\"",
                T: 5,
                Sv: "3+",
                W: 4,
                Ld: 6,
                OC: 2
            },
            ranged_weapons: [
                {
                    name: "Twin bolt rifle",
                    range: "24\"",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: -1,
                    D: 1,
                    keywords: ["ASSAULT", "TWIN-LINKED"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 3,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Turbo-boost",
                    type: "Unit",
                    description: "Each time this unit Advances, do not make an Advance roll. Instead, until the end of the phase, add 6\" to the Move characteristic of models in this unit."
                }
            ],
            keywords: ["Mounted", "Fly", "Imperium", "Outrider Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 151,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Outrider-Squad"
        },

        // Heavy Support
        {
            id: "sm-devastator-squad",
            name: "Devastator Squad",
            faction: "Space Marines",
            type: "Heavy Support",
            points: 105,
            models: { min: 5, max: 10 },
            stats: {
                M: "6\"",
                T: 4,
                Sv: "3+",
                W: 2,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Heavy bolter",
                    range: "36\"",
                    A: 3,
                    skill: "3+",
                    S: 5,
                    AP: -1,
                    D: 2,
                    keywords: ["HEAVY", "SUSTAINED HITS 1"]
                },
                {
                    name: "Missile launcher",
                    range: "48\"",
                    A: "D6",
                    skill: "3+",
                    S: 9,
                    AP: -2,
                    D: "D6",
                    keywords: ["HEAVY", "BLAST"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 2,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Signum",
                    type: "Unit",
                    description: "Each time you target this unit with the Fire Overwatch Stratagem, hits are scored on unmodified Hit rolls of 5+, instead of only 6."
                }
            ],
            keywords: ["Infantry", "Imperium", "Devastator Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 117,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Devastator-Squad"
        },

        {
            id: "sm-predator-annihilator",
            name: "Predator Annihilator",
            faction: "Space Marines",
            type: "Heavy Support",
            points: 130,
            models: { min: 1, max: 1 },
            stats: {
                M: "10\"",
                T: 10,
                Sv: "3+",
                W: 11,
                Ld: 6,
                OC: 3
            },
            ranged_weapons: [
                {
                    name: "Predator twin lascannon",
                    range: "48\"",
                    A: 2,
                    skill: "3+",
                    S: 12,
                    AP: -3,
                    D: "D6+1",
                    keywords: ["TWIN-LINKED"]
                },
                {
                    name: "Lascannon",
                    range: "48\"",
                    A: 1,
                    skill: "3+",
                    S: 12,
                    AP: -3,
                    D: "D6+1",
                    keywords: []
                }
            ],
            melee_weapons: [
                {
                    name: "Armoured tracks",
                    range: "Melee",
                    A: 3,
                    skill: "4+",
                    S: 6,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Annihilator",
                    type: "Unit",
                    description: "Each time this model makes a ranged attack that targets a MONSTER or VEHICLE unit, re-roll a Wound roll of 1."
                }
            ],
            keywords: ["Vehicle", "Smoke", "Imperium", "Predator Annihilator"],
            source: {
                book: "Codex: Space Marines",
                page: 128,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Predator-Annihilator"
        },

        {
            id: "sm-repulsor-executioner",
            name: "Repulsor Executioner",
            faction: "Space Marines",
            type: "Heavy Support",
            points: 220,
            models: { min: 1, max: 1 },
            stats: {
                M: "10\"",
                T: 12,
                Sv: "3+",
                W: 16,
                Ld: 6,
                OC: 5
            },
            ranged_weapons: [
                {
                    name: "Macro plasma incinerator",
                    range: "36\"",
                    A: "D6+1",
                    skill: "3+",
                    S: 8,
                    AP: -3,
                    D: 2,
                    keywords: ["BLAST", "HEAVY"]
                },
                {
                    name: "Twin heavy bolter",
                    range: "36\"",
                    A: 3,
                    skill: "3+",
                    S: 5,
                    AP: -1,
                    D: 2,
                    keywords: ["SUSTAINED HITS 1", "TWIN-LINKED"]
                }
            ],
            melee_weapons: [
                {
                    name: "Armoured hull",
                    range: "Melee",
                    A: 6,
                    skill: "4+",
                    S: 8,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Executioner",
                    type: "Unit",
                    description: "Each time this model makes a ranged attack that targets a unit that is Below Half-strength, add 1 to the Hit roll."
                }
            ],
            keywords: ["Vehicle", "Transport", "Fly", "Smoke", "Imperium", "Repulsor Executioner"],
            source: {
                book: "Codex: Space Marines",
                page: 131,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Repulsor-Executioner"
        },

        {
            id: "sm-eradicator-squad",
            name: "Eradicator Squad",
            faction: "Space Marines",
            type: "Heavy Support",
            points: 95,
            models: { min: 3, max: 6 },
            stats: {
                M: "5\"",
                T: 6,
                Sv: "3+",
                W: 3,
                Ld: 6,
                OC: 1
            },
            ranged_weapons: [
                {
                    name: "Melta rifle",
                    range: "18\"",
                    A: 1,
                    skill: "3+",
                    S: 9,
                    AP: -4,
                    D: "D6",
                    keywords: ["HEAVY", "MELTA 2"]
                }
            ],
            melee_weapons: [
                {
                    name: "Close combat weapon",
                    range: "Melee",
                    A: 3,
                    skill: "3+",
                    S: 4,
                    AP: 0,
                    D: 1,
                    keywords: []
                }
            ],
            abilities: [
                {
                    name: "Oath of Moment",
                    type: "Faction",
                    description: "Once per battle round, select one enemy unit. All friendly ADEPTUS ASTARTES units gain +1 to hit against that unit."
                },
                {
                    name: "Total Obliteration",
                    type: "Unit",
                    description: "Each time a model in this unit makes a ranged attack that targets a VEHICLE or MONSTER unit, that attack has the [DEVASTATING WOUNDS] ability."
                }
            ],
            keywords: ["Infantry", "Imperium", "Gravis", "Eradicator Squad"],
            source: {
                book: "Codex: Space Marines",
                page: 121,
                edition: "10th"
            },
            source_url: "https://wahapedia.ru/wh40k10ed/factions/space-marines/Eradicator-Squad"
        }
    ]
};
