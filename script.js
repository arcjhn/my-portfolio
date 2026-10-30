
/* =========================================================
   PORTFOLIO WEBSITE
   Shared JavaScript
   Navigation, page rendering, and interactions
   ========================================================= */

(() => {
    "use strict";

    /* -----------------------------------------------------
       1. CONFIGURATION
       ----------------------------------------------------- */

    const PAGE_LIST = [
        { key: "home", label: "Home", href: "index.html" },
        { key: "about", label: "About Me", href: "about.html" },
        { key: "experience", label: "Work Experience", href: "experience.html" },
        { key: "education", label: "Education", href: "education.html" },
        { key: "projects", label: "Projects", href: "projects.html" },
        { key: "contact", label: "Contact", href: "contact.html" }
    ];

    const ICONS = {
        phone: `
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
                stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2
                19.79 19.79 0 0 1-8.63-3.07
                19.5 19.5 0 0 1-6-6
                19.79 19.79 0 0 1-3.07-8.67
                A2 2 0 0 1 4.11 2h3
                a2 2 0 0 1 2 1.72
                c.12.96.36 1.9.7 2.8
                a2 2 0 0 1-.45 2.11L8.09 9.91
                a16 16 0 0 0 6 6l1.27-1.27
                a2 2 0 0 1 2.11-.45
                c.9.34 1.84.58 2.8.7
                a2 2 0 0 1 1.73 2.03z"/>
            </svg>
        `,

        email: `
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
                stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <path d="m3 7 9 6 9-6"/>
            </svg>
        `,

        location: `
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none"
                stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10
                a8 8 0 1 1 16 0Z"/>
                <circle cx="12" cy="10" r="2.5"/>
            </svg>
        `
    };

    /* -----------------------------------------------------
       2. BASIC HELPERS
       ----------------------------------------------------- */

    function escapeHTML(value) {
        return String(value ?? "").replace(/[&<>"']/g, (character) => {
            const entities = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            };

            return entities[character];
        });
    }

    function safeImagePath(value) {
        const path = String(value ?? "").trim();

        // Portfolio images should use local asset paths.
        if (
            !path ||
            /^(javascript|data|vbscript):/i.test(path) ||
            path.startsWith("//")
        ) {
            return "";
        }

        return path;
    }

    function safeWebURL(value) {
        try {
            const url = new URL(String(value ?? "").trim());

            if (url.protocol === "https:" || url.protocol === "http:") {
                return url.href;
            }
        } catch {
            return "";
        }

        return "";
    }

    function safePhone(value) {
        const phone = String(value ?? "").trim();

        if (!phone || !/^[+\d\s().-]+$/.test(phone)) {
            return "";
        }

        const digits = phone.replace(/\D/g, "");

        if (digits.length < 7) {
            return "";
        }

        return phone;
    }

    function safeEmail(value) {
        const email = String(value ?? "").trim();

        if (
            !email ||
            email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return "";
        }

        return email;
    }

    function getPortfolioData() {
        if (
            typeof portfolioData === "undefined" ||
            !portfolioData ||
            typeof portfolioData !== "object"
        ) {
            console.error(
                "Portfolio data is unavailable. Check that data.js loads before script.js."
            );

            return null;
        }

        return portfolioData;
    }

    function getCurrentPage() {
        const explicitPage = document.body.dataset.page;

        if (explicitPage) {
            const match = PAGE_LIST.find(
                (page) => page.key === explicitPage
            );

            if (match) {
                return match.key;
            }
        }

        const filename = window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

        const match = PAGE_LIST.find(
            (page) => page.href.toLowerCase() === filename
        );

        // The home page is the default for the root URL.
        return match ? match.key : "home";
    }

    function formatDateRange(item) {
        const start = String(item.startDate ?? "").trim();
        const end = String(item.endDate ?? "").trim();

        if (item.current) {
            return [start, "Present"].filter(Boolean).join(" – ");
        }

        return [start, end].filter(Boolean).join(" – ") || "Dates not specified";
    }

    function renderImage(path, alt, className, extraAttributes = "") {
        const safePath = safeImagePath(path);

        if (!safePath) {
            return "";
        }

        return `
            <img
                class="${escapeHTML(className)}"
                src="${escapeHTML(safePath)}"
                alt="${escapeHTML(alt || "")}"
                loading="lazy"
                decoding="async"
                ${extraAttributes}
            >
        `;
    }

    function renderList(items) {
        if (!Array.isArray(items) || items.length === 0) {
            return "";
        }

        return `
            <ul>
                ${items.map((item) => `
                    <li>${escapeHTML(item)}</li>
                `).join("")}
            </ul>
        `;
    }

    /* -----------------------------------------------------
       3. SHARED NAVIGATION
       ----------------------------------------------------- */
    function getMobileNavigationIcon(pageKey) {
        const icons = {
            home: `
                <path d="m3 10 9-7 9 7"></path>
                <path d="M5 9v11h14V9"></path>
                <path d="M9 20v-7h6v7"></path>
            `,
            about: `
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M5 21v-2a7 7 0 0 1 14 0v2"></path>
            `,
            experience: `
                <rect x="3" y="7" width="18" height="13" rx="2"></rect>
                <path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"></path>
            `,
            education: `
                <path d="m2 10 10-5 10 5-10 5-10-5Z"></path>
                <path d="M6 12v5c4 3 8 3 12 0v-5M22 10v6"></path>
            `,
            projects: `
                <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
                <path d="m9 13-2 2 2 2M15 13l2 2-2 2"></path>
            `,
            contact: `
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m3 7 9 6 9-6"></path>
            `
        };

        return `
            <svg
                class="mobile-nav-icon"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                focusable="false"
            >
                ${icons[pageKey] || icons.home}
            </svg>
        `;
    }

    function renderNavigation(data, currentPage) {
        const personal = data.personal || {};

        const brandImage = safeImagePath(personal.profileImage);

        const brandImageMarkup = brandImage
            ? renderImage(
                brandImage,
                personal.profileImageAlt || personal.name || "Profile",
                "brand-image"
            )
            : `
                <span class="brand-image" aria-hidden="true"></span>
            `;

        const navigationLinks = PAGE_LIST.map((page) => {
            const active = page.key === currentPage;

            return `
                <li>
                    <a
                        class="nav-link${active ? " active" : ""}"
                        href="${page.href}"
                        ${active ? 'aria-current="page"' : ""}
                    >
                        ${page.label}
                    </a>
                </li>
            `;
        }).join("");

        const mobileNavigationLinks = PAGE_LIST.map((page) => {
        const active = page.key === currentPage;

            return `
                <li>
                    <a
                        class="nav-link${active ? " active" : ""}"
                        href="${page.href}"
                        ${active ? 'aria-current="page"' : ""}
                    >
                        ${getMobileNavigationIcon(page.key)}
                        <span>${page.label}</span>
                    </a>
                </li>
            `;
        }).join("");

        return `
            <header class="site-header">
                <nav class="nav-container" aria-label="Main navigation">
                    <a class="brand" href="index.html" aria-label="Go to home page">
                        ${brandImageMarkup}

                        <span class="brand-copy">
                            <span class="brand-name">
                                ${escapeHTML(personal.shortName || personal.name || "My Portfolio")}
                            </span>

                            <span class="brand-caption">
                                ${escapeHTML(personal.brandCaption || "Portfolio Website")}
                            </span>
                        </span>
                    </a>

                    <ul class="nav-links nav-links--desktop">
                        ${navigationLinks}
                    </ul>

                    <button
                        class="nav-toggle"
                        type="button"
                        aria-label="Open navigation menu"
                        aria-controls="mobile-navigation"
                        aria-expanded="false"
                        data-menu-toggle
                    >
                        <span class="nav-toggle-icon" aria-hidden="true">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    <div
                        class="mobile-nav"
                        id="mobile-navigation"
                        aria-label="Mobile navigation"
                        aria-hidden="true"
                        inert
                    >
                        <button
                            class="mobile-nav-close"
                            type="button"
                            aria-label="Close navigation menu"
                            data-menu-close
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>

                        <ul class="nav-links">
                             ${mobileNavigationLinks}
                        </ul>
                    </div>
                </nav>
            </header>

            <div
                class="nav-backdrop"
                data-menu-backdrop
                aria-hidden="true"
            ></div>
        `;
    }

    function initializeNavigation() {
        const toggle = document.querySelector("[data-menu-toggle]");
        const drawer = document.querySelector("#mobile-navigation");
        const backdrop = document.querySelector("[data-menu-backdrop]");
        const closeButton = document.querySelector("[data-menu-close");

        if (!toggle || !drawer) {
            return;
        }

        function openMenu() {
            drawer.classList.add("is-open");
            drawer.classList.add("open");

            if (backdrop) {
                backdrop.classList.add("is-visible");
            }

            drawer.removeAttribute("inert");
            drawer.setAttribute("aria-hidden", "false");

            toggle.setAttribute("aria-expanded", "true");
            toggle.setAttribute("aria-label", "Close navigation menu");

            document.body.classList.add("menu-open");
        }

        function closeMenu(returnFocus = false) {
            drawer.classList.remove("is-open");
            drawer.classList.remove("open");

            if (backdrop) {
                backdrop.classList.remove("is-visible");
            }

            drawer.setAttribute("inert", "");
            drawer.setAttribute("aria-hidden", "true");

            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation menu");

            document.body.classList.remove("menu-open");

            if (returnFocus) {
                toggle.focus();
            }
        }

        toggle.addEventListener("click", () => {
            const isOpen = toggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeButton?.addEventListener("click", () => {
            closeMenu(true);
        });

        backdrop?.addEventListener("click", () => {
            closeMenu(true);
        });

        drawer.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                toggle.getAttribute("aria-expanded") === "true"
            ) {
                closeMenu(true);
            }
        });

        // Close the drawer when switching to desktop width.
        const desktopQuery = window.matchMedia("(min-width: 901px)");

        desktopQuery.addEventListener("change", (event) => {
            if (event.matches) {
                closeMenu();
            }
        });
    }

    

    /* -----------------------------------------------------
       4. SHARED FOOTER
       ----------------------------------------------------- */

    function renderFooter(data) {
        const footer = data.footer || {};
        const personal = data.personal || {};
        const currentYear = new Date().getFullYear();

        return `
            <footer class="site-footer">
                <div class="container footer-container">
                    <div>
                        <div class="footer-brand">
                            ${escapeHTML(footer.copyrightName || personal.name || "Portfolio")}
                        </div>

                        <p class="footer-copy">
                            &copy; ${currentYear}
                            ${escapeHTML(footer.copyrightName || personal.name || "Portfolio")}.
                            All rights reserved.
                        </p>
                    </div>

                    <nav class="footer-links" aria-label="Footer navigation">
                        ${PAGE_LIST.map((page) => `
                            <a href="${page.href}">
                                ${page.label}
                            </a>
                        `).join("")}
                    </nav>
                </div>
            </footer>
        `;
    }

    /* -----------------------------------------------------
       5. SHARED SECTION HELPERS
       ----------------------------------------------------- */

    function renderSectionHeading(eyebrow, title, description = "") {
        return `
            <div class="section-heading">
                ${eyebrow ? `
                    <span class="section-eyebrow">
                        ${escapeHTML(eyebrow)}
                    </span>
                ` : ""}

                <h2 class="section-title">
                    ${escapeHTML(title)}
                </h2>

                ${description ? `
                    <p class="section-description">
                        ${escapeHTML(description)}
                    </p>
                ` : ""}
            </div>
        `;
    }

    function renderHighlightCards(items) {
        if (!Array.isArray(items) || items.length === 0) {
            return "";
        }

        return `
            <div class="card-grid">
                ${items.map((item) => `
                    <article class="card">
                        <h3 class="card-title">
                            ${escapeHTML(item.title)}
                        </h3>

                        <p class="card-description">
                            ${escapeHTML(item.description)}
                        </p>
                    </article>
                `).join("")}
            </div>
        `;
    }

    /* -----------------------------------------------------
       6. HOME PAGE
       ----------------------------------------------------- */

    function renderHome(data) {
        const personal = data.personal || {};
        const home = data.home || {};

        const heroImage = safeImagePath(personal.heroImage);

        const heroImageMarkup = heroImage
            ? `
                <div class="hero-image-wrap">
                    <div class="hero-image-decoration" aria-hidden="true"></div>

                    <div class="hero-image-frame">
                        ${renderImage(
                            heroImage,
                            personal.heroImageAlt || personal.name || "Portfolio portrait",
                            "hero-image",
                            'fetchpriority="high"'
                        )}
                    </div>

                    ${personal.heroCaption ? `
                        <div class="hero-image-caption">
                            ${escapeHTML(personal.heroCaption)}
                        </div>
                    ` : ""}
                </div>
            `
            : "";

        const showHighlights = home.showHighlights !== false;

        return `
            <section class="hero">
                <div class="container hero-grid">
                    <div class="hero-content">
                        ${home.eyebrow ? `
                            <span class="hero-eyebrow">
                                ${escapeHTML(home.eyebrow)}
                            </span>
                        ` : ""}

                        <h1 class="hero-title">
                            ${escapeHTML(home.headingStart || "Hi, I'm")}
                            <span class="accent">
                                ${escapeHTML(home.headingHighlight || personal.shortName || personal.name || "")}
                            </span>
                        </h1>

                        <p class="hero-description">
                            ${escapeHTML(home.description || personal.introduction || "")}
                        </p>

                        <div class="hero-actions">
                            <a class="btn btn-primary"
                               href="${escapeHTML(home.primaryButtonLink || "projects.html")}">
                                ${escapeHTML(home.primaryButtonText || "View My Work")}
                                <span aria-hidden="true">&rarr;</span>
                            </a>

                            <a class="btn btn-secondary"
                               href="${escapeHTML(home.secondaryButtonLink || "contact.html")}">
                                ${escapeHTML(home.secondaryButtonText || "Get in Touch")}
                            </a>
                        </div>
                    </div>

                    ${heroImageMarkup}
                </div>
            </section>

            ${showHighlights ? `
                <section class="section section--soft">
                    <div class="container">
                        ${renderSectionHeading(
                            "MY FOCUS",
                            home.highlightsTitle || "What I Do",
                            home.highlightsDescription || ""
                        )}

                        ${renderHighlightCards(home.highlights)}
                    </div>
                </section>
            ` : ""}
        `;
    }

    /* -----------------------------------------------------
       7. ABOUT PAGE
       ----------------------------------------------------- */

    function renderSkills(data) {
        const skills = Array.isArray(data.skills) ? data.skills : [];

        if (skills.length === 0) {
            return `<p class="muted">No skills have been added yet.</p>`;
        }

        return `
            <div class="skills-grid">
                ${skills.map((skill) => `
                    <article class="skill-card">
                        ${safeImagePath(skill.image) ? `
                            <div class="skill-image">
                                ${renderImage(
                                    skill.image,
                                    skill.imageAlt || skill.title,
                                    ""
                                )}
                            </div>
                        ` : ""}

                        <h3 class="skill-title">
                            ${escapeHTML(skill.title)}
                        </h3>

                        <p class="skill-description">
                            ${escapeHTML(skill.description)}
                        </p>
                    </article>
                `).join("")}
            </div>
        `;
    }

    function renderTechnologies(data) {
        const technologies = Array.isArray(data.technologies)
            ? data.technologies
            : [];

        if (technologies.length === 0) {
            return `<p class="muted">No technologies have been added yet.</p>`;
        }

        return `
            <div class="tech-grid">
                ${technologies.map((technology) => `
                    <div class="tech-card">
                        ${safeImagePath(technology.image) ? `
                            <div class="tech-icon">
                                ${renderImage(
                                    technology.image,
                                    technology.imageAlt || technology.name,
                                    ""
                                )}
                            </div>
                        ` : ""}

                        <span class="tech-name">
                            ${escapeHTML(technology.name)}
                        </span>
                    </div>
                `).join("")}
            </div>
        `;
    }

    function renderAbout(data) {
        const personal = data.personal || {};
        const paragraphs = Array.isArray(personal.aboutParagraphs)
            ? personal.aboutParagraphs
            : [];

        const aboutImage = safeImagePath(personal.aboutImage);

        const imageMarkup = aboutImage
            ? `
                <div class="about-image-wrap">
                    ${renderImage(
                        aboutImage,
                        personal.aboutImageAlt || personal.name,
                        "about-image"
                    )}
                </div>
            `
            : "";

        return `
            <section class="page-header">
                <div class="container">
                    ${renderSectionHeading(
                        "GET TO KNOW ME",
                        "About Me",
                        personal.aboutIntroduction || personal.introduction || ""
                    )}
                </div>
            </section>

            <section class="section">
                <div class="container about-grid">
                    ${imageMarkup}

                    <div class="about-copy">
                        ${paragraphs.length
                            ? paragraphs.map((paragraph) => `
                                <p class="mb-3">${escapeHTML(paragraph)}</p>
                            `).join("")
                            : `<p>${escapeHTML(personal.aboutIntroduction || "")}</p>`
                        }

                        <div class="cluster mt-4">
                            <a class="btn btn-primary" href="experience.html">
                                Work Experience
                            </a>

                            <a class="btn btn-secondary" href="education.html">
                                Education
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section section--soft">
                <div class="container">
                    ${renderSectionHeading(
                        "WHAT I BRING",
                        "Skills",
                        "A selection of my professional and technical strengths."
                    )}

                    ${renderSkills(data)}
                </div>
            </section>

            <section class="section">
                <div class="container">
                    ${renderSectionHeading(
                        "TOOLS I USE",
                        "Programming & Design Technologies",
                        "Technologies and tools included in my development and design background."
                    )}

                    ${renderTechnologies(data)}
                </div>
            </section>
        `;
    }

    /* -----------------------------------------------------
       8. WORK EXPERIENCE PAGE
       ----------------------------------------------------- */

    function renderExperience(data) {
        const experience = Array.isArray(data.experience)
            ? data.experience
            : [];

        if (experience.length === 0) {
            return `
                <section class="page-header">
                    <div class="container">
                        ${renderSectionHeading(
                            "MY PROFESSIONAL JOURNEY",
                            "Work Experience",
                            "Professional roles and practical experience."
                        )}
                    </div>
                </section>

                <section class="page-content">
                    <div class="container">
                        <p class="muted">No work experience entries have been added yet.</p>
                    </div>
                </section>
            `;
        }

        return `
            <section class="page-header">
                <div class="container">
                    ${renderSectionHeading(
                        "MY PROFESSIONAL JOURNEY",
                        "Work Experience",
                        "Professional roles, responsibilities, and practical experience."
                    )}
                </div>
            </section>

            <section class="page-content">
                <div class="container">
                    <div class="timeline">
                        ${experience.map((item) => `
                            <article class="timeline-item">
                                <span class="timeline-date">
                                    ${escapeHTML(formatDateRange(item))}
                                </span>

                                <h2 class="timeline-title">
                                    ${escapeHTML(item.position)}
                                </h2>

                                <p class="timeline-organization">
                                    ${escapeHTML(item.organization)}
                                    ${item.location ? ` &middot; ${escapeHTML(item.location)}` : ""}
                                </p>

                                <p class="timeline-description">
                                    ${escapeHTML(item.description)}
                                </p>

                                ${Array.isArray(item.responsibilities) && item.responsibilities.length
                                    ? `
                                        <div class="mt-3">
                                            <strong>Key Responsibilities</strong>
                                            ${renderList(item.responsibilities)}
                                        </div>
                                    `
                                    : ""
                                }
                            </article>
                        `).join("")}
                    </div>
                </div>
            </section>
        `;
    }

    /* -----------------------------------------------------
       9. EDUCATION PAGE
       ----------------------------------------------------- */

    function renderEducation(data) {
        const education = Array.isArray(data.education)
            ? data.education
            : [];

        return `
            <section class="page-header">
                <div class="container">
                    ${renderSectionHeading(
                        "MY ACADEMIC BACKGROUND",
                        "Educational Background",
                        "Education, qualifications, and relevant academic achievements."
                    )}
                </div>
            </section>

            <section class="page-content">
                <div class="container">
                    ${education.length ? `
                        <div class="timeline">
                            ${education.map((item) => `
                                <article class="timeline-item">
                                    <span class="timeline-date">
                                        ${escapeHTML(formatDateRange(item))}
                                    </span>

                                    <h2 class="timeline-title">
                                        ${escapeHTML(item.qualification)}
                                    </h2>

                                    <p class="timeline-organization">
                                        ${escapeHTML(item.institution)}
                                        ${item.location ? ` &middot; ${escapeHTML(item.location)}` : ""}
                                    </p>

                                    <p class="timeline-description">
                                        ${escapeHTML(item.description)}
                                    </p>

                                    ${Array.isArray(item.achievements) && item.achievements.length
                                        ? `
                                            <div class="mt-3">
                                                <strong>Achievements</strong>
                                                ${renderList(item.achievements)}
                                            </div>
                                        `
                                        : ""
                                    }
                                </article>
                            `).join("")}
                        </div>
                    ` : `
                        <p class="muted">No education entries have been added yet.</p>
                    `}
                </div>
            </section>
        `;
    }

    /* -----------------------------------------------------
       10. PROJECTS PAGE
       Project cards are informational and have no links.
       ----------------------------------------------------- */

    function renderProjects(data) {
        const projects = Array.isArray(data.projects)
            ? data.projects
            : [];

        return `
            <section class="page-header">
                <div class="container">
                    ${renderSectionHeading(
                        "SELECTED WORK",
                        "My Projects",
                        "A selection of projects highlighting my development experience and technical skills."
                    )}
                </div>
            </section>

            <section class="page-content">
                <div class="container">
                    ${projects.length ? `
                        <div class="project-grid">
                            ${projects.map((project) => `
                                <article class="project-card">
                                    ${safeImagePath(project.image) ? `
                                        <div class="project-image-wrap">
                                            ${renderImage(
                                                project.image,
                                                project.imageAlt || project.title,
                                                "project-image"
                                            )}
                                        </div>
                                    ` : ""}

                                    <div class="project-content">
                                        <h2 class="project-title">
                                            ${escapeHTML(project.title)}
                                        </h2>

                                        <p class="project-description">
                                            ${escapeHTML(project.description)}
                                        </p>

                                        ${Array.isArray(project.technologies) &&
                                          project.technologies.length ? `
                                            <div class="project-tags"
                                                 aria-label="Technologies used">
                                                ${project.technologies.map((technology) => `
                                                    <span class="tag">
                                                        ${escapeHTML(technology)}
                                                    </span>
                                                `).join("")}
                                            </div>
                                        ` : ""}
                                    </div>
                                </article>
                            `).join("")}
                        </div>
                    ` : `
                        <p class="muted">No projects have been added yet.</p>
                    `}
                </div>
            </section>
        `;
    }



/* -----------------------------------------------------
   11. CONTACT PAGE
   ----------------------------------------------------- */

    function renderContact(data) {
        const contact = data.contact || {};

        const phone = safePhone(contact.phone);
        const email = safeEmail(contact.email);
        const address = String(contact.address ?? "").trim();
        const mapURL = safeWebURL(contact.mapUrl);

        const contactIcons = {
            phone: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2
                        19.8 19.8 0 0 1-8.6-3.1
                        19.4 19.4 0 0 1-6-6
                        19.8 19.8 0 0 1-3.1-8.6
                        A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7
                        l.5 2.8a2 2 0 0 1-.6 1.9L7.7 9.7
                        a16 16 0 0 0 6.6 6.6l1.3-1.3
                        a2 2 0 0 1 1.9-.6l2.8.5
                        a2 2 0 0 1 1.7 2Z"/>
                </svg>
            `,
            email: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                    <path d="m3 7 9 6 9-6"/>
                </svg>
            `,
            location: `
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10
                        a8 8 0 1 1 16 0Z"/>
                    <circle cx="12" cy="10" r="2.5"/>
                </svg>
            `
        };

        return `
            <section class="page-header">
                <div class="container">
                    ${renderSectionHeading(
                        "LET'S CONNECT",
                        "Contact",
                        "You can reach me through the contact details below."
                    )}
                </div>
            </section>

            <section class="page-content contact-section">
                <div class="container">
                    <article class="contact-card">

                        <div class="contact-details">
                            <div class="contact-intro">
                                <span class="contact-eyebrow">
                                    GET IN TOUCH
                                </span>

                                <h2 class="contact-title">
                                    Let's start a conversation.
                                </h2>

                                <p class="contact-description">
                                    Have a question or an opportunity?
                                    Feel free to reach out using the details below.
                                </p>
                            </div>

                            <div class="contact-list">

                                <div class="contact-item">
                                    <div class="contact-icon">
                                        ${contactIcons.phone}
                                    </div>

                                    <div class="contact-item-content">
                                        <span class="contact-label">
                                            Phone Number
                                        </span>

                                        ${phone ? `
                                            <a
                                                class="contact-value"
                                                href="tel:${escapeHTML(phone.replace(/[^\d+]/g, ""))}"
                                            >
                                                ${escapeHTML(phone)}
                                            </a>
                                        ` : `
                                            <span class="contact-value">
                                                Add your phone number in data.js
                                            </span>
                                        `}
                                    </div>
                                </div>

                                <div class="contact-item">
                                    <div class="contact-icon">
                                        ${contactIcons.email}
                                    </div>

                                    <div class="contact-item-content">
                                        <span class="contact-label">
                                            Email Address
                                        </span>

                                        ${email ? `
                                            <a
                                                class="contact-value"
                                                href="mailto:${escapeHTML(email)}"
                                            >
                                                ${escapeHTML(email)}
                                            </a>
                                        ` : `
                                            <span class="contact-value">
                                                Add your email address in data.js
                                            </span>
                                        `}
                                    </div>
                                </div>

                                <div class="contact-item">
                                    <div class="contact-icon">
                                        ${contactIcons.location}
                                    </div>

                                    <div class="contact-item-content">
                                        <span class="contact-label">
                                            Address
                                        </span>

                                        ${address ? `
                                            <span class="contact-value">
                                                ${escapeHTML(address)}
                                            </span>

                                            ${mapURL ? `
                                                <a
                                                    class="contact-map-link"
                                                    href="${escapeHTML(mapURL)}"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Map
                                                    <span aria-hidden="true">↗</span>
                                                </a>
                                            ` : ""}
                                        ` : `
                                            <span class="contact-value">
                                                Add your address in data.js
                                            </span>
                                        `}
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="contact-visual">
                            <img
                                src="assets/images/contact.svg"
                                alt="Contact illustration"
                                class="contact-image"
                                loading="lazy"
                            />
                        </div>

                    </article>
                </div>
            </section>
        `;
    }


    /* -----------------------------------------------------
       12. PAGE RENDERER
       ----------------------------------------------------- */

    function renderPage(data, currentPage) {
        const pageRenderers = {
            home: renderHome,
            about: renderAbout,
            experience: renderExperience,
            education: renderEducation,
            projects: renderProjects,
            contact: renderContact
        };

        const renderer = pageRenderers[currentPage] || renderHome;

        return renderer(data);
    }

    /* -----------------------------------------------------
       13. PAGE INITIALIZATION
       ----------------------------------------------------- */

    function initializePortfolio() {
        const data = getPortfolioData();

        if (!data) {
            return;
        }

        const currentPage = getCurrentPage();
        const personal = data.personal || {};

        // Update browser tab title.
        const pageInfo = PAGE_LIST.find(
            (page) => page.key === currentPage
        );

        const siteTitle = personal.siteTitle || personal.name || "Portfolio";

        document.title = currentPage === "home"
            ? siteTitle
            : `${pageInfo?.label || "Portfolio"} | ${siteTitle}`;

        // Render or reuse the header host.
        let headerHost = document.querySelector("[data-site-header]");

        if (!headerHost) {
            headerHost = document.querySelector("#site-header");
        }

        if (!headerHost) {
            headerHost = document.createElement("div");
            headerHost.id = "site-header";
            document.body.prepend(headerHost);
        }

        headerHost.innerHTML = renderNavigation(data, currentPage);

        // Render the current page.
        let contentHost = document.querySelector("[data-page-content]");

        if (!contentHost) {
            contentHost = document.querySelector("#page-content");
        }

        if (!contentHost) {
            contentHost = document.querySelector("main");
        }

        if (!contentHost) {
            contentHost = document.createElement("main");
            contentHost.id = "page-content";

            const footer = document.querySelector(
                "[data-site-footer], #site-footer, footer"
            );

            if (footer) {
                document.body.insertBefore(contentHost, footer);
            } else {
                document.body.appendChild(contentHost);
            }
        }

        contentHost.classList.add("page-transition");
        contentHost.innerHTML = renderPage(data, currentPage);

        // Render or reuse the footer host.
        let footerHost = document.querySelector("[data-site-footer]");

        if (!footerHost) {
            footerHost = document.querySelector("#site-footer");
        }

        if (!footerHost) {
            footerHost = document.querySelector("footer");

            // Do not replace a footer nested inside the page content.
            if (footerHost && contentHost.contains(footerHost)) {
                footerHost = null;
            }
        }

        if (!footerHost) {
            footerHost = document.createElement("div");
            footerHost.id = "site-footer";
            document.body.appendChild(footerHost);
        }

        footerHost.innerHTML = renderFooter(data);

        // Initialize menu interactions after rendering the header.
        initializeNavigation();

        // Update active navigation state using the current page.
        document.querySelectorAll(".nav-link").forEach((link) => {
            const destination = link.getAttribute("href");

            if (destination === pageInfo?.href) {
                link.classList.add("active");
                link.setAttribute("aria-current", "page");
            } else {
                link.classList.remove("active");
                link.removeAttribute("aria-current");
            }
        });
    }

    /* -----------------------------------------------------
       14. START
       ----------------------------------------------------- */

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initializePortfolio,
            { once: true }
        );
    } else {
        initializePortfolio();
    }
})();
