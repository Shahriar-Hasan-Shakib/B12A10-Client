import { Layout } from "@src/components/ui/Layout";
import { useEffect, useState } from "react";
import { ALL_MODELS, ADD_MODEL, MY_MODELS } from "@src/constants/";
import { ArrowLeft, ArrowRight } from "@src/assets/icons";

const slides = [
    { title: "Discover AI Models", description: "Explore a comprehensive collection of machine learning models from the community", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop", cta: "Explore Models", link: ALL_MODELS },
    { title: "Share Your Work", description: "Upload and showcase your AI models with researchers and developers worldwide", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop", cta: "Add Model", link: ADD_MODEL },
    { title: "Track Performance", description: "Monitor how many times your models are viewed and purchased by the community", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop", cta: "View Analytics", link: MY_MODELS },
];

export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => setCurrentSlide(index);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const sliderData = {
        div: {
            slides: slides.map((slide, index) => ({
                slide: (
                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-transparent">
                            <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
                                <div className="max-w-2xl text-white">
                                    <h2 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                                    <p className="text-xl md:text-2xl mb-8 text-gray-200">{slide.description}</p>
                                    <a href={slide.link} className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">{slide.cta}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
            })),
            controls: {
                prev: (
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300" aria-label="Previous slide">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </button>
                ),
                next: (
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all duration-300" aria-label="Next slide">
                        <ArrowRight className="w-6 h-6 text-white" />
                    </button>
                ),
            },
            indicators: (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
                    {slides.map((_, index) => (
                        <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/75"}`} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                </div>
            ),
        },
    };

    const sliderStyle = { container: "relative w-full h-[600px] overflow-hidden bg-gray-900", div: { container: "relative w-full h-full" } };
    return <Layout tag="section" data={sliderData} style={sliderStyle} />;
};
