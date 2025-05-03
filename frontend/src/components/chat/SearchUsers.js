import { SearchIcon } from "@heroicons/react/solid";

export default function SearchUsers({ handleSearch }) {
  return (
    <div className="mx-3 my-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Search users..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
          style={{
            backgroundImage: "url('/back3.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white', // Ensure text is white on top of the background
          }}
        />
      </div>
    </div>
  );
}
