function setEnglish(){
    let presentationText = document.getElementById("presentationText");
    presentationText.innerHTML = "Currently studying computer science at Grenoble University, I am looking for an apprenticeship from September 2023 through my 3rd year of university."

    let competencesLink = document.getElementById("competencesLink");
    competencesLink.innerHTML = "Skills";

    let experiencesLink = document.getElementById("projectsLink");
    experiencesLink.innerHTML = "Projects";

    let competencesTitle = document.getElementById("competencesTitle");
    competencesTitle.innerHTML = "My skills";

    let environment = document.getElementById("environment");
    environment.innerHTML = "Environment";

    let projectsTitle = document.getElementById("projectsTitle");
    projectsTitle.innerHTML = "My projects";

    let title1 = document.getElementById("title1");
    title1.innerHTML = "Table booking system for a restaurant";

    let desc1 = document.getElementById("desc1");
    desc1.innerHTML = "Project made during summer 2022 for a restaurant. Internal managment of table bookings, the program can be reached from the reception computer, but also from waiters' tablets. Data are synced in real time between all devices and stored in a database.";

    let technos = document.querySelectorAll(".usedTechno");
    technos.forEach(e => {
        e.innerHTML = "Used technologies : ";
    });

    let backend1 = document.getElementById("backend1");
    backend1.innerHTML =' Back-end : <span class="medium">Express</span> server for communication between database and gui. Database stored with .db format and managed via <span class="medium">SQL</span> requests.';

    let title2 = document.getElementById("title2");
    title2.innerHTML = "Mobile app for ev managing";

    closeMenu();

}

document.querySelector(".hamburguer").addEventListener("click", function(){
	document.querySelector(".topMenu").classList.toggle("active");
	document.querySelector(".hamburguer").classList.toggle("close-hamburguer");
});

function closeMenu(){
    document.querySelector(".topMenu").classList.remove("active");
    document.querySelector(".hamburguer").classList.remove("close-hamburguer");
}

window.addEventListener('load', () => {
    //let middlePart = document.querySelector(".middlePart").classList.add("Loaded");
})