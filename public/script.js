console.log('Hi');

const form = document.getElementById('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // console.log(e);
  const name = e.target[0].value;
  const phone = e.target[1].value;
  const street = e.target[2].value;
  const zipcode = e.target[3].value;
  const amount = e.target[4].value;
  const email = e.target[5].value;

  const data = {
    name,
    phone,
    street,
    zipcode,
    amount,
    email,
  };

  $.post({
    url: 'http://localhost:8080/register', 
    data: JSON.stringify(data), 
    success: (res) => {
      if(res.success){
        animate();
        form.reset();
        Materialize.updateTextFields();

        setTimeout(() => animateBack(), 4000);
      }else{
        $(".success i.material-icons")
          .removeClass("green-text")
          .addClass("red-text")
          .html("close");
        $(".success p")
          .removeClass("green-text")
          .addClass("red-text")
          .html("Mislukt, probeer het nog een keer.")
        animate();

        setTimeout(() => animateBack(), 4000);
      }
    },
    contentType: 'application/json',
  });

});

function animate(){
  $(".right").css("overflow", "hidden")
  $("#form").animate({
    "marginLeft": "-400px",
    "opacity": "0"
  }, 800);
  setTimeout(() => {
    $(".success").css("z-index", "0").animate({
      "opacity": "1"
    }, 800);
  }, 500);
  
}

function animateBack(){
  $("#form").animate({
    "marginLeft": "0"
  }, 1000);
  $("#form").animate({
    "opacity": "1"
  }, 1000);
  $(".success").animate({
    "opacity": "0",
    "z-index": "-1"
  });
}


