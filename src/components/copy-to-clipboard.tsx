'use client'

import { type Message } from 'ai'
import { useClipboard } from '@/hooks/use-clipboard'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  message: Message
}

export default function CopyToClipboard({
  message,
  className = '',
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  return (
    <div className={`${className}`} {...props}>
      <button
        className='flex items-center justify-center p-2 border rounded hover:bg-gray-200'
        onClick={onCopy}
        aria-label="Copy message"
      >
        {isCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className='h-4 w-4 text-emerald-500'
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className='h-4 w-4 text-gray-500'
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 3a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm2 0v12h8V3H6zm3 7a1 1 0 000 2h2a1 1 0 000-2H9zm-1-3a1 1 0 100 2h4a1 1 0 100-2H8z" />
          </svg>
        )}
      </button>
    </div>
  )
}
