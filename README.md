# Todo List Web Application

This is a simple web-based Todo List application built using HTML, CSS, and JavaScript on the client side, and powered by Express.js for the server and data handling.

## Features

- Add new todo items.
- Mark todo items as completed.
- View the number of completed todos.
- Clear completed todos.

## Technologies Used

- HTML, CSS, and JavaScript for the client-side interface.
- Express.js for building the server and handling HTTP requests.
- `fs` module for working with files and `path` module for handling file paths.

## Setup and Usage

To get started with the Todo List application, follow these steps:

1. Clone this repository to your local machine.
      ```bash
   git clone https://github.com/Harut20024/ToDO.git

3. Navigate to the project directory.

4. Install the required dependencies.

5. Start the Express server.

6. Open your web browser and visit the provided URL to use the Todo List application.


## How It Works

### `script.js`

- `TodoForm`: Creates a form to add new todo items. Handles form submission and calls the provided function to add a new todo.

- `ListItem`: Creates a checkbox with a todo label. Handles checkbox changes and calls the provided function with the new checkbox value.

- `List`: Creates a list of todo items based on the provided data. Calls the provided function to update the UI when a todo is changed.

- `TodoFooter`: Creates a footer displaying the number of completed todos and a "Clear" button. Handles button click and calls the provided function to update the UI.

- `App`: The main function that sets up the Todo app. Fetches todos from the server, sends todos to the server, and updates the UI accordingly.

### `index.js`

- Sets up an Express.js server.

- Serves static files from the `public` directory.

- Handles GET requests to fetch todos from a JSON file.

- Handles POST requests to update todos in the JSON file.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Your contributions are greatly appreciated!

## License

This project is licensed under the MIT License.
