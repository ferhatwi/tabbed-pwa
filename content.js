;(async function () {
  console.log("Manifest override script injected.")

  let manifestLink = document.querySelector('link[rel="manifest"]')

  if (!manifestLink) {
    console.warn("No manifest found. Creating a new one.")

    // Try to find a favicon
    let faviconLink = document.querySelector(
      'link[rel="icon"], link[rel="shortcut icon"]'
    )
    let faviconURL = faviconLink ? faviconLink.href : ""

    // Function to get favicon size
    async function getFaviconSize(url) {
      return new Promise((resolve) => {
        let img = new Image()
        img.onload = () => resolve(`${img.naturalWidth}x${img.naturalHeight}`)
        img.onerror = () => resolve("64x64") // Default fallback
        img.src = url
      })
    }

    let iconSize = faviconURL ? await getFaviconSize(faviconURL) : "64x64"

    // Create a default manifest with the favicon
    let newManifestData = {
      name: document.title,
      short_name: document.title,
      start_url: location.origin + location.pathname,
      display: "standalone",
      display_override: ["tabbed"],
      launch_handler: { client_mode: ["navigate-new"] },
      scope: location.origin + "/",
      icons: faviconURL
        ? [
            {
              src: faviconURL,
              type: "image/*",
              sizes: iconSize
            }
          ]
        : []
    }

    let newManifestBlob = new Blob([JSON.stringify(newManifestData, null, 2)], {
      type: "application/json"
    })
    let newManifestURL = URL.createObjectURL(newManifestBlob)

    // Create new <link rel="manifest">
    manifestLink = document.createElement("link")
    manifestLink.rel = "manifest"
    manifestLink.href = newManifestURL
    manifestLink.setAttribute("crossorigin", "use-credentials")
    document.head.appendChild(manifestLink)
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
    else manifestData.start_url = location.origin + location.pathname

    if (manifestData.scope) manifestData.scope = absoluteURL(manifestData.scope)
    else manifestData.scope = location.origin + "/"

    if (manifestData.icons && Array.isArray(manifestData.icons)) {
      manifestData.icons.forEach((icon) => {
        if (icon.src) icon.src = absoluteURL(icon.src)
      })
    }

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
