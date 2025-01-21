;(async function () {
  console.log("Manifest override script injected.")

  let manifestLink = document.querySelector('link[rel="manifest"]')
  if (!manifestLink) {
    console.warn("Manifest file not found on this page.")
    return
  }

  let originalManifestURL = manifestLink.href

  try {
    let response = await fetch(originalManifestURL)
    let manifestData = await response.json()

    const absoluteURL = (relativeURL) =>
      new URL(relativeURL, originalManifestURL).href

    if (manifestData.start_url)
      manifestData.start_url = absoluteURL(manifestData.start_url)
    if (manifestData.scope) manifestData.scope = absoluteURL(manifestData.scope)

    if (manifestData.shortcuts && Array.isArray(manifestData.shortcuts)) {
      manifestData.shortcuts.forEach((shortcut) => {
        if (shortcut.url) shortcut.url = absoluteURL(shortcut.url)
      })
    }

    manifestData.display_override = ["tabbed"]
    manifestData.launch_handler = { client_mode: ["navigate-new"] }

    let modifiedManifestBlob = new Blob(
      [JSON.stringify(manifestData, null, 2)],
      { type: "application/json" }
    )
    let modifiedManifestURL = URL.createObjectURL(modifiedManifestBlob)

    manifestLink.href = modifiedManifestURL

    console.log("Manifest successfully modified:", manifestData)
  } catch (error) {
    console.error("Failed to fetch and modify manifest:", error)
  }
})()
