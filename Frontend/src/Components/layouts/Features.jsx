import { Truck, Headphones, BadgeCheck } from "lucide-react";
import { motion as Motion } from "framer-motion";

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
    <Motion.div
      className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-10 py-16 px-4 md:gap-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {features.map((item, index) => {
        const Icon = item.icon;

        return (
          <Motion.div
            key={index}
            className="flex min-w-[200px] flex-1 flex-col items-center  p-2 rounded-md  text-center hover:bg-gray-100 "
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            whileHover={{ y: -5 }}
          >
            {/* Icon Circle */}
            <Motion.div
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-300/60"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.15, type: "spring", stiffness: 200 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                <Icon size={28} />
              </div>
            </Motion.div>

            {/* Title */}
            <h3 className="mt-6 text-base font-bold uppercase tracking-tight md:text-lg">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </Motion.div>
        );
      })}
    </Motion.div>
  );
}

export default Features;