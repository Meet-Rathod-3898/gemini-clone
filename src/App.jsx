import React, { useState } from 'react'
import Sidebar from './component/sidebar/sidebar'
import Main from './component/Main/Main'

const App = () => {
  const [extended, setExtended] = useState(false);

  return (
    <div className="app">
      <Sidebar extended={extended} setExtended={setExtended} />
      <Main setExtended={setExtended} />
    </div>
  )
}

export default App