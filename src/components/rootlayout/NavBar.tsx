import { LogOut, Moon, Settings, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/hooks/useAuthStore"

function NavBar() {
    const { user } = useAuthStore()
  return (
    <nav className="p-4 flex items-center justify-between">
        {/* Izquierda*/}
     collapSableButton
        {/* Derecha */}
     <a href="#">Dashboard</a>
     <Moon />
     <DropdownMenu>
  <DropdownMenuTrigger>
        <Avatar>
        <AvatarImage src={user && user.avatar_url || ""} />
        <AvatarFallback>{user && user.username.charAt(0).toUpperCase() || ""}</AvatarFallback>
        </Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User />Perfil</DropdownMenuItem>
    <DropdownMenuItem><Settings />Opciones</DropdownMenuItem>
    <DropdownMenuItem><LogOut />Cerrar sesión</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </nav>
  )
}

export default NavBar
