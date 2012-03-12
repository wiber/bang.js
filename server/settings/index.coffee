module.exports =
  path:  '/opt/bang.js'
  apps: [
    './bang/bangApplication.coffee'
    './boom/boomApplication.coffee'
    './docExplorer/DocExplorerApplication.coffee'
    './mobile/MobileApplication.coffee'
    './quank/QuankApplication.coffee'
  ]
  debug: true
  web:   require './web.coffee'
  db:    require './db.coffee'

