'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import CopyToClipboard from '@/components/copy-to-clipboard'
import FeedbackModal from './FeedbackModal' // QR Code for WhatsApp

// Helper function to format the message content
function formatMessageContent(content) {
  return content.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  )
}

export default function TravelRecommendationsBot() {
  const ref = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false);
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: `
          Du bist ein KI-Modell, das eine Reisedestination und medizinische Informationen analysiert und auf deren Basis relevante Folgefragen und Schritte vorschlägt.
          Nenne notwendige Impfungen, Vorlaufzeit, Medikamente, und andere relevante Informationen.
          Der Benutzer gibt ein Reiseziel, Vorlaufzeit und andere relevante Details als Input. 

          Hier ist der detaillierte Ablauf:
          1. Analyse der vorliegenden Informationen:
          2. Benötigte Impfungen anhang vom Schweizerischer Impfplan (SIP):
          3. Medikamente:
          4. Andere relevante Informationen:
          5. Folgefragen / Schritte.

          Keine Einleitung, keinen Hinweis auf Arzt. Hohe Informationsdichte mit Ärzten als Zielgruppe.
           W = Woche, M = Monat, K = Krankheit, z.B. Asthma, Diabetes, Schwangerschaft.`
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
          <h1 className='font-medium pt-5 text-zinc-900 dark:text-zinc-100'>Beta Test: Reiseort + Vorlaufzeit ➜ Med. Reiseempfehlungen erhalten</h1>
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
                        <p className='font-semibold text-blue-800 dark:text-blue-300'>Your Input:</p>
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
                          <p className='font-semibold text-green-800 dark:text-green-300'>Assistant</p>
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
                placeholder='Geben Sie die Reisedestination, Vorlaufzeit, und relevante Details ein. Z.B. Land, Abfahrt in X Wochen, Gesundheitszustand.'
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
                <li onClick={() => handleLiClick('Japan, in 2 Wochen, keine K')}>Japan, in 2 Wochen, keine K</li>
                <li onClick={() => handleLiClick('Brasilien, in 1 Monat, Diabetes T1')}>Brasilien, in 1 Monat, Diabetes T1</li>
                <li onClick={() => handleLiClick('Kenya, 3 W, schwanger')}>Kenya, 3 W, schwanger</li>
                <li onClick={() => handleLiClick('Indien, in 2 M, Asthma')}>Indien, in 2 M, Asthma</li>
                <li onClick={() => handleLiClick('Sued Afrika, in 1 W, herz')}>Sued Afrika, in 1 W, herz</li>
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
