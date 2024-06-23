import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import "@mantine/core/styles.css"
import { MantineProvider } from "@mantine/core"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <MantineProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MantineProvider>
)
