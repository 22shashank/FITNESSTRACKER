import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose && onClose(), 3500)
    return () => clearTimeout(t)
  }, [onClose])

  const colors = {
    info: 'bg-sky-600',
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
  }

  return (
    <div className={`fixed right-4 bottom-6 z-50 w-80 rounded-lg px-4 py-3 text-sm text-white ${colors[type] || colors.info}`}>
      {message}
    </div>
  )
}
