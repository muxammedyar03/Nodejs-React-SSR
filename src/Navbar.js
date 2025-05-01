import { NavLink } from "react-router"
import { routes } from "./routes"

export const Navbar = () => {
    return (
        <nav className="flex items-center justify-around text-white bg-gray-800 p-4">
            <ul className="flex space-x-4">
                {routes.map(route => (
                    <li key={route.path}>
                        <NavLink to={route.path}>{route.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}