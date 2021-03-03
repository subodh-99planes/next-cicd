export const scrollToTop = (): void => {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  } catch (err) {
    window.scroll(0, 0)
  }
}
