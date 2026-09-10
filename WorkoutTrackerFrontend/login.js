const BASE_URL = "https://localhost:7083/api";

function showForm(which) {
    document.getElementById("loginSection").style.display = which === "login" ? "block" : "none";
    document.getElementById("registerSection").style.display = which === "register" ? "block" : "none";
    document.getElementById("message").textContent = "";
}

async function login(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById("loginUsername").value,
        password: document.getElementById("loginPassword").value
    };

    const answer = await fetch(`${BASE_URL}/Users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (answer.ok) {
        const result = await answer.json();
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("username", result.username);
        window.location.href = "index.html";
    } else {
        document.getElementById("message").textContent = "Hibás felhasználónév vagy jelszó!";
    }
}

async function register(event) {
    event.preventDefault();

    const data = {
        username: document.getElementById("registerUsername").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value
    };

    const answer = await fetch(`${BASE_URL}/Users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (answer.ok) {
        document.getElementById("message").textContent = "Sikeres regisztráció! Most már bejelentkezhetsz.";
        document.getElementById("registerForm").reset();
    } else {
        const errorText = await answer.text();
        document.getElementById("message").textContent = errorText;
    }
}

document.getElementById("loginForm").onsubmit = login;
document.getElementById("registerForm").onsubmit = register;
