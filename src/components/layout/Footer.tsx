export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by Your Name/AI. Inspired by GTA5Grand forums. This is a demo application.
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} GTA5Grand Forum Lite. All rights reserved (not really).
        </p>
      </div>
    </footer>
  );
}
