import 'dotenv/config';
import { App } from './app';

const port = process.env.PORT || 'port';
const url = process.env.URL || 'url';

new App().server.listen(port, () => console.log(`Server on ${url}:${port}/`));
