import './Button.css';

export default function Button({ children, variant = 'primary', size = 'md', icon, href, onClick, className = '', ...props }) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {icon && <span className="btn__icon">{icon}</span>}
        {children}
      </a>
    );
  }
  
  return (
    <button className={classes} onClick={onClick} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
