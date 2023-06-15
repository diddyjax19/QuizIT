let user_name = sessionStorage.getItem("name");
user_name = sanitizeInput(user_name);

let user_points = sessionStorage.getItem("points");
user_points = sanitizeInput(user_points);

if (!isValidName(user_name)) {
    // alert("Invalid name. Please enter a valid Username.");
    window.location.href = "index.html";
}


document.querySelector("span.name").innerHTML = user_name;
document.querySelector("span.points").innerHTML = user_points;




function sanitizeInput(input) {
    
    return input.replace(/<[^>]*>/g, "");
}


function isValidName(name) {
 
    return /^[a-zA-Z]{3,20}$/.test(name);
}


