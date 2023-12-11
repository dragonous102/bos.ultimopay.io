const { createServer } = require('http');
const { createReadStream } = require('fs');
const { spawn } = require('child_process');

const PHP_CGI_PATH = '/usr/bin/php-cgi'; // Path to the php-cgi executable
const PHP_SCRIPT_PATH = `${__dirname}/pages/api/api.php`; // Path to your PHP script

const server = createServer((req, res) => {
  const php = spawn(PHP_CGI_PATH, ['-f', PHP_SCRIPT_PATH]);

  // Forward the request headers to the PHP process
  Object.keys(req.headers).forEach(header => {
    php.stdin.write(`${header}: ${req.headers[header]}\r\n`);
  });

  php.stdin.write('\r\n');

  // Pipe the request body to the PHP process
  req.pipe(php.stdin);

  // Pipe the PHP process output to the response
  php.stdout.pipe(res);
});

server.listen(8000, () => {
  console.log('PHP server running at http://localhost:8000');
});
