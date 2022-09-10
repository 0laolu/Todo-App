let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');
let errorIcon = document.querySelector('.error-img');
let entryFieldCheckbox = document.querySelector('.entry-field .checkbox');

// storing each list created in a container
let numberOfListCreated = [];

// storing each completed list in a container
let completedTodoLists = [];

// getting the elements needed for the theme-toggle
let body = document.querySelector('body');
let toggleButton = document.querySelector('.toggle-appearance-btn');

// adding a click event on the toggle button
toggleButton.addEventListener('click', function() {
    body.classList.toggle('dark');
});

// show error if entry field is empty
function showError() {
    // adding the red border
    entryForm.parentElement.parentElement.classList.add('error');
    
    // display the error icon
    errorIcon.classList.add('show-error');
    entryFieldCheckbox.classList.add('hide');

    // display the error text
    entryForm.querySelector('input[type="text"]').classList.add('error');
    entryForm.querySelector('input[type="text"]').placeholder = 'Field cannot be empty';    
}

// remove the error once the entry field has content within it
function removeError() {
    // remove the error and run the program successfully
    entryForm.parentElement.parentElement.classList.remove('error');
    errorIcon.classList.remove('show-error');
    entryFieldCheckbox.classList.remove('hide');
    entryForm.querySelector('input[type="text"]').classList.remove('error')
    entryForm.querySelector('input[type="text"]').placeholder = 'Create a new todo...';
}

// creating a todo list based on the content typed in the entry field
function displayTodoList() {
    // getting the value of what is typed into the entry field
    let entryFormValue = entryForm.querySelector('input[type="text"]').value;

    // display an error if entry field is empty
    if(entryFormValue == '') {
        showError();
    } else {
        removeError();

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
        checkBox.setAttribute('onclick', 'isChecked(event); isnNotChecked(event);');

        checkmark.setAttribute('src', 'images/icon-check.svg');
        checkmark.setAttribute('class', 'check-mark');

        inputField.setAttribute('class', 'input-field');
        listInput.setAttribute('id', 'list-text');
        listInput.setAttribute('type', 'text');
        listInput.setAttribute('value', entryFormValue);

        deleteBtn.setAttribute('class', 'delete-btn');
        deleteBtn.setAttribute('onclick', 'deleteList(event, numberOfListCreated)');
        deleteIcon.setAttribute('src', 'images/icon-cross.svg');

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
        numberOfListCreated.push(listField);
        console.log(numberOfListCreated);

        // calling the itemsLeftCount to increase the count as a new list is created
        itemsLeftCount(numberOfListCreated.length);

    }; // end of else statement

    // prevent the list created from disappearing fr om the page
    return false;
}

// WHAT WE WANT TO DO IS REMOVE A TODO LIST FROM THE PAGE AS SOON AS IT IS UNCHECKED OR CHECKED

// removing a todo list from the page
function deleteList(event) {
    event.target.parentElement.parentElement.remove();
}

// dictating the actions of thw app for whenever a todo list is checked or not

// code block for the actions performed when a todo list is checked as completed
function isChecked(event) {
    if(!event.target.classList.contains('checked')) {
        // the checkbox serves as the element firing the event

        // making the background color appear when clicked as completed
        event.target.classList.add('checked');

        // making the checkmark appear when clicked as completed
        event.target.firstChild.classList.add('checked');

        // putting a strike-through on the text when clicked as completed
        event.target.nextElementSibling.firstChild.classList.add('strike-through');

        completedTodoLists.push(event.target.parentElement);
        console.log(completedTodoLists);
    } else {
        // once the checkmark is active, the checkmark becomes the element firing the event 

        // removing the background color when clicked again
        event.target.parentElement.classList.remove('checked');

        // removing the checkmark when clicked again
        event.target.classList.remove('checked');

        // removing the strike-through from the input text when clicked again
        event.target.parentElement.nextElementSibling.firstChild.classList.remove('strike-through');

        // looping through the array of completed items to remove a todo list which is later unchecked
        for(let i = 0; i < completedTodoLists.length; i++) {
            if(event.target.parentElement.parentElement == completedTodoLists[i]) {
                completedTodoLists.splice(completedTodoLists.indexOf(event.target.parentElement.parentElement), 1);
                console.log(completedTodoLists);
            }
        }
    }
}

// creating an array that will store all the unchecked lists
let unCompletedLists = [];

function isnNotChecked(event) {
    for(let i = 0; i < numberOfListCreated.length; i++) {
        if(!unCompletedLists.includes(numberOfListCreated[i]) && !numberOfListCreated[i].firstChild.classList.contains('checked')) {
            unCompletedLists.push(numberOfListCreated[i]);
        }
    }

    for(let j = 0; j < unCompletedLists.length; j++) {
        if(event.target.parentElement == unCompletedLists[j]) {
            unCompletedLists.splice(unCompletedLists.indexOf(event.target.parentElement), 1)
        } 
    }
}

// getting the list preference elements from the DOM
let desktopListPreference = document.querySelectorAll('.list-preference p');
let allList = document.querySelector('.list-preference .all');
let activeList = document.querySelector('.list-preference .active');
let completedList = document.querySelector('.list-preference .completed');

let mobileListPreference = document.querySelectorAll('.mobile-list-preference p');
let allMobileList = document.querySelector('.mobile-list-preference .all');
let activeMobileList = document.querySelector('.mobile-list-preference .active');
let completedMobileList = document.querySelector('.mobile-list-preference .completed');


// adding the active state to whichever list preference is selected
desktopListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllList();
            selectAllList();
        } else if (listPreference.classList.contains('active')) {
            if(unCompletedLists.length == 0) {
                invokeActiveList();
                todoListContainer.replaceChildren(...numberOfListCreated);
            } else {
                invokeActiveList();
                selectActiveList();
            }
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedList();
            selectCompletedList();
        } else {
            return;
        }
    })
});


function invokeAllList() {
    allList.classList.add('active-state');
    activeList.classList.remove('active-state');
    completedList.classList.remove('active-state');
}
invokeAllList();

function invokeActiveList() {
    allList.classList.remove('active-state');
    activeList.classList.add('active-state');
    completedList.classList.remove('active-state');
}

function invokeCompletedList() {
    allList.classList.remove('active-state');
    activeList.classList.remove('active-state');
    completedList.classList.add('active-state');
} 

// adding the active state on whichever list preference selected in the mobile view
mobileListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllMobileList();
            selectAllList()
        } else if (listPreference.classList.contains('active')) {
            if(unCompletedLists.length == 0) {
                invokeActiveMobileList();
                todoListContainer.replaceChildren(...numberOfListCreated);
            } else {
                invokeActiveMobileList();
                selectActiveList();
            }
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedMobileList();
            selectCompletedList();
        } else {
            return;
        }
    })
});

function invokeAllMobileList() {
    allMobileList.classList.add('active-state');
    activeMobileList.classList.remove('active-state');
    completedMobileList.classList.remove('active-state');
}
invokeAllMobileList();

function invokeActiveMobileList() {
    allMobileList.classList.remove('active-state');
    activeMobileList.classList.add('active-state');
    completedMobileList.classList.remove('active-state');
}

function invokeCompletedMobileList() {
    allMobileList.classList.remove('active-state');
    activeMobileList.classList.remove('active-state');
    completedMobileList.classList.add('active-state');
}

// displaying every list created when the All button is clicked
function selectAllList() {
    todoListContainer.replaceChildren(...numberOfListCreated);
}

// filtering out and diplaying the lists that are unchecked and active
function selectActiveList() {
    while(todoListContainer.hasChildNodes()) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }

    for(let i = 0; i < unCompletedLists.length; i++) {
        todoListContainer.appendChild(unCompletedLists[i]);
    }
}

// filtering out and displaying the lists that are checked and completed
function selectCompletedList() {
    while(todoListContainer.hasChildNodes()) {
        todoListContainer.removeChild(todoListContainer.firstChild)
    }

    for(let i = 0; i < completedTodoLists.length; i++) {
        todoListContainer.appendChild(completedTodoLists[i]);
    }
}

// let clearCompletedButton = document.querySelector('.clear-completed-btn p');
// clearCompletedButton.addEventListener('click', selectClearCompleted);

// getting the items left element 
let listCount = document.querySelector('.todo-count');

function itemsLeftCount(count) {
    if(count === 1) {
        listCount.textContent = `${count} item left`;
    } else {
        listCount.textContent = `${count} items left`;
    }
}

