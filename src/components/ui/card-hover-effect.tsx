import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

interface ChallengeCardProps {
  title: string;
  description: string;
  link: string;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  title,
  description,
  link,
}) => (
  <div className="rounded-2xl h-[15rem] w-full px-2 py-6 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 flex flex-col justify-evenly">
    <div>
      <h2 className="text-xl font-bold mb-2 font-[Poppins]">{title}</h2>
      <p className="text-gray-400 mb-4 font-[Poppins]">{description}</p>
    </div>

    {/* Button Section */}
    <div className="">
      <Link
        href={link}
        className="bg-gradient-to-r from-blue-400 to-green-400 text-black font-bold px-4 py-2 rounded-lg hover:scale-105 transform transition-transform hover:bg-green-500 hover:text-black self-center font-[Poppins] cursor-pointer"
      >
        Go to {title}
      </Link>
    </div>
  </div>
);

export const HoverEffect = ({
  items,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  return (
    <div className={"grid grid-cols-3 py-10 gap-4"}>
      {items.map((item, index) => {
        console.log("item link", item.link);
        return (
          <div
            key={item.link}
            className="relative block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(item.link)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ChallengeCard {...item} />
            {hoveredIndex === item.link ? (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
