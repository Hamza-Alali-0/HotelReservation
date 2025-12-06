import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  hover?: boolean;
}

export const Card = ({ 
  children, 
  className = '', 
  onClick,
  selected = false,
  hover = true
}: CardProps) => {
  return (
    <div 
      className={`card ${hover ? 'card-hover' : ''} ${selected ? 'card-selected' : ''} ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
};
