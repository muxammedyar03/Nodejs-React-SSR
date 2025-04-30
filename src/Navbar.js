import { NavLink } from "react-router-dom"
import { routes } from "./routes"

export const Navbar = () => {
    return (
        <nav>
            <ul>
                {routes.map(route => (
                    <li key={route.path}>
                        <NavLink to={route.path}>{route.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}