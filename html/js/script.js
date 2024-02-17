

// $(document).ready(function () {


//     $(window).scroll(function () {
//         var scroll = $(window).scrollTop();
//         if (scroll > 10) {
//             if (!$(".navbar").hasClass("header_scrolling")) {
//                 $(".navbar").addClass("header_scrolling");
//                 $(".burger").addClass("header_scrolling");
//             }
//             $(".burger").css("top", "10px");
//             $(".navbar").css("height", "50px");
//             $(".logoImg").attr('src', 'img/logoCompletBlack.png');
//             var metaThemeColor = document.querySelector("meta[name=theme-color]").setAttribute("content", "#FFFFFF");
//         } else {
//             if ($(".navbar").hasClass("header_scrolling")) {
//                 $(".navbar").removeClass("header_scrolling");
//                 $(".burger").removeClass("header_scrolling");
//             }
//             $(".navbar").css("height", "80px");
//             $(".burger").css("top", "25px");
//             $(".logoImg").attr('src', 'img/logoCompletWhite.png');
//             var metaThemeColor = document.querySelector("meta[name=theme-color]");
//             metaThemeColor.setAttribute("content", "#192341");
//         }
//     });



// });

function expandMenu() {
    document.querySelector('nav').querySelector('.burger-wrapper').querySelector('.burger').classList.toggle('menuOpen');
    document.querySelector('nav').querySelector('.navItems').classList.toggle('menuOpen');
    document.querySelector('body').classList.toggle('menuOpen');

}


function setUpCarousel(carousel) {


    const previousButton = carousel.querySelector('[data-carousel-previous-button]');
    const nextButton = carousel.querySelector('[data-carousel-next-button]');
    const slides = carousel.querySelector('[data-carousel-slides]');

    let currentSlide = 0;
    const numSlides = slides.children.length;

    function handleNext() {
        currentSlide += 1;
        if (currentSlide >= numSlides) {
            currentSlide = 0;
        }
        changeSlide(currentSlide);
    }

    function handlePrevious() {
        currentSlide -= 1;
        if (currentSlide < 0) {
            currentSlide = numSlides - 1;
        }
        changeSlide(currentSlide);
    }

    function changeSlide(slideNumber) {
        carousel.style.setProperty('--current-slide', slideNumber);
    }

    previousButton.addEventListener('click', handlePrevious);
    nextButton.addEventListener('click', handleNext);
}

window.onload = function () {
    const carousels = document.querySelector('[data-carousel]');
    setUpCarousel(carousels);
    console.log('La page est complètement chargée');
};

function AjaxCallWithPromise(nom, email, sujet, message) {
    return new Promise(function (resolve, reject) {
        const objXMLHttpRequest = new XMLHttpRequest();

        objXMLHttpRequest.onreadystatechange = function () {
            if (objXMLHttpRequest.readyState === 4) {
                if (objXMLHttpRequest.status == 200) {
                    resolve(objXMLHttpRequest.responseText);
                } else {
                    reject('Error Code: ' + objXMLHttpRequest.status + ' Error Message: ' + objXMLHttpRequest.statusText);
                }
            }
        }



        objXMLHttpRequest.open('GET', "php/sendMail.php?nom=" + nom + "&email=" + email + "&sujet=" + sujet + "&message=" + message);
        objXMLHttpRequest.send();
    });
}

$(document).ready(function () {
    $("#login-box-submit-button").click(function () {

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        const sujet = document.getElementById("sujet").value;
        let message = document.getElementById("message").value;;
        message = encodeURIComponent(message);
        let canBeSent = true;
        if (nom == "") {
            canBeSent = false;
            $("#errorNom").css("display", "block");
        } else {
            $("#errorNom").css("display", "none");
        }
        if (email == "") {
            canBeSent = false;
            $("#errorEmail").css("display", "block");
        } else {
            if(validateEmail(email)){
                $("#errorEmail").css("display", "none");
            }
            else{
                canBeSent = false;
            $("#errorEmail").css("display", "block");
            }
        }
        if (sujet == "") {
            canBeSent = false;
            $("#errorSujet").css("display", "block");
        } else {
            $("#errorSujet").css("display", "none");
        }
        if (message == "") {
            canBeSent = false;
            $("#errorMessage").css("display", "block");
        } else {
            $("#errorMessage").css("display", "none");
        }

        if (canBeSent) {
            let notif = $("#messageNotif");
            notif.css("transform", "translateX(0)");
            AjaxCallWithPromise(nom, email, sujet, message).then(
                data => {
                    if (data == "error") {
                        $("#messageNotif").css("background-color", "red");
                        $("#messageNotif").css("color", "white");
                        document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-times"></i>Erreur lors de l\'envoi</div>';
                        setTimeout(function () {
                            $('#messageNotif').css("transform", "translateX(120%)");
                            $("#messageNotif").css("background-color", "lightgray");
                            $("#messageNotif").css("color", "black");
                            document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-info-circle"></i>Envoi du message en cours</div>';
                        }, 5000);
                    } else {
                        $("#messageNotif").css("background-color", "lightgreen");
                        $("#messageNotif").css("color", "white");
                        document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-check"></i>Message envoyé</div>';
                        document.getElementById("nom").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("sujet").value = "";
                        document.getElementById("message").value = "";
                        setTimeout(function () {
                            $('#messageNotif').css("transform", "translateX(120%)");
                            $("#messageNotif").css("background-color", "lightgray");
                            $("#messageNotif").css("color", "black");
                            document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-info-circle"></i>Envoi du message en cours</div>';
                        }, 5000);
                    }
                },
                error => {
                    $("#messageNotif").css("background-color", "red");
                    $("#messageNotif").css("color", "white");
                    document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-times"></i>Erreur lors de l\'envoi</div>';
                    setTimeout(function () {
                        $('#messageNotif').css("transform", "translateX(120%)");
                        $("#messageNotif").css("background-color", "lightgray");
                        $("#messageNotif").css("color", "black");
                        document.getElementById('messageNotif').innerHTML = '<div class="notifContent"><i class="fas fa-info-circle"></i>Envoi du message en cours</div>';
                    }, 5000);
                }
            );
        }
    });
});

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

