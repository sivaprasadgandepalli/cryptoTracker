export default function Pricing() {
    const plans = [
      {
        name: "Basic",
        price: "Free",
        description: "Perfect for beginners looking to track crypto prices.",
        features: [
          "✅ Live Market Prices",
          "✅ Crypto News Updates",
          "✅ Basic Price Charts",
          "❌ No Historical Data",
          "❌ No Alerts & Notifications",
        ],
        buttonText: "Get Started",
        gradient: "bg-gradient-to-r from-gray-800 to-gray-900",
      },
      {
        name: "Pro",
        price: "$9.99/mo",
        description: "For traders who need deeper insights and alerts.",
        features: [
          "✅ Everything in Basic",
          "✅ Historical Data (30 Days)",
          "✅ Price Alerts & Notifications",
          "✅ Technical Indicators",
          "❌ No Premium Support",
        ],
        buttonText: "Upgrade Now",
        gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
      },
      {
        name: "Premium",
        price: "$19.99/mo",
        description: "Advanced features for serious investors & analysts.",
        features: [
          "✅ Everything in Pro",
          "✅ Historical Data (1 Year)",
          "✅ AI Price Predictions",
          "✅ Premium Support 24/7",
          "✅ Ad-Free Experience",
        ],
        buttonText: "Go Premium",
        gradient: "bg-gradient-to-r from-yellow-500 to-orange-600",
      },
    ];
  
    return (
      <div className="flex flex-wrap justify-center items-center gap-8 p-4 md:p-10 min-h-screen">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${plan.gradient} text-white p-8 rounded-2xl shadow-lg w-80 text-center transition duration-300 transform hover:scale-105 hover:shadow-2xl`}
          >
            <h3 className="text-2xl font-bold">{plan.name}</h3>
            <p className="text-4xl font-extrabold my-3">{plan.price}</p>
            <p className="text-gray-300 mb-4">{plan.description}</p>
            <ul className="mb-6 space-y-2 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex justify-center items-center gap-2">
                  {feature}
                </li>
              ))}
            </ul>
            <button className="bg-white text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-200">
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    );
  }
  