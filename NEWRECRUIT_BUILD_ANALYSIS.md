# 🎯 NewRecruit.eu BUILD Integration - Analyse

## KLARSTELLUNG: Was der User WIRKLICH will

### ❌ NICHT das:
- PDF Datasheets importieren
- Wahapedia Datenbank
- Unit-Profile manuell eingeben

### ✅ SONDERN das:
**NewRecruit.eu ARMY BUILDER Integration**
- URL: https://www.newrecruit.eu/ (Build Sektion)
- User erstellt Armylist auf NewRecruit.eu
- User lädt Armylist runter
- User importiert Liste in WarhammAR App
- ✅ **User hat bestätigt: Es funktioniert!**

---

## 🔍 KRITISCHE FRAGEN (für User)

### Frage 1: Datei-Format
**Was für eine Datei hast du runtergeladen?**
- [ ] .json (JSON Datei)
- [ ] .xml (XML Datei)
- [ ] .txt (Text Datei)
- [ ] .pdf (PDF)
- [ ] .ros/.rosz (BattleScribe Format)
- [ ] Anderes: _______

### Frage 2: Datei-Inhalt
**Was steht in der Datei?**

Beispiel einer möglichen Struktur:
```json
{
  "army": {
    "faction": "Space Marines",
    "name": "Meine Armee",
    "points": 1000,
    "units": [
      {
        "name": "Intercessor Squad",
        "quantity": 2,
        "points": 90,
        "type": "Troops"
      },
      {
        "name": "Captain",
        "quantity": 1,
        "points": 80,
        "type": "HQ"
      }
    ]
  }
}
```

**Oder ist es anders?**

### Frage 3: Download-Prozess
**Wie hast du die Liste runtergeladen?**
- Über "Export" Button?
- Über "Download" Button?
- Als Text kopiert?
- Screenshot gemacht?

---

## 🎯 WAS WIR BAUEN (abhängig von Format)

### Szenario A: JSON/XML Format ⭐ (IDEAL)
```javascript
// File Import
<input type="file" id="army-import" accept=".json,.xml">

// Parse & Display
async function importArmyList(file) {
    const data = await parseFile(file); // JSON/XML
    
    // Zeige Armee-Details
    displayArmy({
        faction: data.faction,
        name: data.name,
        totalPoints: data.points,
        units: data.units
    });
    
    // Speichere lokal
    await saveToStorage(data);
}
```

**Funktionen:**
- ✅ Import Army List (JSON/XML)
- ✅ Anzeige: Faction, Total Points, Units
- ✅ Bearbeiten: Units hinzufügen/entfernen
- ✅ Speichern: LocalStorage/IndexedDB
- ✅ Export: Zurück zu JSON für NewRecruit

---

### Szenario B: Text/PDF Format ⚠️ (KOMPLEXER)
```javascript
// Text Parsing
function parseTextArmyList(text) {
    // Regex für:
    // - Faction Name
    // - Unit Namen
    // - Points
    // - Quantities
    
    // Beispiel Text:
    // "Space Marines - 1000 Points
    //  HQ: Captain (80pts) x1
    //  Troops: Intercessor Squad (90pts) x2"
}
```

---

## 📋 INTEGRATIONS-PLAN (nachdem Format bekannt ist)

### Phase 1: Import System
```
1. File Upload Button
   └─> "Import Army List from NewRecruit.eu"

2. Parser (abhängig von Format)
   ├─> JSON Parser
   ├─> XML Parser  
   └─> Text Parser

3. Validation
   └─> Prüfe Struktur & Daten
   
4. Display
   └─> Zeige importierte Armee
```

### Phase 2: Army Management
```
1. Armee-Übersicht
   ├─> Faction
   ├─> Total Points
   ├─> Unit List
   └─> Statistics

2. Bearbeitung
   ├─> Unit hinzufügen
   ├─> Unit entfernen
   ├─> Quantity ändern
   └─> Auto-calculate Points

3. Speicherung
   └─> IndexedDB (persistent)
```

### Phase 3: Export (Optional)
```
1. Export zurück zu NewRecruit Format
2. Share Army List (JSON)
3. Print/PDF Generation
```

---

## 🎨 UI MOCKUP

### Screen 1: Import
```
┌─────────────────────────────────┐
│  📥 Import Army List            │
│                                 │
│  ┌───────────────────────────┐ │
│  │ [Choose File from         │ │
│  │  NewRecruit.eu]           │ │
│  └───────────────────────────┘ │
│                                 │
│  Supported: .json, .xml, .txt  │
│                                 │
│  [Import] [Cancel]              │
└─────────────────────────────────┘
```

### Screen 2: Army View
```
┌─────────────────────────────────┐
│  ⚔️ Space Marines               │
│  "Meine Armee"                  │
│  📊 Total: 1000 Points          │
│                                 │
│  HQ (80pts)                     │
│  └─ Captain x1                  │
│                                 │
│  Troops (180pts)                │
│  └─ Intercessor Squad x2        │
│                                 │
│  [Edit] [Export] [Share]        │
└─────────────────────────────────┘
```

---

## 💾 DATEN-STRUKTUR

### App-interne Speicherung
```javascript
const userArmy = {
    id: 'army-001',
    source: 'newrecruit.eu',
    importedAt: '2025-11-24T10:30:00Z',
    
    metadata: {
        faction: 'Space Marines',
        name: 'Meine Armee',
        detachment: 'Gladius Task Force',
        pointsLimit: 1000
    },
    
    units: [
        {
            id: 'unit-001',
            name: 'Captain',
            type: 'HQ',
            quantity: 1,
            pointsPerModel: 80,
            totalPoints: 80,
            wargear: ['Master-crafted boltgun', 'Power sword']
        },
        {
            id: 'unit-002',
            name: 'Intercessor Squad',
            type: 'Troops',
            quantity: 2,
            pointsPerModel: 90,
            totalPoints: 180,
            models: 10 // 2 squads x 5 models
        }
    ],
    
    statistics: {
        totalPoints: 260,
        remainingPoints: 740,
        unitCount: 3,
        modelCount: 11,
        byType: {
            HQ: 1,
            Troops: 2,
            Elites: 0,
            FastAttack: 0,
            HeavySupport: 0
        }
    }
};
```

---

## ⚡ IMPLEMENTIERUNGS-PRIORITÄT

### Must-Have (MVP)
1. ✅ Import Army List (JSON/XML)
2. ✅ Display Army Details
3. ✅ Show Total Points
4. ✅ List all Units
5. ✅ Save to Local Storage

### Nice-to-Have (Phase 2)
6. ⏳ Edit Units (add/remove)
7. ⏳ Update Quantities
8. ⏳ Export back to NewRecruit format
9. ⏳ Multiple Army Lists
10. ⏳ Army Statistics & Charts

---

## 🚀 NÄCHSTE SCHRITTE

### JETZT (User-Input benötigt):

**Frage 1: Datei-Format?**
→ User sagt: .json / .xml / .txt / andere

**Frage 2: Datei zeigen?**
→ User kann entweder:
   A) Inhalt kopieren & pasten
   B) Screenshot teilen
   C) Format beschreiben

### DANN:

**Schritt 1:** Ich analysiere das genaue Format
**Schritt 2:** Ich erstelle detaillierten Implementierungs-Plan
**Schritt 3:** User reviewed Plan
**Schritt 4:** Bei Zustimmung → Implementierung starten

---

## 📝 OFFENE FRAGEN AN USER

1. **Welches Format hat die heruntergeladene Datei?**
   - Dateiendung: ________
   - Dateigröße: ________

2. **Kannst du mir zeigen was in der Datei steht?**
   - Ersten 20 Zeilen kopieren?
   - Oder Format beschreiben?

3. **Welche Daten sind wichtig für dich?**
   - [ ] Faction Name
   - [ ] Army Name
   - [ ] Total Points
   - [ ] Unit Names
   - [ ] Quantities
   - [ ] Wargear/Options
   - [ ] Abilities
   - [ ] Stratagems

4. **Was willst du mit der importierten Armee machen?**
   - [ ] Nur ansehen
   - [ ] Bearbeiten (Units add/remove)
   - [ ] Mehrere Armeen verwalten
   - [ ] Exportieren/Teilen
   - [ ] Mit Kamera scannen & vergleichen

---

**Warte auf User-Feedback!** 🎯
