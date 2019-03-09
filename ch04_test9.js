const fs = require('fs');

fs.open('./output.txt', 'r', (err, fd) => {
    if (err) throw err;

    const buf = new Buffer(10);
    console.log('buffer type', Buffer.isBuffer(buf));

    fs.read(fd, buf, 0, buf.length, null, (err, bytesRead, buffer) => {
        if (err) throw err;

        const inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('read data', inStr);
        console.log(err, bytesRead, buffer);

        fs.close(fd, () => {
            console.log('done');
        });
    });
});