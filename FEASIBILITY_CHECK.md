# 🔍 Technische Machbarkeits-Prüfung

## PRÜFUNG 1: NewRecruit.eu PDF-Integration

### A) URL-Struktur Analyse
**Base URL:** https://www.newrecruit.eu/tutorials/systems

**Bekannte PDF-Struktur (zu verifizieren):**
```
https://www.newrecruit.eu/app/download/[FACTION_ID]/Faction_Rules.pdf
https://www.newrecruit.eu/app/download/[FACTION_ID]/Datasheets.pdf
```

**Status:** ⚠️ UNKLAR - Muss manuell geprüft werden

---

### B) PDF-Format Analyse (Was wir brauchen)

**Erforderlich für Parsing:**
1. **Strukturierte PDFs** (nicht nur Bilder)
   - Text muss extrahierbar sein
   - Tabellen sollten erkennbar sein
   
2. **Konsistentes Format**
   - Gleiche Struktur pro Faction
   - Vorhersagbare Daten-Layout

3. **Beispiel: Wie sollte ein PDF aussehen?**
```
Unit Name: Intercessor Squad
Points: 90
M: 6" | WS: 3+ | BS: 3+ | S: 4 | T: 4 | W: 2 | A: 3 | Ld: 7 | Sv: 3+

Weapons:
- Bolt Rifle: Range 24", A: 2, BS: 3+, S: 4, AP: -1, D: 1

Abilities:
- And They Shall Know No Fear
```

**Status:** ⚠️ MUSS GEPRÜFT WERDEN

---

### C) PDF.js Integration (Technisch)

**Was benötigt wird:**
```html
<!-- PDF.js Library -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>

<!-- File Input -->
<input type="file" accept=".pdf" id="pdf-upload">

<!-- JavaScript -->
<script>
async function parsePDF(file) {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const numPages = pdf.numPages;
    
    let allText = '';
    for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        allText += pageText + '\n';
    }
    
    // Parse text to extract unit data
    const units = parseUnitsFromText(allText);
    return units;
}

function parseUnitsFromText(text) {
    // Regex patterns für:
    // - Unit Namen
    // - Stats (M, WS, BS, etc.)
    // - Weapons
    // - Points
    // - Abilities
    
    // PROBLEM: Format muss bekannt sein!
}
</script>
```

**Machbarkeit:** ✅ TECHNISCH MÖGLICH
**Aber:** ⚠️ Abhängig von PDF-Format

---

### D) Kritische Fragen (MUSS DER USER PRÜFEN)

**User-Aufgaben:**
1. ✅ Gehe zu: https://www.newrecruit.eu/tutorials/systems
2. ✅ Finde "Space Marines" oder beliebige Faction
3. ✅ Prüfe: Gibt es PDF-Download?
4. ✅ Falls ja: Lade EINE PDF runter
5. ✅ Öffne die PDF
6. ✅ Prüfe: 
   - Ist Text kopierbar? (= extrahierbar)
   - Oder nur Bilder/Scans? (= schwer zu parsen)
   - Gibt es klare Tabellen?
   - Ist das Format konsistent?

**Ergebnis:** 
- [ ] JA - PDFs sind strukturiert → PDF-Import ist machbar ✅
- [ ] NEIN - PDFs sind nur Bilder → PDF-Import schwer/unmöglich ❌

---

## PRÜFUNG 2: Wahapedia Fallback

### A) Wahapedia als Alternative

**Falls NewRecruit.eu NICHT funktioniert:**

**Option 2.1: User Export Tool**
```javascript
// Bookmarklet das User in Browser ausführt
javascript:(function(){
    // Läuft auf Wahapedia.ru Seite
    const units = extractWahapediaUnits();
    downloadJSON(units, 'space-marines.json');
})();

// User Flow:
// 1. User öffnet: https://wahapedia.ru/wh40k10ed/factions/space-marines/
// 2. User klickt Bookmarklet
// 3. JSON wird runtergeladen
// 4. User importiert JSON in WarhammAR App
```

**Machbarkeit:** ✅ 100% MACHBAR
**Vorteil:** User macht es selbst = Legal
**Nachteil:** Manueller Schritt

---

**Option 2.2: Manuelle Basis-Datenbank**
```javascript
// 5-10 wichtigste Units als Fallback
const DEMO_UNITS = [
    { name: "Intercessor Squad", points: 90, ... },
    { name: "Tactical Squad", points: 90, ... },
    { name: "Terminator Squad", points: 200, ... },
    { name: "Captain", points: 80, ... },
    { name: "Dreadnought", points: 145, ... }
];

// User kann dann:
// - Mit Demo-Units testen
// - Oder eigene PDFs/JSONs importieren
```

**Machbarkeit:** ✅ 100% MACHBAR (schon teilweise fertig)

---

## PRÜFUNG 3: Hybrid-Ansatz (Empfohlen)

### Implementierungs-Plan

**Komponente 1: PDF Import System**
```javascript
// pdf-importer.js
class PDFImporter {
    async importPDF(file) {
        // 1. Load PDF with PDF.js
        const pdf = await this.loadPDF(file);
        
        // 2. Extract text
        const text = await this.extractText(pdf);
        
        // 3. Parse units (Format-spezifisch!)
        const units = await this.parseUnits(text);
        
        // 4. Validate
        const validated = this.validateUnits(units);
        
        // 5. Save to IndexedDB
        await this.saveUnits(validated);
        
        return validated;
    }
}
```

**Komponente 2: Fallback Database**
```javascript
// fallback-db.js
const FALLBACK_DATABASE = {
    'space-marines': [ /* 5-10 Units */ ],
    'orks': [ /* 5-10 Units */ ],
    // Minimal set für Testing
};

// Wird genutzt wenn:
// - User hat noch keine PDFs importiert
// - Zum Testen der App
// - Als Beispiel-Daten
```

**Komponente 3: Storage Manager**
```javascript
// storage.js
class StorageManager {
    async getUnits(faction) {
        // 1. Prüfe: Hat User eigene importiert?
        const imported = await this.getImported(faction);
        if (imported.length > 0) return imported;
        
        // 2. Fallback auf Demo-Units
        return this.getFallback(faction);
    }
    
    async importUnits(units, source) {
        // Speichere in IndexedDB
        await db.units.bulkAdd(units.map(u => ({
            ...u,
            source, // 'pdf' oder 'json'
            importedAt: new Date()
        })));
    }
}
```

**UI Flow:**
```
App Start
├─> Zeige 5 Demo-Units (Space Marines)
├─> Button: "Import PDF" (Primary)
│   ├─> User wählt PDF
│   ├─> Parsing läuft (mit Progress)
│   └─> Units verfügbar
├─> Button: "Import JSON" (Fallback)
│   └─> Für Wahapedia-Exports
└─> Button: "Browse Database" (Demo-Units)
```

---

## 📊 MACHBARKEITS-MATRIX

| Feature | NewRecruit PDF | Wahapedia Export | Hybrid |
|---------|----------------|------------------|--------|
| **Technisch machbar** | ⚠️ UNKLAR | ✅ JA | ✅ JA |
| **User-Kontrolle** | ✅ Hoch | ✅ Hoch | ✅ Hoch |
| **Aufwand** | 3-4 Tage | 2-3 Tage | 4-5 Tage |
| **Legal** | ✅ Ja | ✅ Ja | ✅ Ja |
| **Flexibilität** | ⚠️ Mittel | ✅ Hoch | ✅ Sehr hoch |
| **Wartung** | ⚠️ Hoch* | ✅ Niedrig | ✅ Niedrig |

*Abhängig von NewRecruit PDF-Format Änderungen

---

## 🎯 EMPFEHLUNG FÜR DICH

### SCHRITT 1: User prüft NewRecruit.eu
```
AUFGABE FÜR DICH:
1. Öffne: https://www.newrecruit.eu/tutorials/systems
2. Suche Space Marines PDFs
3. Lade EINE PDF runter
4. Prüfe ob Text kopierbar ist
5. Schicke mir Screenshot oder Beschreibung

DANN WISSEN WIR:
- Ist PDF-Import machbar? JA/NEIN
```

### SCHRITT 2: Basierend auf deinem Ergebnis

**Falls JA - PDFs sind strukturiert:**
→ Ich baue PDF-Import (Primary) + 5 Demo-Units (Fallback)

**Falls NEIN - PDFs sind nur Bilder:**
→ Ich baue JSON-Import + Wahapedia Export Tool + Demo-Units

---

## 📋 NÄCHSTE SCHRITTE (Gemeinsam)

### Heute/Jetzt:
1. ✅ DU prüfst NewRecruit.eu PDFs (15 Min)
2. ✅ DU sagst mir Ergebnis
3. ✅ WIR entscheiden gemeinsam den Weg

### Dann (nachdem wir entschieden haben):
4. 📝 ICH erstelle detaillierten Implementierungs-Plan
5. 📝 DU reviewst den Plan
6. 📝 Bei Zustimmung: ICH setze um
7. 📝 DU testest Zwischenergebnisse

---

## ❓ DEINE AKTION JETZT

**Bitte prüfe NewRecruit.eu:**
1. Gehe zu https://www.newrecruit.eu/tutorials/systems
2. Finde PDF-Download für EINE Faction
3. Prüfe PDF-Qualität (Text kopierbar?)
4. Berichte mir:
   - "✅ JA - Text ist kopierbar, Tabellen vorhanden"
   - "❌ NEIN - Nur Bilder/Scans"
   - "⚠️ UNKLAR - [Beschreibung]"

**Dann plane ich basierend auf deinem Feedback!** 🎯
