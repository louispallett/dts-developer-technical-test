# dts-developer-technical-test
DTS Developer Technical Test for Junior Software Developer role for HM C&amp;TS.

### [Live link to the client page](https://dts-technical-lnp.netlify.app/)

![Screenshot from the live website, displaying the task information page. This is a white background with a purple box displaying a task's information (title, description, status, due date) and buttons to alter status, save the updated task, or delete it.](https://res.cloudinary.com/divlee1zx/image/upload/v1745840123/Screenshot_From_2025-04-28_12-34-22_koigah.png)

Part of a job application, this fullstack application allows users to create tasks, read (and filter) tasks, update the statuses of tasks, and delete tasks (all four CRUD operations).

## Frontend
I've used **React** and **TailwindCSS** on the frontend to create a responsive and appealing user interface. It also makes use of a number of other libraries, such as:

- [**Axios**](https://github.com/axios/axios): Promise based HTTP client for simplifying requests to the server.
- [**React Hook Form**](https://www.react-hook-form.com/) - making it easier to handle form submissions on the client-side.
- [**React Router**](https://reactrouter.com/) - allowing seemless clientside routing and page hierarchy.

### Frontend Highlights
I've also made use of several React hooks, including useState and useEffect. A particular highlight can be seen when updating the status on an existing task:

![A GIF of the task information page, where the user changes the status of the task which alters the highlighting on each named task button.](/client/public/assets/images/status.gif)

I achieve this by having the status property in each task be a number, so that I can simply decrement or increment the status property when the user clicks either the **Previous Status** or **Next Status** button. The styling on each status element is then determined by a conditional. Importantly, I update the **setData** useState hook so that the component re-loads. There was no need to alter the array of dependencies.

Additionally, the home page which displays all tasks has a **filter** operation. Again, this is achieved through a shrewed application of useState:

![A GIF of the home page, displaying all tasks. The user uses a filter application to fitler the tasks by their status.](/client/public/assets/images/filter.gif)

The frontend is hosted by [Netlify](https://www.netlify.com/).

## Backend
I've used NodeJS with Express as a framework, as this is what I'm most comfortably using and is straightforward to set up for a smaller fullstack application. The server connects to a MongoDB database to store data. Other technologies include:

- [**NPM CORS**](https://www.npmjs.com/package/cors) - A NodeJS package for providing Express middlewhere to enable CORS effectively.
- [**Luxon**](https://github.com/moment/luxon) - JavaScript library for working with dates and times. I've used Luxon in my Task Schema ([task.js](/server/models/task.js)) to set a Virtual which can be accessed when the data is fetched.
- [**Mongoose**](https://mongoosejs.com/) - Object Data Modeling library for MongoDB and Node.js.
- [**Helmet**](https://www.npmjs.com/package/helmet) - Secures the server by setting HTTP response headers.
- Developer Dependencies:
    - [**Nodemon**](https://nodemon.io/) - Node.js dev tool to automatically restart servers during development.

### Backend Highlights
The backend is a **RESTful** API designed to be simple and efficient. It is carefully organised to be flexible and allow for scalability.

A particular highlight can be found in the Task Schema ([task.js](/server/models/task.js)), where clever uses of enumerated and immutable properties are set and the use of Virtuals for Mongoose.

The backend is hosted by [Fly.io](https://fly.io/).