'use client';

import { type ComponentProps, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/shared/components/ui/carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import WebsiteExampleCard from './card';

const WebsiteExampleCarousel = ({
  list,
}: {
  list: ComponentProps<typeof WebsiteExampleCard>[];
}) => {
  const plugin = useRef(
    AutoScroll({
      playOnInit: true,
      speed: 1.5,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  // 루프가 부드럽게 동작하도록 아이템 복제
  const duplicatedList = [...list, ...list];

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play(0)}
    >
      <CarouselContent className="flex flex-nowrap cursor-grab">
        {duplicatedList.map((example, index) => (
          <CarouselItem
            key={`${example.title}-${index}`}
            className="ml-9 p-0 w-full max-w-[354px]"
          >
            <WebsiteExampleCard
              thumbnail={example.thumbnail}
              title={example.title}
              description={example.description}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default WebsiteExampleCarousel;
