import s from "./style.module.css";
import { AUTH } from "@src/constants";
import { Link } from "react-router";
import { AddIcon, SearchIcon, UserIcon, StarIcon, RocketIcon } from "@src/assets/icons";

export const GetStarted = () => (
    <section className={s.getStartedSection}>
        <div className={s.getStartedContent}>
            <div className={s.sectionBadgeWhite}><RocketIcon /> Start Your Journey</div>
            <h2 className={s.getStartedTitle}>Ready to Manage Your AI Models?</h2>
            <p className={s.getStartedDescription}>Join our growing community and start cataloging your AI models today. Whether you're a researcher, developer, or AI enthusiast, our platform makes it easy to organize, share, and discover cutting-edge models.</p>
            <div className={s.featuresGrid}>
                <div className={s.featureItem}><div className={s.featureItemIcon}><AddIcon /></div><p className={s.featureItemText}>Add Unlimited Models</p></div>
                <div className={s.featureItem}><div className={s.featureItemIcon}><SearchIcon /></div><p className={s.featureItemText}>Advanced Search & Filter</p></div>
                <div className={s.featureItem}><div className={s.featureItemIcon}><UserIcon /></div><p className={s.featureItemText}>Community Collaboration</p></div>
                <div className={s.featureItem}><div className={s.featureItemIcon}><StarIcon /></div><p className={s.featureItemText}>Track Popularity</p></div>
            </div>
            <div className={s.ctaButtons}>
                <Link to={AUTH}><button className={s.ctaPrimary}><RocketIcon /> Create Free Account</button></Link>
                <Link to={AUTH}><button className={s.ctaSecondary}>Sign In</button></Link>
            </div>
        </div>
    </section>
);
