import { Home } from "./pages/Home"
import { About } from "./pages/About"

export const routes = [
    {path: "/", Component: Home, title: "Home"},
    {path: "/about", Component: About, title: "About"},
]