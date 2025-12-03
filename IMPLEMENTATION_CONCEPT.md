# WarhammAR PWA - Implementation Concept
**Basierend auf NewRecruit.eu JSON-Roster Analyse**

---

## 📊 JSON-STRUKTUR ANALYSE

### Das NewRecruit.eu Roster JSON enthält:

```json
{
  "roster": {
    "costs": [{"name":"pts", "value":975}],
    "costLimits": [{"name":"pts", "value":2000}],
    "name": "White Scars Army",
    "gameSystemName": "Warhammer 40,000 10th Edition",
    "forces": [{
      "selections": [
        {
          "name": "Kor'sarro Khan",
          "type": "model",
          "costs": [{"name":"pts","value":70}],
          "profiles": [{
            "characteristics": [
              {"name":"M", "$text":"6\""},
              {"name":"T", "$text":"4"},
              {"name":"SV", "$text":"3+"},
              {"name":"W", "$text":"5"},
              {"name":"LD", "$text":"6+"},
              {"name":"OC", "$text":"1"}
            ]
          }],
          "selections": [
            {
              "name": "Bolt pistol",
              "profiles": [{
                "characteristics": [
                  {"name":"Range", "$text":"12\""},
                  {"name":"A", "$text":"1"},
                  {"name":"BS", "$text":"2+"},
                  {"name":"S", "$text":"4"},
                  {"name":"AP", "$text":"0"},
                  {"name":"D", "$text":"1"}
                ]
              }]
            }
          ]
        }
      ]
    }]
  }
}
```

### ✅ Verfügbare Daten:
- ✅ Army Name & Faction
- ✅ Punkte (aktuell/limit)
- ✅ Units mit Namen
- ✅ Unit Stats (M/T/SV/W/LD/OC)
- ✅ Weapons (Range/A/BS-WS/S/AP/D)
- ✅ Abilities & Rules (Beschreibungen)
- ✅ Kategorien (Epic Hero, Battleline, Infantry, Vehicle, etc.)
- ✅ Model Counts (z.B. 5 Intercessors)

---

## 🤔 ZWEI MÖGLICHE INTERPRETATIONEN

### **Option A: EINFACH - JSON Import & PDF Export**

**User Flow:**
1. User erstellt Army List auf NewRecruit.eu
2. User downloadet JSON-Datei
3. User öffnet WarhammAR PWA
4. User lädt JSON hoch (Drag & Drop oder File Upload)
5. App zeigt Army List schön formatiert
6. User exportiert als PDF zum Ausdrucken

**Technologie:**
- JSON File Upload
- JSON Parser
- HTML/CSS Display
- jsPDF für PDF-Export

**Zeitaufwand:** 1-2 Tage

---

### **Option B: KOMPLEX - QR-Code System**

**User Flow:**
1. User erstellt Army List auf NewRecruit.eu
2. User downloadet JSON-Datei
3. User öffnet WarhammAR PWA
4. User lädt JSON hoch
5. **App generiert QR-Codes für jede Unit**
6. User druckt QR-Codes aus
7. User klebt QR-Codes auf Miniatur-Bases
8. **Beim Spielen: User scannt QR-Code mit Kamera**
9. App zeigt Unit Stats sofort an

**Zusätzliche Features:**
- QR-Code Generator (qrcode.js Library)
- QR-Code Scanner (html5-qrcode Library)
- Kamera-Integration
- Schnellzugriff auf Unit-Stats beim Scannen

**Technologie:**
- JSON File Upload
- JSON Parser
- **qrcode.js** (QR-Code Generierung)
- **html5-qrcode** (QR-Code Scanner)
- getUserMedia API (Kamera)
- IndexedDB (lokale Speicherung)
- jsPDF für PDF-Export

**Zeitaufwand:** 3-5 Tage

---

## 🎯 KLÄRUNGSFRAGE AN DICH

**Was meintest du genau mit:**
> "User werden ihre eigenen Bilder für ihre units hochladen, so dass eine zuordnung stattfindet"

**Interpretation 1:** User lädt das JSON hoch (nicht Bilder von Miniaturen)?

**Interpretation 2:** User will QR-Codes auf Bases kleben und beim Spielen scannen?

**Interpretation 3:** User will tatsächlich Fotos von seinen Miniaturen hochladen und per Computer Vision erkennen? (Das wäre SEHR komplex und bräuchte Wochen)

---

## 💡 MEINE EMPFEHLUNG: OPTION A + OPTIONAL QR

**Phase 1 (MVP - 1-2 Tage):**
1. ✅ JSON Upload
2. ✅ Army List Viewer (schöne Darstellung)
3. ✅ PDF Export
4. ✅ Lokale Speicherung (mehrere Listen verwalten)

**Phase 2 (Optional - +2 Tage):**
5. ✅ QR-Code Generation für Units
6. ✅ QR-Code Scanner
7. ✅ Schnellzugriff beim Scannen

---

## 🛠 TECHNISCHE UMSETZUNG (Option A - MVP)

### 1. JSON Parser Modul

```javascript
class NewRecruitParser {
  parse(jsonData) {
    const roster = jsonData.roster;
    return {
      name: roster.name,
      faction: this.extractFaction(roster),
      points: {
        current: roster.costs[0].value,
        limit: roster.costLimits[0].value
      },
      units: this.extractUnits(roster.forces[0].selections)
    };
  }

  extractUnits(selections) {
    return selections
      .filter(s => s.type === 'model' || s.type === 'unit')
      .map(unit => ({
        id: unit.id,
        name: unit.name,
        type: unit.type,
        points: unit.costs?.[0]?.value || 0,
        stats: this.extractStats(unit.profiles),
        weapons: this.extractWeapons(unit.selections),
        abilities: this.extractAbilities(unit.profiles),
        modelCount: unit.number || 1
      }));
  }
}
```

### 2. Army List Viewer UI

```html
<div class="army-list">
  <header class="army-header">
    <h1>White Scars Army</h1>
    <div class="points">975 / 2000 pts</div>
  </header>

  <section class="units">
    <article class="unit-card">
      <h3>Kor'sarro Khan</h3>
      <div class="unit-stats">
        <span>M: 6"</span>
        <span>T: 4</span>
        <span>SV: 3+</span>
        <span>W: 5</span>
        <span>LD: 6+</span>
        <span>OC: 1</span>
      </div>
      <div class="unit-weapons">
        <h4>Weapons:</h4>
        <ul>
          <li>Bolt pistol - Range: 12" A: 1 BS: 2+ S: 4 AP: 0 D: 1</li>
          <li>Moonfang - Range: Melee A: 6 WS: 2+ S: 5 AP: -2 D: 2</li>
        </ul>
      </div>
      <div class="unit-points">70 pts</div>
    </article>
  </section>
</div>
```

### 3. PDF Export (jsPDF)

```javascript
async function exportToPDF(armyData) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text(armyData.name, 20, 20);

  // Points
  doc.setFontSize(12);
  doc.text(`${armyData.points.current} / ${armyData.points.limit} pts`, 20, 30);

  let yPos = 45;

  // Units
  armyData.units.forEach(unit => {
    doc.setFontSize(14);
    doc.text(unit.name, 20, yPos);
    yPos += 7;

    doc.setFontSize(10);
    doc.text(`M:${unit.stats.M} T:${unit.stats.T} SV:${unit.stats.SV} W:${unit.stats.W}`, 20, yPos);
    yPos += 6;

    // Weapons
    unit.weapons.forEach(weapon => {
      doc.text(`  ${weapon.name}: ${weapon.range}" A:${weapon.A} S:${weapon.S}`, 20, yPos);
      yPos += 5;
    });

    yPos += 10;
  });

  doc.save(`${armyData.name}.pdf`);
}
```

---

## 📱 UI MOCKUP

```
┌─────────────────────────────────────┐
│  WarhammAR                    ☰     │
├─────────────────────────────────────┤
│                                     │
│  [📁 Import Army List (JSON)]      │
│                                     │
│  ──────────────────────────────    │
│                                     │
│  📋 My Army Lists:                 │
│                                     │
│  • White Scars Army (975/2000)     │
│    [View] [Export PDF] [Delete]    │
│                                     │
│  • Ultramarines (1500/2000)        │
│    [View] [Export PDF] [Delete]    │
│                                     │
│  [+ New List]                      │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ← White Scars Army                │
├─────────────────────────────────────┤
│  975 / 2000 pts                    │
│  Faction: Adeptus Astartes         │
│                                     │
│  ╔════════════════════════════════╗│
│  ║ Kor'sarro Khan          70 pts ║│
│  ╠════════════════════════════════╣│
│  ║ M:6" T:4 SV:3+ W:5 LD:6+ OC:1 ║│
│  ║                                ║│
│  ║ 📍 Bolt pistol                 ║│
│  ║   Range: 12" A:1 BS:2+         ║│
│  ║   S:4 AP:0 D:1                 ║│
│  ║                                ║│
│  ║ ⚔️ Moonfang                    ║│
│  ║   Melee A:6 WS:2+ S:5 AP:-2    ║│
│  ╚════════════════════════════════╝│
│                                     │
│  ╔════════════════════════════════╗│
│  ║ Intercessor Squad      80 pts  ║│
│  ╠════════════════════════════════╣│
│  ║ 5 models                       ║│
│  ║ M:6" T:4 SV:3+ W:2 LD:6+ OC:2 ║│
│  ╚════════════════════════════════╝│
│                                     │
│  [Export as PDF] [Generate QR]     │
└─────────────────────────────────────┘
```

---

## ❓ NÄCHSTE SCHRITTE

**Bitte beantworte mir:**

1. **Option A (Einfach)** oder **Option B (QR-Codes)**?

2. Willst du **Computer Vision** (Miniatur-Fotos erkennen)?
   - ⚠️ Warnung: Das wäre SEHR komplex, bräuchte:
     - 1000+ Trainingsbilder pro Unit
     - TensorFlow.js Model Training (Wochen)
     - Extrem hohe Fehlerrate
     - **NICHT EMPFOHLEN**

3. Reicht **JSON Import + PDF Export** als MVP?

4. Sollen QR-Codes optional später dazu?

**Sobald du antwortest, kann ich SOFORT loslegen! 🚀**
