let entryForm = document.getElementById('add-list');
let todoListContainer = document.getElementById('list');

function myFunc() {
    let entryFormValue = entryForm.querySelector('input[type="text"]').value;
    console.log(entryFormValue);

    // creating the todo list template
    let listField = document.createElement('div');      // list template container
    let checkBox = document.createElement('div');       // first child of the template
    let checkmark = document.createElement('img');      // child of the first child
    let inputField = document.createElement('div');     // second child of the template
    let listInput = document.createElement('input');    // child of the second child    

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

    // appending child elements to parent elements
    checkBox.appendChild(checkmark);
    listField.appendChild(checkBox)

    inputField.appendChild(listInput)
    listField.appendChild(inputField)
    console.log(listField);

    // displaying the todo list template on the page
    todoListContainer.appendChild(listField)

    document.getElementById('entry-text').value = '';
    return false;
}
