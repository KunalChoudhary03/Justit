if (orders.length === 0) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center border border-gray-200">
        
        <div className="text-5xl mb-4">🚧</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Orders Section Under Development
        </h2>

        <p className="text-gray-600 mb-4 leading-relaxed">
          Thank you for your interest   
          We’re currently setting up our order management system.
        </p>

        <p className="text-gray-500 text-sm mb-6">
          Your purchases and order history will appear here once everything is ready.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
