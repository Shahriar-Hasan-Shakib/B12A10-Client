import s from "./style.module.css";
import { BrainIcon, ChartIcon, CommentsIcon, EyeIcon2, StarIcon } from "@src/assets/icons";

export const AboutAIModels = () => (
    <section className={s.aboutSection}>
        <div className={s.sectionHeader}>
            <div className={s.sectionBadge}><StarIcon /> Learn More</div>
            <h2 className={s.sectionTitle}>What Are AI Models?</h2>
            <p className={s.sectionSubtitle}>AI models are the backbone of artificial intelligence applications, enabling machines to learn, predict, and make decisions based on data.</p>
        </div>
        <div className={s.aboutGrid}>
            <div className={s.featureCard}>
                <div className={s.featureIcon}><BrainIcon /></div>
                <h3 className={s.featureTitle}>Neural Networks</h3>
                <p className={s.featureDescription}>Deep learning models that mimic the human brain's structure, capable of learning complex patterns from vast amounts of data. Used in image recognition, speech processing, and more.</p>
            </div>
            <div className={s.featureCard}>
                <div className={s.featureIcon}><CommentsIcon /></div>
                <h3 className={s.featureTitle}>Natural Language Processing</h3>
                <p className={s.featureDescription}>Models like BERT and GPT that understand and generate human language. Power chatbots, translation services, sentiment analysis, and content generation tools.</p>
            </div>
            <div className={s.featureCard}>
                <div className={s.featureIcon}><EyeIcon2 /></div>
                <h3 className={s.featureTitle}>Computer Vision</h3>
                <p className={s.featureDescription}>Models trained on image datasets like ImageNet to recognize objects, faces, and scenes. Essential for autonomous vehicles, medical imaging, and security systems.</p>
            </div>
            <div className={s.featureCard}>
                <div className={s.featureIcon}><ChartIcon /></div>
                <h3 className={s.featureTitle}>Recommendation Systems</h3>
                <p className={s.featureDescription}>Collaborative filtering and content-based models that predict user preferences. Power Netflix recommendations, e-commerce suggestions, and personalized content feeds.</p>
            </div>
        </div>
    </section>
);
