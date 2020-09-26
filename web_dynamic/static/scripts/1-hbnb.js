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
