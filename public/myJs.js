// All Views are controlled from here

//========== Global Variables ============
var value = '', array = [], index = 0, span = '', newArray = [];
//============== End ===============

// node's Constructor
function Node(element, next) {
    this.element = element;
    this.next = next;
}


//========== Main Functions ==============

// create new array
function create(){
    var arraySize = parseInt(document.getElementById('arraySize').value);
    if(arraySize) {
        for(var i=0; i<arraySize; i++){
            array[i] = new Node(null, null);
        }
        for(var j=0; j<arraySize-1; j++){
            array[j].element = Math.round(Math.random() * 10);
            array[j].next = array[j+1];
        }
        //console.log('node'+ (arraySize));
        array[arraySize-1].element = Math.round(Math.random() * 10);
        setArray(array);
        arrayStatus(true, 'Linked List created:');
    }
}

// show Linked List status
function arrayStatus(clearFirst, action) {
    array = getArray();
    if (clearFirst) {
        var div = document.getElementById('showArray');
        div.innerHTML = '';
    }
    if (array && array.length) {
        createElements('P', action, 'showArray');
        createElements('SPAN', '[ Head ] --> [  ' + array[0].element + '] --> ', 'showArray');
        for (var i = 1; i < array.length - 1; i++) {
            createElements('SPAN', '[' + array[i].element + '] --> ', 'showArray');
        }
        createElements('SPAN', '[' + array[array.length - 1].element + '] --> null', 'showArray');
    }
}

// insert Element At Last index of Linked List
function addAtLast() {
    value = document.getElementById('element').value;
    array = getArray();
    if(!array.length){
        alert('Linked List is empty..')
    }
    else {
        array.push(new Node(value, null));
        setArray(array);
        arrayStatus(true);
    }
}

// delete Element from Linked List
function deleteElement(){
    value = document.getElementById('element').value;
    array = getArray();
    if(array.length) {
        array.forEach(function (node, idx) {
            if(value == node.element) {
                index = idx;
            }
        });
        if(index !== -1){
            array.splice(index, 1);
            setArray(array);
            arrayStatus(true);
        }
    }
    else {
        alert('Linked List is empty..')
    }
}

// update Element in Linked List
function updateElement(){
    value = document.getElementById('element').value;
    var newElement = document.getElementById('newElement').value;
    array = getArray();
    if(array.length) {
        array.forEach(function (node, idx) {
            if (value === node.element) {
                index = idx;
            }
        });
        if (index !== -1) {
            array.splice(index, 1, newElement);
            setArray(array);
            arrayStatus();
        }
    }
    else {
        alert('Linked List is empty..')
    }
}

// search Element in Linked List
function searchElement(){
    array = getArray();
    value = document.getElementById('element').value;
    index = array.indexOf(value);
    span = document.getElementById('searchResult');
    if(index != -1){
        span.innerHTML = 'Search Result: ' +value + ' found at index ' + index + ' of the Linked List';
        span.style.color = 'green';
    }
    else {
        span.innerHTML = 'Search Result: ' +value + ' not found in the Linked List';
        span.style.color = 'red';
    }
}

// insertBefore
function insertNodeBefore(){
    value = document.getElementById('element').value;
    var newElement = document.getElementById('newElement').value;

    array = getArray();
    if(array.length){
        array.forEach(function (node, idx) {
            if (value == node.element) {
                index = idx;
            }
        });
        if (index !== -1) {
            array.splice(index, 0, new Node(newElement, array[index + 1]));
            setArray(array);
            arrayStatus(true, 'Linked List: ');
        }
    }
    else {
        alert('Linked List is empty..');
    }
}

// insertAfter
function insertAfter(){
    value = document.getElementById('element').value;
    var newElement = document.getElementById('newElement').value;

    array = getArray();
    if(array.length){
        array.forEach(function (node, idx) {
            if (value == node.element) {
                index = idx;
            }
        });
        if (index !== -1) {
            array.splice(index + 1, 0, new Node(newElement, array[index + 1]));
            setArray(array);
            arrayStatus(true, 'Linked List: ');
        }
    }
    else {
        alert('Linked List is empty..');
    }
}

// addAtFirst
function addAtFirst(){
    value = document.getElementById('element').value;
    array = getArray();
    //newArray = checkLogicalSizeOfArray(array);
    //if(newArray.length == array.length){
    //    alert('Linked List is full!')
    //}
    //else
    if(!array.length){
        alert('Linked List is empty..')
    }
    else {
        array.unshift(new Node(value, null));
        setArray(array);
        arrayStatus(true);
    }
}

//============== End ===============

//========== Helper Functions ==========

// check Linked List Existence
function checkArrayExistence(){
    array = getArray();
    if(array && array.length){
        alert('An Linked List is already exist in DB');
        alert('click Update to update existing one..');
        arrayStatus();
    }
    else {
        alert('No Linked List exists in DB, Create a new One..');
    }
}
// set Linked List in Local Storage
function setArray(array){
    localStorage.setItem('list', JSON.stringify(array));
}

// get Linked List from local Storage
function getArray(){
    return JSON.parse(localStorage.getItem('list')) || [];
}

// check Logical size of array
function checkLogicalSizeOfArray(array){
    return array.filter(function(node){
        return node.element;
    });
}

function createElements(elementName, innerText, parentId){
    var node = document.createElement(elementName);
    var textNode = document.createTextNode(innerText);
    node.appendChild(textNode);
    document.getElementById(parentId).appendChild(node);
}

//============== End ===============