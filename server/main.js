import express from 'express';

const app = express();

const requestLog = (req, res, next) => {
    req.logMessage = (message, level) => {
        const requestTime = new Date();
        if (level >= 1) {
            console.log(`----log-level ${level} message: ${message}, time: ${requestTime}`);
        }
    }
    next();
}

app.use(requestLog);

app.use('/', express.static(__dirname + '/../dist'));

app.get('/ww', (req, res) => {
    req.logMessage('test', 1);
    return res.send('just Test');
})

app.get('/hello', (req, res) => {
    return res.send('Can you hear me?')
});

import articles from './routes/articles';

app.use('/articles', articles);

const server = app.listen(3000, () => {
    console.log('Express listening on port 3000');
});