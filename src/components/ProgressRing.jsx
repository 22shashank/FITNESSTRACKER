import React from 'react'

export default function ProgressRing({ size = 96, progress = 0 }) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#0f172a" strokeWidth="8" fill="none" />
      <circle cx={size / 2} cy={size / 2} r={radius} stroke="#34d399" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{`${Math.round(progress)}%`}</text>
    </svg>
  )
}
