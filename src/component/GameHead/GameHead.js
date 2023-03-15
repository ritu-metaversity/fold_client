import React from 'react'
import { Link } from 'react-router-dom'

function GameHead() {
  return (
    <div>
        <ul role="tablist" id="home-events" class="nav nav-tabs">
            <li class="nav-item"><Link href="/" data-toggle="tab" class="nav-link active">Tennis</Link></li>
        </ul>
    </div>
  )
}

export default GameHead