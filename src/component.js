export default (text = "Click to lazy load") => {
  const element = document.createElement("div");
  element.innerHTML = text;

  element.onclick = () =>
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default
      })
      .catch(err => {
        console.error(err)
      })

  return element;
};

