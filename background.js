chrome.runtime.onInstalled.addListener(() => {
  console.log("YouTube PWA Manifest Override Extension Installed.")
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateManifest") {
    console.log("Received request to update manifest.")

    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"]
    })

    sendResponse({ status: "Manifest update triggered." })
  }
})

let emptyWindows = new Set()

chrome.windows.onCreated.addListener(async (window) => {
  let tabs = await chrome.tabs.query({ windowId: window.id })

  if (tabs.length === 0) {
    console.log("Empty window detected:", window.id)
    emptyWindows.add(window.id)
    return
  }

  if (tabs.length === 1) {
    console.log("PWA opened, closing empty windows...")
    for (let winId of emptyWindows) {
      chrome.windows.remove(winId)
    }
    emptyWindows.clear()
  }
})
