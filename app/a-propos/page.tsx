"use client"

import dynamic from 'next/dynamic'

const APropos = dynamic(() => import('@/components/a-propos'), { ssr: false })

export default function AproposPage() {
  return (
    <APropos />
  )
}