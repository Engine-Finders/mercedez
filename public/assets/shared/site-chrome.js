(function () {
  const DATA_URL = "/assets/shared/chrome-data.json";
  const THEME_KEY = "site-theme";
  const PREVIEW = 10;

  const sunSvg =
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/><circle cx="12" cy="12" r="4"/></svg>';
  const moonSvg =
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z"/></svg>';
  const menuSvg =
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  const closeSvg =
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const chevSvg =
    '<svg class="me-nav__chev" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 7l5 5 5-5"/></svg>';
  const caretSvg =
    '<svg aria-hidden="true" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="opacity:.6;flex-shrink:0"><path d="M7 5l5 5-5 5"/></svg>';

  function getTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    window.dispatchEvent(new Event("site-theme-change"));
    document.querySelectorAll("[data-me-theme-btn]").forEach((btn) => {
      const next = theme === "dark" ? "Switch to day theme" : "Switch to night theme";
      btn.setAttribute("aria-label", next);
      btn.title = next;
      btn.innerHTML = theme === "dark" ? sunSvg : moonSvg;
    });
    const logo = document.querySelector(".me-nav__logo img");
    if (logo) logo.style.filter = theme === "dark" ? "" : "invert(1)";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function linkHtml(href, label, className) {
    return `<a href="${escapeHtml(href)}" class="${className}">${escapeHtml(label)}</a>`;
  }

  function flatModels(menu) {
    return menu.groups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })));
  }

  function columnsClass(count) {
    if (count >= 4) return "me-nav__cols me-nav__cols--4";
    if (count >= 3) return "me-nav__cols me-nav__cols--3";
    return "me-nav__cols me-nav__cols--2";
  }

  function renderColumns(menu, expandedTitles) {
    return `<div class="${columnsClass(menu.groups.length)}">${menu.groups
      .map((group) => {
        const links = group.links || [];
        const expanded = expandedTitles.has(group.title);
        const visible = expanded || links.length <= PREVIEW ? links : links.slice(0, PREVIEW);
        const canExpand = links.length > PREVIEW;
        return `<div>
          <p class="me-nav__group-title">${escapeHtml(group.title)}</p>
          <ul style="list-style:none;margin:0;padding:0;display:grid;gap:0.375rem">
            ${visible.map((l) => `<li>${linkHtml(l.href, l.label, "me-nav__link")}</li>`).join("")}
          </ul>
          ${
            canExpand
              ? `<button type="button" class="me-nav__muted" data-expand-col="${escapeHtml(group.title)}">${
                  expanded ? "Show less" : `View all (${links.length})`
                }</button>`
              : ""
          }
        </div>`;
      })
      .join("")}</div>`;
  }

  function renderModelsPanel(menu, activeHref) {
    return `<div class="${columnsClass(4)}">${menu.groups
      .map((group, groupIndex) => {
        const openLeft = groupIndex >= 2;
        return `<div>
          <p class="me-nav__group-title">${escapeHtml(group.title)}</p>
          <ul style="list-style:none;margin:0;padding:0;display:grid;gap:0.25rem">
            ${group.items
              .map((item) => {
                const active = item.href === activeHref;
                const variants = item.variants || [];
                const generations = item.generations || [];
                const flyout =
                  active && (variants.length || generations.length)
                    ? `<div class="me-nav__flyout${openLeft ? " is-left" : ""}">
                        ${linkHtml(item.href, `${item.label} Overview`, "me-nav__muted")}
                        <div style="display:grid;gap:0.75rem;margin-top:0.5rem;${
                          variants.length && generations.length ? "grid-template-columns:1fr 1fr" : ""
                        }">
                          ${
                            variants.length
                              ? `<div>
                                  <p class="me-nav__group-title">Variants (${variants.length})</p>
                                  <ul style="list-style:none;margin:0;padding:0;display:grid;gap:0.125rem">
                                    ${variants
                                      .map((l) => `<li>${linkHtml(l.href, l.label, "me-nav__link")}</li>`)
                                      .join("")}
                                  </ul>
                                </div>`
                              : ""
                          }
                          ${
                            generations.length
                              ? `<div>
                                  <p class="me-nav__group-title">Generations (${generations.length})</p>
                                  <ul style="list-style:none;margin:0;padding:0;display:grid;gap:0.125rem">
                                    ${generations
                                      .map((l) => `<li>${linkHtml(l.href, l.label, "me-nav__link")}</li>`)
                                      .join("")}
                                  </ul>
                                </div>`
                              : ""
                          }
                        </div>
                      </div>`
                    : "";
                return `<li style="position:relative" data-model-href="${escapeHtml(item.href)}">
                  <div class="me-nav__model-row${active ? " is-active" : ""}">
                    ${linkHtml(item.href, item.label, "me-nav__link")}
                    ${caretSvg}
                  </div>
                  ${flyout}
                </li>`;
              })
              .join("")}
          </ul>
        </div>`;
      })
      .join("")}</div>`;
  }

  function renderNavbar(data) {
    const menus = data.navMenus || [];
    const top = menus
      .map(
        (menu) => `<li>
          <button type="button" class="me-nav__top-btn" data-menu-id="${escapeHtml(menu.id)}" aria-expanded="false">
            <span>${escapeHtml(menu.label)}</span>${chevSvg}
          </button>
        </li>`,
      )
      .join("");

    return `<header class="me-nav">
      <nav class="me-nav__bar" aria-label="Main">
        <a href="/" class="me-nav__logo" aria-label="Mercedes Engines UK home">
          <img src="/navbar-logo.png" alt="Mercedes-Benz" width="64" height="64" />
        </a>
        <div class="me-nav__desktop">
          <ul class="me-nav__top">${top}</ul>
          <div class="me-nav__panel" hidden data-panel></div>
        </div>
        <div class="me-nav__actions">
          <button type="button" class="me-nav__icon-btn" data-me-theme-btn></button>
        </div>
        <div class="me-nav__mobile-actions">
          <button type="button" class="me-nav__icon-btn" data-me-theme-btn></button>
          <button type="button" class="me-nav__icon-btn" data-mobile-toggle aria-label="Open menu" aria-expanded="false" aria-controls="me-mobile-nav" style="border:0">${menuSvg}</button>
        </div>
      </nav>
      <div id="me-mobile-nav" class="me-nav__drawer" data-mobile-drawer></div>
    </header>`;
  }

  function renderFooter(data) {
    const footer = data.footer || {};
    const cols = (footer.columns || [])
      .map(
        (col) => `<div>
          <h2 class="me-footer__col-title">${escapeHtml(col.title)}</h2>
          <ul class="me-footer__links">
            ${(col.links || []).map((l) => `<li>${linkHtml(l.href, l.label, "")}</li>`).join("")}
          </ul>
        </div>`,
      )
      .join("");

    const legal = footer.legal || {};
    const legalLinks = (legal.links || [])
      .map((l, i) => `<li>${i > 0 ? '<span aria-hidden="true">·</span> ' : ""}${linkHtml(l.href, l.label, "")}</li>`)
      .join("");

    return `<footer>
      <div class="me-footer__inner">
        <a href="/" class="me-footer__logo" aria-label="Mercedes Engines UK home">
          <img src="/mercedes-benz-seeklogo.png" alt="Mercedes-Benz" width="80" height="80" />
        </a>
        <div class="me-footer__grid">${cols}</div>
        <div class="me-footer__legal">
          <p>${escapeHtml(legal.copyright || "")}</p>
          <p>${escapeHtml(legal.disclaimer || "")}</p>
          <ul class="me-footer__legal-links">${legalLinks}</ul>
        </div>
      </div>
    </footer>`;
  }

  function bindChrome(rootNav, rootFooter, data) {
    const menus = data.navMenus || [];
    let openId = null;
    let activeModelHref = menus.find((m) => m.kind === "models")?.groups?.[0]?.items?.[0]?.href || "/c-class";
    const expandedTitles = new Set();
    const panel = rootNav.querySelector("[data-panel]");
    const desktop = rootNav.querySelector(".me-nav__desktop");
    const drawer = rootNav.querySelector("[data-mobile-drawer]");
    const mobileToggle = rootNav.querySelector("[data-mobile-toggle]");
    let mobileStack = [{ type: "root" }];
    let mobileOpen = false;

    function closeDesktop() {
      openId = null;
      panel.hidden = true;
      panel.innerHTML = "";
      panel.classList.remove("is-models");
      rootNav.querySelectorAll("[data-menu-id]").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
        btn.querySelector(".me-nav__chev")?.classList.remove("is-open");
      });
    }

    function paintPanel() {
      const menu = menus.find((m) => m.id === openId);
      if (!menu) {
        closeDesktop();
        return;
      }
      panel.hidden = false;
      panel.classList.toggle("is-models", menu.kind === "models");
      panel.setAttribute("aria-label", menu.label);
      panel.innerHTML =
        menu.kind === "models" ? renderModelsPanel(menu, activeModelHref) : renderColumns(menu, expandedTitles);
      rootNav.querySelectorAll("[data-menu-id]").forEach((btn) => {
        const on = btn.getAttribute("data-menu-id") === openId;
        btn.setAttribute("aria-expanded", on ? "true" : "false");
        btn.querySelector(".me-nav__chev")?.classList.toggle("is-open", on);
      });
    }

    function paintMobile() {
      const current = mobileStack[mobileStack.length - 1];
      if (current.type === "root") {
        drawer.innerHTML = `<ul class="me-nav__mobile-list">${menus
          .map(
            (menu) => `<li>
              <button type="button" class="me-nav__mobile-row" data-mobile-open-menu="${escapeHtml(menu.id)}">
                <span>${escapeHtml(menu.label)}</span>${chevSvg}
              </button>
            </li>`,
          )
          .join("")}</ul>`;
        return;
      }

      const menu = menus.find((m) => m.id === current.menuId);
      if (!menu) return;

      if (current.type === "menu" && menu.kind === "models") {
        const models = flatModels(menu);
        drawer.innerHTML = `<button type="button" class="me-nav__back" data-mobile-back>← ${escapeHtml(menu.label)}</button>
          <div>${models
            .map(
              (model) => `<div style="display:flex;border-bottom:1px solid var(--color-border)">
                <a href="${escapeHtml(model.href)}" class="me-nav__link" style="flex:1;padding:0.625rem 0.5rem 0.625rem 0">${escapeHtml(model.label)}</a>
                <button type="button" class="me-nav__mobile-row" style="width:auto;padding:0.625rem 0.75rem;border:0" data-mobile-open-model="${escapeHtml(model.href)}" aria-label="Open ${escapeHtml(model.label)} variants and generations">${chevSvg}</button>
              </div>`,
            )
            .join("")}</div>`;
        return;
      }

      if (current.type === "model") {
        const model = flatModels(menu).find((item) => item.href === current.modelHref);
        if (!model) return;
        const variants = model.variants || [];
        const generations = model.generations || [];
        drawer.innerHTML = `<button type="button" class="me-nav__back" data-mobile-back>← ${escapeHtml(model.label)}</button>
          <ul class="me-nav__mobile-list">
            <li><a href="${escapeHtml(model.href)}" class="me-nav__link" style="display:block;padding:0.625rem 0">${escapeHtml(model.label)} Overview</a></li>
          </ul>
          ${
            variants.length
              ? `<div style="margin-top:0.75rem"><p class="me-nav__group-title">Variants (${variants.length})</p>
                <ul class="me-nav__mobile-list">${variants
                  .map((l) => `<li><a href="${escapeHtml(l.href)}" class="me-nav__link" style="display:block;padding:0.5rem 0">${escapeHtml(l.label)}</a></li>`)
                  .join("")}</ul></div>`
              : ""
          }
          ${
            generations.length
              ? `<div style="margin-top:0.75rem"><p class="me-nav__group-title">Generations (${generations.length})</p>
                <ul class="me-nav__mobile-list">${generations
                  .map((l) => `<li><a href="${escapeHtml(l.href)}" class="me-nav__link" style="display:block;padding:0.5rem 0">${escapeHtml(l.label)}</a></li>`)
                  .join("")}</ul></div>`
              : ""
          }`;
        return;
      }

      if (current.type === "menu") {
        drawer.innerHTML = `<button type="button" class="me-nav__back" data-mobile-back>← ${escapeHtml(menu.label)}</button>${renderColumns(menu, expandedTitles)}`;
      }
    }

    desktop.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-menu-id]");
      if (btn) {
        const id = btn.getAttribute("data-menu-id");
        openId = openId === id ? null : id;
        if (!openId) closeDesktop();
        else paintPanel();
        return;
      }
      const expand = event.target.closest("[data-expand-col]");
      if (expand) {
        const title = expand.getAttribute("data-expand-col");
        if (expandedTitles.has(title)) expandedTitles.delete(title);
        else expandedTitles.add(title);
        paintPanel();
      }
    });

    desktop.addEventListener("mouseover", (event) => {
      const row = event.target.closest("[data-model-href]");
      if (!row || openId !== "models") return;
      const href = row.getAttribute("data-model-href");
      if (href && href !== activeModelHref) {
        activeModelHref = href;
        paintPanel();
      }
    });

    document.addEventListener("pointerdown", (event) => {
      if (!desktop.contains(event.target)) closeDesktop();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDesktop();
        if (mobileOpen) {
          mobileOpen = false;
          drawer.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
          mobileToggle.innerHTML = menuSvg;
          mobileToggle.setAttribute("aria-label", "Open menu");
        }
      }
    });

    mobileToggle.addEventListener("click", () => {
      mobileOpen = !mobileOpen;
      drawer.classList.toggle("is-open", mobileOpen);
      mobileToggle.setAttribute("aria-expanded", mobileOpen ? "true" : "false");
      mobileToggle.innerHTML = mobileOpen ? closeSvg : menuSvg;
      mobileToggle.setAttribute("aria-label", mobileOpen ? "Close menu" : "Open menu");
      if (mobileOpen) {
        mobileStack = [{ type: "root" }];
        paintMobile();
      }
    });

    drawer.addEventListener("click", (event) => {
      const openMenu = event.target.closest("[data-mobile-open-menu]");
      if (openMenu) {
        mobileStack.push({ type: "menu", menuId: openMenu.getAttribute("data-mobile-open-menu") });
        paintMobile();
        return;
      }
      const openModel = event.target.closest("[data-mobile-open-model]");
      if (openModel) {
        const menuId = mobileStack[mobileStack.length - 1].menuId;
        mobileStack.push({ type: "model", menuId, modelHref: openModel.getAttribute("data-mobile-open-model") });
        paintMobile();
        return;
      }
      if (event.target.closest("[data-mobile-back]")) {
        mobileStack.pop();
        paintMobile();
        return;
      }
      const expand = event.target.closest("[data-expand-col]");
      if (expand) {
        const title = expand.getAttribute("data-expand-col");
        if (expandedTitles.has(title)) expandedTitles.delete(title);
        else expandedTitles.add(title);
        paintMobile();
      }
    });

    rootNav.querySelectorAll("[data-me-theme-btn]").forEach((btn) => {
      btn.addEventListener("click", () => applyTheme(getTheme() === "dark" ? "light" : "dark"));
    });

    applyTheme(getTheme());
    window.addEventListener("storage", () => applyTheme(getTheme()));
    window.addEventListener("site-theme-change", () => {
      // keep icon state in sync if toggled elsewhere
      const theme = getTheme();
      document.documentElement.dataset.theme = theme;
    });

    void rootFooter;
  }

  function injectHeroRegLookup() {
    if (document.querySelector(".me-hero-reg")) return;

    const hero =
      document.querySelector("header.hero") ||
      document.querySelector('[class*="hero"]') ||
      document.querySelector("header.hero--failures, header.hero--fitment");
    if (!hero) return;

    const form = document.createElement("form");
    form.className = "me-hero-reg";
    form.setAttribute("action", "/quote");
    form.setAttribute("method", "get");
    form.innerHTML = `
      <div class="me-hero-reg__plate">
        <div class="me-hero-reg__gb" aria-hidden="true">GB</div>
        <input
          class="me-hero-reg__input"
          type="text"
          name="reg"
          maxlength="8"
          autocomplete="off"
          placeholder="REG HERE"
          aria-label="Vehicle registration"
        />
      </div>
      <button type="submit" class="me-hero-reg__btn">Get Instant Quote <span aria-hidden="true">→</span></button>
    `;

    const input = form.querySelector("input");
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const cleaned = String(input.value || "")
        .replace(/\s+/g, "")
        .toUpperCase();
      if (!cleaned) {
        window.location.href = "/quote";
        return;
      }
      window.location.href = `/quote?reg=${encodeURIComponent(cleaned)}`;
    });

    const after =
      hero.querySelector("p.sub") ||
      hero.querySelector("p.hero__subheadline") ||
      hero.querySelector("p.hero-sub") ||
      hero.querySelector("p.lede") ||
      hero.querySelector(".hero-inner > div") ||
      hero.querySelector(".hero__content") ||
      hero.querySelector("h1");

    if (after) after.insertAdjacentElement("afterend", form);
    else hero.appendChild(form);
  }

  async function init() {
    let navMount = document.getElementById("me-site-navbar");
    let footerMount = document.getElementById("me-site-footer");
    if (!navMount) {
      navMount = document.createElement("div");
      navMount.id = "me-site-navbar";
      document.body.prepend(navMount);
    }
    if (!footerMount) {
      footerMount = document.createElement("div");
      footerMount.id = "me-site-footer";
      document.body.appendChild(footerMount);
    }

    const res = await fetch(DATA_URL, { credentials: "same-origin" });
    if (!res.ok) throw new Error("Failed to load chrome-data.json");
    const data = await res.json();
    navMount.innerHTML = renderNavbar(data);
    footerMount.innerHTML = renderFooter(data);
    bindChrome(navMount, footerMount, data);
    injectHeroRegLookup();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
