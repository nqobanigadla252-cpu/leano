import { 
  LayoutGrid, 
  LayoutDashboard, 
  TrendingUp, 
  Receipt, 
  Building2, 
  BarChart3, 
  Settings 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'app', label: 'App', icon: LayoutGrid },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sales', label: 'Sales', icon: TrendingUp },
  { id: 'purchases', label: 'Purchases', icon: Receipt },
  { id: 'banking', label: 'Banking', icon: Building2 },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface MobileNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function MobileNav({ activeTab = 'dashboard', onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full min-w-0 transition-colors duration-200 active:bg-gray-50"
            >
              <Icon 
                className={`w-5 h-5 mb-1 transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span 
                className={`text-[10px] font-medium transition-colors ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
