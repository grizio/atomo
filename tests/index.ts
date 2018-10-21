import "../src/all"
import "./components"
import store from "./store"
import "./styleRenderer"

document.querySelectorAll("#reset")
  .forEach(reset => {
    reset.addEventListener("click", () => store.reset())
  })