import React from 'react'
import { defaultTheme } from 'evergreen-ui'
import './Footer.scss'

console.log(defaultTheme)
export default function Footer() {
  return (
    <div className="footer_wrapper"
      style={{color: defaultTheme.colors.icon.disabled}}
    >
      Developed by Lívia Almeida
    </div>
  )
}
