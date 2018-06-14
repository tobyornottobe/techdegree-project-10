document.addEventListener("DOMContentLoaded", function(event) {

let employees = [];

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

          modal(data.results[i], i);

          employeeHTML += '</div>'

          $('.main-container').html(employeeHTML);
        }); // end each




        function modal(drm, i) {
          employeeHTML += '<div class="modal-style">'
//          employeeHTML += '<input id="slide-'+i+'-trigger" type="radio" name="slides">'
  //        employeeHTML += '<section class="slide slide-'+i+'">'
          employeeHTML += '<img src="'+drm.picture.large+'" alt="'+drm.name.first+'" class="modal-pic">'
          employeeHTML += '<h2 >'+drm.name.first+' '+drm.name.last+'</h2>'
          employeeHTML += '<p class="lowercase">'+drm.email+'</p>'
          employeeHTML += '<p>'+drm.location.city+'</p>'
          employeeHTML += '<hr>'
          employeeHTML += '<p>'+drm.phone+'</p>'
          employeeHTML += '<p>'+drm.location.street+', '+drm.location.state+' '+drm.location.postcode+'</p>'
          employeeHTML += '<div class="dob-middle"><p class="dob">'+'Birthday: '+drm.dob+'</p></div>'
          employeeHTML += '<div class="modal-nav">'
          employeeHTML += '<button id="prev">previous</button>'
          employeeHTML += '<button id="next">next</button>'
          employeeHTML += '</div>'
          employeeHTML += '</div>'



          $(document).on('click ', '#prev', function(e) {
            if (i === 0) {
                return modal(dr[dr.length - 1]);
            }
                return modal(data.results[i - 1]);
            });  // End

          $(document).on('click ', '#next', function(e) {
              if (i === dr.length - 1) {
                return modal(data.results[0]);
            }
                return modal(data.results[i+ 1]);
        }); // End



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
