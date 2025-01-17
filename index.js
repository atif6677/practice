function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    };
    axios.post("https://crudcrud.com/api/26c6ebe19efb4466afcb43ff0377b417/appointmentData", userDetails)
    
        .then((respone) => {
            displayUserOnScreen(respone.data)
            console.log(respone);
        })
        .catch((error) => { console.log(error) });

    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
}

window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("https://crudcrud.com/api/26c6ebe19efb4466afcb43ff0377b417/appointmentData")
    .then((responce)=>{
        console.log(responce)
        for(var i=0; i<responce.data.length; i++){
            displayUserOnScreen(responce.data[i])
        }
    })
    .catch((rez)=>{console.log(rez)})
    
})


function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
        document.createTextNode(
            `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);

    const userList = document.querySelector("ul");
    userList.appendChild(userItem);

    deleteBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
    });

    editBtn.addEventListener("click", function (event) {
        userList.removeChild(event.target.parentElement);
        localStorage.removeItem(userDetails.email);
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
    });
}


