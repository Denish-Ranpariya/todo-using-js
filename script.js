let add = document.getElementById("add");
let clear = document.getElementById("clear");

add.addEventListener('click', () => {
    console.log("updating list....");
    let title = document.getElementById("title");
    let description = document.getElementById("description");

    if (title.value == "") {
        alert("Name must be filled!");
    } else if (description.value == "") {
        alert("Description must be filled!");
    } else {
        if (localStorage.getItem('itemJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([title.value, description.value]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
        } else {
            itemJsonArray = JSON.parse(localStorage.getItem('itemJson'));
            itemJsonArray.push([title.value, description.value]);
            localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
        }

        showList();
        title.value = "";
        description.value = "";
    }


});

let showList = () => {
    let tableBody = document.getElementById("table-body");

    let itemJsonArray = JSON.parse(localStorage.getItem('itemJson'));

    let str = "";

    if (itemJsonArray != null) {
        itemJsonArray.forEach((element, index) => {
            str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><Button class="btn btn-danger btn-sm" onClick="deleteItem(${index})">Delete</Button></td>
        </tr>
        `;
        });
    }
    tableBody.innerHTML = str;
};

window.addEventListener('load', showList);

let deleteItem = (itemIndex) => {
    // console.log("delete item at index: " + itemIndex);
    let itemJsonArray = JSON.parse(localStorage.getItem('itemJson'));

    itemJsonArray.splice(itemIndex, 1);

    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));

    showList();
};


clear.addEventListener('click', () => {
    if (confirm("Do you really want to clear the list?")) {
        localStorage.clear();
        showList();
    }
});
