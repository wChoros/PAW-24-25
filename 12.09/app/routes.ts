import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/', './routes/page.tsx',[
        route('/', './components/home/index.tsx'),
        route('/post/:postId?', './components/post/index.tsx'),
        route('/categories', './components/categories/index.tsx'),
        
    ])
] satisfies RouteConfig;
