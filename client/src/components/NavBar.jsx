export default function NavBar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-semibold italic">Job Analysis</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}