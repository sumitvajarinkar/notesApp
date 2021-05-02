// console.log('Welcome to app.js')
showNotes();

//If user add notes, add it to local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})

// FUnction to show elements from localstorage

function showNotes(){
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
       html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">- Remove Note</button>
            </div>
          </div>` 
    });
    let notesElem = document.getElementById('notes')
    //if notes contain note
    if(notesObj.length != 0){
        notesElem.innerHTML = html;
    }  
    //if notes doesn't contain note
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
      }
}

//Function to delete a note

function deleteNote(index){
    // console.log('Note delete',index)
    let notes = localStorage.getItem('notes');
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}

//searching option

let searchTxt = document.getElementById('searchTxt')
searchTxt.addEventListener('input',function(){

    let inputVal = searchTxt.value;
    // console.log('Input event fired !',inputVal)
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }else{
            element.style.display = 'none';
        }
        // console.log(cardTxt)
    })
})