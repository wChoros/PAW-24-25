import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/', './routes/page.tsx',[
        route('/notepad', './components/notepad/index.tsx'),
        route('/counter', './components/counter/index.tsx'),
        route('/slider', './components/slider/index.tsx'),
        
    ])
] satisfies RouteConfig;
