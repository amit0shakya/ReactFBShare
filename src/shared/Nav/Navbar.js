import React from 'react'
import { NavLink } from 'react-router-dom'
import css from './Nav.css';


export default function Navbar () {
  
  return (
    <div className={css.navArea}>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>
        <li>
          <NavLink to={'/project'}>Project</NavLink>
        </li>
      </ul>
    </div>
  )
}