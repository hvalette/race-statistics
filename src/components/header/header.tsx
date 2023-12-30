import { ThemeButton } from './theme-button';

export function Header() {
  return (
    <header className="h-14 w-full sticky top-0 z-50 backdrop-blur bg-background/95 supports-[backdrop-filter]:bg-background/60 saturate-150 border-b border-secondary/50 flex items-center px-8">
      <h4 className="text-xl font-semibold">Race Statistics</h4>
      <div className="ml-auto">
        <ThemeButton />
      </div>
    </header>
  );
}
