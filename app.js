let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');
let errorIcon = document.querySelector('.error-img');
let entryFieldCheckbox = document.querySelector('.entry-field .checkbox');

let body = document.querySelector('body');
let toggleButton = document.querySelector('.toggle-appearance-btn');
// storing each list created in a container
let numberOfListCreated = [];

let completedMobileList = document.querySelector('.mobile-list-preference .completed');


// storing each completed list in a container
let completedTodoLists = [];

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
        checkBox.setAttribute('onclick', 'isChecked(event)');
        // checkBox.classList.add('checked');

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

        // putting a strike-through on a todo list once it is checked as complete
        // checkBox.addEventListener('click', testFunc);

        // calling the itemsLeftCount to increase the count as a new list is created
        itemsLeftCount(numberOfListCreated.length);

        checkedLists(numberOfListCreated);

    }; // end of else statement

    // prevent the list created from disappearing from the page
    return false;
}

function isChecked(event) {
    if(!event.target.classList.contains('checked')) {
        // making the background color appear when clicked as completed
        event.target.classList.add('checked');

        // making the checkmark appear when clicked as completed
        event.target.firstChild.classList.add('checked');

        // putting a strike-through on the text when clicked as completed
        event.target.nextElementSibling.firstChild.classList.add('strike-through');

        completedTodoLists.push(event.target.parentElement);
        console.log(completedTodoLists);
    } else {
        // removing the background color when clicked again
        event.target.parentElement.classList.remove('checked');

        // removing the checkmark when clicked again
        event.target.classList.remove('checked');

        // removing the strike-through from the input text when clicked again
        event.target.parentElement.nextElementSibling.firstChild.classList.remove('strike-through');

        for(let i = 0; i < completedTodoLists.length; i++) {
            if(event.target.parentElement.parentElement == completedTodoLists[i]) {
                completedTodoLists.splice(completedTodoLists.indexOf(event.target.parentElement.parentElement), 1);
                console.log(completedTodoLists);
            }
        }
    }
    return completedTodoLists;
}

// getting the items left element 
let listCount = document.querySelector('.todo-count');

// removing a todo list from the page
function deleteList(event) {
    event.target.parentElement.parentElement.remove();
}

function itemsLeftCount(count) {
    if(count === 1) {
        listCount.textContent = `${count} item left`;
    } else {
        listCount.textContent = `${count} items left`;
    }
}

// reducing the items left count once a list is checked
let elementIsClicked = false;
function decreaseItemsLeftCount() {
    elementIsClicked = true;
    // a condition on the check button so that it doesn't decrease when checked more than once
    return elementIsClicked;
}

// getting the list preference elements from the DOM
let desktopListPreference = document.querySelectorAll('.list-preference p');
let allList = document.querySelector('.list-preference .all');
let activeList = document.querySelector('.list-preference .active');
let completedList = document.querySelector('.list-preference .completed');

let mobileListPreference = document.querySelectorAll('.mobile-list-preference p');
let allMobileList = document.querySelector('.mobile-list-preference .all');
let activeMobileList = document.querySelector('.mobile-list-preference .active');
// let completedMobileList = document.querySelector('.mobile-list-preference .completed');


// adding the active state to whichever list preference is selected
desktopListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllList();
            selectAllList();
        } else if (listPreference.classList.contains('active')) {
            invokeActiveList();
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedList();
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

    while(todoListContainer.hasChildNodes()) {
        todoListContainer.removeChild(todoListContainer.firstChild)
    }

    for(let i = 0; i < completedTodoLists.length; i++) {
        todoListContainer.appendChild(completedTodoLists[i]);
    }
}

function selectAllList() {
    todoListContainer.replaceChildren(...numberOfListCreated);
}

 
// adding the active state on whichever list preference selected in the mobile view
mobileListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllMobileList();
        } else if (listPreference.classList.contains('active')) {
            invokeActiveMobileList();
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedMobileList();
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

let checkedItems = [];

function checkedLists(listCreated) {
    if(!listCreated[0].firstChild.classList.contains('checked')) {
        checkedItems.push();
    } else {
        checkedItems.push(listCreated[0])
    }
    // console.log(checkedItems)
}
