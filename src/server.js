import express from 'express';
import fs from 'fs';
import { wrapContent } from './wrapContent';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { StaticRouter } from 'react-router';
import { routes } from './routes';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

const paths = routes
  .map(route => route.path)
  .filter(path => typeof path === 'string' && !path.includes('/:'));

// Serve the bundle.js file
app.get('/bundle.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    fs.createReadStream('./src/bundle.js').pipe(res);
});

// Handle GET requests for routes
app.get('/', (req, res) => {
    // const hasRoute = paths.includes(req.url);
    // res.status(hasRoute ? 200 : 404);
    res.status(200);
    res.setHeader('Content-Type', 'text/html');
    const title = 'React SSR';
    const content = renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    res.send(wrapContent({ content, title }));
});

// Handle POST requests to save history
app.post('/save-history', express.json(), async (req, res) => {
    try {
        const { title, duration, startedAt, closedAt } = req.body;

        if (!title || !duration || !startedAt || !closedAt) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newHistory = await prisma.history.create({
            data: {
                title,
                duration,
                startedAt,
                closedAt
            }
        });

        res.status(201).json({ message: 'History saved', newHistory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save history', error });
        console.log(error);
        
    }
});

// Handle invalid methods or URLs
app.use((req, res) => {
    res.status(404).send('Invalid method or URL');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
