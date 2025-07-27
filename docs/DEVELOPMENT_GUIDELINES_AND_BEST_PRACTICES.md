# Entwicklungsrichtlinien und Best Practices von NutriCalc

## Übersicht

Dieses Dokument beschreibt die Entwicklungsrichtlinien und Best Practices für das NutriCalc-Projekt, basierend auf dem Design System und den Implementierungsplänen.

## Allgemeine Entwicklungsrichtlinien

### Code-Qualität
- **TypeScript**: Strict-Modus aktiviert, keine ungenutzten lokalen Variablen/Parameter
- **ESLint**: React-Hooks-Regeln, TypeScript-Integration
- **Prettier**: Konsistente Code-Formatierung
- **Komponentenstruktur**: Funktionale Komponenten mit Hooks
- **Namenskonventionen**: PascalCase für Komponenten, camelCase für Funktionen/Variablen

### Komponentenentwicklung

#### Allgemeine Prinzipien
1. **Konsistente Prop-Benennung**
   - Verwendung von `isOpen`/`onOpen`/`onClose` für Sichtbarkeitskontrolle
   - Verwendung von `value`/`onChange` für Datenbindung
   - Verwendung von `disabled` für Interaktionskontrolle
   - Verwendung von `loading` für asynchrone Zustände
   - Verwendung von `error` für Fehlerzustände

2. **TypeScript zuerst**
   - Alle Komponenten müssen ordnungsgemäße TypeScript-Schnittstellen haben
   - Verwendung von Union-Typen für Variant-Props (z.B. `variant: 'primary' | 'secondary'`)
   - Export der Komponenten-Props für Wiederverwendung

3. **Barrierefreiheitsanforderungen**
   - Alle interaktiven Komponenten müssen Tastaturnavigation unterstützen
   - Ordungsgemäße ARIA-Attribute für Screenreader
   - Fokusmanagement für Modal-/Dialog-Komponenten
   - Einhaltung der Farbkontrast-Vorgaben

4. **Styling-Konsistenz**
   - Verwendung des `className`-Props für benutzerdefiniertes Styling
   - Unterstützung von CSS-Variablen für Theming
   - Konsistente Größenvarianten (sm, md, lg)
   - Konsistente Zustandsvarianten (hover, focus, disabled)

5. **Event-Handling-Muster**
   - Präfix von Event-Handlern mit `on` (z.B. `onClick`, `onChange`)
   - Bereitstellung von Event-Kontext in Callbacks
   - Unterstützung der nativen Event-Propagation

6. **Kompositions-Muster**
   - Unterstützung von `React.forwardRef` für DOM-Zugriff
   - Verwendung von `React.PropsWithChildren` für Komponenten mit Kindern
   - Unterstützung von Render-Props für komplexe Anpassungen

7. **Formular-Integration**
   - Unterstützung von `name` und `value` für Formular-Integration
   - Bereitstellung von `onBlur` und `onFocus` Handlern
   - Unterstützung der Formularvalidierungs-Integration

### Dateistruktur

```
src/
  components/
    foundational/
      Button/
        Button.tsx
        index.ts
      ...
    layout/
      Card/
        Card.tsx
        CardHeader.tsx
        CardContent.tsx
        CardFooter.tsx
        index.ts
      ...
    input/
      ...
    data-display/
      ...
    feedback/
      ...
    navigation/
      ...
    form/
      ...
```

## API-Standardisierungsrichtlinien

### Komponenten-API-Grundsätze

1. **Vorhersagbare APIs**
   - Konsistente Prop-Namen über alle Komponenten hinweg
   - Klare Dokumentation aller Props mit Typen und Beschreibungen
   - Standardisierte Default-Werte

2. **Erweiterbarkeit**
   - Unterstützung von benutzerdefinierten Klassen durch `className`-Prop
   - Bereitstellung von Variant-Props für gängige Stilvariationen
   - Unterstützung von Refs für DOM-Zugriff

3. **Performance-Optimierung**
   - Verwendung von `React.memo` für teure Komponenten
   - Implementierung von `useCallback` für Event-Handler
   - Vermeidung unnötiger Re-Renderings

## Teststrategien

### Unit-Tests

1. **Komponenten-Rendering**
   - Test, dass Komponenten mit Default-Props korrekt gerendert werden
   - Test verschiedener Variant-Kombinationen
   - Test bedingten Renderings basierend auf Props

2. **Prop-Validierung**
   - Test, dass Komponenten erforderliche Props korrekt behandeln
   - Testverhalten mit optionalen Props
   - Test von Edge-Cases und ungültigen Prop-Werten

3. **Event-Handling**
   - Test, dass Event-Handler angemessen aufgerufen werden
   - Test von Event-Parametern und -Kontext
   - Test des Event-Propagation-Verhaltens

### Barrierefreiheitstests

1. **Tastaturnavigation**
   - Test, dass alle interaktiven Elemente per Tastatur erreichbar sind
   - Test der Fokus-Reihenfolge und -Verwaltung
   - Test von Tastaturkürzeln und Spezialtasten

2. **Screenreader-Unterstützung**
   - Test, dass ARIA-Attribute vorhanden und korrekt sind
   - Test, dass Screenreader Komponenten ordnungsgemäß ansagen
   - Test dynamischer Inhaltsaktualisierungen

3. **Farbkontrast**
   - Test, dass Farbkontrastverhältnisse WCAG-Anforderungen erfüllen
   - Test des Kontrasts in Light- und Dark-Modus
   - Test der Sichtbarkeit von Fokus-Indikatoren

### Integrationstests

1. **Formularkomponenten**
   - Test der Formularvalidierung und Fehlermeldung
   - Test der Integration mit Formularbibliotheken
   - Test des Verhaltens von kontrollierten und unkontrollierten Komponenten

2. **Komponenten-Komposition**
   - Test, dass Komponenten wie erwartet zusammenarbeiten
   - Test des verschachtelten Komponentenverhaltens
   - Test der Komponentenanpassung durch Props

### Visuelle Regressionstests

1. **Snapshot-Tests**
   - Erstellung von Snapshots der Komponenten-Render-Ausgabe
   - Test von Komponentenvarianten und -zuständen
   - Aktualisierung von Snapshots bei beabsichtigten Änderungen

2. **Cross-Browser-Tests**
   - Test von Komponenten in unterstützten Browsern
   - Test des responsiven Verhaltens über Geräte hinweg
   - Test von Dark-Modus und High-Contrast-Modus

## Performance-Richtlinien

### Rendering-Performance
- Verwendung von `React.memo` für teure Komponenten
- Implementierung von `useMemo` für Berechnungen
- Verwendung von `useCallback` für Event-Handler
- Vermeidung unnötiger Re-Renderings durch korrekte Abhängigkeitsarrays

### Bundle-Größe
- Überwachung des Bundle-Größeneinflusses von Komponenten
- Test der Tree-Shaking-Effektivität
- Optimierung von Abhängigkeiten

### Code-Splitting
- Verwendung von dynamischen Imports für nicht-kritische Komponenten
- Implementierung von Lazy Loading für große Komponenten
- Nutzung von React's Suspense für Ladezustände

## Barrierefreiheits-Richtlinien

### Semantische HTML-Verwendung
- Verwendung semantischer HTML-Elemente (article, section, nav, etc.)
- Ordungsgemäße Verwendung von Überschriften (h1-h6)
- Verwendung von Listen-Elementen (ul, ol, li) für Listeninhalte

### Tastaturnavigation
- Sicherstellung der vollständigen Tastaturnavigierbarkeit
- Implementierung ordnungsgemäßer Fokus-Indikatoren
- Unterstützung gängiger Tastaturkürzel (Enter, Space, Esc)

### Screenreader-Unterstützung
- Implementierung ordnungsgemäßer ARIA-Rollen und -Attribute
- Bereitstellung von aussagekräftigen Labels und Beschreibungen
- Test mit gängigen Screenreadern (NVDA, JAWS, VoiceOver)

## Responsives Design

### Mobile-First-Ansatz
- Design beginnend mit mobilen Ansichten
- Verwendung responsiver Utility-Klassen
- Test von Komponenten über verschiedene Viewport-Größen

### Touch-Optimierung
- Sicherstellung angemessener Touch-Target-Größen (mindestens 44px)
- Vermeidung von Hover-only-Interaktionen
- Optimierung von Scroll-Verhalten auf Touch-Geräten

## Dokumentationsstandards

### Komponentendokumentation
- Zweck und Anwendungsfälle jeder Komponente
- API-Referenz (Props/Typen) mit Beschreibungen
- Varianten und Zustände mit Beispielen
- Barrierefreiheits-Richtlinien
- Best Practices
- Verwandte Komponenten

### Code-Dokumentation
- Klare Kommentare für komplexe Logik
- Dokumentation von nicht offensichtlichen Implementierungsdetails
- Erklärung von Design-Entscheidungen in Kommentaren

## Versionskontrolle und Code-Reviews

### Commit-Richtlinien
- Klare, beschreibende Commit-Nachrichten
- Atomare Commits für einzelne Änderungen
- Referenzierung von Issues oder Tasks in Commit-Nachrichten

### Pull-Request-Richtlinien
- Umfassende Beschreibung der Änderungen
- Verlinkung zu relevanten Issues oder Dokumentation
- Vor dem Merge alle Tests bestanden
- Code-Review durch mindestens einen anderen Entwickler

## CI/CD-Integration

### Qualitäts-Gates
- Automatische TypeScript- und ESLint-Prüfungen
- Automatische Testausführung bei jedem Push
- Automatische Build-Validierung
- Automatische Bereitstellung bei erfolgreichen Tests

### Performance-Monitoring
- Überwachung der Build-Zeiten
- Überwachung der Bundle-Größe
- Überwachung der Lighthouse-Scores
- Überwachung der Core Web Vitals

Diese Richtlinien und Best Practices sollen sicherstellen, dass die Entwicklung von NutriCalc konsistent, wartbar und von hoher Qualität bleibt. Sie sollten regelmäßig überprüft und aktualisiert werden, um den sich entwickelnden Anforderungen und Technologien Rechnung zu tragen.