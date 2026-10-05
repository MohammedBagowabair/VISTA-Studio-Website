import { useEffect, useRef, useState, type FormEvent } from "react";
import { ABOUT_IMG, HERO_IMG, img, projects, services, stats } from "./data";

const NAV = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="VISTA Studio home">
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" fill="currentColor" />
        <path d="M12 14h10l10 26 10-26h10L37 52H27z" fill="var(--logo-ink)" />
        <rect x="44" y="44" width="10" height="10" fill="#2B5CFF" />
      </svg>
      <span>VISTA<em>Studio</em></span>
    </a>
  );
}

function Arrow({ dir = "right" }: { dir?: "right" | "left" | "up" }) {
  const rot = dir === "left" ? 180 : dir === "up" ? -45 : 0;
  return (
    <svg className="arrow" viewBox="0 0 24 24" style={{ transform: `rotate(${rot}deg)` }} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-open" : ""}`}>
        <div className="header__inner">
          <Logo />
          <nav className="header__nav" aria-label="Primary">
            {NAV.map((n, i) => (
              <a key={n.id} href={`#${n.id}`}>
                <sup>0{i + 1}</sup>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn--blue header__cta">
            Start a project <Arrow dir="up" />
          </a>
          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav className="menu__nav" aria-label="Mobile">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}>
              <span className="menu__no">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href="mailto:hello@vista.studio">hello@vista.studio</a>
          <span>Riyadh — Worldwide</span>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__copy">
          <p className="eyebrow"><span className="dot" /> Interior architecture · Riyadh / Worldwide</p>
          <h1 className="hero__title">
            <span>Spaces</span>
            <span>with a</span>
            <span><i>point</i></span>
            <span>of view<b>.</b></span>
          </h1>
          <div className="hero__row">
            <p className="hero__lead">
              VISTA is a bold interior architecture studio. We design homes, workplaces and hospitality spaces with
              strong lines, honest materials and zero filler.
            </p>
            <div className="hero__actions">
              <a href="#work" className="btn btn--black">See the work <Arrow /></a>
              <a href="#contact" className="btn btn--line">Book a call</a>
            </div>
          </div>
        </div>
        <figure className="hero__media">
          <img src={img(HERO_IMG, 1400)} alt="Open-plan modern living space with timber wall and black steel glazing" fetchPriority="high" />
          <figcaption>
            <span>Featured</span>
            <strong>Al Malqa Pavilion House</strong>
            <span>Riyadh · 2026</span>
          </figcaption>
          <div className="hero__badge" aria-hidden="true">
            <svg className="hero__ring" viewBox="0 0 120 120">
              <defs><path id="circ" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" /></defs>
              <text><textPath href="#circ">VISTA STUDIO · EST. 2017 · RIYADH · </textPath></text>
            </svg>
            <Arrow dir="up" />
          </div>
        </figure>
      </div>

      <div className="hero__stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.n}<sup>{s.s}</sup></strong>
            <span>{s.label}</span>
          </div>
        ))}
        <a href="#work" className="hero__scroll">Scroll <Arrow /></a>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              Residential <i>✦</i> Workplace <i>✦</i> Hospitality <i>✦</i> Retail <i>✦</i> Interior architecture <i>✦</i> FF&amp;E <i>✦</i>{" "}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const onScroll = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      setProgress(max > 0 ? rail.scrollLeft / max : 0);
    };
    onScroll();
    rail.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      rail.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".card");
    rail.scrollBy({ left: dir * ((card?.offsetWidth ?? 500) + 32), behavior: "smooth" });
  };

  return (
    <section className="work" id="work">
      <div className="work__head">
        <div>
          <p className="eyebrow eyebrow--light"><span className="dot" /> Selected work</p>
          <h2 className="h2">Projects<sup>(05)</sup></h2>
        </div>
        <p className="work__intro">
          Five recent spaces across the Gulf and Europe. Each one starts with a single strong idea and gets built
          around it.
        </p>
        <div className="work__ctrl">
          <button onClick={() => nudge(-1)} aria-label="Previous project"><Arrow dir="left" /></button>
          <button onClick={() => nudge(1)} aria-label="Next project"><Arrow /></button>
        </div>
      </div>

      <div className="work__rail" ref={railRef}>
        {projects.map((p) => (
          <article className="card" key={p.no}>
            <div className="card__media">
              <img src={img(p.image, 1200)} alt={`${p.title}, ${p.place}`} loading="lazy" />
              <span className="card__type">{p.type}</span>
            </div>
            <div className="card__body">
              <span className="card__no">{p.no}</span>
              <div className="card__text">
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <dl>
                  <div><dt>Location</dt><dd>{p.place}</dd></div>
                  <div><dt>Area</dt><dd>{p.area}</dd></div>
                  <div><dt>Year</dt><dd>{p.year}</dd></div>
                </dl>
              </div>
            </div>
          </article>
        ))}
        <a className="card card--end" href="#contact">
          <span>Your project<br />could be<br /><b>No. 06</b></span>
          <Arrow dir="up" />
        </a>
      </div>
      <div className="work__bar"><span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} /></div>
    </section>
  );
}

function Services() {
  return (
    <section className="services" id="services">
      <div className="services__head">
        <p className="eyebrow"><span className="dot" /> What we do</p>
        <h2 className="h2">Four disciplines.<br /><span className="blue">One studio.</span></h2>
      </div>
      <div className="services__grid">
        {services.map((s) => (
          <article className="svc" key={s.no}>
            <span className="svc__no">{s.no}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <ul>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section className="studio" id="studio">
      <div className="studio__grid">
        <div className="studio__big">
          <span className="studio__num">09</span>
          <span className="studio__cap">years of designing<br />with conviction</span>
        </div>
        <div className="studio__copy">
          <p className="eyebrow eyebrow--light"><span className="dot dot--white" /> The studio</p>
          <p className="studio__quote">
            “We don't decorate rooms. We give every space a clear idea, then remove everything that doesn't serve it.”
          </p>
          <p className="studio__sig"><strong>Sara Al-Qahtani</strong> Founder &amp; Design Director</p>
          <ol className="studio__steps">
            <li><b>01</b> Brief &amp; site</li>
            <li><b>02</b> Concept</li>
            <li><b>03</b> Detail</li>
            <li><b>04</b> Build &amp; style</li>
          </ol>
        </div>
        <figure className="studio__img">
          <img src={img(ABOUT_IMG, 1000)} alt="Bright interior with a yellow lounge chair and graphic artwork" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="contact" id="contact">
      <div className="contact__grid">
        <div>
          <p className="eyebrow eyebrow--light"><span className="dot" /> Contact</p>
          <h2 className="contact__title">Let's build<br />something <span className="blue">bold.</span></h2>
          <a className="contact__mail" href="mailto:hello@vista.studio">hello@vista.studio <Arrow dir="up" /></a>
          <div className="contact__info">
            <div><span>Studio</span>King Fahd Rd, Olaya<br />Riyadh, Saudi Arabia</div>
            <div><span>Phone</span>+966 11 000 0000</div>
            <div><span>Follow</span>Instagram · Behance · LinkedIn</div>
          </div>
        </div>
        <form className="form" onSubmit={onSubmit}>
          {sent ? (
            <div className="form__done">
              <strong>Thank you.</strong>
              <p>We'll reply within two working days.</p>
            </div>
          ) : (
            <>
              <label><span>Name</span><input required name="name" placeholder="Your name" /></label>
              <label><span>Email</span><input required type="email" name="email" placeholder="you@email.com" /></label>
              <fieldset>
                <legend>Project type</legend>
                {["Residential", "Workplace", "Hospitality", "Retail"].map((t, i) => (
                  <label key={t} className="chip">
                    <input type="radio" name="type" value={t} defaultChecked={i === 0} />
                    <span>{t}</span>
                  </label>
                ))}
              </fieldset>
              <label><span>Tell us about it</span><textarea name="msg" rows={3} placeholder="Location, size, timeline…" /></label>
              <button className="btn btn--blue btn--wide" type="submit">Send enquiry <Arrow /></button>
            </>
          )}
        </form>
      </div>
      <footer className="footer">
        <span className="footer__word" aria-hidden="true">VISTA</span>
        <div className="footer__row">
          <span>© {new Date().getFullYear()} VISTA Studio</span>
          <span>Interior Architecture · Riyadh / Worldwide</span>
          <a href="#top">Back to top <Arrow dir="up" /></a>
        </div>
      </footer>
    </section>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Work />
        <Services />
        <Studio />
        <Contact />
      </main>
    </>
  );
}
