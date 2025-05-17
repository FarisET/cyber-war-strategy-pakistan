
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import MilitaryCard from "@/components/MilitaryCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Shield } from "lucide-react";
import { playSound } from "@/utils/soundUtils";
import TerminalText from "@/components/TerminalText";

const Login = () => {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound("buttonClick", 0.5);
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideAuth>
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        {/* <MilitaryCard variant="bordered" className="w-full max-w-md"> */}
          <div className="flex flex-col items-center mb-6">
            <Shield className="h-12 w-12 text-military-red mb-2" />
            <h1 className="text-2xl font-bold">Cyber Command Access</h1>
            <TerminalText 
              text="Enter credentials to access military systems."
              className="text-sm mt-2 text-center"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Access ID
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your access ID"
                  required
                  className="bg-military-dark border-military-light focus:border-military-red"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-military-red/70">
                  ID-927
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Security Code
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security code"
                  required
                  className="bg-military-dark border-military-light focus:border-military-red"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-military-red/70 font-mono">
                  ********
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-military-red hover:bg-military-red/90"
              disabled={isLoading}
              onClick={() => playSound("buttonClick", 0.3)}
            >
              {isLoading ? "Authenticating..." : "Access Terminal"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Not registered? </span>
            <Link 
              to="/signup" 
              className="text-military-red hover:underline"
              onClick={() => playSound("buttonClick", 0.3)}
            >
              Request Access
            </Link>
          </div>
        {/* </MilitaryCard> */}
        
        <p className="mt-8 text-sm text-center text-muted-foreground">
          <span className="block mb-1">DEMO: Use demo@example.com / password</span>
        </p>
      </div>
    </Layout>
  );
};

export default Login;
