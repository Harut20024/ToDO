const root = document.getElementById("root");

// Function to create a form for adding new todos
function TodoForm(add) {
    const container = document.createElement("form");

    // Create an input field and a button inside the form
    container.innerHTML = `
        &nbsp;<input id = "input" type="text" placeholder="Type your todo"/>     
        <button class="button-35">Add</button> <br><br>
    `;

    // When the form is submitted, do this:
    container.addEventListener("submit", (e) => {
        // e.preventDefault(); // Prevent the page from refreshing

        const inputField = container.querySelector("input");
        const value = inputField.value.trim();

        if (value !== "") { // Check if the value is not empty
            add(value); // Call the provided function to add the value as a new todo
        } else {
            alert("Please input a value");
        }

        inputField.value = ""; // Clear the input field
    });

    return container;
}


// Function to create a checkbox with a todo label
function ListItem(todo, onChange) {
    const container = document.createElement("div");
    container.classList.add("divl");
    // Create a checkbox and label for the todo item
    container.innerHTML = `
        <label>
            <input id = "checkbox" type="checkbox" ${todo.completed ? "checked" : ""}/>
            ${todo.label}
        </label>
    `;

    // When the checkbox is changed, do this:
    const input = container.querySelector("input");
    input.addEventListener("change", (e) => {
        onChange(e.target.checked); // Call the provided function with the checkbox value
    });

    return container;
}

// Function to create a list of todo items
function List(todos, onChange) {
    const container = document.createElement("div");
    container.classList.add("divl"); // Add your desired class name here
    // Create a ListItem for each todo and add them to the container
    todos.forEach(todo => {
        const listItem = ListItem(todo, (change) => {
            todo.completed = change; // Update the completed status
            onChange(); // Call the provided function to update the UI
        });
        container.appendChild(listItem);
    });

    return container;
}

// Function to create a footer showing completed todos and a clear button
function TodoFooter(todos, onChange) {
    const container = document.createElement("div");
    container.classList.add("divl"); // Add your desired class name here

    // Count how many todos are completed
    const completed = todos.filter(todo => todo.completed === true).length;

    // Create the footer content
    container.innerHTML = `
        <span>${completed} / ${todos.length} Completed</span> <br><br>
        <button class="button-48"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;clear</button>
    `;

    // When the "Clear Completed" button is clicked, do this:
    const btn = container.querySelector("button");
    btn.addEventListener("click", () => {
        onChange(todos.filter((todo) => todo.completed === false)); // Remove completed todos
    });

    return container;
}

// The main function that sets up the todo app
function App() {
    let todos = []; // Initialize an empty list for todos

    // Fetch todos from the server and update the list
    fetch("/todos")
        .then((resp) => resp.json())
        .then((resp) => {
            console.log(resp); // Display the fetched data it is for checking
            todos = resp; // Update the todos list
            render(); // Call the function to update the UI
        });

    // Function to send todos to the server
    function sendToDos() {
        fetch("/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todos) // Send the todos list to the server
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update todos on the server");
                }
            })
            .catch((error) => {
                console.error("Error sending todos:", error);
            });
    }

    const container = document.createElement("div");
    container.classList.add("divl");
    // Function to update and display the UI
    function render() {
        container.innerHTML = ""; // Clear the container

        // Add the todo form, list, and footer components to the container
        container.appendChild(TodoForm(function (newText) {
            todos.push({
                label: newText,
                completed: false
            });
            sendToDos();
            render();
        }));
        container.appendChild(List(todos, () => {
            sendToDos();
            render();
        }));
        container.appendChild(TodoFooter(todos, (newTodos) => {
            todos = newTodos; // Update the todos list
            sendToDos();
            render();
        }));
    }

    render(); // Call the function to initially render the UI

    return container; // Return the main container
}

root.appendChild(App()); // Add the todo app to the HTML element with ID "root"
