const API_URL = "https://common-api.sparkexhibit.com/api/alvora/subscribe";

function showAlert(message, type = "success") {

  const alert = document.createElement("div");

  alert.innerText = message;

  alert.style.position = "fixed";
  alert.style.bottom = "30px";
  alert.style.left = "50%";
  alert.style.width = "300px";
  alert.style.textAlign = "center";
  alert.style.transform = "translateX(-50%)";
  alert.style.padding = "14px 28px";
  alert.style.fontSize = "13px";
  alert.style.letterSpacing = ".05em";
  alert.style.zIndex = "99999";
  alert.style.border = "1px solid #c9a96e";
  alert.style.background = "#0e2b26";
  alert.style.color = "#e8d5a3";
  alert.style.fontFamily = "Tenor Sans";
  alert.style.opacity = "0";
  alert.style.transition = "all .4s ease";

  if (type === "error") {
    alert.style.border = "1px solid #ff6b6b";
    alert.style.color = "#ffb3b3";
  }

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.opacity = "1";
    alert.style.bottom = "40px";
  }, 10);

    setTimeout(() => {
    alert.style.opacity = "0";
    alert.style.bottom = "20px";
  }, 3500);

  setTimeout(() => {
    alert.remove();
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {

  const emailInput = document.getElementById("emailInput");
  const subscribeBtn = document.getElementById("subscribeBtn");

  async function handleSignup() {

    const email = emailInput.value.trim();

    if (!email || !email.includes("@")) {
      showAlert("Please enter a valid email address", "error");
      return;
    }

    subscribeBtn.disabled = true;
    subscribeBtn.innerText = "Subscribing...";

    try {

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Subscription failed");
      }

      emailInput.value = "";

      showAlert("✨ You are now on the list!", "success");

    } catch (err) {

      showAlert(err.message || "Something went wrong", "error");

    }

    subscribeBtn.disabled = false;
    subscribeBtn.innerText = "Notify Me";
  }

  subscribeBtn.addEventListener("click", handleSignup);

  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  });

});