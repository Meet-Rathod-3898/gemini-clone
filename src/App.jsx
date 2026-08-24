import React, { useState } from 'react'
import Sidebar from "./components/sidebar/Sidebar";
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