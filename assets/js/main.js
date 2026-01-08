// ANIMACION RATON CABECERA
$(document).on("mousemove", function (e) {
  var cursor = $(".cursor");
  cursor.attr(
    "style",
    "top:" + (e.pageY - 15) + "px; left:" + (e.pageX - 15) + "px;"
  );
});

$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 80) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
  });
});

// MENU HAMBURGUESA

// AOS
$(document).ready(function () {
  AOS.init({
    duration: 1500,
  });
});

// VALIDACION DE FORMULARIO NEWSLETTER
$(document).ready(function () {
  const $form = $(".footer-form");
  const $inputs = $form.find("input");

  // Función para validar campos
  const validateField = ($input) => {
    const $errorField = $input.next(".error-message");
    let isValid = true;

    if ($input.attr("id") === "name" || $input.attr("id") === "surname") {
      const regex = /^[A-Za-z\s]{2,}$/;
      isValid = regex.test($input.val());
      $errorField.text(
        isValid
          ? ""
          : "Este campo debe contener al menos 2 letras y solo caracteres alfabéticos."
      );
    } else if ($input.attr("id") === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = regex.test($input.val());
      $errorField.text(
        isValid ? "" : "Por favor, introduce un correo electrónico válido."
      );
    }

    // Agregar clases de error o éxito
    $input.toggleClass("error", !isValid);
    $input.toggleClass("valid", isValid);

    return isValid;
  };

  // Generar mensajes de error para cada input
  $inputs.each(function () {
    const $input = $(this);
    $("<p>").addClass("error-message").insertAfter($input);
  });

  // Validar cada campo al escribir
  $inputs.on("input", function () {
    validateField($(this));
  });

  // Validar todo el formulario al enviar
  $form.on("submit", function (event) {
    event.preventDefault();
    let isFormValid = true;

    $inputs.each(function () {
      const $input = $(this);
      const isValid = validateField($input);
      if (!isValid) isFormValid = false;
    });

    if (isFormValid) {
      alert("¡Suscripción exitosa!");
      $form.trigger("reset");
      $inputs.removeClass("valid");
    } else {
      alert("Por favor, corrige los errores antes de enviar.");
    }
  });
});

// CARRUSEL

$(document).ready(function () {
  let currentIndex = 1;
  const slides = $(".slide");
  let slidesCont = $(".slides");
  let autoSlide;
  let dots = $(".dot");

  // función que mostrará el slide correspoondiente a un índice
  function showSlide(indexSlide) {
    let realIndex = indexSlide - 1;
    let percTranslateX = -realIndex * 100;
    slidesCont.css("transform", "translateX(" + percTranslateX + "%)");
    dots.removeClass("active").eq(realIndex).addClass("active");
  }

  // función para mostrar la anterior slide
  function prevSlide() {
    currentIndex = currentIndex - 1;
    // currentIndex-=1

    if (currentIndex < 1) {
      currentIndex = slides.length;
    }

    showSlide(currentIndex);
  }

  // función para mostrar la siguiente slide
  function nextSlide() {
    currentIndex = currentIndex + 1;
    // currentIndex +=2;

    if (currentIndex > slides.length) {
      currentIndex = 1;
    }

    showSlide(currentIndex);
  }

  // función para activar el slideshow automático
  // esta función propia va a usar a su vez una función built-in sertInterval()
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
  }

  // función para detener el slide automático
  // la llamaremos cuando el usuario interactue con el slideshow
  // clearInterval()
  function stopAutoslide() {
    clearInterval(autoSlide);
  }

  startAutoSlide();
});

// FLECHA HACIA ARRIBA

$(document).ready(function () {
  irArriba();
}); //Hacia arriba

function irArriba() {
  $(".ir-arriba").click(function () {
    $("body,html").animate({ scrollTop: "0px" }, 1000);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".ir-arriba").slideDown(600);
    } else {
      $(".ir-arriba").slideUp(600);
    }
  });
  $(".ir-abajo").click(function () {
    $("body,html").animate({ scrollTop: "1000px" }, 1000);
  });
}

// Año en footer
$(document).ready(function () {
  $("#year").text(new Date().getFullYear());
});
