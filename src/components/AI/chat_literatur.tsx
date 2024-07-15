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

export default function Chat_literatur() {
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: `Du bist ein KI-Modell, das medizinische Literatur kennt und Richtlinien nennt. 
        Du stellst heraus welche neueren Erkenntnisse in der Literatur zu einer bestimmten Fragestellung relevant wären.
        Gibt es Schemata, Richtlinien oder Empfehlungen, nenne diese.
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
          <h1 className='font-medium pt-5 text-zinc-900 dark:text-zinc-100'>Closed-Beta Test: Kontext / Fragestellung + Hintergrundinfos ➜ Entwurf zur Antwort.</h1>
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
                  placeholder='Kontext-Informationen eingeben...(z.B. Coronaimpfung bei Kindern). Folgefragen möglich.'
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
                <li>helicobacter pylori eradikation</li>
                <li>diabetes mellitus typ 2</li>
                <li>coronaimpf kind</li>
                <li>Borreliose Verlauf</li>
                <li>Fliegen nach Herzinfarkt</li>
                <li>Hämochromatose wie oft MRT Leber</li>

              </ul>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100 mt-3'>Bekannte Abkürzungen:</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li>FMH: Verbindung der CH Ärzte</li>
                <li>FOPH: Bundesamt für Gesundheit, BAG</li>
                <li>SGAIM: Gesellschaft für AIM.</li>
                <li>SSPH+: Swiss School of Public Health</li>
                <li>EBM: Evidence-Based Medicine</li>
                <li>RKI: Robert Koch-Institut</li>
                <li>SGUM: CH Gesellschaft für Sono</li>
                <li>QMS: Qualitätsmanagementsystem</li>
                <li>EBM: Evidenzbasierte Medizin</li>
                <li>KVG: Krankenversicherungsgesetz</li>
                <li>STIKO: Ständige Impfkommission</li>
                <li>WHO: World Health Organization</li>
                <li>S3: S3-Leitlinie</li>
                <li>RCT: Randomized Controlled Trial</li>
                <li>CME: Continuing Medical Education</li>
                <li>CPG: Clinical Practice Guideline</li>
                <li>SOAP: Dokumentationsschema</li>
                <li>SBAR: Situation, Background, Assessment, Recommendation</li>
                <li>PPV: Pneumococcal Polysaccharide Vaccine</li>
                <li>TDAP: Tetanus, Diphtheria, Pertussis Vaccine</li>
                <li>QOF: Quality and Outcomes Framework</li>
                <li>CPD: Continuing Professional Development</li>
                <li>CHF: Congestive Heart Failure</li>
                <li>CKD: Chronic Kidney Disease</li>
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
