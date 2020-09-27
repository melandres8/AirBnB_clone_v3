$(document).ready(() => {
  const amenities = {};
  const h4Amenity = $('.amenities h4');
  const checkbox = $('.amenities input');
  checkbox.css('margin-right', '10px');
  // this doesn't work with arrow functions
  $('li input[type="checkbox"]').change(function () {
    if ($(this).prop('checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
        delete amenities[$(this).data('id')];
    }
    h4Amenity.text(Object.values(amenities).join(', '));
  });
});

/* API status */
$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if ($(data.status === 'OK')) {
    $('DIV#api_status').addClass('available');
    $('DIV#api_status.available').css({ 'background-color': '#ff545f' });
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

/* Fetch places */
$.ajax({
  url: "http://0.0.0.0:5001/api/v1/places_search",
  type: 'POST',
  contentType: 'application/json',
  data: '{}',
  success: (data) => {
    const placesSection = $('SECTION.places')
    for (let i = 0; i < data.length; i++) {
      $.ajax({
        url: `http://0.0.0.0:5001/api/v1/users/${data[i].user_id}`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: (d) => {
          let userFirstName = d.first_name;
          let userLastName = d.last_name;
          let content = `<article><div class=\"title_box\"><h2>${data[i].name}</h2><div class=\"price_by_night\">${data[i].price_by_night}</div></div><div class=\"information\"><div class=\"max_guest\">${ data[i].max_guest} Guest</div><div class=\"number_rooms\">${data[i].number_rooms} Bedroom</div><div class=\"number_bathrooms\">${ data[i].number_bathrooms} Bathroom</div></div><div class=\"user\"><b>Owner: </b>${userFirstName} ${userLastName}</div><div class=\"description\">${data[i].description}</div></article>`;
          placesSection.append(content);
      }});
    }
  }
});
