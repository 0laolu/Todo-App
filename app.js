let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');
let errorIcon = document.querySelector('.error-img');
let entryFieldCheckbox = document.querySelector('.entry-field .checkbox');
// storing each list created in a container
let numberOfListCreated = [];

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
        checkBox.addEventListener('click', function() {
            if(!checkBox.classList.contains('checked')) {
                checkBox.classList.add('checked');
                listInput.classList.add('strike-through');
            } else {
                checkBox.classList.remove('checked');
                listInput.classList.remove('strike-through');
            }

            isChecked(numberOfListCreated, checkBox, deleteList);
        });

        // calling the itemsLeftCount to increase the count as a new list is created
        itemsLeftCount(numberOfListCreated.length);

    }; // end of else statement

    // prevent the list created from disappearing from the page
    return false;
}

// function isChecked(itemsLeft, checkButton, func) {
//     if(checkButton.classList.contains('checked') || func()) {
//         itemsLeft.pop();
//         console.log(itemsLeft);
//         console.log(itemsLeft.length)
//     }
// }

// getting the items left element 
let listCount = document.querySelector('.todo-count');

// removing a todo list from the page
function deleteList(event, todoListTotal) {
    event.target.parentElement.parentElement.remove();
    // removing the last element of the numberOfListCreated array when a list is deleted
    todoListTotal.pop();

    if(todoListTotal.length === 1) {
        listCount.textContent = `${todoListTotal.length} item left`;
    } else {
        listCount.textContent = `${todoListTotal.length} items left`;
    }
}

function itemsLeftCount(count) {
    if(count === 1) {
        listCount.textContent = `${count} item left`;
    } else {
        listCount.textContent = `${count} items left`;
    }
}

// reducing the items left count once a list is checked

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
