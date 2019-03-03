import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date());
    next();
});

router.get('/', (req, res) => {
    res.send('articles')
});

router.get('/read:id', (req, res) => {
    res.send('You are reding article ' + req.params.id);
});

export default router;
