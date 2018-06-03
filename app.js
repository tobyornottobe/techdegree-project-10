document.addEventListener("DOMContentLoaded", function(event) {

  $('.main-container').html('');
  $.ajax({
    url: 'https://randomuser.me/api/?results=15&inc=picture,name,email,location,phone,dob',
    dataType: 'json',
    success: function(data) {
      console.log(data);

      var employeeHTML = '';
      if (data.results.length > 0) {
        //$.each(array, function(index,value) {};)
        $.each(data.results,function(i, results) {
          employeeHTML += '<a class="employee-card-a" href="#ex1" rel="modal:open">'
          employeeHTML += '<div class="employee-card">'
          employeeHTML +=   '<div class="employee-card-left">'
          employeeHTML +=     '<img src="'+data.results[i].picture.large+'" alt="'+data.results[i].name.first+'">'
          employeeHTML +=   '</div>'
          employeeHTML +=   '<div class="employee-card-right">'
          employeeHTML +=     '<h2>'+data.results[i].name.first+' '+data.results[i].name.last+'</h2>'
          employeeHTML +=     '<p class="lowercase">'+data.results[i].email+'</p>'
          employeeHTML +=     '<p>'+data.results[i].location.city+'</p>'
          employeeHTML +=   '</div>'
          employeeHTML += '</div></a>'
          employeeHTML += '<div id="ex1" class="modal">'
          employeeHTML += '<div class="modal-style">'
          employeeHTML += '<img src="'+data.results[i].picture.large+'" alt="'+data.results[i].name.first+'" class="modal-pic">'
          employeeHTML += '<h2>'+data.results[i].name.first+' '+data.results[i].name.last+'</h2>'
          employeeHTML += '<p class="lowercase">'+data.results[i].email+'</p>'
          employeeHTML += '<p>'+data.results[i].location.city+'</p>'
          employeeHTML += '<hr>'
          employeeHTML += '<p>'+data.results[i].phone+'</p>'
          employeeHTML += '<p>'+data.results[i].location.street+', '+data.results[i].location.state+' '+data.results[i].location.postcode+'</p>'
          employeeHTML += '<div class="dob-middle"><p class="dob">'+'Birthday: '+data.results[i].dob+'</p></div>'
          employeeHTML += '<a href="#ex1" rel="modal:close"></a>'
          employeeHTML += '</div>'
          employeeHTML += '</div>'
          $('.main-container').html(employeeHTML);
        }); // end each
    }
  }

  }); // end ajax



}); //end DOM
