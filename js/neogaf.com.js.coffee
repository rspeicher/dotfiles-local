loc = document.location.href

# Should be called on a window's "scroll" event
# Determines if the <tt>waypoint_id</tt> is within the current viewable area and calls
# <tt>callback</tt> if it is.
paginationWaypoint = (waypoint_id, next_id, callback) ->
  distanceTop = $(waypoint_id).offset().top - $(window).height()

  if $(window).scrollTop() > distanceTop
    link = $(waypoint_id).find(next_id)
    callback(link.attr('href')) if link.length > 0

# Loads a link and calls a callback on success
#
# FIXME: Called synchronously so that we don't load a page more than once; this was the lazy way out
paginationLoadPage = (link, success) ->
  $.ajaxlink, {
    async: false
    cache: false
    dataType: 'html'
    success: success
  }

# Provides a default callback to use with paginationWaypoint
waypointCallback = (link) ->
  paginationLoadPage(link, successCallback)

# Automatically loads the next page of posts when we hit the bottom of the current page
content_id  = 'div#posts'
waypoint_id = 'div.pagenav-bot'
next_id     = 'li.next a'

successCallback = (d) ->
  d = $($.parseHTML(d))
  $(content_id).append d.find(content_id).html()
  $(waypoint_id).replaceWith d.find(waypoint_id)
  removeQuotedImages()
  quoteHighlight()

if $(content_id).length > 0 and $(waypoint_id).find(next_id).length > 0
  $(window).bind "scroll", ->
    paginationWaypoint waypoint_id, next_id, waypointCallback

# Highlight people quoting my posts
quoteHighlight = ->
  $('#posts strong:contains("tsigo")').each ->
    $(this).parent().css("font-size", "2em")
    $(this).parent().css("color", "red")

# Change multiple quoted images into links
removeQuotedImages = ->
  $(".quotearea").each ->
    if $(this).find("img").length > 1
      $(this).find("img").each ->
        src = $(this).attr("src")
        $(this).parent().append "<a href=\"#{src}\">#{src}</a><br/>"
        $(this).remove()

$ ->
  removeQuotedImages()
  quoteHighlight()
