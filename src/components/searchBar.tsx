export default function SearchBar(props: { search: (val: string) => void }) {
  return (
    <div className="w-screen px-4 py-8 flex justify-center items-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-2xl h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
        onKeyUp={(e) => {
          props.search((e.target as HTMLInputElement).value);
        }}
        onBlur={(e) => {
          props.search((e.target as HTMLInputElement).value);
        }}
      />
    </div>
  );
}
