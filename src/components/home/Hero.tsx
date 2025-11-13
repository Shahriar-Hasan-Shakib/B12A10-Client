import { AUTH, ALL_MODELS } from "@src/constants";
import { Link } from "react-router";
import { SearchIcon, StarIcon } from "@src/assets/icons";
import s from "./style.module.css";

export const Hero = () => (
    <section className={s.heroContainer}>
        <div className={s.heroContent}>
            <h1 className={s.heroTitle}>Discover & Manage AI Models with Ease</h1>
            <p className={s.heroSubtitle}>Your comprehensive platform for cataloging, organizing, and sharing machine learning models. Join thousands of AI enthusiasts and researchers building the future of artificial intelligence.</p>
            <div className={s.heroCta}>
                <Link to={AUTH}><button><StarIcon /> Get Started Free</button></Link>
                <Link to={ALL_MODELS}><button><SearchIcon /> Explore Models</button></Link>
            </div>
        </div>
    </section>
);
