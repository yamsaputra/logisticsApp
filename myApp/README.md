## TrustTrip FRONTEND

### Latest Update
Date | Description | Version
 --- | --- | --- 
11.02.2025 | Updated internationalization alert message on the sign up page. | 0.6.7

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
> Issue might originate from the ion tabs, currently rectifying the problem with the proper syntax & utilizing the router.push()
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

02.01.2025
- Routers in index.js rectified to work with the "navigateTo()" in ion-tabs.vue

08.01.2025
+ stored user not cleared upon log out has been solved. > route.go() added to logout function on accountpage

- ion-button on accountPage follows the proper ionic css styling syntax.

### Pages with updated ion-alert elements.
+ routePage
+ homePage
+ loginPage
+ signUpPage

### pages with updated i18n.
+ loginPage
+ homePage
+ packagePage
+ trustPage
+ AccountPage
+ routePage

To do: loginPage
- If condition for status 404 or 401 is somehow not properly being caught.

12.01.2024
- loginPage condition issue solved > the ion Alert was not properly placed and the else if condition was actually working.
- All alert messages from window.alert have been updated.
- i18n API updated to Vue's composition API.

- FrontEnd Beta version completed.

04.02.2025
-Successfully pushed the dockerimage on to kubernetes but the frontend isnt correctly installed so only the login page loads
-Deployment text file created to plan the Workflow for Continuous Integration

7.02.2025
-Created K8s workflow for the Frontend.

11.02.2025
-Refresh slide down not functioning in browser build.
-Sign up success alert message updated.

12.04.2025
-listPage bug when refreshing via pull down
-booked routes not showing up in contract page
