let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');

// storing each list created in a container
let numberOfListCreated = [];

// creating a todo list based on the content typed in the entry field
function displayTodoList() {
    let entryFormValue = entryForm.querySelector('input[type="text"]').value;
    console.log(entryFormValue);

    // creating the todo list template
    let listField = document.createElement('div');      // list template container
    let checkBox = document.createElement('div');       // first child of the template
    let checkmark = document.createElement('img');      // child of the first child
    let inputField = document.createElement('div');     // second child of the template
    let listInput = document.createElement('input');    // child of the second child   
    let deleteBtn = document.createElement('button');   // third child of the template
    let deleteIcon = document.createElement('img');     // child of the third child

    // setting attributes to each element
    listField.setAttribute('class', 'list-field');
    checkBox.setAttribute('class', 'checkbox');
    checkBox.classList.add('checked');

    checkmark.setAttribute('src', 'images/icon-check.svg');
    checkmark.setAttribute('class', 'check-mark');

    inputField.setAttribute('class', 'input-field');
    listInput.setAttribute('id', 'list-text');
    listInput.setAttribute('type', 'text');
    listInput.setAttribute('value', entryFormValue);

    deleteBtn.setAttribute('class', 'delete-btn');
    deleteIcon.setAttribute('src', 'images/icon-cross.svg')

    // appending child elements to parent elements
    checkBox.appendChild(checkmark);
    listField.appendChild(checkBox);

    inputField.appendChild(listInput);
    listField.appendChild(inputField);

    deleteBtn.appendChild(deleteIcon);
    listField.appendChild(deleteBtn);
    // displaying the todo list template on the page
    todoListContainer.appendChild(listField);

    // clearing the entry field after list has been submitted
    document.getElementById('entry-text').value = '';

    // pushing the list created to number of Todo list array
    numberOfListCreated.push(listField)

    // calling the increase list count function
    increaseListCount();

    // calling the deleteTodoList function and passing number
    deleteTodoList(numberOfListCreated);

    // prevent the list created from disappearing from the page
    return false;
}

// updating the count 
let increaseCount = 0;
let listCount = document.querySelector('.todo-count');

// increase the count once a list is created
function increaseListCount() {
    increaseCount = increaseCount + 1;

    if(increaseCount === 1) {
        listCount.textContent = `${increaseCount} item left`;
    } else {
        listCount.textContent = `${increaseCount} items left`;
    }
};

// remove list from the page once the delete button is clicked
function deleteTodoList(todoListTotal) {
    let deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', function() {
            deleteButton.parentElement.remove();
            decreaseListCount();
        });
    });

    // decrease the count after a list has been deleted
    let listTotal = todoListTotal.length;
    function decreaseListCount() {
        listTotal = listTotal - 1;
        if(listTotal === 1) {
            listCount.textContent = `${listTotal} item left`;
        } else {
            listCount.textContent = `${listTotal} items left`;
        }
    }
}


