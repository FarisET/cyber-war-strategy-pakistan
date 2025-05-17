
import { ReactNode, useEffect } from "react";
import { Shield, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { preloadSounds, playSound } from "../utils/soundUtils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
  hideAuth?: boolean;
}

const Layout = ({ children, hideAuth = false }: LayoutProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  // Preload sounds on component mount
  useEffect(() => {
    preloadSounds();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-military bg-camo-pattern">
      {/* Header */}
      <header className="border-b border-military-light">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2" onClick={() => playSound("buttonClick", 0.3)}>
            <Shield className="h-6 w-6 text-military-red" />
            <span className="text-xl font-bold tracking-wider">PAK-INDIA WAR STRATEGY</span>
          </Link>

          <div className="flex items-center gap-4">
            {!hideAuth && isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-1" onClick={() => playSound("buttonClick", 0.3)}>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.username} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-military-light border-military-red">
                  <DropdownMenuLabel>
                    <div className="font-bold text-sm">{user?.username}</div>
                    <div className="text-xs text-muted-foreground">{user?.rank}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : !hideAuth && (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-military-red text-military-red hover:bg-military-red hover:text-white"
                    onClick={() => playSound("buttonClick", 0.3)}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm"
                    className="bg-military-red text-white hover:bg-military-red/90"
                    onClick={() => playSound("buttonClick", 0.3)}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-military-light">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pak-India War Strategy Game | Cyber War Simulation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
