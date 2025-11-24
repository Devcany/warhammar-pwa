# 🔍 NewRecruit.eu API Integration Analysis

**Datum:** 2025-11-24  
**Status:** ❌ NICHT VERBUNDEN  
**URL:** https://www.newrecruit.eu/tutorials/systems

---

## ❌ Aktueller Status

Die WarhammAR App ist **NICHT** mit der NewRecruit.eu API/Datenbank verbunden.

### Was wir aktuell haben:
```javascript
// index.html - Zeile 564
const warhammerDatabase = [
    {
        id: 1,
        name: "Space Marine Intercessor",
        faction: "Space Marines",
        points: 20,
        unit_type: "Troops",
        confidence: 0.95
    },
    // ... nur 4 Sample-Units
];
```

**Problem:** Nur 4 hardcoded Demo-Einheiten, keine echten Daten von NewRecruit.eu!

---

## 🚨 Herausforderungen bei NewRecruit.eu

### 1. Website-Zugriff blockiert (403 Forbidden)
```bash
# Test mit WebFetch
curl https://www.newrecruit.eu/tutorials/systems
# → 403 Forbidden
```

**Grund:** Die Website blockt automated requests (Bot-Protection)

### 2. Keine offizielle API vorhanden
- ❌ Keine REST API dokumentiert
- ❌ Keine JSON endpoints
- ❌ Keine GraphQL API

### 3. Daten-Format
NewRecruit.eu bietet wahrscheinlich:
- ✅ PDF-Downloads pro Fraktion
- ✅ HTML-Tabellen mit Unit-Stats
- ✅ Web-Scraping möglich (aber blockiert)

---

## 💡 Lösungsansätze (4 Optionen)

### Option 1: PDF-Import (EMPFOHLEN) ⭐
**Machbarkeit:** ✅ HOCH  
**Aufwand:** MITTEL  
**Legalität:** ✅ OK (User lädt eigene PDFs)

#### Implementierung:
```javascript
// 1. User lädt PDF von NewRecruit.eu runter
// 2. App importiert PDF via File API
// 3. PDF.js extrahiert Text
// 4. Parsing zu JSON
// 5. Speicherung in IndexedDB

async function importPDF(file) {
    const pdf = await pdfjsLib.getDocument(file).promise;
    const data = await extractUnitData(pdf);
    await saveToIndexedDB(data);
}
```

**Vorteile:**
- ✅ Legal (User besitzt PDF)
- ✅ Offline-fähig
- ✅ Keine Server-Anfragen nötig
- ✅ Umgeht Bot-Protection

**Nachteile:**
- ⚠️ PDF-Parsing komplex
- ⚠️ Format-Änderungen brechen Parser
- ⚠️ User muss PDFs manuell runterladen

---

### Option 2: Eigene Datenbank aufbauen ⭐⭐
**Machbarkeit:** ✅ HOCH  
**Aufwand:** HOCH  
**Legalität:** ⚠️ Copyright beachten

#### Implementierung:
```javascript
// 1. Manuell Daten sammeln (legal von offiziellen Quellen)
// 2. Eigene JSON-Datenbank erstellen
// 3. Auf GitHub/CDN hosten
// 4. App lädt von eigenem Server

const DATABASE_URL = 'https://your-cdn.com/warhammer-units.json';

async function loadDatabase() {
    const response = await fetch(DATABASE_URL);
    const units = await response.json();
    return units;
}
```

**Struktur:**
```json
{
  "factions": [
    {
      "id": "space-marines",
      "name": "Space Marines",
      "units": [
        {
          "id": "sm-intercessor",
          "name": "Intercessor Squad",
          "type": "Troops",
          "points": 90,
          "stats": {
            "M": 6, "WS": 3, "BS": 3, "S": 4, "T": 4,
            "W": 2, "A": 2, "Ld": 7, "Sv": 3
          },
          "weapons": [...],
          "abilities": [...],
          "keywords": ["Imperium", "Adeptus Astartes"]
        }
      ]
    }
  ]
}
```

**Vorteile:**
- ✅ Volle Kontrolle
- ✅ Schneller Zugriff
- ✅ Offline-Cache möglich
- ✅ Keine externen Abhängigkeiten

**Nachteile:**
- ⚠️ Viel manuelle Arbeit
- ⚠️ Updates müssen manuell eingepflegt werden
- ⚠️ Copyright/Legal Compliance nötig

---

### Option 3: Web Scraping mit Proxy/Browser
**Machbarkeit:** ⚠️ MITTEL  
**Aufwand:** HOCH  
**Legalität:** ⚠️ Grauzone (ToS beachten)

#### Implementierung:
```javascript
// Server-Side (Node.js + Puppeteer)
const puppeteer = require('puppeteer');

async function scrapeNewRecruit() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://www.newrecruit.eu/tutorials/systems');
    
    const units = await page.evaluate(() => {
        // DOM parsing logic
        return extractedUnits;
    });
    
    await browser.close();
    return units;
}
```

**Vorteile:**
- ✅ Automatische Updates möglich
- ✅ Immer aktuelle Daten

**Nachteile:**
- ❌ Benötigt Backend-Server
- ❌ Kann gegen ToS verstoßen
- ❌ Fragil bei Website-Änderungen
- ❌ Performance-Overhead

---

### Option 4: Community-API nutzen
**Machbarkeit:** ⚠️ NIEDRIG  
**Aufwand:** NIEDRIG  
**Legalität:** ✅ OK

#### Bekannte APIs:
```javascript
// Beispiel: Wahapedia API (inoffiziell)
const WAHAPEDIA_API = 'https://wahapedia.ru/api/units';

// Beispiel: BattleScribe Data
const BATTLESCRIBE_DATA = 'https://github.com/BSData/wh40k-10e';
```

**Vorteile:**
- ✅ Bereits vorhanden
- ✅ Community-maintained

**Nachteile:**
- ⚠️ Abhängigkeit von Drittanbietern
- ⚠️ Kann jederzeit offline gehen
- ⚠️ Legale Grauzone

---

## 🎯 Empfohlene Lösung: HYBRID-ANSATZ

### Phase 1: Sofort-Lösung (1 Woche)
**Option 1 + 2 kombinieren:**

1. **Eigene Basis-Datenbank** (Top 50 Units)
   - Space Marines: 15 Units
   - Orks: 10 Units
   - Necrons: 10 Units
   - Tau: 8 Units
   - Chaos: 7 Units

2. **PDF-Import Feature** (Optional)
   - User kann eigene PDFs importieren
   - Erweitert die Datenbank lokal

```javascript
// database.js
export const WARHAMMER_DATABASE = {
    version: "10th Edition",
    lastUpdate: "2025-11-24",
    factions: [
        {
            id: "space-marines",
            name: "Space Marines",
            color: "#0051a5",
            units: [...]
        }
    ]
};

// App lädt bei Start
async function initDatabase() {
    // 1. Lade eingebaute Datenbank
    const builtinDB = await import('./database.js');
    
    // 2. Lade User-PDFs (wenn vorhanden)
    const userPDFs = await loadUserPDFs();
    
    // 3. Merge beide
    return mergeDatabase(builtinDB, userPDFs);
}
```

### Phase 2: Erweiterung (1 Monat)
3. **Automatischer Scraper** (Backend)
   - Cronjob alle 2 Wochen
   - Aktualisiert Datenbank automatisch
   - Deployed als Netlify Function

4. **Community-Uploads**
   - User können Units hinzufügen
   - Moderation über GitHub Issues
   - Pull Requests für neue Units

---

## 📊 Implementierungs-Plan

### Sprint 1: Basis-Datenbank (2-3 Tage)
- [ ] JSON-Struktur definieren
- [ ] Top 50 Units recherchieren & eingeben
- [ ] Schema validieren (JSON Schema)
- [ ] Units nach Fraktionen organisieren

### Sprint 2: App-Integration (2-3 Tage)
- [ ] `database.js` erstellen
- [ ] Lazy-Loading implementieren
- [ ] Search/Filter Funktionen
- [ ] Unit-Detail View
- [ ] IndexedDB Caching

### Sprint 3: PDF-Import (Optional, 5 Tage)
- [ ] PDF.js einbinden
- [ ] File Input UI
- [ ] PDF-Parser entwickeln
- [ ] Validierung & Error Handling
- [ ] Merge mit bestehender DB

### Sprint 4: Backend-Scraper (Optional, 7 Tage)
- [ ] Netlify Function setup
- [ ] Puppeteer integration
- [ ] NewRecruit.eu Parser
- [ ] Cron Schedule
- [ ] Auto-Deploy zu CDN

---

## 🔧 Code-Beispiel: Basis-Integration

```javascript
// database/space-marines.js
export const SPACE_MARINES = {
    id: "space-marines",
    name: "Space Marines",
    color: "#0051a5",
    icon: "⚔️",
    units: [
        {
            id: "sm-intercessor-squad",
            name: "Intercessor Squad",
            type: "Troops",
            points: 90,
            models: 5,
            stats: {
                M: "6\"", WS: "3+", BS: "3+", S: 4, T: 4,
                W: 2, A: 2, Ld: 7, Sv: "3+"
            },
            weapons: [
                {
                    name: "Bolt Rifle",
                    range: "30\"",
                    type: "Rapid Fire 1",
                    strength: 4,
                    ap: -1,
                    damage: 1
                }
            ],
            abilities: [
                "And They Shall Know No Fear",
                "Bolter Discipline"
            ],
            keywords: [
                "Infantry", "Imperium", "Adeptus Astartes",
                "Primaris", "Intercessor"
            ],
            datasheet_url: "https://www.newrecruit.eu/...",
            image_url: "/assets/units/sm-intercessor.jpg"
        }
    ]
};

// app.js - Integration
import { SPACE_MARINES } from './database/space-marines.js';
import { ORKS } from './database/orks.js';
// ... weitere Fraktionen

const FULL_DATABASE = {
    factions: [
        SPACE_MARINES,
        ORKS,
        // ...
    ]
};

// Suche nach Unit
function findUnit(searchTerm) {
    return FULL_DATABASE.factions
        .flatMap(f => f.units)
        .filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Lade Fraktion
function getFaction(factionId) {
    return FULL_DATABASE.factions.find(f => f.id === factionId);
}
```

---

## 💰 Kosten-Analyse

### Option 1 (PDF-Import): **KOSTENLOS**
- ✅ Keine Server-Kosten
- ✅ Client-side Processing
- ✅ Keine API-Limits

### Option 2 (Eigene DB): **KOSTENLOS - $5/Monat**
- GitHub Pages: Kostenlos
- Netlify CDN: Kostenlos (100GB/Monat)
- Optional: Custom Domain $12/Jahr

### Option 3 (Scraping): **$15-30/Monat**
- Netlify Functions: $25/Monat (Background Functions)
- Puppeteer Cloud: $15/Monat
- Storage: $5/Monat

### Option 4 (Community API): **KOSTENLOS**
- Abhängig von Drittanbieter

---

## ⚖️ Legale Überlegungen

### ✅ LEGAL:
- User lädt eigene PDFs hoch
- Eigene Datenbank mit offiziellen Quellen
- Deeplinks zu NewRecruit.eu
- Attribution/Credits

### ⚠️ GRAUZONE:
- Web Scraping (ToS prüfen!)
- Automatisierte Downloads
- API-Reverse Engineering

### ❌ ILLEGAL:
- Copyrighted Images ohne Lizenz
- Geschützte Regelwerke vollständig kopieren
- Paywall umgehen

---

## 🚀 Nächste Schritte

### Sofort (User-Entscheidung):
1. **Welche Option bevorzugst du?**
   - A) Eigene Datenbank aufbauen (schnell, stabil)
   - B) PDF-Import Feature (flexibel, user-driven)
   - C) Hybrid (beides kombinieren) ⭐ EMPFOHLEN
   - D) Warten auf offizielle API

2. **Umfang definieren:**
   - Wie viele Fraktionen? (5, 10, alle 20+?)
   - Wie viele Units pro Fraktion? (Top 10? Alle?)
   - Welche Daten? (Stats, Weapons, Abilities, Images?)

3. **Zeitrahmen:**
   - Sofort starten? (MVP in 3 Tagen)
   - Ausführlich planen? (2 Wochen Development)

---

## 📝 Meine Empfehlung

**Hybrid-Ansatz:** Eigene Basis-Datenbank + PDF-Import

### Warum?
- ✅ Schneller Start (3 Tage)
- ✅ Legal & sicher
- ✅ Keine externen Abhängigkeiten
- ✅ User können erweitern
- ✅ Offline-fähig
- ✅ Performance-optimal

### Roadmap:
1. **Sprint 1 (3 Tage):** Top 50 Units einbauen
2. **Sprint 2 (2 Tage):** App-Integration
3. **Sprint 3 (Optional):** PDF-Import Feature
4. **Sprint 4 (Zukunft):** Backend-Scraper für Auto-Updates

---

**Frage an dich:** Soll ich mit Sprint 1 starten und die Top 50 Units Database aufbauen? 🚀
