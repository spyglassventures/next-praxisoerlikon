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
  )
}

export default function Chat_diagnose() {
  const ref = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false);
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: `
        
        Du bist ein KI-Modell, das medizinische Anamnese-Informationen analysiert und auf deren Basis relevante Folgefragen und sinnvolle körperliche Untersuchungen vorschlägt, um die Differenzialdiagnosen weiter einzugrenzen. 

        Auf Basis dieser Informationen sollen relevante Folgefragen und körperliche Untersuchungen vorgeschlagen werden. Hier ist der detaillierte Ablauf:
        
        1. Analyse der vorliegenden Anamnese-Informationen:
        
        2. Identifiziere die Hauptsymptome und assoziierte Symptome.
        Berücksichtige die Dauer und Intensität der Symptome sowie relevante Vorerkrankungen und die familiäre Krankengeschichte.
        
        3. Erstellung einer Liste von Differenzialdiagnosen:
        Erstelle eine Liste möglicher Diagnosen mit ICD-10 Code, die die Symptome des Patienten erklären könnten und die auf den vorliegenden Informationen basieren.
        
        4. Vorschläge für relevante Folgefragen:
        Nenne Fragen die gestellt werden sollen, um die möglichen Diagnosen weiter einzugrenzen. Verweise mittels "-> $Differenzialdiagnosen" die du in Punkt 3 erstellt hast.
        Mache diese für alle gennanten Diagnosen.

        5. Empfohlene körperliche Untersuchungen:
        Nenne körperlichen Untersuchungen die durchgeführt werden sollen, um Hinweise auf die vermuteten Diagnosen zu finden. Verweise mittels "-> $Differenzialdiagnosen" die du in Punkt 3 erstellt hast.
        Mache diese für alle gennanten Diagnosen.

        6. Therapieansatz:
        Nenne einen Therapieansatz, der auf den vorliegenden Informationen basiert. Verweise mittels "-> $Differenzialdiagnosen" die du in Punkt 3 erstellt hast.
        Mache diese für alle gennanten Diagnosen.

        Keine Einleitung, kein Schlusssatz. Überschriften mit ** vor und nach dem Text kennzeichnen.
        
       
        `
      },
    ],
  })

  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSubmit(e)
  }

  const handleLiClick = (text) => {
    setInput(text);
  }

  return (
    <section className='py-1 text-zinc-700 dark:text-zinc-300'>
      <div className='container'>

        <div className='mt-3 w-full max-w-full text-left relative -ml-4'>
          <h1 className='font-medium pt-5 text-zinc-900 dark:text-zinc-100'>Closed-Beta Test: Symptome eingeben ➜ Diagnosevorschläge und Untersuchungsideen erhalten</h1>
        </div>

        {/* Chat area */}
        <div className='flex'>
          <div className='mt-3 w-3/4 text-left relative -ml-4'>
            <div className='absolute top-0 right-0 -mt-10 ml-2'>
              <CopyToClipboard message={messages[messages.length - 1]} className='' />
            </div>

            <div className='absolute top-0 right-0 mt-2 mr-0'>

            </div>
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

            <form onSubmit={onSubmit} className='relative'>
              <Input
                name='message'
                value={input}
                onChange={handleInputChange}
                placeholder='Symptome und bekannte Anamnese-Informationen eingeben. Mind. 3 Angaben. Folgefragen möglich.'
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

          {/* Legend Section */}
          <div className='mt-1 w-1/4 text-left relative pl-5'>
            <div className='mt-2 bg-gray-100 dark:bg-gray-800 pl-13 rounded-md max-h-[500px] overflow-y-auto'>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100'>Beispiele für Eingaben (klickbar):</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li onClick={() => handleLiClick('Kopfschmerzen 3 T, 45 J, w')}>Kopfschmerzen 3 T, 45 J, w</li>
                <li onClick={() => handleLiClick('w, 20j, Fieber, 38, seit 2 T, Diabetes')}>w, 20j, Fieber, 38, seit 2 T, Diabetes</li>
                <li onClick={() => handleLiClick('Bauchschmerzen, 25 J, m, Ibuprofen')}>Bauchschmerzen, 25 J, m, Ibuprofen</li>
              </ul>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100 mt-3'>Bekannte Abkürzungen:</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li>T: Tage</li>
                <li>J: Jahre</li>
                <li>w: weiblich</li>
                <li>m: männlich</li>
                <li>Medis: Medikamente</li>
                <li>KG: Krankengeschichte</li>
                <li>F: Fieber</li>
                <li>Sz: Schmerzen</li>
                <li>BD: Blutdruck</li>
                <li>RR: Blutdruck (Riva-Rocci)</li>
                <li>P: Puls</li>
                <li>HF: Herzfrequenz</li>
                <li>AF: Atemfrequenz</li>
                <li>O2: Sauerstoffsättigung</li>
                <li>BZ: Blutzucker</li>
                <li>EKG: Elektrokardiogramm</li>
                <li>CT: Computertomographie</li>
                <li>MRT: Magnetresonanztomographie</li>
                <li>US: Ultraschall</li>
                <li>OP: Operation</li>
                <li>NW: Nebenwirkungen</li>
                <li>LZ: Langzeit</li>
                <li>Vd: Verdacht auf</li>
                <li>WS: Wirbelsäule</li>
                <li>Frakt: Fraktur</li>
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
