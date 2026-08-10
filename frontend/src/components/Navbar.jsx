function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm px-8 py-4 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold text-green-700">
          🧬 NutriGuardian AI
        </h1>

        <p className="text-sm text-gray-500">
          Smart Healthcare & Nutrition Assistant
        </p>
      </div>


      <div className="flex gap-6 text-gray-600 font-medium">

        <button className="hover:text-green-600">
          Dashboard
        </button>

        <button className="hover:text-green-600">
          Predictions
        </button>

        <button className="hover:text-green-600">
          AI Nutrition
        </button>

      </div>

    </nav>
  )
}

export default Navbar