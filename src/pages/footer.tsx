import { Button } from '@/components/ui/button';
import { Github, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 mt-12 bg-background">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground">
        <p className="text-center text-sm">&copy; {new Date().getFullYear()} Gabriel Medeiros. Todos os direitos reservados.</p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gabrideiros"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="hover:text-foreground">
              <Github className="h-5 w-5" />
            </Button>
          </a>

          <a
            href="mailto:gabriel12082004@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="hover:text-foreground">
              <Mail className="h-5 w-5" />
            </Button>
          </a>

          <a
            href="https://instagram.com/gah.medeiross"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon" className="hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
}