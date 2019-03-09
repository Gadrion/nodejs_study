const fs = require('fs');

fs.open('./output.txt', 'w', (err, fd) => {
    if (err) throw err;

    const buf = new Buffer('hi!\n');
    fs.write(fd, buf, 0, buf.length, null, (err, written, buffer) => {
        if (err) throw err;
        console.log(err, written, buffer);

        fs.close(fd, () => {
            console.log('done');
        });
    });
});