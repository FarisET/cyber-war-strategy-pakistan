
import React from "react";

interface RadarProps {
  className?: string;
  size?: number;
}

const Radar: React.FC<RadarProps> = ({ className = "", size = 150 }) => {
  return (
    <div 
      className={`radar-container ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        background: 'radial-gradient(circle, rgba(26,31,44,0.3) 0%, rgba(26,31,44,0.9) 80%)',
      }}
    >
      <div className="absolute inset-0 rounded-full">
        {/* Radar grid */}
        <div className="absolute inset-0 rounded-full border-2 border-military-red/10" />
        <div className="absolute inset-0 rounded-full border border-military-red/20" 
             style={{ width: '75%', height: '75%', top: '12.5%', left: '12.5%' }} />
        <div className="absolute inset-0 rounded-full border border-military-red/30" 
             style={{ width: '50%', height: '50%', top: '25%', left: '25%' }} />
        <div className="absolute inset-0 rounded-full border border-military-red/40" 
             style={{ width: '25%', height: '25%', top: '37.5%', left: '37.5%' }} />
        
        {/* Cross lines */}
        <div className="absolute top-0 left-1/2 h-full w-px bg-military-red/20 transform -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 h-px w-full bg-military-red/20 transform -translate-y-1/2" />
        
        {/* Sweep animation */}
        <div className="radar-sweep" />
        
        {/* Blips - simulated targets */}
        <div className="absolute h-1.5 w-1.5 bg-military-red rounded-full animate-blink" 
             style={{ top: '30%', left: '60%' }} />
        <div className="absolute h-1.5 w-1.5 bg-military-red rounded-full animate-blink" 
             style={{ top: '70%', left: '40%' }} />
        <div className="absolute h-1.5 w-1.5 bg-military-yellow rounded-full animate-blink" 
             style={{ top: '50%', left: '75%' }} />
      </div>
    </div>
  );
};

export default Radar;
