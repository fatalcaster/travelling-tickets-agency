export const isMobile = ({ maxWidth = 639 } = {}) => {
    return (
      window.matchMedia("(pointer: coarse)").matches &&
      navigator.maxTouchPoints > 1 &&
      window.matchMedia(`(max-width: ${maxWidth}px)`).matches &&
      "ontouchstart" in document.documentElement
    )
  }