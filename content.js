console.log("Starting content script execution.");

let buttonClicked = false; // Flag to track if button has been clicked
let observer = null; // Variable to hold the MutationObserver

// Function to handle clicking the slow download button
function clickSlowDownloadButton() {
  console.log("Running clickSlowDownloadButton function");

  if (buttonClicked) {
    console.log("Button already clicked once, skipping.");
    return; // Exit function if button has already been clicked
  }

  let element = document.querySelector("#slowDownloadButton");

  if (element) {
    console.log("Slow download button found, will click in 1 second.");
    setTimeout(() => {
      console.log("Attempting to click the slow download button.");
      console.log("Element to be clicked:", element);

      // Click the button using element.click()
      element.click();

      console.log("Slow download button clicked.");
      buttonClicked = true; // Update flag to indicate button has been clicked

      // Wait another 1 second before closing the tab
      setTimeout(() => {
        console.log("Closing the tab.");
        window.close();
      }, 1000); // Delay of 1 second for closing the tab

    }, 1000); // Delay of 1 second before clicking the button
  } else {
    console.log("Slow download button not found, retrying...");
    // Optionally, retry or handle the case where the button is not found
  }
}

// Function to handle when the button is found
function handleButtonFound(mutationsList, observer) {
  console.log("Handling button found");

  // Disconnect the observer to prevent further observations
  observer.disconnect();

  // Check if the #slowDownloadButton is now available and button not clicked
  let element = document.querySelector("#slowDownloadButton");
  if (element && !buttonClicked) {
    console.log("Slow download button found by observer, will click.");
    clickSlowDownloadButton(); // Call function to click button and close tab
  } else {
    console.log("Button not found or already clicked, continuing...");
  }
}

// Create a MutationObserver to watch for changes in the DOM
observer = new MutationObserver((mutationsList, observer) => {
  handleButtonFound(mutationsList, observer);
});

// Start observing changes in the document body
observer.observe(document.body, { childList: true, subtree: true });

// Log when the script execution ends
console.log("End of content script.");
