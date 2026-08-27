import { useState } from 'react'
import { visualAssets } from '../data/visualAssets'

export default function VisualImage({ src, kind = 'food', alt, className = '', loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const fallback = visualAssets[kind] || visualAssets.food
  return <img src={failed ? fallback : src || fallback} alt={alt} loading={loading} width="640" height="420" onError={() => setFailed(true)} className={`block h-full w-full object-cover ${className}`} />
}
