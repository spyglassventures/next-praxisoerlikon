'use client'

import { useChat } from 'ai/react'
import { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import CopyToClipboard from '@/components/copy-to-clipboard'
import FeedbackModal from './FeedbackModal'
import { FaLightbulb } from 'react-icons/fa' // Importing an icon from react-icons

// Helper function to format the message content
function formatMessageContent(content) {
  return content.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  )
}

// Modal to display WhatsApp QR Code
function SuggestionModal({ showModal, setShowModal }) {
  return (
    showModal && (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
        <div className='bg-white dark:bg-gray-900 p-5 rounded shadow-md'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-gray-100'>WhatsApp QR Code</h2>
          <div className='flex justify-center mt-3'>
            <img src='/path/to/whatsapp-qr-code.png' alt='WhatsApp QR Code' />
          </div>
          <div className='flex justify-end mt-3'>
            <button
              className='ml-2 bg-gray-500 text-white rounded px-4 py-2'
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  )
}

export default function ChatStellungsnahme() {
  const ref = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, error } = useChat({
    initialMessages: [
      {
        id: Date.now().toString(),
        role: 'system',
        content: `Du bist ein KI-Modell, das eine Stellungsnahme im medizinischen Kontext erstellt.
        Der Input gibt dir Informationen ueber die gewünschte Stellungsnahme und bekannte Diagnosen. 
        
        Wichtigste Abkürzungen, die du kennen solltest:
        LZ = Langzeit
        L = Links
        R = Rechts

        Orientiere dich an folgenden Format und formuliere [...] aus. Ergänze eine Begründung und nutze das Format, wie in einem medizinischen Brief an ein Amt.

        Sehr geehrte Damen und Herren,
        
        [Begründung 1]
        [Begründung 2]

        [...]

        <br>
        Diagnose(n): [...]
        <br>
        Danke im Voraus.

        Freundliche Grüße,
        
        `
      },
    ],
  })

  // Follow up questions state
  const [showFollowUpButtons, setShowFollowUpButtons] = useState(false)
  // WhatsApp QR Code state
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false)

  // Scroll to the bottom of the messages when a new message is added
  useEffect(() => {
    if (ref.current === null) return
    ref.current.scrollTo(0, ref.current.scrollHeight)
  }, [messages])

  // Show follow-up buttons when the assistant sends a message and typing is complete
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].role === 'assistant') {
      const timer = setTimeout(() => {
        setShowFollowUpButtons(true)
        const hideTimer = setTimeout(() => {
          setShowFollowUpButtons(false)
        }, 12000) // Show the buttons for 12 seconds
        return () => clearTimeout(hideTimer)
      }, 2000) // Show the buttons 2 seconds after the message is received
      return () => clearTimeout(timer)
    }
  }, [messages])

  // Handle form submission
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleSubmit(e)
  }

  // Handle example list item click
  const handleLiClick = (text) => {
    setInput(text)
  }

  return (
    <section className='py-1 text-zinc-700 dark:text-zinc-300'>
      <div className='container'>
        <div className='mt-3 w-full max-w-full text-left relative -ml-4'>
          <h1 className='font-medium pt-5 text-zinc-900 dark:text-zinc-100'>
            Closed-Beta Test: Gewünschte Stellungsnahme und Diagnose eingeben ➜ Formulierungsvorschlag erhalten
          </h1>
        </div>

        <div className='flex'>
          {/* Chat area */}
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

            {showFollowUpButtons && (
              <div className='flex justify-start mb-3 space-x-3'>
                <button
                  className='bg-gray-200 text-black px-4 py-2 rounded cursor-pointer flex items-center space-x-2'
                  onClick={() => setInput('Übersetze ins Englische')}
                >
                  <FaLightbulb className='text-yellow-500' />
                  <span>Übersetze ins Englische</span>
                </button>
                <button
                  className='bg-gray-200 text-black px-4 py-2 rounded flex items-center space-x-2'
                  onClick={() => setInput('Formaler schreiben')}
                >
                  <FaLightbulb className='text-yellow-500' />
                  <span>Formaler schreiben</span>
                </button>
                <button
                  className='bg-gray-200 text-black px-4 py-2 rounded flex items-center space-x-2'
                  onClick={() => setInput('Mehr Argumente')}
                >
                  <FaLightbulb className='text-yellow-500' />
                  <span>Mehr Argumente</span>
                </button>
              </div>
            )}

            <form onSubmit={onSubmit} className='relative'>
              <Input
                name='message'
                value={input}
                onChange={handleInputChange}
                placeholder='Stellungsnahme + Diagnose eingeben (Bsp: Frühzeitrente, Cerebralem Insult L)'
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

          {/* Example Bar */}
          <div className='mt-1 w-1/4 text-left relative pl-5'>
            <div className='mt-2 bg-gray-100 dark:bg-gray-800 pl-13 rounded-md max-h-[500px] overflow-y-auto'>
              <p className='p-1 font-semibold text-zinc-900 dark:text-zinc-100'>Beispiele für Eingaben (klickbar):</p>
              <ul className='p-1 mt-1 text-sm text-zinc-700 dark:text-zinc-300'>
                <li onClick={() => handleLiClick('Frühzeitrente, Cerebralem Insult L')}>Frühzeitrente, Cerebralem Insult L</li>
                <li onClick={() => handleLiClick('Langzeituntersuchung, Herzinfarkt R')}>Langzeituntersuchung, Herzinfarkt R</li>
                <li onClick={() => handleLiClick('Gutachten, Multiple Sklerose')}>Gutachten, Multiple Sklerose</li>
                <li onClick={() => handleLiClick('Berufswechsel, Rheumatoide Arthritis')}>Berufswechsel, Rheumatoide Arthritis</li>
                <li onClick={() => handleLiClick('Schwerbehinderung, Chronische Schmerzen LZ')}>Schwerbehinderung, Chronische Schmerzen LZ</li>
              </ul>
            </div>
            <div className='mt-3'>
              <button
                className='h-8 max-w-full bg-gray-600 text-white rounded flex items-center justify-center pl-8 pr-8'
                // Show WhatsApp QR Code
                onClick={() => setShowSuggestionsModal(true)} // Corrected the onClick handler
              >
                Was können wir besser machen?
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeedbackModal showModal={showSuggestionsModal} setShowModal={setShowSuggestionsModal} />
    </section>
  )
}
