// NavBar.jsx
export default function NavBar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-2">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="text-xl font-semibold py-3 md:text-2xl">HireFit <br /> <span className="italic text-sm md:text-lg"> Resume-Job Compatibility Check</span></a>
        </div>
      </div>
    </nav>
  );
}
