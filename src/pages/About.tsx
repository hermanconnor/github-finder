import { Link } from 'react-router';
import styles from './About.module.css';

const About = () => {
  return (
    <article className={styles.aboutContainer}>
      <Link to='/' className={styles.backButton}>
        <span aria-hidden='true'>&larr;</span> Back to Search
      </Link>

      <div className={styles.aboutCard}>
        <header className={styles.headerSection}>
          <h1 className={styles.title}>
            <span>GitHub Finder</span>
          </h1>

          <p className={styles.subtitle}>
            A modern, responsive, and accessible web application designed to
            help you discover GitHub developers, inspect public statistics, and
            explore repositories instantly.
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What It Does</h2>
          <p className={styles.text}>
            GitHub Finder connects directly to the GitHub REST API to surface
            comprehensive developer insights without clutter. Whether you are
            looking up collaborators, researching open-source maintainers, or
            checking out someone's latest projects, this tool provides a
            streamlined interface to do so.
          </p>

          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden='true'>
                &#10003;
              </span>
              <div>
                <strong>Instant User Search:</strong> Look up any GitHub handle
                or username with query matching and clear result tracking.
              </div>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden='true'>
                &#10003;
              </span>
              <div>
                <strong>Detailed Developer Profiles:</strong> View core
                engagement metrics including follower counts, repository totals,
                bios, company locations, and hireable status.
              </div>
            </li>
            <li className={styles.featureItem}>
              <span className={styles.featureIcon} aria-hidden='true'>
                &#10003;
              </span>
              <div>
                <strong>Repository Inspection:</strong> Browse a curated list of
                a user's latest public repositories complete with star counts,
                fork statistics, language tags, and direct links.
              </div>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Built With Modern Tech</h2>
          <p className={styles.text}>
            This application is engineered with a strong emphasis on component
            architecture, type safety, and accessibility standards (WCAG):
          </p>
          <div className={styles.techGrid}>
            <span className={styles.techBadge}>React</span>
            <span className={styles.techBadge}>TypeScript</span>
            <span className={styles.techBadge}>React Router v8.5</span>
            <span className={styles.techBadge}>Axios</span>
            <span className={styles.techBadge}>CSS Modules</span>
            <span className={styles.techBadge}>GitHub REST API</span>
          </div>
        </section>
      </div>
    </article>
  );
};

export default About;
