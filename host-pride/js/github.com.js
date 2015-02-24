// Gemfile linker: Adds rubygems.org links to each `gem` entry in a Gemfile
// ------------------------------------------------------------------------------

function linkGems() {
  if (document.location.href.match(/\/blob\/.*\/Gemfile/)) {
    $('span.pl-k:contains("gem")+span.pl-s1, span.pl-k:contains("gem")+span.pl-s2').each(function() {
      var gem_name = $(this).text().replace(/['"]/g, '')
      $(this).html('"<a href="http://rubygems.org/gems/' + gem_name + '" target="_new">' + gem_name + '</a>"')
    })

    // Use the same color
    $('span.pl-s1 a').css('color', $('span.pl-s1').css('color'))
    $('span.pl-s2 a').css('color', $('span.pl-s2').css('color'))
  }
}

$(document).on('click', 'a[title="Gemfile"]', function() {
  // Give the file time to load
  setTimeout(linkGems, 500)
})

linkGems()

// Easy activity log scanning
// Keep track of your last seen activity log entry, and fade out everything after it
// ------------------------------------------------------------------------------

if ($('body.page-dashboard').length == 1) {
  // Hide comments on issues -- we'll see them in the notification center anyway
  // $('div.alert.issues_comment').remove()

  var last = localStorage.getItem('last_alert')

  if (last) {
    var hit_last = false
    $('div.news div.alert').each(function() {
      console.debug($(this).find('time').attr('title'), hit_last)
      if ($(this).find('time').attr('title') == last) {
        hit_last = true
      }

      if (hit_last) {
        $(this).css({'opacity': '0.5'})
      }
    })
  }

  // Store the timestamp of the latest entry in localStorage
  localStorage.setItem('last_alert', $('div.news div.alert:first').find('time').attr('title'))
}
