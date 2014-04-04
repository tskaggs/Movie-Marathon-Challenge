$( document ).ready(function() { 
  $('.searchRotten').click(function() {
    $('.rottenmovies').empty();
    var movie = $(this).parent().find('input').val();
    searchTomatoes(movie);
  });

  function searchTomatoes(rottenmovie) {
      var data = {movie: rottenmovie}
      $.ajax({
          type: "POST",
          url: "/home/rottensearch",
          data: data,

          success: function(data) {
              $('span.moviecount').text(data.total);
              $.each(data.movies, function(i, o) {
                $('.rottenmovies').append(
                  '<li>'+
                  '<img class="poster" src="'+o.posters.profile +'" />'+
                  'Title: '+o.title +
                  '<br/>Year: '+o.year +
                  '<br/>Runtime: '+o.runtime +
                  '<br /><input id="checkbox2" type="checkbox" name="movie" value="' +o.title + '"><label for="checkbox2">Select</label>'+
                  '</li>');
              });
          }
      });
  }
});