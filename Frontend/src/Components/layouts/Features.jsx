import { Truck, Headphones, BadgeCheck } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Truck,
      title: "FREE AND FAST DELIVERY",
      desc: "Free delivery for all orders over $140",
    },
    {
      icon: Headphones,
      title: "24/7 CUSTOMER SERVICE",
      desc: "Friendly 24/7 customer support",
    },
    {
      icon: BadgeCheck,
      title: "MONEY BACK GUARANTEE",
      desc: "We return money within 30 days",
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-10 py-16 px-4 md:gap-20">
      {features.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="flex min-w-[200px] flex-1 flex-col items-center  p-2 rounded-md  text-center hover:bg-gray-100 "
          >
            {/* Icon Circle */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300/60">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                <Icon size={28} />
              </div>
            </div>

            {/* Title */}
            <h3 className="mt-6 text-base font-bold uppercase tracking-tight md:text-lg">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Features;