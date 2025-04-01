import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/', './routes/page.tsx',[
        route('/', './components/postList/index.tsx'),
        route('/post', './components/post/index.tsx'),        
    ])
] satisfies RouteConfig;
