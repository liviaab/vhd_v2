import React from 'react'
import { defaultTheme } from 'evergreen-ui'
import './Header.scss'

export default function Header() {
  return (
    <div className="header_wrapper" style={{color: defaultTheme.colors.text.default}}>
      <strong>Visualization of Hyper-Distributions</strong>
    </div>
  )
}
