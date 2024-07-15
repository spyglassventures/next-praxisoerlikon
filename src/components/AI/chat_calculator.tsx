'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import CopyToClipboard from '@/components/copy-to-clipboard'
import FeedbackModal from './FeedbackModal'

// Helper function to format the message content
function formatMessageContent(content) {
  return content.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
}

export default function Chat_calculator() {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: `Du bist ein KI-Modell, das medizinische Rechner kennt und Berechnungen durchführt.
        Gibt der User dir ein Input passend zu einer Formel, rechne diesen aus und gib das Resultat zurück. Ordne das Resultat ein.
        Schreibe: **Resultat: [Wert] [Einheit]**.
        
        Gibt es Schemata, oder eine Formel wie du das Ergebnis berechnet hast, formuliere diese aus als Text (keine Formelzeichen). 
        Schreibe: **Formel: [Formeltext]**.

        Gibt es eine Verteilung der Bevoelkerung, gib den Wert in Bezug auf diese an.
        Schreibe: **Verteilung: [Wert] [Einheit] ([Verteilungstext])**.

        Gibt der User nur einen Test ein, nenne die Eingaben und mache ein numerisches Beispiel. Nenne auch normalerweise normalerweise benoetigten Informationen.
        Schreibe nie eine Formel mit Sonderzeichen wie mit \,[,},)
        `
      },
    ],
  });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e);
  }

  return (
    <section className='py-1 text-zinc-700 dark:text-zinc-300'>
      <div className='container'>

        <div className='mt-3 w-full max-w-full text-left relative -ml-4'>
          <h1 className='font-medium pt-5 text-zinc-900 dark:text-zinc-100'>Closed-Beta Test: Test/Rechner + Patientenwerte eingeben ➜ Berechnung und Erläuterung erhalten</h1>
        </div>

        <div className='flex'>
          {/* Chat area */}
          <div className='mt-3 w-3/4 text-left relative -ml-4'>
            <div className='absolute top-0 right-0 -mt-10 ml-2'>
              <CopyToClipboard message={messages[messages.length - 1]} className='' />
            </div>

            <div className='absolute top-0 right-0 mt-2 mr-0'></div>
            <div
              className='mb-2 h-[500px] rounded-md border dark:border-zinc-700 overflow-auto text-left bg-white dark:bg-zinc-900'
              ref={ref}
            >
              {messages.map(m => (
                <div key={m.id} className='mr-6 whitespace-pre-wrap md:mr-12 text-left'>
                  {m.role === 'user' && (
                    <div className='mb-6 flex gap-3 text-left'>
                      <div className='mt-1.5 bg-blue-100 dark:bg-blue-900 p-3 rounded-md'>
                        <p className='font-semibold text-blue-800 dark:text-blue-300'>Ihre Eingabe:</p>
                        <div className='mt-1.5 text-sm text-blue-700 dark:text-blue-200'>
                          {formatMessageContent(m.content)}
                        </div>
                      </div>
                    </div>
                  )}

                  {m.role === 'assistant' && (
                    <div className='mb-6 flex gap-3 text-left'>
                      <div className='mt-1.5 w-full bg-gray-100 dark:bg-gray-800 p-3 rounded-md'>
                        <div className='flex justify-between'>
                          <p className='font-semibold text-green-800 dark:text-green-300'>Copilot</p>
                        </div>
                        <div className='mt-2 text-sm text-green-700 dark:text-green-200'>
                          {formatMessageContent(m.content)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className='flex items-center'>
              <form onSubmit={onSubmit} className='relative flex-grow'>
                <Input
                  name='message'
                  value={input}
                  onChange={handleInputChange}
                  placeholder='Wert mit oder ohne Zahleninput eingeben (Beispiel: map, 120 zu 80). Folgefragen möglich.'
                  className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500 text-left dark:bg-zinc-800 dark:text-zinc-300 dark:placeholder:text-zinc-500 dark:focus-visible:ring-zinc-400'
                />
                <button
                  type='submit'
                  className='absolute right-1 top-1 h-8 w-20 bg-emerald-500 text-white rounded flex items-center justify-center'
                >
                  Enter
                </button>
              </form>
            </div>
          </div>

          {/* Legend Section */}
          <div className='mt-1 w-1/4 text-left relative pl-5'>
            <div className='mt-2 bg-gray-100 dark:bg-gray-800 pl-13 rounded-md max-h-[500px] overflow-y-auto'>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100'>Beispiele für Eingaben:</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li>bmi, 78kg, 175cm</li>
                <li>geburtstermin, letzte blutung 15. Juli 24</li>
                <li>Prostatavolumen sono</li>
                <li>map, 120 zu 80</li>
                <li>Child pugh score?</li>
                <li>curb 65, 65 jähriger patient</li>
                <li>egfr, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>framingham, 45 jähriger patient, raucher, bluthochdruck</li>
                <li>homa ir, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>asthma test, 45 jähriger patient</li>
                <li>frax score, 45 jähriger patient, raucher, bluthochdruck</li>
                {/* <li>geburtstermin, letzte blutung 15. Juli 24</li> */}
                {/* <li>mcv, 1.2mg/dl, 70kg, 175cm, 65 jahre</li> */}
                <li>calcium phosphat produkt, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                {/* <li>freier androgenindex, 1.2mg/dl, 70kg, 175cm, 65 jahre</li> */}
                <li>freies testosteron, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>risikoscore diabetes, 45 jähriger patient, raucher, bluthochdruck</li>
                <li>transferrin sättigung, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>meld score, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                {/* <li>apri score, 1.2mg/dl, 70kg, 175cm, 65 jahre</li> */}
                <li>nafl fibrose score, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>risikoscore diabetes, 45 jähriger patient, raucher, bluthochdruck</li>
                <li>nt pro bnp korrektur, 1.2mg/dl, 70kg, 175cm, 65 jahre</li>
                <li>procam score, 45 jähriger patient, raucher, bluthochdruck</li>
              </ul>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100 mt-3'>Bekannte Abkürzungen:</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li>BMI</li>
                <li>eGFR (Geschätzte glomeruläre Filtrationsrate)</li>
                <li>eGFR – mit Cystatin C (nach Larsson)</li>
                <li>Framingham Risiko-Score</li>
                <li>Child-Pugh Score</li>
                <li>CURB-65 Score für Pneumonie-Schweregrad</li>
                <li>Geburtstermin Rechner</li>
                <li>Mittlerer Arterieller Druck (MAP)</li>
                <li>Creatinin-Clearance (nach Cockcroft-Gault-Formel)</li>
                <li>Anionenlücke</li>
                <li>Korrigiertes Natrium bei Hyperglykämie</li>
                <li>HOMA-IR (Homeostasis Model Assessment of Insulin Resistance)</li>
                <li>FRAX Score (Frakturrisiko bei Osteoporose)</li>
                <li>Asthma-Kontroll-Test (ACT)</li>
                <li>Winter-Formel (respiratorische Kompensation bei metabolischer Azidose)</li>
                <li>Pädiatrische Dosierungsberechnung (Paracetamol)</li>
                <li>HbA1c zu Durchschnittsglukose-Umrechner</li>
                <li>Mittleres Korpuskuläres Volumen (MCV)</li>
                <li>Ferritin-Index</li>
                <li>Calcium-Phosphatprodukt</li>
                <li>Freier Androgenindex</li>
                <li>Freies Testosteron nach Vermeulen</li>
                <li>Klinische Wahrscheinlichkeit bei Verdacht auf TVT (Wells-Score)</li>
                <li>Risikoscore Rheumatoide Arthritis</li>
                <li>Transferrin-Sättigung</li>
                <li>MELD-Score (Model for End-Stage Liver Disease)</li>
                <li>APRI-Score (Aspartat-Aminotransferase to Platelet Ratio Index)</li>
                <li>NAFLD (Nichtalkoholische Fettleber-Erkrankung) Fibrose Score</li>
                <li>Risiko-Score Diabetes nach GDM (Gestationsdiabetes)</li>
                <li>NT-pro-BNP-Korrektur</li>
                <li>PROCAM-Score (Prospective Cardiovascular Münster Study)</li>




              </ul>
            </div>
            <div className='mt-3'>
              <button
                className='h-8 max-w-full bg-gray-600 text-white rounded flex items-center justify-center pl-8 pr-8'
                onClick={() => setShowModal(true)}
              >
                Was können wir besser machen?
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal showModal={showModal} setShowModal={setShowModal} />
    </section>
  );
}
