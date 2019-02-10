import express from "express"
import cors from "cors"
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from "react-router-dom"
import serialize from "serialize-javascript"
import App from '../shared/App'
import routes from '../shared/routes'
import bodyParser from 'body-parser';
import imageMaker from '../server/imagemaker';
import Helmet from 'react-helmet';
import MetaTagsServer from 'react-meta-tags/server';
import {MetaTagsContext} from 'react-meta-tags';

const port = process.env.PORT || 3000;
const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: false,limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));

app.use(express.static("public"))

app.use('/assets', express.static('assets'));
app.use('/serverdata',express.static('serverdata'))
app.use('/js', express.static('assets/js'));


app.post('/saveimage', async function(req,res){
  console.log("Save image Requst Recieve in Post method")
  var data = await imageMaker(req.body)  
  res.send(data)
})

app.get("*", (req, res, next) => {

  const metaTagsInstance = MetaTagsServer();

  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }

    const markup = renderToString(
      <MetaTagsContext extract = {metaTagsInstance.extract}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </MetaTagsContext>
    )

    //let head = Helmet.rewind();
    //let helmet = Helmet.renderStatic();

    const meta = metaTagsInstance.renderToString();

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charSet="utf-8"/>
          ${meta}
          <script src="/bundle.js" defer></script>
          <script src="/js/jquerymin.js" defer></script>
          <script src="/js/createjs.min.js" defer></script>

          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>

        </body>
      </html>
    `)
  }).catch(next)
})

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})

/*
  1) Just get shared App rendering to string on server then taking over on client.
  2) Pass data to <App /> on server. Show diff. Add data to window then pick it up on the client too.
  3) Instead of static data move to dynamic data (github gists)
  4) add in routing.
*/