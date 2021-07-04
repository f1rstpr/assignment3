# Week 3 Assignment: Life Tracker

Submitted by: Andrew Lee

Deployed Application: [Lifetracker Deployed Site]

## Application Features

### Core Features

- [X] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [X] If the user is logged in, it should display a **Sign Out** button. 
  - [X] If no user is logged in, it should display **Login** and **Register** buttons
  - [X] Display a logo on the far left side, and contain links to the individual detailed activity page. 
- [X] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about
- [X] **Login Page:** A form that allows users to login with email and password.
- [X] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [X] When a user first authenticates, they should be redirected to an authenticated view (i.e the detailed activity page). When they sign out, all frontend data should be reset.
- [X] Users have access to an overview Activity page that show one summary statistic about each of the 3 types of activity tracked.
- [X] The API should have a `security` middleware that only allows authenticated users to access resources and only allows users to access resources about themselves. 
- [X] Users should have the ability to track at least **1** types of activities (i.e Nutrition, Exercise, Sleep, etc.). Each activity should be tracked on separate pages.
- [ ] Deployed website with Heroku & Surge. 

**Detailed Activity Page:**
- [X] The detailed activity page should display a feed of all previous tracked activities.
- [X] The detailed activity should contain a form to contain relevant information. (i.e if tracking nutrition this form allows the user to capture calories, timestamp, image, category, etc.) 
- [X] The activity tracked should be given a unique id for easy lookup.
  `TODO://` Add link to table schema in the link code below. Your file should end in `.sql` and show your schema for the detailed activities table.
  * [Table Schema](https://github.com/f1rstpr/assignment3/blob/main/api/lifetracker-schema.sql) 

### Stretch Features

Implement any of the following features to improve the application:
- [ ] Each model (`nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource. Create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the life tracker application and allow users to follow each other.

### Walkthrough Video


[**User logging in + Views**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/userLogin.gif)

[**User logging in and adding an activity**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/userAddToNutrition.gif)

[**User registration + First time adding**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/userRegister.gif)

[**Not logged in - Unauthenicated views**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/userNotLoggedIn.gif)

[**Error handling - Forms**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/ErrorHandling.gif)

[**Network tab, each item has its own id**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/networj.png)


## API security middleware

[**Logging in - User gets token after logging in. Can use that token to get info about themselves and also info their activities**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/securityMiddleware.gif)

[**Registration - User gets token after registration. Can use that token to get info about themselves also info their activities.**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/securityMiddleware2.gif)

[**Unauthorized Error - If an invalid token is provided while trying to fetch info about themselves or their activities, an Unauthorized error is thrown.**]
![](https://github.com/f1rstpr/assignment3/blob/main/frontend/gifs/securityMiddleware3.gif)

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

[Yes, the material taught in the labs were really helpful. The user authentication lab was really dense but it taught me a lot of things that were important for this assignment: JWT, middlewares, api client on front end, etc. I felt unprepared for the stretch features, database design, and deploying.]

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
[I would add more activities because right now I just have 2. I think also implementing some of the stretch features, such as allowing a user to follow others, would be pretty cool. I would also try to learn more about Context or Hooks since I did not apply those concepts into this project.]

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

[What went well was setting up the user authentication on the backend because it seemed intimidating at first, but I am glad I got it done. What didn't go well was trying to deploy to heroku. Since I am on a windows machine, I ran into lots of issues with postgres when trying to deploy.]

### Open-source libraries used

- Add any links to open-source libraries used in your project.
- https://material-ui.com/ 

### Shout out

Give a shout out to somebody from your cohort that especially helped you during your project. This can be a fellow peer, instructor, TA, mentor, etc.

[Shoutouts to everyone because it was a hard week.]





