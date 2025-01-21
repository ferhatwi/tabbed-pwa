# PWA Manifest Override Extension

This Chrome extension modifies the PWA manifest of supported websites to enable **Tabbed Mode** for Progressive Web Apps (PWA). You can easily add your desired sites to this list and manage which sites are processed by the extension in the Chrome extension settings.

## Features
- Modifies the PWA manifest of supported websites to display in a tabbed layout.
- Allows users to add custom sites to be processed by the extension.
- Users can manage the sites they want to allow through the extension settings.

## How It Works
1. After installation, the extension injects a script that fetches and modifies the PWA manifest of supported websites, applying a tabbed display and launch mode settings.
2. By default, the extension works on sites like YouTube, but you can easily add more sites to be processed in the `content_scripts` and `host_permissions` in the extension's code.

## Requirements

- **Chrome Flag**: The **`#enable-desktop-pwas-tab-strip`** flag must be enabled in Chrome for the tabbed PWA mode to work.
  
  To enable it:
  1. Open Chrome and go to `chrome://flags/`.
  2. Search for `#enable-desktop-pwas-tab-strip`.
  3. Set it to **Enabled**.
  4. Restart Chrome to apply the changes.

## Installation

### Option 1: Install via Chrome Web Store (Coming Soon Maybe?)
The extension will be available on the Chrome Web Store soon. You can install it from there once it's published.

### Option 2: Manual Installation (Unpacked Extension)

1. Download or clone this repository to your local machine.

2. **Open Chrome** and navigate to `chrome://extensions/`.

3. Enable **Developer mode** by toggling the switch at the top right of the page.

4. Click the **"Load unpacked"** button.

5. Select the folder where you downloaded or cloned the repository.

6. The extension should now appear in your Chrome Extensions page.

## Adding Custom Sites

1. **Edit the code**: Open the `manifest.json` file and modify the `content_scripts.matches` and `host_permissions` arrays to include the URLs of the sites you want to modify (e.g., `https://example.com/*`).

2. **Reload the extension**: After adding or modifying the sites in the `manifest.json`, go to `chrome://extensions/`, find your extension, and click the **"Reload"** button to apply the changes.

3. **Manage allowed sites**: After installation, you can manage which sites to allow by updating the `content_scripts.matches` and `host_permissions` fields in the extension code.

## How to Use
- After installation, the extension will automatically modify the PWA manifest for any site that matches the URLs listed in `content_scripts.matches` and `host_permissions`.
- You can manage the allowed sites through the Chrome extension settings by editing the `matches` and `host_permissions` fields in the extension code.
- If you make any changes to the sites in the `manifest.json`, remember to **reload** the extension in `chrome://extensions/` to apply the changes.

## Troubleshooting
- If the extension is not working as expected, try reloading the page.
- Ensure that the site you are trying to modify has a valid PWA manifest (`link[rel="manifest"]` tag) for the modification to work.
- If you add or modify sites, make sure to reload the extension in `chrome://extensions/`.

## Permissions
This extension requires the following permissions:
- **Scripting**: To inject scripts into the pages.
- **Active Tab**: To modify the active tab.
- **Host Permissions**: Access to the sites that are allowed to be modified.

## Security Considerations
- The extension only affects sites that are explicitly added to the `content_scripts.matches` and `host_permissions` fields in the extension's `manifest.json`.
- It does not have blanket permissions to access all pages, ensuring security and user privacy.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
