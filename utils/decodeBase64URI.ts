export const decodeBase64URI = (str: string): string => {
  try {
    const uri = window.atob(str)
    return decodeURIComponent(uri)
  } catch (err) {
    return str
  }
}
