Project Dashboard
--------------------
This is a Project Dashboard built with Next.js and TypeScript, allowing users to manage tasks in real-time. The application includes a task list with filtering, infinite scroll, and a modal for creating and editing tasks.

#Features
1.Project Dashboard Page:
-Lists tasks with details like title, status, assignee, priority, and due date.
=Allows filtering tasks by status (To Do, In Progress, Completed).
-Supports infinite scrolling to load more tasks.
-Clicking on a task opens a modal for editing it.

2.Create/Edit Task Modal:
-Allows users to create or edit tasks in a modal popup.
-Task form includes title, description, assignee, priority, due date, and status fields.
-Form validation is implemented using the yup library.
-Real-time updates to the task list upon form submission without page reload.

3.Real-time Updates:
-Newly created or updated tasks are reflected immediately on the task list.

4.Optimized for Performance:
-Implements server-side rendering (SSR) or static site generation (SSG) for task data.

--------------------------------------------------------------------------
#Installation
--------------------------------------------------------------------------
Prerequisites
Ensure you have the following installed:
-Node.js (v14 or higher)
-npm

Steps:
1.Clone the repository:
-git clone https://github.com/ptajne14/project-task.git
-cd project.task

2.Install the dependencies:
-npm install

3.Start the development server:
-npm run dev

4.Open your browser and go to http://localhost:3000 to view the app.

-------------------------------------------------------------------------

#Usage
-Task Management: On the dashboard, you can create, edit, or view tasks by clicking on them.
-Filtering: Use the dropdown to filter tasks based on their status.
-Infinite Scroll: Scroll down to automatically load more tasks when the end of the list is reached.


*Tech Stack
-Next.js: Framework for React applications with built-in SSR/SSG capabilities.
-TypeScript: Provides static typing to help with better code maintainability.
-Formik + Yup: For form handling and validation.
-CSS: Tailored for responsive and clean UI design.

*Assumptions
-Tasks are fetched from a static data.json file placed in the /public folder, assuming this is the source of task data for SSR/SSG purposes.

*Additional Features Implemented
-Infinite Scroll: Instead of traditional pagination, tasks are loaded progressively as you scroll down the list.
-Real-Time Task Update: Upon task creation or editing, the dashboard updates in real time without a page reload.
