let serve = require("serve-handler")

module.exports = (public = "website") => (request, response) =>
  serve(
    request,
    response, {
      public,
      cleanUrls: true,
      renderSingle: true
    }
  )