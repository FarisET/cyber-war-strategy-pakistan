
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Shield } from "lucide-react";
import { playSound } from "@/utils/soundUtils";
import TerminalText from "@/components/TerminalText";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <div className="flex flex-col items-center mb-6">
          <Shield className="h-12 w-12 text-military-red mb-2" />
          <h1 className="text-2xl font-bold">Cyber Command Access</h1>
          <TerminalText 
            text="Enter credentials to access military systems."
            className="text-sm mt-2 text-center"
          />
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Access ID
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-military-dark border-military-light focus:border-military-red"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Security Code
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-military-dark border-military-light focus:border-military-red"
            />
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
      </div>
    </Layout>
  );
};

export default Login;
