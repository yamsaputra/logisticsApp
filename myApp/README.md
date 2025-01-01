## TrustTrip FRONTEND
### Change-/Errorlogs:

31.10.2024
Login failed user still prints out undefined
-postRequests.js:52
loginPage.vue:182

Unable to sign up
> Login details not going into Database/Backend

05.11.2024

>Latest error in containerizing: npm connectivity in front end unresolved.

10.11.2024
> NPM connectivity issue resolved: cause was that the used frameworks/libraries were outdated.
-outdated softwares (ionic included) updated in the package.json


13.11.2024
Presentation for Susan from creating user, creating ride and booking a ride
> Input dari Susan:
- UX masih terlalu kosong, kurang rame
- Mungkin warna warna yang lebih mencolok?

> Contracts page not refreshed when an item has been erased.
- Contracts will list all the user's created rides but not the booked rides.

15.11.2024
>Responsive design in progress..
- https://www.youtube.com/watch?v=H7JxI3-uklk

26.12.2024
Development migrated to Silhoutte Ryzen
> npm connectivity issue re-emerging, despite all libraries being up to date.

28.12.2024
>All browser element alerts must be switched to an Ionic Component.
>Unresolved issue, stored user is not removed on Log Out.

>stored value in homepage undefined.

01.01.2025
- LoginPage now stores data correctly into vuex
- homePage or any other page that doesnt display the stored data doesnt require to load the stored data.

Frontend finishing touches by 3.01.2025 / TODO:
- stored user is till not cleared upon logout.
- accountPage loading.value should be reactive with the "v if" if the data has or has not been loaded.
- go through the process of 
1. Login
2. Account page view
3. Create Route
4. View Routes
5. Search Routes
8. logout
9. account page view of 2nd account
10. book the route from the 1st account
11. view routes.
