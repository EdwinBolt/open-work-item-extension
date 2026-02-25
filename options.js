(function () {
  const DEFAULT_BASE_URL = "No base url provided";
  const input = document.getElementById("baseUrl");
  const saveBtn = document.getElementById("saveBtn");
  const savedMsg = document.getElementById("savedMsg");

  function sanitize(url) {
    url = (url || "").trim();
    if (!url) return DEFAULT_BASE_URL;

    // Basic validation: must look like http(s) URL and contain /_workitems/edit
    try {
      const u = new URL(url);
      if (!/\/_workitems\/edit\/?$/i.test(u.pathname)) {
        // If user pasted base path without trailing segment, try to coerce
        if (!u.pathname.endsWith("/")) u.pathname += "/";
        u.pathname += "_workitems/edit/";
        return u.toString();
      }
      return u.toString();
    } catch {
      // If invalid URL, fallback to default
      return DEFAULT_BASE_URL;
    }
  }

  function load() {
    chrome.storage.sync.get({ baseUrl: DEFAULT_BASE_URL }, (items) => {
      input.value = items.baseUrl || DEFAULT_BASE_URL;
    });
  }

  function save() {
    const baseUrl = sanitize(input.value);
    chrome.storage.sync.set({ baseUrl }, () => {
      input.value = baseUrl;
      savedMsg.style.display = "inline";
      setTimeout(() => (savedMsg.style.display = "none"), 1200);
    });
  }

  saveBtn.addEventListener("click", save);

  // Save on Enter inside the input
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    }
  });

  load();
})();