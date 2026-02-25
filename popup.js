(function () {
  const DEFAULT_BASE_URL = "No base url configured.";

  const input = document.getElementById("workitem");
  const baseUrlPreview = document.getElementById("baseUrlPreview");
  const optionsLink = document.getElementById("optionsLink");

  // Load baseUrl from storage
  function loadBaseUrl(cb) {
    chrome.storage.sync.get({ baseUrl: DEFAULT_BASE_URL }, (items) => {
      cb(items.baseUrl || DEFAULT_BASE_URL);
    });
  }

  function applyBaseUrlPreview(url) {
    baseUrlPreview.textContent = url;
    baseUrlPreview.title = url;
  }

  // Open options page
  optionsLink.addEventListener("click", (e) => {
    e.preventDefault();
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL("options.html"));
    }
  });

  // Submit on Enter
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const id = input.value.trim();
      if (!id) return;

      loadBaseUrl((baseUrl) => {
        // Ensure baseUrl ends with a slash
        if (!/\/$/.test(baseUrl)) baseUrl += "/";
        const url = baseUrl + encodeURIComponent(id);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs[0]) {
            chrome.tabs.update(tabs[0].id, { url });
          }
          window.close();
        });
      });
    }
  });

  // Init
  input.focus();
  loadBaseUrl(applyBaseUrlPreview);
})();