import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <p>Wellcome to my project!</p>
      <Link to={"/"}>Back To Task Tracker</Link>
    </div>
  )
}
