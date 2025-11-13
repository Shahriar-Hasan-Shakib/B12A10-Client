import { Hero, FeaturedModels, AboutAIModels, GetStarted } from '@src/components/home';
import { Slider } from '@src/components/layout';

export const Home = () => {
    return (
        <div>
            <Slider />
            <Hero />
            <FeaturedModels />
            <AboutAIModels />
            <GetStarted />
        </div>
    );
};
