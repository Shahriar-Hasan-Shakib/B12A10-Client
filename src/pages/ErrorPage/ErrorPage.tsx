import s from "./NotFound.module.css";

export const ErrorPage = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.errorCode}>404</div>
                <h1 className={s.title}>Page Not Found</h1>
                <p className={s.description}>
                    We're sorry, the page you are looking for cannot be found.
                    It may have been moved, deleted, or the URL may be incorrect.
                </p>

                <div className={s.buttonGroup}>
                    <button onClick={() => (window.location.href = "/")} className={s.secondaryBtn} > Homepage </button>
                    <button onClick={() => window.history.back()}        className={s.secondaryBtn} > Go Back </button>
                </div>

                <div className={s.supportWrapper}>
                    <p className={s.supportText}>Need assistance? <a href="mailto:support@company.com" className={s.supportLink}>Contact us
                    </a></p>
                </div>
            </div>
        </div>
    );
};
