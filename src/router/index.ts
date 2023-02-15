import { createRouter } from './router';
import { pages, subPackages } from './routes/index';
console.log(ROUTES);

const routes = [...ROUTES];

const router = createRouter({routes});
export default router;
