const APPROVAL_PASSWORD = "CUMBE-2024-ADMIN";
const ACCOUNTS_KEY = "esquina-cumbe-admin-accounts";
const SESSION_KEY = "esquina-cumbe-admin-session";
const authView = document.querySelector("#auth-view");
const dashboardView = document.querySelector("#dashboard-view");
const authMessage = document.querySelector("#auth-message");
const dishMessage = document.querySelector("#dish-message");
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const dishForm = document.querySelector("#dish-form");
const dishList = document.querySelector("#dish-list");
const dishCount = document.querySelector("#dish-count");
const siteForm = document.querySelector("#site-form");

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getAccounts() {
  return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}
function setMessage(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("error", isError);
}
function showDashboard(account) {
  authView.classList.add("hidden");
  dashboardView.classList.remove("hidden");
  document.querySelector("#welcome-text").textContent = `Hola, ${account.name}. Los cambios se publican en la carta de inmediato.`;
  if (siteForm) renderSiteForm();
  renderDishList();
}
function showAuth() {
  authView.classList.remove("hidden");
  dashboardView.classList.add("hidden");
}

document.querySelectorAll("[data-auth-tab]").forEach((tab) => tab.addEventListener("click", () => {
  document.querySelectorAll(".auth-tab").forEach((item) => item.classList.remove("active"));
  tab.classList.add("active");
  const isLogin = tab.dataset.authTab === "login";
  loginForm.classList.toggle("hidden", !isLogin);
  registerForm.classList.toggle("hidden", isLogin);
  setMessage(authMessage, "");
}));

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  if (data.get("approval") !== APPROVAL_PASSWORD) {
    setMessage(authMessage, "La contraseña general de aprobación no es válida.", true);
    return;
  }
  const accounts = getAccounts();
  const email = data.get("email").toLowerCase().trim();
  if (accounts.some((account) => account.email === email)) {
    setMessage(authMessage, "Ya existe una cuenta con ese correo.", true);
    return;
  }
  accounts.push({ name: data.get("name").trim(), email, password: await hashPassword(data.get("password")) });
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  registerForm.reset();
  setMessage(authMessage, "Cuenta aprobada. Ya puedes ingresar al panel.");
  document.querySelector('[data-auth-tab="login"]').click();
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(loginForm);
  const email = data.get("email").toLowerCase().trim();
  const passwordHash = await hashPassword(data.get("password"));
  const account = getAccounts().find((item) => item.email === email && item.password === passwordHash);
  if (!account) {
    setMessage(authMessage, "Correo o contraseña incorrectos.", true);
    return;
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(account));
  showDashboard(account);
});

function renderDishList() {
  const dishes = getDishes();
  dishCount.textContent = `${dishes.length} publicados`;
  dishList.innerHTML = dishes.map((dish) => `
    <article class="admin-dish">
      <img src="${escapeHtml(dish.image)}" alt="">
      <div><strong>${escapeHtml(dish.name)}</strong><small>${escapeHtml(dish.category)} · S/ ${Number(dish.price).toFixed(0)}</small></div>
      <button class="icon-button edit-dish" data-id="${escapeHtml(dish.id)}" type="button" aria-label="Editar ${escapeHtml(dish.name)}">Editar</button>
      <button class="icon-button delete-dish" data-id="${escapeHtml(dish.id)}" type="button" aria-label="Eliminar ${escapeHtml(dish.name)}">Eliminar</button>
    </article>`).join("");
  document.querySelectorAll(".edit-dish").forEach((button) => button.addEventListener("click", () => editDish(button.dataset.id)));
  document.querySelectorAll(".delete-dish").forEach((button) => button.addEventListener("click", () => deleteDish(button.dataset.id)));
}

function renderSiteForm() {
  const site = getSite();
  Object.keys(site).forEach((key) => {
    if (siteForm.elements[key]) siteForm.elements[key].value = site[key];
  });
}

function applySite(site) {
  const values = {
    "site-name": site.name,
    "site-subtitle": site.subtitle,
    "footer-name": site.name,
    "footer-subtitle": site.subtitle,
    "hero-eyebrow": site.eyebrow,
    "hero-title": site.heroTitle,
    "hero-text": site.heroText,
    "history-eyebrow": site.historyEyebrow,
    "history-title": site.historyTitle,
    "history-text": site.historyText,
    "menu-title": site.menuTitle,
    "menu-text": site.menuText,
    "site-address": site.address,
    "site-schedule": site.schedule,
    "site-phone": site.phone,
    "site-email": site.email
  };
  Object.entries(values).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });
  document.querySelectorAll(".reservation-link").forEach((link) => {
    link.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola, quisiera reservar una mesa en ${site.name} ${site.subtitle}.`)}`;
  });
  document.title = `${site.name} ${site.subtitle} | Cocina Cajamarquina`;
}

if (siteForm) {
  siteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const site = Object.fromEntries(new FormData(siteForm));
    saveSite(site);
    applySite(getSite());
    setMessage(document.querySelector("#site-message"), "Información del sitio actualizada.");
  });
}

function editDish(id) {
  const dish = getDishes().find((item) => item.id === id);
  if (!dish) return;
  Object.keys(dish).forEach((key) => { if (dishForm.elements[key]) dishForm.elements[key].value = dish[key]; });
  document.querySelector("#form-title").textContent = "Editar plato";
  document.querySelector("#save-dish").innerHTML = "Guardar cambios <span>✓</span>";
  document.querySelector("#cancel-edit").classList.remove("hidden");
  dishForm.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetDishForm() {
  dishForm.reset();
  dishForm.elements.id.value = "";
  document.querySelector("#form-title").textContent = "Agregar plato";
  document.querySelector("#save-dish").innerHTML = "Agregar a la carta <span>+</span>";
  document.querySelector("#cancel-edit").classList.add("hidden");
}

dishForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(dishForm));
  const dishes = getDishes();
  const item = { ...data, price: Number(data.price), id: data.id || `dish-${Date.now()}` };
  const index = dishes.findIndex((dish) => dish.id === item.id);
  if (index >= 0) dishes[index] = item;
  else dishes.push(item);
  saveDishes(dishes);
  resetDishForm();
  renderDishList();
  setMessage(dishMessage, index >= 0 ? "Plato actualizado correctamente." : "Plato agregado a la carta.");
});

function deleteDish(id) {
  const dish = getDishes().find((item) => item.id === id);
  if (!dish || !confirm(`¿Eliminar "${dish.name}" de la carta?`)) return;
  saveDishes(getDishes().filter((item) => item.id !== id));
  renderDishList();
  setMessage(dishMessage, "Plato eliminado de la carta.");
}

document.querySelector("#cancel-edit")?.addEventListener("click", resetDishForm);
document.querySelector("#logout-button")?.addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  showAuth();
  loginForm.reset();
});

const activeSession = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null");
if (activeSession) showDashboard(activeSession);
if (typeof getSite === "function") applySite(getSite());

function openAdminPanel() {
  document.querySelector("#admin-panel").classList.remove("hidden");
  document.body.classList.add("admin-open");
}
document.querySelector("#admin-close")?.addEventListener("click", () => {
  document.querySelector("#admin-panel").classList.add("hidden");
  document.body.classList.remove("admin-open");
});
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
    event.preventDefault();
    openAdminPanel();
  }
});
if (window.location.hash === "#admin-panel") {
  openAdminPanel();
}
