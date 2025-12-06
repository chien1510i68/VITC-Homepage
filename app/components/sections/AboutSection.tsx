"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TAILWIND_COLORS } from '@/lib/colors';
import { api, AboutTimeline } from '@/lib/api';

interface TimelineCardData {
  id: number | string;
  image: string;
  title: string;
  description: string;
}

interface TimelineCardsProps {
  cards: TimelineCardData[];
}

const TimelineCards = ({ cards }: TimelineCardsProps) => {
  const container = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current;
      const totalCards = cardElements.length;

      if (!cardElements[0]) return;

      // Set initial state: first card visible at top, all others below viewport
      cardElements.forEach((card, index) => {
        if (!card) return;
        if (index === 0) {
          gsap.set(card, { y: "0%", scale: 1, rotation: 0 });
        } else {
          gsap.set(card, { y: "100%", scale: 1, rotation: 0 });
        }
      });

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".timeline-cards",
          start: "top top",
          end: `+=${window.innerHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;
        if (!currentCard || !nextCard) continue;

        // Scale down and rotate current card
        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        // Slide up next card from bottom
        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className="relative h-full w-full" ref={container}>
      <div className="timeline-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
        <div className="relative h-[90%] w-[75%] overflow-hidden">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute h-full w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                <div className={`${TAILWIND_COLORS.bgPrimary} text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 w-fit`}>
                  {card.title}
                </div>
                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                  {card.title.split(":")[1]?.trim() || card.title}
                </h3>
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function AboutSection() {
  const [timelineCards, setTimelineCards] = useState<AboutTimeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTimeline = async () => {
      setIsLoading(true);
      try {
        const data = await api.getAboutTimeline();
        setTimelineCards(data);
      } catch (error) {
        console.error('Error loading about timeline:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimeline();
  }, []);

  if (isLoading) {
    return (
      <section id="about" className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Đang tải hành trình phát triển...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="relative">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 pt-20 pb-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Hành Trình Phát Triển
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            10 năm hình thành và phát triển - Từ những bước đi đầu tiên đến vị thế hàng đầu trong đào tạo CNTT
          </p>
          <p className="text-base text-gray-500">
            Cuộn xuống để khám phá hành trình của chúng tôi
          </p>
        </div>
      </div>

      {/* Timeline Cards - Fixed height container */}
      <div className="relative" style={{ height: `${100 * timelineCards.length}vh` }}>
        <div className="h-screen w-full bg-gradient-to-b from-gray-50 to-white">
          <TimelineCards cards={timelineCards} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            Cùng Nhau Tạo Nên Thành Công
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Với hơn 10 năm kinh nghiệm, VITC tự hào là đối tác tin cậy trong hành trình phát triển sự nghiệp công nghệ của hàng nghìn học viên.
          </p>
        </div>
      </div>
    </section>
  );
}
