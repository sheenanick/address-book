var holder = [];

// Business Logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address (street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.addressType = type;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street+ ", " + this.city + ", " + this.state;
}

// UI Logic
$(document).ready(function() {
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">'+
                                 '<label for="address-type">Type</label>' +
                                   '<select class="form-control" id="address-type">'+
                                     '<option>Home</option>'+
                                     '<option>Work</option>'+
                                     '<option>Other</option>'+
                                   '</select>'+
                                 '</div>'+
                               '</div>');
  });
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedType = $(this).find("#address-type").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>");

    holder.push(newContact);

    // $("input#new-first-name").val("");
    // $("input#new-last-name").val("");
    $("#contacts").last().click(function() {
      $(".show-contact").show();
      $(".show-contact h2").text(newContact.fullName());
      $("#first-name").text(newContact.firstName);
      $("#last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(Address) {
      $("ul#addresses").append("<li>" + Address.fullAddress() + "</li>" + "(" + Address.addressType + ")");
      });
      debugger;
    });

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

  });
});
