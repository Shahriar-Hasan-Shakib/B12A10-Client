// #STATIC: Home page composition with static and dynamic sections
// #DYNAMIC: FeaturedModels section fetches latest 6 models from API
import { Hero, FeaturedModels, AboutAIModels, GetStarted } from '@src/components/home';
import { Slider } from '@src/components/layout';

export const Home = () => {
    return (
        <div>
            <Slider /> {/* #SLIDER: Responsive image slider component */}
            <Hero /> {/* #HERO: Main hero section with CTA */}
            <FeaturedModels /> {/* #DYNAMIC: Featured models loaded from MongoDB */}
            <AboutAIModels /> {/* #STATIC: Informational content about AI models */}
            <GetStarted /> {/* #STATIC: Call-to-action section encouraging registration */}
        </div>
    );
};
