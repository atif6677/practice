function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
    };
    axios.post(`https://crudcrud.com/api/55a3edc7949147e2842388c6819f8131/appointmentData`, userDetails)
    
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
    .get(`https://crudcrud.com/api/55a3edc7949147e2842388c6819f8131/appointmentData`)
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

        const userItem = event.target.parentElement; // Get the parent list item
        const userId = userDetails._id; // Assuming the API response includes an ID field named "_id"
    
        axios.delete(`https://crudcrud.com/api/55a3edc7949147e2842388c6819f8131/appointmentData/${userId}`)
          .then((response) => {
            console.log(response);
            userList.removeChild(userItem);
          })
          .catch((error) => console.log(error));
    });


    editBtn.addEventListener("click", function (event) {
        // Pre-fill the form fields with existing data
        document.getElementById("username").value = userDetails.username;
        document.getElementById("email").value = userDetails.email;
        document.getElementById("phone").value = userDetails.phone;
    
        // Remove the item from the UI
        const userItem = event.target.parentElement;
        userList.removeChild(userItem);
    
        // Ensure the user ID is available
        const userId = userDetails._id; // _id should exist in the API response
        if (!userId) {
            console.error("User ID (_id) is missing.");
            return;
        }
    
        // Update the form submission handler to handle the PUT request
        document.querySelector("form").onsubmit = function (event) {
            event.preventDefault(); // Prevent default form submission
    
            const updatedUserDetails = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
            };
    
            // Send the PUT request to update the user on the backend
            axios
                .put(
                    `https://crudcrud.com/api/55a3edc7949147e2842388c6819f8131/appointmentData/${userId}`,
                    updatedUserDetails
                )
                .then((response) => {
                    console.log("User updated successfully:", response.data);
                    displayUserOnScreen({ ...updatedUserDetails, _id: userId }); // Add the _id back to the updated data
                })
                .catch((error) => console.error("Error updating user:", error));
    
            // Clear the form fields and reset the form submission handler
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.querySelector("form").onsubmit = handleFormSubmit;
        };
    });
    
   
}


