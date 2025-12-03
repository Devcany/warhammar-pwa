# 🧪 WarhammAR MVP - Test-Anleitung

## ✅ Was wurde implementiert (MVP)

**JSON Import + PDF Export** - FERTIG! 🎉

### Features:
1. ✅ NewRecruit.eu JSON Parser
2. ✅ Army List Viewer (schöne Darstellung)
3. ✅ PDF Export mit jsPDF
4. ✅ LocalStorage (mehrere Listen verwalten)
5. ✅ Mobile-First Responsive Design
6. ✅ Dark Theme mit Glassmorphism

---

## 📱 SO TESTEST DU DIE APP

### 1. App öffnen

```bash
# Im Projektverzeichnis:
cd /home/user/warhammar-pwa

# Starte einen lokalen Server:
python3 -m http.server 8000

# Oder mit Node.js:
npx http-server -p 8000
```

**Dann öffne im Browser:**
```
http://localhost:8000
```

---

### 2. Army List importieren

1. **Klicke auf "⚔️ Armeen" in der Bottom Navigation**

2. **Klicke auf "📂 JSON-Datei auswählen"**

3. **Wähle deine NewRecruit.eu JSON-Datei aus**
   - Die Datei die du heruntergeladen hast
   - Muss `.json` Format sein

4. **Die App parsed automatisch:**
   - Army Name
   - Faction
   - Punkte (975/2000)
   - Alle Units mit Stats
   - Weapons
   - Abilities

---

### 3. Army List anzeigen

Nach dem Import siehst du:

**Übersicht (Army Cards):**
```
┌─────────────────────────────────────┐
│  White Scars Army                  │
│  Adeptus Astartes                  │
│                                     │
│  975 / 2000 pts                    │
│  📦 6 Units • 📅 03.12.2025        │
└─────────────────────────────────────┘
```

**Klicke auf eine Army Card** → Zeigt Details:
- Kor'sarro Khan (70 pts)
  - M:6" T:4 SV:3+ W:5 LD:6+ OC:1
  - ⚔️ Bolt pistol (Range: 12" A:1 BS:2+ S:4 AP:0 D:1)
  - ⚔️ Moonfang (Melee A:6 WS:2+ S:5 AP:-2 D:2)

- Intercessor Squad (80 pts)
  - 5 models
  - M:6" T:4 SV:3+ W:2
  - Bolt Rifles, Close combat weapons

- usw.

---

### 4. PDF exportieren

1. **In der Detail-Ansicht einer Army**
2. **Klicke "📄 Als PDF exportieren"**
3. **PDF wird automatisch heruntergeladen**

**Das PDF enthält:**
- Army Name & Faction
- Punkte
- Army Rules (Oath of Moment, etc.)
- Alle Units mit:
  - Stats (M/T/SV/W/LD/OC)
  - Weapons (komplett mit Range/A/BS/S/AP/D)
  - Abilities
  - Formatted & druckbar

---

### 5. Mehrere Army Lists verwalten

- **Importiere mehrere JSONs**
- **Alle werden in LocalStorage gespeichert**
- **Switche zwischen Armeen**
- **Lösche Armeen mit 🗑️ Button**

---

## 🐛 Bekannte Einschränkungen (MVP)

1. **Keine Computer Vision** (würde Wochen brauchen)
2. **Keine QR-Codes** (kommt in Phase 2)
3. **Nur NewRecruit.eu JSON Format**
4. **Keine Bearbeitung** (nur Import & Export)

---

## ✅ Test-Checkliste

- [ ] App öffnet sich im Browser
- [ ] "⚔️ Armeen" Tab in Bottom Navigation sichtbar
- [ ] JSON-Datei Upload funktioniert
- [ ] Army wird korrekt geparst und angezeigt
- [ ] Alle Units mit Stats sichtbar
- [ ] Weapons werden korrekt angezeigt
- [ ] Abilities werden angezeigt
- [ ] PDF Export funktioniert
- [ ] PDF ist korrekt formatiert und lesbar
- [ ] Mehrere Armeen können importiert werden
- [ ] Armeen bleiben nach Reload erhalten (LocalStorage)
- [ ] Löschen funktioniert
- [ ] Mobile Ansicht sieht gut aus

---

## 🚀 Nächste Schritte (Phase 2 - NUR nach deinem OK!)

**QR-Code System:**
1. QR-Code Generation für jede Unit
2. QR-Code Scanner Integration
3. Schnellzugriff beim Scannen
4. QR-Codes druckbar machen

**WICHTIG**: Erst wenn du das MVP getestet hast und zufrieden bist!

---

## 📝 Test-Ergebnis

**Bitte teste und gib Feedback:**

1. **Funktioniert der JSON Import?** ✅ / ❌
2. **Werden alle Daten korrekt angezeigt?** ✅ / ❌
3. **Ist das PDF brauchbar?** ✅ / ❌
4. **Fehlt etwas Wichtiges?**
5. **Bugs gefunden?**

**Dann sag mir Bescheid!**
