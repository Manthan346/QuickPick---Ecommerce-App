import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
import Autoplay from "embla-carousel-autoplay"




const heroSlides = [
  
  {
    image: `${assets.hero2}`,
    

  },
  {
    image: `${assets.hero3}`,
    
    
  }
];



function Hero() {
  const navigate = useNavigate()
 

  return (
    <Carousel
    
      className='w-full'
      opts={{
        align: 'start',
        loop: true,
        
      }}
       plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        {heroSlides.map((slide, index) => (
          <CarouselItem key={index}>
            <div className='relative min-h-[200px]  lg:min-h-[600px] flex items-center justify-center overflow-hidden'>
              
              {/* Background Image */}
              <div className='absolute inset-0'>
                <img 
                  src={slide.image} 
                  className='sm:w-full  sm:h-full  w-full sm:object-cover object-contain' 
                  alt={slide.title}
                />
                <div className='absolute inset-0 bg-foreground/10'></div>
              </div>

              {/* Content */}
              <div className='relative z-10 text-center text-white px-4 sm:px-6 lg:px-8'>
                <div className='max-w-4xl mx-auto'>
                  
                  <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8'>
                    <span className='block tracking-wide font-manthan'>
                      {slide.title}
                    </span>
                    
                  </h1>

                  {/* Buttons */}
                  <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                    <button onClick={()=>navigate('/collections')} className='px-8 py-3 hidden sm:visible bg-transparent border-2 border-background text-background font-medium uppercase tracking-wide hover:bg-background hover:text-foreground transition-all duration-300 min-w-[160px] rounded-full'>
                      Collections
                    </button>
                    <button onClick={()=>navigate('/collections')} className='px-8 py-3 hidden sm:visible bg-background text-foreground font-medium uppercase tracking-wide hover:bg-gray-100 transition-all duration-300 min-w-[160px]'>
                      Shop Now
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation Arrows */}
      <CarouselPrevious className='left-4' />
      <CarouselNext className='right-4' />
    </Carousel>
  );
}

export default Hero;