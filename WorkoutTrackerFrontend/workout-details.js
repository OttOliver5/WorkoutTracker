const BASE_URL = "https://localhost:7083/api";

const urlParams = new URLSearchParams(window.location.search);
const workoutLogId = urlParams.get("id");

let allExercises = [];

async function init() {
    if (!workoutLogId) {
        alert("Nincs kiválasztva edzés!");
        window.location.href = "index.html";
        return;
    }

    await loadExercise();
    await loadDetails();

    document.getElementById("setForm").onsubmit = newSetSave;
}

async function loadExercise() {
    const answer = await fetch(`${BASE_URL}/Exercises`);
    allExercises = await answer.json();

    const select = document.getElementById("exerciseSelect");
    select.innerHTML = '<option value="">-- Válassz gyakorlatot --</option>';

    for (const x of allExercises) {
        select.innerHTML += `<option value="${x.id}">${x.name} (${x.category})</option>`;
    }
}

async function loadDetails() {
    const answer = await fetch(`${BASE_URL}/WorkoutLogs/${workoutLogId}`);
    const training = await answer.json();

    document.getElementById("workoutTitle").textContent = training.name ? training.name : `Edzés #${training.id}`;
    document.getElementById("workoutDateInfo").textContent = `Dátum: ${new Date(training.date).toLocaleString()}`;

    const tbody = document.getElementById("setsTableBody");
    tbody.innerHTML = "";

    if (training.sets) {
        for (const set of training.sets) {
            const x = allExercises.find(g => g.id === set.exerciseId);

            let exerciseName;
            if (x) {
                exerciseName = x.name;
            } else if (set.exercise) {
                exerciseName = set.exercise.name;
            } else {
                exerciseName = `Gyakorlat #${set.exerciseId}`;
            }

            tbody.innerHTML += `
                <tr>
                    <td><strong>${exerciseName}</strong></td>
                    <td>${set.weight} kg</td>
                    <td>${set.reps} ismétlés</td>
                    <td><button onclick="deleteSet(${set.id})">Törlés</button></td>
                </tr>
            `;
        }
    }
}

async function newSetSave(event) {
    event.preventDefault();

    const newSet = {
        workoutLogId: parseInt(workoutLogId),
        exerciseId: parseInt(document.getElementById("exerciseSelect").value),
        weight: parseFloat(document.getElementById("setWeight").value),
        reps: parseInt(document.getElementById("setReps").value)
    };

    await fetch(`${BASE_URL}/WorkoutSets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSet)
    });

    document.getElementById("setWeight").value = "";
    document.getElementById("setReps").value = "";

    loadDetails();
}

async function deleteSet(setId) {
    await fetch(`${BASE_URL}/WorkoutSets/${setId}`, {
        method: "DELETE"
    });

    loadDetails();
}

document.addEventListener("DOMContentLoaded", init);