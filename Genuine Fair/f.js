//hamburger menu walla event
let menu = document.getElementById('btn');
let nav = document.getElementById('nav');
let extendednav = document.getElementById('extendednav');
let dis = 0;

let link=document.querySelectorAll('.link')

menu.addEventListener('click', () => {
    if (dis == 0) {
        nav.style.height = "192px";  // Expand nav
        extendednav.style.display = "block";  // Show extended content
        dis = 1;
    } else {
        nav.style.height = "120px";  // Collapse nav
        extendednav.style.display = "none";  // Hide extended content
        dis = 0;
    }
});


/*link.addEventListener('hover',()=>{
    link.style.background-color="white";
    link.style.color="black";

})*//* wrong reson is on <notes*/
let links = document.querySelectorAll('.link'); // Assuming you're selecting elements with the class 'link'

links.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.backgroundColor = "white"; // Correct camelCase for 'backgroundColor'
        link.style.color = "black";
    });

    // Optional: Reset styles when mouse leaves the element
    link.addEventListener('mouseout', () => {
        //link.style.backgroundColor = "none"; // Reset background color// not right use instead empty string
        link.style.backgroundColor = "";
        link.style.color = "white"; // Reset text color
    });
});

