const BASE_URL = "https://localhost:7083/api";
const userId = localStorage.getItem("userId");

if (!userId) {
    window.location.href = "login.html";
}

document.getElementById("usernameDisplay").textContent = localStorage.getItem("username");

async function loadWorkouts() {
    const answer = await fetch(`${BASE_URL}/WorkoutLogs/user/${userId}`);
    const data = await answer.json();

    const tbody = document.getElementById("workoutTableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        document.getElementById("emptyMessage").style.display = "block";
        document.getElementById("workoutTable").style.display = "none";
    } else {
        document.getElementById("emptyMessage").style.display = "none";
        document.getElementById("workoutTable").style.display = "table";

        for (const workout of data) {
            tbody.innerHTML += `
                <tr>
                    <td>${workout.name}</td>
                    <td>${new Date(workout.date).toLocaleString()}</td>
                    <td>${workout.notes}</td>
                    <td>
                        <a href="workout-details.html?id=${workout.id}">Részletek</a>
                        <button onclick="deleteWorkout(${workout.id})">Törlés</button>
                    </td>
                </tr>
            `;
        }
    }
}

async function saveWorkout(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("workoutName").value,
        date: document.getElementById("workoutDate").value,
        notes: document.getElementById("workoutNotes").value,
        userId: parseInt(userId)
    };

    await fetch(`${BASE_URL}/WorkoutLogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    document.getElementById("workoutForm").reset();
    loadWorkouts();
}

async function deleteWorkout(id) {
    await fetch(`${BASE_URL}/WorkoutLogs/${id}`, {
        method: "DELETE"
    });

    loadWorkouts();
}

function toggleMenu() {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "none" ? "block" : "none";
}

function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    window.location.href = "login.html";
}

document.getElementById("workoutForm").onsubmit = saveWorkout;

loadWorkouts();