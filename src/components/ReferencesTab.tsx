import React from 'react';

const ReferencesTab = () => {
  return (
    <div className="max-w-lg mx-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow space-y-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Referenzen & Hilfe
      </h2>

      <section>
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Wichtige Links & Studien
        </h3>
        <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Link zu Nährstoffbedarf von Pflanzen (Beispielstudie)
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Artikel über Wasserqualität und EC-Werte
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Ressourcen zur Düngerzusammensetzung
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Erklärungen zu Nährstoffen
        </h3>
        <div className="space-y-4 text-slate-600 dark:text-slate-300">
          <p>
            <strong>Stickstoff (N):</strong> Essentiell für das vegetative Wachstum,
            Blattentwicklung und Photosynthese. Mangel zeigt sich oft in blassen, gelben Blättern.
          </p>
          <p>
            <strong>Phosphor (P):</strong> Wichtig für Blüten- und Fruchtentwicklung, Wurzelwachstum
            und Energieübertragung. Ein Mangel kann zu verkümmertem Wachstum und dunklen Blättern
            führen.
          </p>
          <p>
            <strong>Kalium (K):</strong> Fördert die allgemeine Pflanzengesundheit, Wasseraufnahme
            und den Transport von Nährstoffen. Mangel kann zu gelben oder braunen Blatträndern
            führen.
          </p>
          {/* Add more nutrient explanations as needed */}
        </div>
      </section>

      <section>
        <h3 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Häufig gestellte Fragen (FAQ)
        </h3>
        <div className="space-y-3 text-slate-600 dark:text-slate-300">
          <div>
            <h4 className="font-semibold">Q: Wie berechne ich die richtige Düngermenge?</h4>
            <p>
              A: Die App verwendet Ihre Eingaben zu Wasservolumen, Wachstumsphase und Wassertyp, um
              die optimale Düngermenge zu berechnen. Passen Sie die Mengen für jeden Dünger an, um
              die gewünschten Nährstoffwerte zu erreichen.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Q: Was bedeutet EC-Wert?</h4>
            <p>
              A: Der EC-Wert (elektrische Leitfähigkeit) misst die Gesamtkonzentration der gelösten
              Salze (Nährstoffe) im Wasser. Ein optimaler EC-Wert ist entscheidend für die
              Nährstoffaufnahme der Pflanzen.
            </p>
          </div>
          {/* Add more FAQs as needed */}
        </div>
      </section>
    </div>
  );
};

export default ReferencesTab;
