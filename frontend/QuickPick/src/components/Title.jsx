import React from 'react'

function Title({ title1, title2 }) {
  return (
    <h2 className="text-3xl sm:text-5xl tracking-tight text-foreground  uppercase text-center mb-4 font-sans">
      <span className="font-mono">{title1}</span>{' '}
      <span className="font-bold font-mono ">{title2}</span>
    </h2>
  )
}

export default Title
