import React from 'react'
import { defaultTheme } from 'evergreen-ui'
import './Footer.scss'

export default function Footer() {
  return (
    <div className="footer_wrapper"
      style={{color: defaultTheme.colors.icon.disabled}}
    >
      Developed by Lívia Almeida Barbosa
    </div>
  )
}
