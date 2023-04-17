const printName = (res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<html><body><p>Dart Vader</p></body></html>');
    res.end();
}

const error404 = (res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end();
}

module.exports = { printName, error404 };