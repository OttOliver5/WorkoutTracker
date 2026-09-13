# 💪 WorkoutTracker

Egy edzésnapló webalkalmazás, amellyel nyomon követheted az edzéseidet, szettjeidet és a felhasznált súlyokat.

## Funkciók

- 🔐 Regisztráció és bejelentkezés
- 📋 Edzések listázása, hozzáadása és törlése
- 💪 Szettek rögzítése gyakorlatonként (súly, ismétlés)
- 🏋️ Gyakorlatok kezelése (hozzáadás, szerkesztés, törlés)
- 🔑 Jelszóváltoztatás
- 📱 Reszponzív design

## Technológiák

**Backend**
- ASP.NET Core Web API
- Entity Framework Core 
- SQL Server (localdb)
- BCrypt.Net (jelszó titkosítás)

**Frontend**
- HTML, CSS, JavaScript 
- Bootstrap 5

## Futtatás

### Backend
1. Klónozd a repót
2. Nyisd meg a `WorkoutTracker.sln` fájlt Visual Studio-ban
3. Az adatbázis létrehozásához futtasd a Package Manager Console-ban: Update-Database
4. Indítsd el a projektet (`F5`)

### Frontend
1. Nyisd meg a `WorkoutTrackerFrontend` mappát
2. Nyisd meg a `login.html` fájlt böngészőben
3. Győződj meg róla hogy a backend fut