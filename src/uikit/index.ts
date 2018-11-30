import "./components"
import store from "./store"
import "./styleRenderer"
import "./configurator"

document.querySelectorAll("#reset")
  .forEach(reset => {
    reset.addEventListener("click", () => store.reset())
  })