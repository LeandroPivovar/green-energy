(() => {
  const cfg = window.SITE_CONFIG || {};
  const get = (path) => path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), cfg);

  /* Contatos vindos da configuração */
  document.querySelectorAll("[data-config]").forEach((el) => {
    const value = get(el.dataset.config);
    if (value) el.textContent = value;
  });
  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const value = get(el.dataset.configHref);
    if (value) el.href = value;
  });

  const waNumber = String(get("whatsapp.number") || "").replace(/\D/g, "");
  const waMessage = get("whatsapp.message") || "";
  const waUrl = (text) => `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  document.querySelectorAll("[data-wa-direct]").forEach((link) => {
    if (!waNumber) return;
    link.href = waUrl(waMessage);
    link.target = "_blank";
    link.rel = "noopener";
  });
  document.querySelectorAll("[data-wa-only]").forEach((el) => {
    el.hidden = !waNumber;
  });
  if (!waNumber) {
    console.warn("[Green Energy] WhatsApp não configurado: preencha whatsapp.number em assets/config.js");
  }

  /* Menu mobile */
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");

  const setMenu = (open) => {
    header.toggleAttribute("data-menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };

  menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header.hasAttribute("data-menu-open")) {
      setMenu(false);
      menuButton.focus();
    }
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", () => setMenu(false));

  /* Sombra do cabeçalho após rolagem */
  const onScroll = () => header.toggleAttribute("data-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* CTA fixo no celular: aparece depois da abertura, some perto do formulário */
  const mobileCta = document.querySelector(".mobile-cta");
  const heroActions = document.querySelector(".hero__actions");
  const quote = document.getElementById("orcamento");
  const footer = document.querySelector(".site-footer");
  if (mobileCta && "IntersectionObserver" in window) {
    const state = { hero: true, quote: false, footer: false };
    const update = () => {
      const show = !state.hero && !state.quote && !state.footer;
      mobileCta.toggleAttribute("data-visible", show);
      mobileCta.toggleAttribute("inert", !show);
    };
    const watch = (el, key) =>
      new IntersectionObserver(([entry]) => {
        state[key] = entry.isIntersecting;
        update();
      }).observe(el);
    watch(heroActions, "hero");
    watch(quote, "quote");
    watch(footer, "footer");
  }

  /* Barra de economia: preenche uma vez ao entrar na tela */
  const savings = document.querySelector(".savings-chart");
  if (savings && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        savings.setAttribute("data-in-view", "");
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(savings);
  } else if (savings) {
    savings.setAttribute("data-in-view", "");
  }

  /* Formulário de orçamento → WhatsApp */
  const form = document.getElementById("quote-form");
  const status = document.getElementById("quote-status");

  const showError = (field, message) => {
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
    error.hidden = false;
  };
  const clearError = (field) => {
    const error = document.getElementById(`${field.id}-error`);
    field.removeAttribute("aria-invalid");
    error.hidden = true;
  };

  form.addEventListener("input", (event) => {
    if (event.target.matches("[aria-invalid]")) clearError(event.target);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.nome;
    const city = form.elements.cidade;
    const spend = form.elements.gasto;

    const invalid = [];
    if (!name.value.trim()) {
      showError(name, "Informe seu nome para a Green Energy saber com quem vai conversar.");
      invalid.push(name);
    }
    if (!city.value.trim()) {
      showError(city, "Informe a cidade do imóvel. O atendimento é em Dourados e região.");
      invalid.push(city);
    }
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    let text = waMessage.replace("[cidade]", city.value.trim());
    text += `\nMeu nome é ${name.value.trim()}.`;
    if (spend.value) text += `\nGasto mensal com energia: ${spend.value}.`;

    if (waNumber) {
      status.hidden = true;
      const opened = window.open(waUrl(text), "_blank", "noopener");
      if (!opened) window.location.href = waUrl(text);
      return;
    }

    status.querySelector("[data-message]").textContent = text;
    status.hidden = false;
    status.focus();
  });

  const copyButton = document.querySelector("[data-copy-message]");
  copyButton?.addEventListener("click", async () => {
    const text = status.querySelector("[data-message]").textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "Mensagem copiada";
    } catch {
      copyButton.textContent = "Selecione o texto acima para copiar";
    }
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
