(function () {
  "use strict";

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  /* ---------- storage helpers (safe) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ---------- state ---------- */
  const state = {
    city: store.get("gl_city", "Bengaluru"),
    cat: "all",
    q: "",
    sort: "popular",
    cart: store.get("gl_cart", []),
    active: null,   // product in modal
    days: 3
  };

  /* ---------- pricing ---------- */
  function rentFor(p, days) {
    const rate = days >= 30 ? p.month / 30 : days >= 7 ? p.week / 7 : p.day;
    return Math.round(rate * days);
  }
  const perDay = (p) => Math.round(p.month / 30);
  const deliveryFee = (rent) => (rent === 0 || rent >= 999 ? 0 : 99);

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- city ---------- */
  function initCity() {
    const sel = $("#citySelect");
    sel.innerHTML = GL_CITIES.map((c) => `<option ${c === state.city ? "selected" : ""}>${c}</option>`).join("");
    sel.addEventListener("change", () => {
      state.city = sel.value;
      store.set("gl_city", state.city);
      $("#heroCity").textContent = state.city;
      renderGrid();
      toast("Showing gadgets available in " + state.city);
    });
    $("#heroCity").textContent = state.city;
    $("#footerCities").textContent = GL_CITIES.join(" · ");
  }

  /* ---------- catalog ---------- */
  function initChips() {
    const wrap = $("#chips");
    wrap.innerHTML = GL_CATEGORIES.map((c) => `<button class="chip ${c.id === "all" ? "active" : ""}" data-cat="${c.id}" role="tab">${c.label}</button>`).join("");
    wrap.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      $$(".chip", wrap).forEach((x) => x.classList.toggle("active", x === b));
      renderGrid();
    });
  }

  function visibleProducts() {
    let list = GL_PRODUCTS.filter((p) => p.cities === "all" || p.cities.includes(state.city));
    if (state.cat !== "all") list = list.filter((p) => p.cat === state.cat);
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter((p) => (p.name + " " + p.cat + " " + p.desc).toLowerCase().includes(q));
    }
    switch (state.sort) {
      case "low": list.sort((a, b) => a.day - b.day); break;
      case "high": list.sort((a, b) => b.day - a.day); break;
      case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }

  function renderGrid() {
    const list = visibleProducts();
    const grid = $("#grid");
    grid.innerHTML = list.map((p) => `
      <article class="card" data-id="${p.id}" tabindex="0">
        <div class="card-art" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">
          ${p.tag ? `<span class="badge ${p.tag === "Hot" || p.tag === "Popular" ? "hot" : ""}">${p.tag}</span>` : ""}
          <span>${p.emoji}</span>
        </div>
        <div class="card-body">
          <span class="card-cat">${p.cat}</span>
          <h3>${p.name}</h3>
          <span class="rating">★ ${p.rating} · ${p.reviews} rentals</span>
          <div class="price-row"><b>${inr(p.day)}</b><small>/ day · from ${inr(perDay(p))}/day monthly</small></div>
          <button class="btn btn-primary" data-rent="${p.id}">Rent now</button>
        </div>
      </article>`).join("");
    $("#empty").hidden = list.length > 0;
    $("#resultInfo").textContent = `${list.length} item${list.length === 1 ? "" : "s"} available in ${state.city}`;
  }

  /* ---------- modal ---------- */
  const PRESETS = [1, 3, 7, 14, 30];
  const presetLabel = (d) => (d === 1 ? "1 day" : d === 7 ? "1 week" : d === 14 ? "2 weeks" : d === 30 ? "1 month" : d + " days");

  function openProduct(id) {
    const p = GL_PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    state.active = p;
    state.days = 3;
    $("#mArt").style.background = `linear-gradient(135deg,${p.color[0]},${p.color[1]})`;
    $("#mArt").textContent = p.emoji;
    $("#mCat").textContent = p.cat;
    $("#mTitle").textContent = p.name;
    $("#mDesc").textContent = p.desc;
    $("#mSpecs").innerHTML = p.specs.map((s) => `<li>${s}</li>`).join("");
    $("#mRates").innerHTML = `
      <div class="rate"><b>${inr(p.day)}</b>per day</div>
      <div class="rate"><b>${inr(p.week)}</b>per week</div>
      <div class="rate"><b>${inr(p.month)}</b>per month</div>`;
    $("#presets").innerHTML = PRESETS.map((d) => `<button class="preset" data-d="${d}">${presetLabel(d)}</button>`).join("");
    const d = new Date(); d.setDate(d.getDate() + 1);
    const iso = d.toISOString().slice(0, 10);
    const sd = $("#startDate"); sd.min = iso; sd.value = iso;
    syncDays();
    $("#productOverlay").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function syncDays() {
    const p = state.active;
    state.days = Math.min(90, Math.max(1, state.days | 0));
    $("#dInput").value = state.days;
    $$(".preset").forEach((b) => b.classList.toggle("active", +b.dataset.d === state.days));
    const rent = rentFor(p, state.days);
    $("#sDays").textContent = state.days;
    $("#sRent").textContent = inr(rent);
    $("#sDep").textContent = inr(p.deposit);
    $("#sTotal").textContent = inr(rent + p.deposit);
  }

  function closeAll() {
    $$(".overlay").forEach((o) => (o.hidden = true));
    document.body.style.overflow = "";
  }

  /* ---------- cart ---------- */
  const saveCart = () => store.set("gl_cart", state.cart);

  function addToCart() {
    const p = state.active;
    state.cart.push({ pid: p.id, days: state.days, start: $("#startDate").value, uid: Date.now() + Math.random() });
    saveCart();
    renderCart();
    closeAll();
    toast(p.name + " added to cart");
    openCart();
  }

  function totals() {
    let rent = 0, dep = 0;
    state.cart.forEach((it) => {
      const p = GL_PRODUCTS.find((x) => x.id === it.pid);
      rent += rentFor(p, it.days);
      dep += p.deposit;
    });
    const del = deliveryFee(rent);
    return { rent, dep, del, total: rent + dep + del };
  }

  function renderCart() {
    $("#cartCount").textContent = state.cart.length;
    const box = $("#cartItems");
    if (!state.cart.length) {
      box.innerHTML = `<div class="cart-empty">🛒<br/>Your cart is empty.<br/>Pick something fun!</div>`;
      $("#cartFoot").hidden = true;
      return;
    }
    $("#cartFoot").hidden = false;
    box.innerHTML = state.cart.map((it) => {
      const p = GL_PRODUCTS.find((x) => x.id === it.pid);
      return `<div class="cart-item">
        <div class="ci-art" style="background:linear-gradient(135deg,${p.color[0]},${p.color[1]})">${p.emoji}</div>
        <div><h4>${p.name}</h4><small>${it.days} day${it.days > 1 ? "s" : ""} · from ${it.start}</small><small>${inr(rentFor(p, it.days))} + ${inr(p.deposit)} deposit</small></div>
        <button class="rm" data-rm="${it.uid}">Remove</button>
      </div>`;
    }).join("");
    const t = totals();
    $("#cRent").textContent = inr(t.rent);
    $("#cDep").textContent = inr(t.dep);
    $("#cDel").textContent = t.del ? inr(t.del) : "Free";
    $("#cTotal").textContent = inr(t.total);
  }

  const openCart = () => { $("#cartOverlay").hidden = false; document.body.style.overflow = "hidden"; };

  /* ---------- checkout ---------- */
  function openCheckout() {
    if (!state.cart.length) return;
    $("#cartOverlay").hidden = true;
    $("#checkoutForm").hidden = false;
    $("#coSuccess").hidden = true;
    $("#coError").hidden = true;
    $("#checkoutOverlay").hidden = false;
  }

  function submitCheckout(e) {
    e.preventDefault();
    const name = $("#coName").value.trim();
    const phone = $("#coPhone").value.trim();
    const addr = $("#coAddress").value.trim();
    const pin = $("#coPin").value.trim();
    const err = $("#coError");
    let msg = "";
    if (name.length < 2) msg = "Please enter your full name.";
    else if (!/^[6-9]\d{9}$/.test(phone)) msg = "Enter a valid 10-digit mobile number.";
    else if (addr.length < 8) msg = "Please enter your full address.";
    else if (!/^\d{6}$/.test(pin)) msg = "Enter a valid 6-digit pincode.";
    if (msg) { err.textContent = msg; err.hidden = false; return; }
    err.hidden = true;

    const t = totals();
    const order = {
      id: "GL" + Date.now().toString().slice(-7),
      city: state.city, name, phone, addr, pin,
      items: state.cart.map((it) => ({ ...it, name: GL_PRODUCTS.find((p) => p.id === it.pid).name })),
      totals: t, placed: new Date().toISOString()
    };
    const orders = store.get("gl_orders", []);
    orders.push(order);
    store.set("gl_orders", orders);

    const lines = order.items.map((i) => `• ${i.name} – ${i.days}d from ${i.start}`).join("%0A");
    const text = `Hi GearLoop! Order ${order.id}%0A${lines}%0ATotal: ${inr(t.total)}%0ACity: ${state.city}`;
    $("#waLink").href = "https://wa.me/?text=" + text;
    $("#coMsg").textContent = `Order ${order.id} is confirmed. We will call ${phone} to schedule delivery in ${state.city}.`;
    $("#checkoutForm").hidden = true;
    $("#coSuccess").hidden = false;

    state.cart = [];
    saveCart();
    renderCart();
    $("#checkoutForm").reset();
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    const box = $("#faqList");
    box.innerHTML = GL_FAQ.map((f) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false">${f.q}<i>+</i></button>
        <div class="faq-a"><p>${f.a}</p></div>
      </div>`).join("");
    box.addEventListener("click", (e) => {
      const q = e.target.closest(".faq-q");
      if (!q) return;
      const item = q.parentElement;
      const open = !item.classList.contains("open");
      $$(".faq-item", box).forEach((i) => {
        i.classList.remove("open");
        $(".faq-a", i).style.maxHeight = null;
        $(".faq-q", i).setAttribute("aria-expanded", "false");
      });
      if (open) {
        item.classList.add("open");
        const a = $(".faq-a", item);
        a.style.maxHeight = a.scrollHeight + 24 + "px";
        q.setAttribute("aria-expanded", "true");
      }
    });
  }

  /* ---------- events ---------- */
  function bind() {
    $("#searchInput").addEventListener("input", (e) => { state.q = e.target.value.trim(); renderGrid(); });
    $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; renderGrid(); });
    $("#resetBtn").addEventListener("click", () => {
      state.q = ""; state.cat = "all";
      $("#searchInput").value = "";
      $$(".chip").forEach((c) => c.classList.toggle("active", c.dataset.cat === "all"));
      renderGrid();
    });

    $("#grid").addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (card) openProduct(+card.dataset.id);
    });
    $("#grid").addEventListener("keydown", (e) => {
      if (e.key === "Enter") { const c = e.target.closest(".card"); if (c) openProduct(+c.dataset.id); }
    });

    $("#presets").addEventListener("click", (e) => {
      const b = e.target.closest(".preset");
      if (b) { state.days = +b.dataset.d; syncDays(); }
    });
    $("#dMinus").addEventListener("click", () => { state.days--; syncDays(); });
    $("#dPlus").addEventListener("click", () => { state.days++; syncDays(); });
    $("#dInput").addEventListener("input", (e) => { state.days = parseInt(e.target.value, 10) || 1; syncDays(); });
    $("#addToCart").addEventListener("click", addToCart);

    $("#cartBtn").addEventListener("click", openCart);
    $("#closeCart").addEventListener("click", closeAll);
    $("#closeModal").addEventListener("click", closeAll);
    $("#closeCheckout").addEventListener("click", closeAll);
    $("#coDone").addEventListener("click", closeAll);
    $("#cartItems").addEventListener("click", (e) => {
      const b = e.target.closest("[data-rm]");
      if (!b) return;
      state.cart = state.cart.filter((i) => String(i.uid) !== b.dataset.rm);
      saveCart(); renderCart();
    });
    $("#checkoutBtn").addEventListener("click", openCheckout);
    $("#checkoutForm").addEventListener("submit", submitCheckout);

    $$(".overlay").forEach((o) => o.addEventListener("click", (e) => { if (e.target === o) closeAll(); }));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  }

  /* ---------- init ---------- */
  $("#year").textContent = new Date().getFullYear();
  initCity();
  initChips();
  initFaq();
  bind();
  renderGrid();
  renderCart();
})();
