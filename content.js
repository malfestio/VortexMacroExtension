let buttonClicked = false; 
let observer = null; 
function clickSlowDownloadButton() {

  if (buttonClicked) {
    return; 
  }
  let element = document.querySelector("#slowDownloadButton");

  if (element) {
    setTimeout(() => {
      element.click();
      buttonClicked = true; 
      setTimeout(() => {
        window.close();
      }, 1000); 
    }, 1000); 
  } else { 
  }
}
function handleButtonFound(mutationsList, observer) {

  observer.disconnect();
  let element = document.querySelector("#slowDownloadButton");
  if (element && !buttonClicked) {
    clickSlowDownloadButton(); 
  } else {
  }
}
observer = new MutationObserver((mutationsList, observer) => {
  handleButtonFound(mutationsList, observer);
});

observer.observe(document.body, { childList: true, subtree: true });
