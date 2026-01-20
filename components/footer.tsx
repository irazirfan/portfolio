export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Iraz Irfan | iONE
        </p>
      </div>
    </footer>
  )
}
