document.addEventListener("DOMContentLoaded", function(event) {

let employee = [];
let currentTarget = '';



  $('.main-container').html('');
  $.ajax({
    url: 'https://randomuser.me/api/?results=15&inc=picture,name,email,location,phone,dob',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      let dr = data.results;

//main employee overview

      var employeeHTML = '';
      if (data.results.length > 0) {

        $.each(data.results,function(i, dr) {

          employeeHTML += '<a class="employee-card-a" data-key="'+i+'" data-caption="'+dr.name.first+dr.name.last+'" >'
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
          employeeHTML += '<div id="employees'+i+'">'
          employeeHTML += '</div>'

          $('.main-container').html(employeeHTML);
        }); // end each

        var modalHTML = '';

//employee modal view

        function modal(target, i) {

          currentTarget = data.results.indexOf(target);
          modalHTML += '<div class="modal-style">'
          modalHTML += '<img src="'+target.picture.large+'" alt="'+target.name.first+'" class="modal-pic">'
          modalHTML += '<h2>'+target.name.first+' '+target.name.last+'</h2>'
          modalHTML += '<p class="lowercase">'+target.email+'</p>'
          modalHTML += '<p>'+target.location.city+'</p>'
          modalHTML += '<hr>'
          modalHTML += '<p>'+target.phone+'</p>'
          modalHTML += '<p>'+target.location.street+', '+target.location.state+' '+target.location.postcode+'</p>'
          modalHTML += '<div class="dob-middle"><p class="dob">'+'Birthday: '+new Date(target.dob.date).toLocaleDateString()+'</p></div>'
          modalHTML += '<div class="modal-nav">'
          modalHTML += '<button id="prev">previous</button>'
          modalHTML += '<button id="next">next</button>'
          modalHTML += '</div>'
          modalHTML += '</div>'

          $('.modal').html(modalHTML).modal();
          modalHTML = "";

//previous and next buttons

          $("#next").click(function() {
            modalHTML = "";
            modal(dr[currentTarget + 1]);
          });

          $("#prev").click(function() {
            modalHTML = "";
            modal(dr[currentTarget - 1]);
          });

          if (currentTarget === 0) {
            $("#prev").addClass('disabled');
          } else {
            $("#prev").remove('disabled');
          }

          if (currentTarget === 14) {
            $("#next").addClass('disabled');
          } else {
            $("#next").remove('disabled');
          }


        } // End of modal function

//event listener

        const employeeCards = document.querySelectorAll('.employee-card');

        employeeCards.forEach( employee => {
          employee.addEventListener('click', () => {
            modal(dr[employee.parentNode.getAttribute('data-key')]);

          });
        });




/*

*/
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
