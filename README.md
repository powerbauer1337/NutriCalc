# Cannabis Düngerrechner Pro (Nutrient Calculator Pro)

Ein fortschrittlicher Nährstoffrechner für Pflanzen (insbesondere Cannabis), entwickelt als Single-Page-Anwendung (SPA) mit React und Tailwind CSS. Er ermöglicht präzise Berechnungen von Nährstofflösungen, die Verwaltung eigener Dünger und bietet einen KI-gestützten Helfer über die Gemini API.

**Live-Demo:** (Wenn du eine hast, füge hier den Link ein. z.B. GitHub Pages)
**Wichtiger Hinweis zur KI-Nutzung:** Für die KI-Chat-Funktion wird ein Google Gemini API Key benötigt. Standardmäßig ist ein Test-Key im Code hinterlegt, dieser dient **NUR für lokale Tests**. Für eine öffentliche Bereitstellung muss der Key-Management-Prozess gesichert werden (z.B. über ein Backend-Proxy).

## Funktionen

*   **Präzise Nährstoffberechnung:**
    *   Berücksichtigt Wassermenge, Wachstumsphase und Wassertyp (RO/Destilliert, Leitungswasser verschiedener Härtegrade oder benutzerdefiniertes Profil).
    *   **Wasser-Mischung:** Ermöglicht das Hinzufügen und Mischen mehrerer Wasserquellen (Leitungswasser, Osmosewasser, eigene Quellen) mit individuellen pH-, EC- und Mineralwerten, um ein Gesamtprofil zu erstellen.
    *   Berechnet die Endkonzentrationen (ppm) für Makro- (N, P, K, Ca, Mg, S) und Mikronährstoffe (Fe, Mn, Zn, Cu, B, Mo).
    *   Berechnet den resultierenden EC-Wert (mS/cm) der Nährlösung.
*   **Düngerdatenbank:**
    *   Enthält eine vordefinierte Auswahl gängiger Düngemittel (z.B. Hesi, Terra Aquatica).
    *   Ermöglicht das Hinzufügen, Bearbeiten und Löschen **eigener Düngemittel** (flüssig in g/L oder pulverförmig in %).
*   **Wachstumsphasen-Profile:**
    *   Vordefinierte NPK-Zielwerte und EC-Bereiche für verschiedene Wachstumsphasen (Keimling bis Spülung).
*   **Visuelle Analyse & Empfehlungen:**
    *   **Nährstoff-Analyse-Tab:** Zeigt detaillierte Nährstofftabellen mit Status (optimal, niedrig, hoch) und Warnungen, basierend auf der gewählten Wachstumsphase.
    *   **Live-Nährstoff-Visualisierung (Misch-Assistent):** Ein interaktives Balkendiagramm im Misch-Assistenten zeigt N, P, K, EC und pH-Werte in Echtzeit an, inklusive farblicher Indikatoren für optimale, warnende oder kritische Bereiche.
    *   Tabelle mit Nährstoffbeiträgen der einzelnen Dünger.
    *   Automatische Optimierungsempfehlungen (z.B. "Stickstoff erhöhen").
*   **Misch-Assistent:**
    *   Ein interaktiver Assistent, der Nutzer Schritt für Schritt durch den Prozess der Nährstoffmischung führt, mit Live-Berechnungen und Visualisierungen.
*   **Gießplaner:**
    *   Verwalten Sie Gießtermine, -mengen und -intervalle für verschiedene Pflanzen oder Gruppen, um eine konsistente Bewässerung sicherzustellen.
*   **Einstellungen:**
    *   Verwalten Sie Ihren Google Gemini API Key, passen Sie Maßeinheiten an (z.B. Liter vs. Gallonen) und konfigurieren Sie Standardwerte für Wassermenge, Wachstumsphase und Wassertyp.
*   **Referenzen:**
    *   Ein dedizierter Tab mit häufig gestellten Fragen (FAQ), Links zu wissenschaftlichen Studien und Erklärungen relevanter Fachbegriffe rund um Pflanzennährstoffe und Düngung.
*   **🤖 AI-Powered Cultivation Assistant:**
    *   **Intelligenter Anbau-Assistent:** Umfassende KI-gestützte Beratung für Cannabis-Anbau mit Unterstützung für Google Gemini, OpenAI GPT-4 und Anthropic Claude.
    *   **Kontextbezogene Analyse:** Analysiert aktuelle Nährstoffwerte, Wachstumsphase und Umgebungsbedingungen für präzise Empfehlungen.
    *   **Floating Chat Widget:** Immer verfügbarer Chat-Button mit Statusanzeigen für Warnungen und neue Nachrichten.
    *   **Dedizierter AI-Tab:** Vollständige Assistenten-Oberfläche mit kategorisierter Beratung und häufigen Fragen.
    *   **Proaktive Warnungen:** Automatische Benachrichtigungen bei kritischen Problemen oder Optimierungsmöglichkeiten.
    *   **Problemdiagnose:** KI-gestützte Fehlerbehebung für Nährstoffmängel, pH-Probleme und Umgebungsstress.
    *   **Mehrsprachig:** Vollständige Unterstützung für Deutsch und Englisch.
    *   **Datenschutz:** Alle Daten werden lokal gespeichert, DSGVO-konform mit vollständiger Benutzerkontrolle.
    *   **Mobile-optimiert:** Responsive Design für alle Geräte mit Touch-optimierten Bedienelementen.
*   **Import/Export von Rezepten:**
    *   Speichern und Laden kompletter Düngerezepte (inkl. Einstellungen, ausgewählter Dünger und eigener Düngerdefinitionen) im JSON-Format.
*   **Dark Mode:**
    *   Umschaltbarer Hell-/Dunkelmodus für bessere Lesbarkeit je nach Präferenz.
*   **Responsives Design:**
    *   Angepasst für die Nutzung auf verschiedenen Bildschirmgrößen.
*   **Benachrichtigungssystem:**
    *   Toast-Benachrichtigungen für wichtige Aktionen (Speichern, Fehler etc.).

## 📚 Dokumentation

*   **[AI Assistant Vollständige Anleitung](README_AI_ASSISTANT.md)** - Detaillierte Dokumentation für den AI-Anbau-Assistenten
*   **[AI Assistant Integration Guide](docs/AI_ASSISTANT_INTEGRATION.md)** - Technische Dokumentation für Entwickler

## Technologie-Stack

*   **React:** Für die Benutzeroberfläche und Komponentenlogik.
*   **Tailwind CSS:** Für das Styling und responsive Design.
*   **Babel (standalone):** Für die JSX-Transpilierung direkt im Browser (ideal für einfache SPAs ohne Build-Prozess).
*   **Google Gemini API:** Für die KI-Chat-Funktionalität.

## Benutzung

1.  **HTML-Datei öffnen:** Lade die `Düngerechner-vX.X.html` Datei herunter und öffne sie in einem modernen Webbrowser (Chrome, Firefox, Edge empfohlen).
2.  **KI-Helfer (Optional):**
    *   Standardmäßig ist ein Test-API-Key für Google Gemini hinterlegt. Dieser hat möglicherweise Nutzungsbeschränkungen oder ist nicht für den Dauereinsatz gedacht.
    *   **Empfehlung:** Besorge dir deinen eigenen kostenlosen API Key von [Google AI Studio](https://aistudio.google.com/app/apikey).
    *   Der API Key kann **direkt in der Chatbar** (temporär für die Session) eingegeben oder über die (zukünftigen) Einstellungen dauerhaft im LocalStorage deines Browsers gespeichert werden. **Gib deinen privaten API Key niemals öffentlich weiter!**
3.  **Grundeinstellungen (Setup-Tab):**
    *   Gib die **Wassermenge** in Litern ein.
    *   Wähle die aktuelle **Wachstumsphase** deiner Pflanzen.
    *   Wähle den **Wassertyp**. Bei "Eigenes Profil" kannst du die Ca-, Mg-, S-Werte (in ppm) und den Basis-EC-Wert deines Wassers eintragen.
4.  **Dünger & Dosierung:**
    *   Füge Dünger aus der Datenbank hinzu oder erstelle eigene im Tab "Dünger".
    *   Passe die **Menge** für jeden Dünger an (ml für Flüssigdünger, g für Pulver).
    *   Aktiviere/Deaktiviere Dünger mit den Checkboxen.
5.  **Ergebnisse prüfen:**
    *   Im rechten Bereich des "Setup"-Tabs siehst du das berechnete **Nährstoffprofil** (N, P, K, Ca, Mg, EC) und dessen Status (optimal, niedrig, hoch) im Vergleich zu den Zielwerten der gewählten Phase.
    *   Der Tab "Details" zeigt Mikronährstoffe.
    *   Der Tab "Analyse" bietet visuelle Diagramme und eine Beitragsanalyse.
6.  **Eigene Dünger verwalten (Dünger-Tab):**
    *   Definiere neue Dünger mit Name, Typ (flüssig/pulver) und deren Nährstoffzusammensetzung (g/L für flüssig, % für Pulver).
    *   Bearbeite oder lösche bestehende eigene Dünger.
7.  **Rezepte speichern/laden:**
    *   Nutze die "Export"-Schaltfläche, um deine aktuellen Einstellungen als JSON-Datei zu sichern.
    *   Lade gespeicherte Rezepte mit "Import" wieder.

## Hinweise zur Entwicklung

*   Diese Anwendung ist als einzelne HTML-Datei konzipiert und nutzt CDNs für React, Tailwind und Babel. Es ist kein separater Build-Schritt erforderlich.
*   **API Key Management:** Für eine echte Produktionsanwendung MUSS die Interaktion mit der Gemini API über einen Backend-Proxy erfolgen, um den API Key sicher zu halten. Der API Key sollte niemals direkt im clientseitigen Code stehen, wenn die Anwendung öffentlich zugänglich ist.
*   Die Codebasis wurde zugunsten der Kompaktheit und des schnellen Prototypings in einer Datei gehalten. Für größere Projekte wäre eine Aufteilung in separate Komponenten-Dateien und ein Build-System (z.B. mit Vite oder Create React App) empfehlenswert.

## Zukünftige mögliche Erweiterungen

*   Benutzerkonten zum Speichern von Rezepten und Düngern online.
*   Erweiterte Diagramme und Analysefunktionen.
*   Mehr Optionen für die Eingabe von Wasserwerten (z.B. Härtegrad).
*   Community-Datenbank für Dünger und Rezepte.
*   Lokalisierung in weitere Sprachen.

## Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe `LICENSE` Datei für Details (wenn vorhanden, sonst hier Lizenz angeben, z.B. "Dieses Projekt ist Open Source und kann frei verwendet werden.").

---

Viel Erfolg beim Düngen!
