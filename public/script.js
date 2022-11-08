// Api na koji se dodaju endpoints
const api = 'http://localhost:3000/api';

const dumpInputs = (inputs) => {
    inputs.forEach(element => {
        element.value = '';
    });
};

// Tabela za ispis svih podataka
const table = document.querySelector('#tableContent');
fetch(api + '/get-all')
    .then(res => res.json())
    .then(data => {
        data.map(student => {
            console.log(student);
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = student._id;
            cell2.innerHTML = student.index;
            cell3.innerHTML = student.name;
            cell4.innerHTML = student.surname;
        });
    });

// Ispis samo jednog studenta
const form1 = document.querySelector('#getOneForm').addEventListener('submit', (form) => {
    form.preventDefault();
    let id = document.querySelector('#getOneId').value;
    let table = document.querySelector('#getOneTable');
    table.innerHTML = '';
    fetch(api + '/get/' + id)
        .then(res => res.json())
        .then(data => {
            var row = table.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = data.index;
            cell2.innerHTML = data.name;
            cell3.innerHTML = data.surname;
        }).catch((error) => {
            alert(error);
        });
});

// Kreiranje studenata
const form2 = document.querySelector('#createForm').addEventListener('submit', (form) => {
    form.preventDefault();
    let inputs = document.querySelectorAll('#createForm input');
    let index = inputs[0].value;
    let name = inputs[1].value;
    let surname = inputs[2].value;

    let data = {
        index: index,
        name: name,
        surname: surname
    };
    fetch(api + '/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).catch((error) => {
        alert(error);
    });
});

// Update studenata
const form3 = document.querySelector('#updateForm');
form3.addEventListener('submit', (form) => {
    form.preventDefault();
    let inputs = document.querySelectorAll('#updateForm input');
    let index = inputs[0].value;
    let name = inputs[1].value;
    let surname = inputs[2].value;
    let id = inputs[3].value;

    let data = {};

    if (index !== '') { data = { ...data, index: index } };
    if (name !== '') { data = { ...data, name: name } };
    if (surname !== '') { data = { ...data, surname: surname } };

    console.log(data);
    fetch(api + '/update/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).catch((error) => {
        alert(error);
    });
});

// Delete Student
const form4 = document.querySelector('#deleteForm').addEventListener('submit', (form) => {
    form.preventDefault();
    let id = document.querySelector('#deleteOneId').value;
    console.log(id);
    fetch(api + '/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch((error) => {
        alert(error);
    });
})
