export function showToast(message = "Saved", duration = 1800) {
  try {
    const id = `toast-${Date.now()}`;
    const containerId = "toast-container";
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      container.style.position = "fixed";
      container.style.top = "20px";
      container.style.right = "20px";
      container.style.zIndex = 9999;
      document.body.appendChild(container);
    }
    const el = document.createElement("div");
    el.id = id;
    el.style.marginTop = "8px";
    el.style.background = "#fff";
    el.style.color = "#16a34a";
    el.style.border = "1px solid #16a34a";
    el.style.borderRadius = "12px";
    el.style.padding = "10px 14px";
    el.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
    el.style.fontFamily = "ui-sans-serif, system-ui";
    el.style.fontSize = "14px";
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.style.transition = "opacity .3s";
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300);
    }, duration);
  } catch {}
}
