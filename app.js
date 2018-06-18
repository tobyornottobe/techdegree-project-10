document.addEventListener("DOMContentLoaded", function(event) {

let employees = [];
let currentTarget = '';



  $('.main-container').html('');
  $.ajax({
    url: 'https://randomuser.me/api/?results=15&inc=picture,name,email,location,phone,dob',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      let dr = data.results;

      var employeeHTML = '';
      if (data.results.length > 0) {

        //$.each(array, function(index,value) {};)
        $.each(data.results,function(i, dr) {

          employeeHTML += '<a class="employee-card-a" href="#employees'+i+'" data-caption="'+dr.name.first+dr.name.last+'" rel="modal:open">'
          employeeHTML += '<div class="employee-card">'
          employeeHTML +=   '<div class="employee-card-left">'
          employeeHTML +=     '<img src="'+dr.picture.large+'" alt="'+dr.name.first+'">'
          employeeHTML +=   '</div>'
          employeeHTML +=   '<div class="employee-card-right">'
          employeeHTML +=     '<h2>'+dr.name.first+' '+dr.name.last+'</h2>'
          employeeHTML +=     '<p class="lowercase">'+dr.email+'</p>'
          employeeHTML +=     '<p>'+dr.location.city+'</p>'
          employeeHTML +=   '</div>'
          employeeHTML += '</div></a>'
          employeeHTML += '<div id="employees'+i+'" class="modal">'


         modal(employees[i], i);

          employeeHTML += '</div>'

          $('.main-container').html(employeeHTML);
        }); // end each

        var modalHTML = '';

        function modal(target, i) {
          currentTarget = data.results.indexOf(target);
          modalHTML += '<div class="modal-style">'
//          employeeHTML += '<input id="slide-'+i+'-trigger" type="radio" name="slides">'
  //        employeeHTML += '<section class="slide slide-'+i+'">'
          modalHTML += '<img src="'+target.picture.large+'" alt="'+target.name.first+'" class="modal-pic">'
          modalHTML += '<h2 >'+target.name.first+' '+target.name.last+'</h2>'
          modalHTML += '<p class="lowercase">'+target.email+'</p>'
          modalHTML += '<p>'+target.location.city+'</p>'
          modalHTML += '<hr>'
          modalHTML += '<p>'+target.phone+'</p>'
          modalHTML += '<p>'+target.location.street+', '+target.location.state+' '+target.location.postcode+'</p>'
          modalHTML += '<div class="dob-middle"><p class="dob">'+'Birthday: '+target.dob+'</p></div>'
          modalHTML += '<div class="modal-nav">'
          modalHTML += '<button id="prev">previous</button>'
          modalHTML += '<button id="next">next</button>'
          modalHTML += '</div>'
          modalHTML += '</div>'

          $('#employees'+i+'').html(modalHTML);


          $("#next").click(function() {
              modal(currentTarget[i + 1], i + 1);
          });

          $("#prev").click(function() {
               modal(currentTarget[i - 1], i - 1);
          });



            //      employeeHTML += '<i data-feather="chevron-left" id="prev"></i>'
            //      employeeHTML += '<i data-feather="chevron-right" id="next"></i>'
              //      employeeHTML += '</section>'
        }




    }



  }




  }); // end ajax




$( "#search" ).keyup(function() {
    var userInput = $(this).val().toLowerCase();

    $('.employee-card-a').each(function(){

        if ($(this).filter('[data-caption *= ' + userInput + ']').length > 0 || userInput.length < 1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
  });




}); //end DOM
