import React from 'react'
import Modal from './Modal'

export default function ConfirmDialog({ title = 'Confirm', message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-slate-300">{message}</p>
      <div className="mt-4 flex justify-end gap-3">
        <button onClick={onCancel} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300">Cancel</button>
        <button onClick={onConfirm} className="rounded-xl bg-emerald-500 px-3 py-2 text-sm text-white">Confirm</button>
      </div>
    </Modal>
  )
}
