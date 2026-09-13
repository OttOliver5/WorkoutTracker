const BASE_URL = "https://localhost:7083/api/Exercises";
let editingId = null;

async function load() {
    const answer = await fetch(BASE_URL);
    const data = await answer.json();

    const table = document.getElementById("exerciseTableBody");
    table.innerHTML = "";

    for (const item of data) {
        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-1" onclick="editSelection(${item.id}, '${item.name}', '${item.category}')">Szerkesztés</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Törlés</button>
                </td>
            </tr>
        `;
    }
}

async function save(event) {
    event.preventDefault();

    const itemInfo = {
        name: document.getElementById("exerciseName").value,
        category: document.getElementById("exerciseCategory").value
    };

    if (editingId === null) {
        await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemInfo)
        });
    } else {
        itemInfo.id = editingId;

        await fetch(BASE_URL + "/" + editingId, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(itemInfo)
        });

        editingId = null;
        document.getElementById("submitBtn").textContent = "Mentés";
    }

    document.getElementById("exerciseForm").reset();
    load();
}

function editSelection(id, name, category) {
    if (editingId === id) {
        editingId = null;
        document.getElementById("exerciseForm").reset();
        document.getElementById("submitBtn").textContent = "Mentés";
        return;
    }

    editingId = id;
    document.getElementById("exerciseName").value = name;
    document.getElementById("exerciseCategory").value = category;
    document.getElementById("submitBtn").textContent = "Módosítás mentése";
}

async function deleteItem(id) {
    await fetch(BASE_URL + "/" + id, {
        method: "DELETE"
    });

    load();
}

load();
document.getElementById("exerciseForm").onsubmit = save;