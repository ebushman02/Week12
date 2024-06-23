class Person {
    constructor(name) {
        this.name = name;
    }
}

class Service {
    static url = 'https://6674cbeb75872d0e0a978d1e.mockapi.io/FavoriteAnimal';

    static getAllPersons() {
        return $.get(this.url);
    }

    static getPerson(id) {
        return $.get(this.url + `/${id}`);
    }

    static createPerson(name) {
        return $.post(this.url, { name });
    }

    static updatePerson(id) {
        return $.ajax({
            url: `${this.url}/${id}`, // Form the complete URL
            type: 'PUT', // Use 'method' instead of 'type'
            data: JSON.stringify({ name: newName }), // Send updated data
            contentType: 'application/json',
            crossDomain: true,
            
        })
        .then(() => Service.getAllPersons()) // Fetch all persons after successful update
        .then(persons => DOMManager.render(persons)) // Update UI
        .catch(error => console.error('Error updating person:', error));
    }


    static deletePerson(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE',
        });
    }
}

class DOMManager {
    static persons;

    static getAllPersons() {
        Service.getAllPersons().then(persons => this.render(persons));
    }

    

    static createPerson(name) {
        Service.createPerson(name)
            .then(() => Service.getAllPersons())
            .then(persons => this.render(persons))
            .catch(error => console.error('Error creating person:', error));
    }

    static deletePerson(id) {
        console.log('Deleting person with ID:', id);
        Service.deletePerson(id)
            .then(() => Service.getAllPersons())
            .then(persons => this.render(persons))
            .catch(error => console.error('Error deleting person:', error));
    }

    static render(persons) {
        this.persons = persons;
        $('#App').empty();
        for (let person of persons) {
            $('#App').append(
        `<br><br><div id="${person._id}" class="card">
                <div class="card-header">
                
                <h2> ${person.id}. ${person.name}</h2>
                <br>
                <div class="row">
                <div class="col-12">
               
                <button class="btn btn-danger" onclick="DOMManager.deletePerson('${person.id
                }')">Delete</button>   
                </div>
                </div>    
                <br> 
                </div>
            </div>`

            );
        
        }
    }
}

DOMManager.getAllPersons()

function is(id) {
    console.log(person)
    console.log(id)
}
function create(){
    DOMManager.createPerson($('#new-first-name').val());
    $('#new-first-name').val('');
}

let newName= "";
function update() {
    newName = document.getElementById('new-name').value;
    // Call your updatePerson function here with the new name
    // For example: updatePerson('person123', newName);

Service.updatePerson(document.getElementById('number').value);
$(`#new-name`).val('');
$(`#number`).val('');
}



  

