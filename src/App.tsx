import Cordinate from "./components/Cordinate"
import InputLogLat from "./components/InputLogLat"
import { AppContextProvider } from "./context/AppContext"


const App = () => {
  return (

    <AppContextProvider>
      <div className="w-full h-full overflow-hidden relative">
        <Cordinate />
        <InputLogLat />
      </div>
    </AppContextProvider>
  )
}

export default App