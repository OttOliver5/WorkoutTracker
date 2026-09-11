const BASE_URL = "https://localhost:7083/api";
const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}

async function changePassword(event) {
    event.preventDefault();

    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("message");

    if (newPassword !== confirmPassword) {
        message.textContent = "A két új jelszó nem egyezik!";
        message.className = "mt-3 text-center text-danger";
        return;
    }

    const data = {
        userId: parseInt(userId),
        currentPassword: currentPassword,
        newPassword: newPassword
    };

    const answer = await fetch(`${BASE_URL}/Users/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (answer.ok) {
        message.textContent = "Jelszó sikeresen megváltoztatva!";
        message.className = "mt-3 text-center text-success";
        document.getElementById("changePasswordForm").reset();
    } else {
        const errorText = await answer.text();
        message.textContent = errorText;
        message.className = "mt-3 text-center text-danger";
    }
}

document.getElementById("changePasswordForm").onsubmit = changePassword;