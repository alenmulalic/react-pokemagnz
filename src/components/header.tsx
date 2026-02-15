export default function Header() {
  return (
    <header className="bg-red-600 text-white flex items-center h-16 px-4">
      {/* Hamburger Menu */}
      <button className="mr-4 focus:outline-none" aria-label="Open menu">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <span className="text-lg font-semibold">PokeDex</span>
    </header>
  );
}
