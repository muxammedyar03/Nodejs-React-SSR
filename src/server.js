import http from 'node:http';
import fs from 'fs';
import { wrapContent } from './wrapContent';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { StaticRouter } from 'react-router';
import { routes } from './routes';

const server = http.createServer()

const paths = routes.map(route => route.path)

server.on('request', (req, res) => {
    if(req.method === 'GET' && req.url === '/bundle.js') {
        res.setHeader('Content-Type', 'application/javascript')
        fs.createReadStream('./src/bundle.js').pipe(res)
    }else if(req.method === 'GET') {
        const hasRoute = paths.includes(req.url)
        res.statusCode = hasRoute ? 200 : 404
        res.setHeader('Content-Type', 'text/html')
        res.writeHead(200)
        const title = 'React SSR'
        const content = renderToString(
            <StaticRouter location={req.url}>
                <App />
            </StaticRouter>
        )
        
        res.end(wrapContent({content, title}))
    }else if(req.method === 'POST' && req.url === '/save-history') {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString()
        })
        req.on('end', () => {
            console.log('Received data:', body)
            res.end('History saved successfully')
        })
    }else{
        req.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('invalid method or url')
    }
})

server.on('listening', () => {
    console.log('Server is listening on port 5000');
})

server.listen(5000)
