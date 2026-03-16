import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/' },
  { label: 'Employees', path: '/employees' },
  { label: 'Approvals', path: '/approvals' },
  { label: 'Audit Logs', path: '/logs' },
];

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="h-14 border-b border-border bg-card flex items-center px-6 justify-between sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <span className="font-bold tracking-tighter text-lg text-foreground">PROTOCOL</span>
        <div className="flex gap-1">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                pathname === item.path
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-status-active" />
        <span className="text-xs font-mono text-muted-foreground">SYSTEM ONLINE</span>
      </div>
    </nav>
  );
}
