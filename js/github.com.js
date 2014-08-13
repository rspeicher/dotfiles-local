// Gemfile linker: Adds rubygems.org links to each `gem` entry in a Gemfile
// ------------------------------------------------------------------------------

function linkGems() {
  if (document.location.href.match(/\/blob\/.*\/Gemfile/)) {
    $('div.line span.n:contains("gem")+span.s2, div.line span.n:contains("gem")+span.s1').each(function() {
      var gem_name = $(this).text().replace(/['"]/g, '')
      $(this).html('"<a href="http://rubygems.org/gems/' + gem_name + '" target="_new">' + gem_name + '</a>"')
    })

    // Use the same color
    $('span.s1 a').css('color', $('span.s1').css('color'))
    $('span.s2 a').css('color', $('span.s2').css('color'))
  }
}

$(document).on('click', 'a[title="Gemfile"]', function() {
  // Give the file time to load
  setTimeout(linkGems, 500)
})

linkGems()

// Infinite scroll on commit logs
// ------------------------------------------------------------------------------


// Should be called on a window's "scroll" event
// Determines if the <tt>waypoint_id</tt> is within the current viewable area and calls
// <tt>callback</tt> if it is.
function paginationWaypoint(waypoint_id, next_id, callback) {
  var distanceTop = $(waypoint_id).offset().top - $(window).height()

  if ($(window).scrollTop() > distanceTop) {
    var link = $(waypoint_id).find(next_id)
    if(link.length > 0) {
      callback(link.attr('href'))
    }
  }
}

// Loads a link and calls a callback on success
//
// FIXME: Called synchronously so that we don't load a page more than once; this was the lazy way out
function paginationLoadPage(link, success) {
  $.ajax(link, {
    async: false,
    cache: false,
    dataType: 'html',
    success: success
  })
}

// Provides a default callback to use with paginationWaypoint
function waypointCallback(link) {
  paginationLoadPage(link, successCallback)
}

var content_id  = 'h3.commit-group-heading, ol.commit-group'
var waypoint_id = 'div.pagination:last'
var next_id     = 'span+a, a+a'

function successCallback(d) {
  $d = $($.parseHTML(d))
  $d.find(content_id).insertBefore(waypoint_id)
  $(waypoint_id).replaceWith($d.find(waypoint_id))
}

if ($(content_id).length > 0 && $(waypoint_id).length > 0) {
  $(window).bind('scroll', function() {
    paginationWaypoint(waypoint_id, next_id, waypointCallback)
  })
}

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
