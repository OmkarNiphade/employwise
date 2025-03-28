To run your Vite + React + Bootstrap project, first, install the required dependencies by navigating to your project folder in the terminal and running npm install. Once the installation is complete, start the development server using the command npm run dev. This will provide a local development URL, usually http://localhost:5173/, which you can open in your browser to view your project.

Ensure that Bootstrap is properly imported in the main.jsx file by adding import "bootstrap/dist/css/bootstrap.min.css"; at the top. If the styles are not applying, restart the server by pressing Ctrl + C in the terminal and running npm run dev again.

Now, you can test the CRUD operations in your application. To create a new user, fill in the "First Name," "Last Name," and "Email" fields and click the "Add User" button. The newly added user will be displayed in a Bootstrap-styled card layout. To update a user, click the "Edit" button, modify the details in the input fields, and click "Save" to update the user information. To delete a user, simply click the "Delete" button, and the user will be removed from the list.

If you plan to deploy the project, you can generate an optimized production build by running npm run build. This will create a dist/ folder containing the production-ready files. Now, your project is fully functional, and you can interact with all CRUD operations smoothly.
