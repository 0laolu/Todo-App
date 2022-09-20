let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');
let errorIcon = document.querySelector('.error-img');
let entryFieldCheckbox = document.querySelector('.entry-field .checkbox');
let todoSection = document.querySelector('.todo-section')

// storing each list created in a container
let numberOfListCreated = [];

// getting the elements needed for the theme-toggle
let body = document.querySelector('body');
let toggleButton = document.querySelector('.toggle-appearance-btn');

// adding a click event on the toggle button
toggleButton.addEventListener('click', function() {
    body.classList.toggle('dark');
});

document.addEventListener('DOMContentLoaded', () => {
    displaySavedTasks();
    displayCheckedTasks();
})

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
    entryForm.querySelector('input[type="text"]').placeholder = 'Create a new task...';
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
        let listFieldContainer = document.createElement('div'); // todo list template container
        let listField = document.createElement('div');          // todo list template
        let checkBox = document.createElement('div');           // first child of the template
        let checkmark = document.createElement('img');          // child of the first child
        let inputField = document.createElement('div');         // second child of the template
        let listInput = document.createElement('input');        // child of the second child   
        let deleteBtn = document.createElement('button');       // third child of the template
        let deleteIcon = document.createElement('img');         // child of the third child

        // setting attributes to each element
        listFieldContainer.setAttribute('class', 'todo-section__list-field-container')
        listFieldContainer.classList.add('draggable');
        listFieldContainer.setAttribute('draggable', 'true');
        listField.setAttribute('class', 'list-field');
        checkBox.setAttribute('class', 'checkbox');
        checkBox.setAttribute('onclick', 'isChecked(event); isnNotChecked(event)');

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

        listFieldContainer.appendChild(listField)
        // displaying the todo list template on the page
        todoListContainer.appendChild(listFieldContainer);

        // clearing the entry field after list has been submitted
        document.getElementById('entry-text').value = '';

        // pushing the list created to number of Todo list array
        numberOfListCreated.push(listFieldContainer);
        console.log(numberOfListCreated[0])
        // console.log(numberOfListCreated[0].firstChild.firstChild.nextElementSibling.firstChild.value)

        saveTasks(entryFormValue);
        
        let draggables = document.querySelectorAll('.todo-section__list-field-container.draggable');
        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            })

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            })
        })

        todoListContainer.addEventListener('dragover', event => {
            event.preventDefault();

            const afterElement = getDragAfterElement(todoListContainer, event.clientY)

            const draggable = document.querySelector('.todo-section__list-field-container.draggable.dragging')
            if(afterElement == null) {
                todoListContainer.appendChild(draggable)
            } else {
                todoListContainer.insertBefore(draggable, afterElement)
            }
        
        })  

        // calling the itemsLeftCount to increase the count as a new list is created
        itemsLeftCount(unCompletedTodoLists.length + 1);

        filterActiveLists();

    }; // end of else statement

    // prevent the list created from disappearing fr om the page
    return false;
}

function saveTasks(formValue) {
    let values;
    if(localStorage.getItem('myTasks') == null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('myTasks'))
    }

    values.push(formValue)
    localStorage.setItem('myTasks', JSON.stringify(values))
}

function displaySavedTasks() {
    let values;
    if(localStorage.getItem('myTasks') == null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('myTasks'))
    }

    values.forEach(listValue => {
        let listFieldContainer = document.createElement('div'); // todo list template container
        let listField = document.createElement('div');          // todo list template
        let checkBox = document.createElement('div');           // first child of the template
        let checkmark = document.createElement('img');          // child of the first child
        let inputField = document.createElement('div');         // second child of the template
        let listInput = document.createElement('input');        // child of the second child   
        let deleteBtn = document.createElement('button');       // third child of the template
        let deleteIcon = document.createElement('img');         // child of the third child

        // setting attributes to each element
        listFieldContainer.setAttribute('class', 'todo-section__list-field-container')
        listFieldContainer.classList.add('draggable');
        listFieldContainer.setAttribute('draggable', 'true');
        listField.setAttribute('class', 'list-field');
        checkBox.setAttribute('class', 'checkbox');
        checkBox.setAttribute('onclick', 'isChecked(event); isnNotChecked(event)');

        checkmark.setAttribute('src', 'images/icon-check.svg');
        checkmark.setAttribute('class', 'check-mark');

        inputField.setAttribute('class', 'input-field');
        listInput.setAttribute('id', 'list-text');
        listInput.setAttribute('type', 'text');
        listInput.setAttribute('value', listValue);

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

        listFieldContainer.appendChild(listField)
        // displaying the todo list template on the page
        todoListContainer.appendChild(listFieldContainer);

        numberOfListCreated.push(listFieldContainer)

        // if(numberOfListCreated.length == 1) {
        //     listCount.textContent = `${numberOfListCreated.length} item left`
        // } else {
        //     listCount.textContent = `${numberOfListCreated.length} items left`
        // }

    })
}
// removes a task from local storage when that task is deleted on the webpage
function removeSavedTasks(event) {
    let values;
    if(localStorage.getItem('myTasks') == null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('myTasks'))
    }

    if(values.includes(event.target.parentElement.previousElementSibling.firstChild.value)) {
        values.splice(values.indexOf(event.target.parentElement.previousElementSibling.firstChild.value), 1)
    }

    localStorage.setItem('myTasks', JSON.stringify(values))
}

// saves a task that was checked as complete in local storage
function saveCheckedTasks(event) {
    let checkedValues;
    if(localStorage.getItem('completedTasks') == null) {
        checkedValues = [];
    } else {
        checkedValues = JSON.parse(localStorage.getItem('completedTasks'))
    }

    
    if(event.target.classList.contains('checked') && !checkedValues.includes(event.target.nextElementSibling.firstChild.value)) {
        checkedValues.push(event.target.nextElementSibling.firstChild.value)
    }

    localStorage.setItem('completedTasks', JSON.stringify(checkedValues))
}

// displays the completed tasks and the incomplete tasks together when reloaded
function displayCheckedTasks() {
    let checkedValues;
    if(localStorage.getItem('completedTasks') == null) {
        checkedValues = [];
    } else {
        checkedValues = JSON.parse(localStorage.getItem('completedTasks'))
    }

    let values = JSON.parse(localStorage.getItem('myTasks'))
    console.log(values);
    console.log(checkedValues)


    numberOfListCreated.some(todoListWrapper => {
        if(checkedValues.includes(todoListWrapper.firstChild.firstChild.nextElementSibling.firstChild.value)) {
            todoListWrapper.firstChild.firstChild.classList.add('checked');
            todoListWrapper.firstChild.firstChild.firstChild.classList.add('checked');
            todoListWrapper.firstChild.firstChild.nextElementSibling.firstChild.classList.add('strike-through')

            completedTodoLists.push(todoListWrapper)
        } else {
            unCompletedTodoLists.push(todoListWrapper)
        }
    })
}

// removes a task which is later unchecked from local storage
function removeCheckedTasks(event) {
    let checkedValues;
    if(localStorage.getItem('completedTasks') == null) {
        checkedValues = [];
    } else {
        checkedValues = JSON.parse(localStorage.getItem('completedTasks'))
    }

    console.log(event.target)
    if(checkedValues.includes(event.target.parentElement.nextElementSibling.firstChild.value)) {
        checkedValues.splice(checkedValues.indexOf(event.target.parentElement.nextElementSibling.firstChild.value), 1)
    }

    localStorage.setItem('completedTasks', JSON.stringify(checkedValues))
}

function getDragAfterElement(container, y) {
    let draggableElements = [...document.querySelectorAll('.todo-section__list-field-container.draggable:not(.todo-section__list-field-container.draggable.dragging)')]
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child}
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY}).element
}

// removing a todo list from the page
function deleteList(event) {
    // console.log(numberOfListCreated)
    // console.log(numberOfListCreated[0])

    event.target.parentElement.parentElement.parentElement.remove();

    // removing the deleted task from the numberOfListCreated array
    // storing the count value for when an unchecked list is deleted in a variable
    let countValue = unCompletedTodoLists.length - 1
    for(let i = 0; i < numberOfListCreated.length; i++) {
        if(!event.target.parentElement.parentElement.firstChild.classList.contains('checked')){
            if(countValue == 1) {
                listCount.textContent = `${countValue} item left`;
            } else {
                listCount.textContent = `${countValue} items left`;
            }
        }


        if(event.target.parentElement.parentElement.parentElement == numberOfListCreated[i]) {
            numberOfListCreated.splice(numberOfListCreated.indexOf(event.target.parentElement.parentElement.parentElement), 1)
        }
    }

    for(let j = 0; j < completedTodoLists.length; j++) {
        if(event.target.parentElement.parentElement.parentElement == completedTodoLists[j]) {
            completedTodoLists.splice(completedTodoLists.indexOf(event.target.parentElement.parentElement.parentElement), 1)
        }
    }

    for(let k = 0; k < unCompletedTodoLists.length; k++) {
        if(event.target.parentElement.parentElement.parentElement == unCompletedTodoLists[k]) {
            unCompletedTodoLists.splice(unCompletedTodoLists.indexOf(event.target.parentElement.parentElement.parentElement), 1)
        }
    }

    removeSavedTasks(event)
    // console.log(completedTodoLists);
    // console.log(unCompletedTodoLists);
    // console.log(numberOfListCreated);
}

// storing each completed list in a container
let completedTodoLists = [];

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

        completedTodoLists.push(event.target.parentElement.parentElement);
        // console.log(completedTodoLists);
        // console.log(numberOfListCreated);
        // console.log(unCompletedTodoLists);

        saveCheckedTasks(event);

        let decrementCount = numberOfListCreated.length - completedTodoLists.length;

        if(decrementCount == 1) {
            listCount.textContent = `${decrementCount} item left`;
        } else {
            listCount.textContent = `${decrementCount} items left`;
        }
        
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
            if(event.target.parentElement.parentElement.parentElement == completedTodoLists[i]) {
                completedTodoLists.splice(completedTodoLists.indexOf(event.target.parentElement.parentElement.parentElement), 1);
            }
        }
        // console.log(completedTodoLists);
        // console.log(numberOfListCreated);
        // console.log(unCompletedTodoLists);

        removeCheckedTasks(event);

        let incrementCount = numberOfListCreated.length - completedTodoLists.length;

        if(incrementCount == 1) {
            listCount.textContent = `${incrementCount} item left`;
        } else {
            listCount.textContent = `${incrementCount} items left`;
        }
    }
}

// creating an array that will store all the unchecked lists
let unCompletedTodoLists = [];

function isnNotChecked(event) {
    for(let i = 0; i < numberOfListCreated.length; i++) {
        if(!unCompletedTodoLists.includes(numberOfListCreated[i]) && !numberOfListCreated[i].firstChild.firstChild.classList.contains('checked')) {
            unCompletedTodoLists.push(numberOfListCreated[i]);
        }
    }

    // preventing the repetition of add the unchecked items to uncompleted lists when a list is checked
    for(let j = 0; j < unCompletedTodoLists.length; j++) {
        if(event.target.parentElement.parentElement == unCompletedTodoLists[j]) {
            unCompletedTodoLists.splice(unCompletedTodoLists.indexOf(event.target.parentElement.parentElement), 1)
        } 
    }
}

// Setting newly created tasks to Active tasks by default
function filterActiveLists() {
    for(let i = 0; i < numberOfListCreated.length; i++) {
        if(!unCompletedTodoLists.includes(numberOfListCreated[i]) && !numberOfListCreated[i].firstChild.firstChild.classList.contains('checked')) {
            unCompletedTodoLists.push(numberOfListCreated[i]);
        }
    }
}

// gets the Clear Completed button element and adds a click event to it
let clearCompletedButton = document.querySelector('.clear-completed-btn p');
clearCompletedButton.addEventListener('click', clearCompletedLists);

// the function that fires when the Clear Completed button is clicked
function clearCompletedLists() {
    // loops through numberOfListCreated to remove checked lists from the page 
    for(let i = numberOfListCreated.length - 1; i >= 0; i--) {
        if(numberOfListCreated[i].firstChild.firstChild.classList.contains('checked')) {
            numberOfListCreated[i].remove();

            // updates the array to remove the checked items so when the All button is clicked, it doesn't display the checked items
            numberOfListCreated.splice(numberOfListCreated.indexOf(numberOfListCreated[i]), 1)
        }
    }

    // loops through CompletedTodoLists to remove checked items so when the Completed button is clicked, it doesn't display the checked items
    for(let j = 0; j < completedTodoLists.length; j++) {
        completedTodoLists.splice(completedTodoLists[j].firstChild.firstChild);
    }
}

// getting the todo list filter elements from the DOM for desktop view
let desktopListPreference = document.querySelectorAll('.list-preference p');
let allList = document.querySelector('.list-preference .all');
let activeList = document.querySelector('.list-preference .active');
let completedList = document.querySelector('.list-preference .completed');

// getting the todo list filter elements from the DOM for mobile view
let mobileListPreference = document.querySelectorAll('.mobile-list-preference p');
let allMobileList = document.querySelector('.mobile-list-preference .all');
let activeMobileList = document.querySelector('.mobile-list-preference .active');
let completedMobileList = document.querySelector('.mobile-list-preference .completed');


// Looping through the todo list filters and call a function when any of them is clicked in desktop view
desktopListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllList();
            selectAllList();
        } else if (listPreference.classList.contains('active')) {
            invokeActiveList();
            selectActiveList();
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedList();
            selectCompletedList();
        } else {
            return;
        }
    })
});

// adding the blue colour to the All todo list filter in desktop view
function invokeAllList() {
    allList.classList.add('active-state');
    activeList.classList.remove('active-state');
    completedList.classList.remove('active-state');
}

// calling the function to add the blue color to the All todo list filter when the page loads
invokeAllList();

// adding the blue colour to the Active todo list filter in desktop view
function invokeActiveList() {
    allList.classList.remove('active-state');
    activeList.classList.add('active-state');
    completedList.classList.remove('active-state');
}

// adding the blue colour to the Completed todo list filter in desktop view
function invokeCompletedList() {
    allList.classList.remove('active-state');
    activeList.classList.remove('active-state');
    completedList.classList.add('active-state');
} 

// Looping through the todo list filters and call a function when any of them is clicked in mobile and tablet view
mobileListPreference.forEach(listPreference => {
    listPreference.addEventListener('click', function() {
        if(listPreference.classList.contains('all')) {
            invokeAllMobileList();
            selectAllList();
        } else if (listPreference.classList.contains('active')) {
            invokeActiveMobileList();
            selectActiveList();
        } else if (listPreference.classList.contains('completed')) {
            invokeCompletedMobileList();
            selectCompletedList();
        } else {
            return;
        }
    })
});

// adding the blue colour to the All todo list filter in mobile and tablet view
function invokeAllMobileList() {
    allMobileList.classList.add('active-state');
    activeMobileList.classList.remove('active-state');
    completedMobileList.classList.remove('active-state');
}

// calling the function to add the blue color to the All todo list filter when the page loads
invokeAllMobileList();

// adding the blue colour to the Active todo list filter in mobile and tablet view
function invokeActiveMobileList() {
    allMobileList.classList.remove('active-state');
    activeMobileList.classList.add('active-state');
    completedMobileList.classList.remove('active-state');
}

// adding the blue colour to the Completed todo list filter in mobile and tablet view
function invokeCompletedMobileList() {
    allMobileList.classList.remove('active-state');
    activeMobileList.classList.remove('active-state');
    completedMobileList.classList.add('active-state');
}

// displaying every list created when the All button is clicked
function selectAllList() {
    for(let i = 0; i < numberOfListCreated.length; i++) {
        numberOfListCreated[i].firstChild.firstChild.setAttribute('onclick', 'isChecked(event); isnNotChecked(event)');
    }
    todoListContainer.replaceChildren(...numberOfListCreated);

    // displaying the items left count in All todo list filter
    let newItemsLeftCount = numberOfListCreated.length - completedTodoLists.length;

    if(newItemsLeftCount == 1) {
        listCount.textContent = `${newItemsLeftCount} item left`;
    } else {
        listCount.textContent = `${newItemsLeftCount} items left`;
    }

    // console.log(numberOfListCreated);
    // console.log(completedTodoLists);
    // console.log(unCompletedTodoLists);
}

// filtering out and diplaying the lists in Active todo list filter that are unchecked
function selectActiveList() {
    // removing any todo list that was dsiplayed on the webpage
    while(todoListContainer.hasChildNodes()) {
        todoListContainer.removeChild(todoListContainer.firstChild);
    }

    // displaying the Active tasks on the webpage
    for(let i = 0; i < unCompletedTodoLists.length; i++) {
        todoListContainer.appendChild(unCompletedTodoLists[i]);

        // adding a function to the onclick attribute that will remove the checked tasks among the Active tasks from the page
        unCompletedTodoLists[i].firstChild.firstChild.setAttribute('onclick', unCompletedTodoLists[i].firstChild.firstChild.getAttribute('onclick') + '; removeCheckedLists(event)')
    }
    // console.log(unCompletedTodoLists)

    // displaying the items left count in Completed todo list filter
    if(unCompletedTodoLists.length == 1) {
        listCount.textContent = `${unCompletedTodoLists.length} item left`;
    } else {
        listCount.textContent = `${unCompletedTodoLists.length} items left`;
    }
}

// removing any CHECKED tasks displayed on the webpage from Active todo list filter 
function removeCheckedLists(event) {
    // A condition that removes a task from Active tasks if a checkbox was checked
    if(event.target.classList.contains('checked')) {
        // removing the onclick attribute from checkbox
        event.target.removeAttribute('onclick');

        // removing the checked task from Active tasks
        event.target.parentElement.parentElement.remove();

        // resetting the onclick attribute to call only two functions
        event.target.setAttribute('onclick', 'isChecked(event); isnNotChecked(event)');
    }
    // console.log(unCompletedTodoLists);
    // console.log(completedTodoLists);
    // console.log(numberOfListCreated);

    // updating the items left count in Active todo list filter when a task is checked
    if(unCompletedTodoLists.length == 1) {
        listCount.textContent = `${unCompletedTodoLists.length} item left`;
    } else {
        listCount.textContent = `${unCompletedTodoLists.length} items left`;
    }
}

// filtering out and displaying the lists that are checked and completed
function selectCompletedList() {
    while(todoListContainer.hasChildNodes()) {
        todoListContainer.removeChild(todoListContainer.firstChild)
    }

    for(let i = 0; i < completedTodoLists.length; i++) {
        todoListContainer.appendChild(completedTodoLists[i]);

        // adding a function to the onclick attribute that will remove the unchecked task among the Completed tasks from the page 
        completedTodoLists[i].firstChild.firstChild.setAttribute('onclick', completedTodoLists[i].firstChild.firstChild.getAttribute('onclick') + '; removeUncheckedLists(event)');
    }
    // console.log(unCompletedTodoLists);
    // console.log(completedTodoLists);

    // displaying the items left count in Completed todo list filter
    if(completedTodoLists.length == 1) {
        listCount.textContent = `${completedTodoLists.length} item left`;
    } else { 
        listCount.textContent = `${completedTodoLists.length} items left`;
    }

    // sets the items left count to 0 items when Clear Completed button is clicked in Complated tasks filter
    let clearCompletedBtn = document.querySelector('.clear-completed-btn p');
    clearCompletedBtn.addEventListener('click', function() {
        listCount.textContent = `0 items left`;
    })
}

// removing any UNCHECKED tasks displayed on the webpage from Completed todo list filter
function removeUncheckedLists(event) {
    console.log(event.target)
    // A condition that instantly removes a task from Completed tasks if a task was unchecked
    if(!event.target.parentElement.classList.contains('checked')) {
        // removing the onclick attribute from checkbox
        event.target.parentElement.removeAttribute('onclick');

        // removing the unchecked task from Completed tasks
        event.target.parentElement.parentElement.parentElement.remove();

        // resetting the onclick attribute to call only two functions
        event.target.parentElement.setAttribute('onclick', 'isChecked(event); isnNotChecked(event)');
    }
    // console.log(unCompletedTodoLists);
    // console.log(numberOfListCreated)
    
    // updating the items left count in Completed todo list filter when a task is unchecked
    if(completedTodoLists.length == 1) {
        listCount.textContent = `${completedTodoLists.length} item left`;
    } else {
        listCount.textContent = `${completedTodoLists.length} items left`;
    }
}

// getting the items left element 
let listCount = document.querySelector('.todo-count');

function itemsLeftCount(count) {
    if(count === 1) {
        listCount.textContent = `${count} item left`;
    } else {
        listCount.textContent = `${count} items left`;
    }
}

