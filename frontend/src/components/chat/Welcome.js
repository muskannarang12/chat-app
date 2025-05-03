export default function Welcome() {
  return (
    <div className="lg:col-span-2 lg:block bg-white dark:bg-gray-900">
      {/* Autoplaying YouTube video below the message */}
      <div className="mt-2" style={{ backgroundImage: "url('/back3.jpeg')" }}>
        <iframe
          className="w-full"
          width="100%"
          height="600" // Adjust the height here
          src="https://www.youtube.com/embed/gxmHCABifO8?autoplay=1&controls=0&mute=1&loop=1&playlist=gxmHCABifO8"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        <div className="text-center mt-4">
          <h2 className="text-xl text-white-500 dark:text-gray-400">
            Let's chatt..
          </h2>
        </div>
      </div>
    </div>
  );
}
