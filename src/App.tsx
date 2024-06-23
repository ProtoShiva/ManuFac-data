import MaxMinCrop from "./components/MaxMinCrop/MaxMinCrop"
import AvgYieldCrop from "./components/AvgYieldCrop/AvgYieldCrop"

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>Table 1</h1>
      <MaxMinCrop />
      <h1>Table 2</h1>
      <AvgYieldCrop />
    </div>
  )
}

export default App
