import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Quote } from "lucide-react";

const quotes = [
  { text: "La paz viene de dentro. No la busques fuera.", author: "Buddha" },
  { text: "El presente es el único momento en el que verdaderamente vivimos.", author: "Thich Nhat Hanh" },
  { text: "Tu tarea no es buscar el amor, sino encontrar las barreras que has construido contra él.", author: "Rumi" },
  { text: "La meditación no es escapar de la vida, es prepararse para ella.", author: "Proverbio Zen" },
  { text: "Respira. Deja ir. Y recuerda que este momento es el único que tienes con certeza.", author: "Oprah Winfrey" },
];

export const DailyQuote = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length);
        setVisible(true);
      }, 5000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const quote = quotes[index];

  return (
    <div className="flex justify-center mb-10">
      <Card className={`max-w-2xl w-full p-6 sm:p-8 border-0 shadow-md rounded-2xl bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100
          dark:from-[#1a1f2c] dark:via-[#232c3d] dark:to-[#2c3547]
          transition-all duration-700 ease-in-out backdrop-blur-md
          ${visible ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}
      >
        <div className="flex flex-col items-center text-center space-y-4 transition-all duration-700">
          <div className="">
            <Quote className="w-8 h-8 text-white dark:text-lavender-300 animate-float" />
          </div>

          <blockquote className="text-lg sm:text-2xl font-light text-gray-800 dark:text-gray-100 leading-relaxed italic max-w-3xl">
            “{quote.text}”
          </blockquote>

          <cite className="text-base text-gray-600 dark:text-gray-400 not-italic font-light">
            — {quote.author}
          </cite>
        </div>
      </Card>
    </div>
  );
};
