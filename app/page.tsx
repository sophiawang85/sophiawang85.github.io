import { ArrowUpRight } from 'lucide-react';
import { Ambient, NavSpy } from './ambient';

const code = 'https://github.com/weblab-class/thehorseemoji';
const studio = { demo: 'https://classification-studio-sihanwang.streamlit.app/', repo: 'https://github.com/sophiawang85/classification-studio' };
const androidProjects = [
  { name: 'FitCheck', number: '03', label: 'ANDROID / DAILY CALORIE JOURNAL', description: 'A daily food journal that turns servings and calorie entries into a visual history. Organize meals by date, track totals, and review trends.', detail: 'I modeled dates, foods, and history records in Room, connected the screens through ViewModels and LiveData, and built line and pie charts with MPAndroidChart.', repo: 'FitCheck-Android-Studio-App', entities: ['Date', 'Food entries', 'Calorie history'], accent: 'fitcheck', outcome: 'From daily entries to clear trends.' },
  { name: 'Alpha List', number: '04', label: 'ANDROID / SHOPPING & SPENDING', description: 'A shopping organizer that connects categorized lists to purchase history. Plan what to buy, record purchases, and see where the money goes.', detail: 'I built a relational model for shopping groups, items, and transactions, with reactive lists, sortable purchase history, and spending breakdowns by category.', repo: 'Alpha-List-Android-Studio-App', entities: ['Shopping groups', 'Items', 'Transactions'], accent: 'alphalist', outcome: 'From a shopping list to a spending picture.' },
];
const chips = (tags: string[]) => <div className="chips">{tags.map(t => <span className="chip" key={t}>{t}</span>)}</div>;
const ext = { target: '_blank', rel: 'noreferrer' };

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Ambient />
    <NavSpy />
    <header className="shell topbar glass">
      <a className="logo" href="#top" aria-label="Sihan Wang home">sw<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#top">Home</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
    </header>

    <main className="shell" id="main">
      <section className="hero" id="top" aria-label="Introduction">
        <p className="kicker">math + cs @ mit · ml systems · games · apps</p>
        <h1>Sihan Wang</h1>
        <div className="intro glass">
          <p>I study mathematics and computer science at MIT. Recently I’ve worked on LLM inference infrastructure, an end-to-end machine-learning app, a multiplayer web game, and a couple of Android apps.</p>
          <div className="actions">
            <a className="btn btn-primary" href="/Sihan-Wang-Resume.pdf" {...ext}>View résumé <ArrowUpRight size={16} /></a>
            <a className="btn btn-ghost" href="https://github.com/sophiawang85" {...ext}>GitHub <ArrowUpRight size={16} /></a>
            <a className="btn btn-ghost" href="mailto:sopwg612@mit.edu">Email <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <a className="scroll-hint" href="#experience">↓ explore</a>
      </section>

      <section id="experience">
        <div className="section-head"><h2>Experience</h2><p>where i’ve worked</p></div>
        <div className="jobs">
          <article className="job glass">
            <div><h3>DeepInfra</h3><p className="role">Software Engineering Intern</p><span className="date">May – August 2026</span></div>
            <div><p>Built a service-tier request scheduler for LLM inference, reducing priority-tier time to first token by approximately 50% through priority queuing in the batching and routing pipeline.</p><p>Doubled inference throughput by tuning batch sizes, KV-cache, and speculative decoding with TensorRT-LLM and vLLM.</p>
              <div className="metrics"><div className="metric"><strong>~50%</strong><span>lower priority-tier latency</span></div><div className="metric"><strong>2×</strong><span>inference throughput</span></div></div></div>
          </article>
          <article className="job glass">
            <div><h3>MIT Media Lab</h3><p className="role">Undergraduate Researcher<br />Multisensory Intelligence Group</p><span className="date">January – May 2026</span></div>
            <div><p>Designed and collected a multimodal dataset of sound, image, and text using piezoelectric film sensors across 22 materials, exploring sampling rates, signal lengths, and repetition.</p></div>
          </article>
          <article className="job glass">
            <div><h3>MIT IMES</h3><p className="role">Undergraduate Researcher</p><span className="date">August 2025 – January 2026</span></div>
            <div><p>Built a Neo4j graph of more than 2,000 publications to tell apart researchers who share a name, linking papers by shared co-authors, shared venues, TF-IDF title similarity, and shared keywords, a signal I added.</p><p>Clustered the graph with Leiden under the Constant Potts Model, which keeps small but real author clusters from being absorbed into larger ones, and built an OpenAlex test set of name variants, where “D. Nathan” alone maps to 976 author IDs.</p>
              <div className="metrics"><div className="metric"><strong>2,000+</strong><span>publications clustered</span></div><div className="metric"><strong>976</strong><span>author IDs behind one name variant</span></div></div>
              <a className="text-link" href="https://github.com/sophiawang85/NameDisambiguationSubgroup_Fall2025" {...ext}>Code and write-up <ArrowUpRight size={15} /></a></div>
          </article>
        </div>
      </section>

      <section id="projects">
        <div className="section-head"><h2>Projects</h2><p>a few things i’ve built</p></div>
        <div className="projects">
          <article className="feature glass">
            <div className="media studio"><span className="badge">new · ml app</span><img className="shot" src="/projects/classification-studio.jpg" width="1600" height="834" alt="Classification Studio's overview tab: the question being answered and six step cards from loading the data to the 72.5% test accuracy" /></div>
            <div className="copy">
              <p className="eyebrow">01 / Python · Machine learning</p>
              <h3>Classification Studio</h3>
              <p className="muted">Upload labeled tabular data and get the whole analysis: automatic cleaning, a leak-free scikit-learn pipeline, and a model chosen from six families by stratified cross-validation. New files are scored live, and an on-demand AI agent explains any prediction and answers what-if questions.</p>
              <ul className="highlights">
                <li>Exact Shapley values over all 128 feature coalitions, so contributions add up to each prediction</li>
                <li>A local open-source LLM agent (Ollama) with guardrails that fact-check its answers against the model</li>
                <li>Robust to messy uploads: renamed or missing columns, bad values, unseen categories</li>
              </ul>
              {chips(['Python', 'scikit-learn', 'Streamlit', 'Plotly', 'Ollama'])}
              <div className="links"><a className="text-link" href={studio.demo} {...ext}>Live demo <ArrowUpRight size={15} /></a><a className="text-link" href={studio.repo} {...ext}>Code <ArrowUpRight size={15} /></a></div>
            </div>
          </article>

          <article className="feature glass">
            <div className="media easel"><span className="badge">1st place · MIT Web.lab 2026</span><h3>Panic!<br /><em>at the Easel</em></h3><img src="/projects/easel-character.png" alt="The game's illustrated museum curator, panicking in a beret and blue glasses" width="1206" height="1682" /></div>
            <div className="copy">
              <p className="eyebrow">02 / Featured · Team Horsemoji</p>
              <h3>Panic! at the Easel</h3>
              <p className="muted">A fast-paced drawing and matching game for up to eight players. Write a prompt, race to draw someone else’s idea, then reunite the artwork with its title.</p>
              <p className="role-line">My role: Backend developer · Team of three · January 2026</p>
              {chips(['JavaScript', 'React', 'Node.js', 'Socket.IO', 'MongoDB'])}
              <details>
                <summary>How a round works</summary>
                <ol className="steps"><li><strong>Write a prompt</strong>: contribute ideas to the shared pool.</li><li><strong>Draw someone else’s idea</strong>: race against the clock to make it recognizable.</li><li><strong>Match art to titles</strong>: identify other players’ drawings and earn points.</li></ol>
                <p className="small"><strong>Three rounds:</strong> standard drawing, invisible ink, and a final chaos round with a shared prompt pool.</p>
              </details>
              <details>
                <summary>Some notes on the backend</summary>
                <div className="notes">
                  <div><h4>Prompts without spoilers</h4><p>I built server-side assignment logic that shuffles prompts and distributes them to other players. Matching excludes both the prompt’s author and the artist, then favors players with fewer assigned tasks.</p><a className="text-link" href={`${code}/blob/main/server/api.js`} {...ext}>Assignment logic <ArrowUpRight size={14} /></a></div>
                  <div><h4>Scores that reward both sides</h4><p>Server-calculated scores combine how recognizable a player’s drawings are with their matching accuracy, applying different multipliers across rounds.</p></div>
                  <div><h4>A shared sense of time</h4><p>Socket.IO rooms carry phase changes, prompt counts, timers, and game-over events so players stay together through standard drawing, invisible ink, and the final chaos round.</p><a className="text-link" href={`${code}/blob/main/server/server-socket.js`} {...ext}>Live game updates <ArrowUpRight size={14} /></a></div>
                </div>
              </details>
              <div className="links"><a className="text-link" href={code} {...ext}>Explore the code <ArrowUpRight size={15} /></a></div>
            </div>
          </article>

          <div className="pair">
            {androidProjects.map(project => <article className="card glass" key={project.name}>
              <div className={`preview ${project.accent}`}>
                <p className="eyebrow">{project.label}</p>
                <h4>{project.outcome}</h4>
                {project.accent === 'alphalist'
                  ? <figure><img src="/projects/alpha-list-spending.png" width="484" height="280" alt="Alpha List spending chart showing the share of purchases in school, cooking, fruit, snacks, and bakery categories" loading="lazy" /><figcaption>Spending breakdown from the original app.</figcaption></figure>
                  : <><div className="flow" aria-label={`${project.name} data model`}>{project.entities.map((entity, i) => <span key={entity}>{entity}{i < 2 && <b aria-hidden="true"> →</b>}</span>)}</div><p className="caption">A look at the app’s data model</p></>}
              </div>
              <div className="body">
                <div className="title-row"><h3>{project.name}</h3><span>{project.number}</span></div>
                <p>{project.description}</p>
                <p>{project.detail}</p>
                {chips(['Java', 'Android Studio', 'Room / SQLite', 'LiveData'])}
                <div className="links"><a className="text-link" href={`https://github.com/sophiawang85/${project.repo}`} {...ext}>Read the project & code <ArrowUpRight size={15} /></a>{project.accent === 'fitcheck' && <a className="text-link" href="https://drive.google.com/file/d/19OEEOyiVielvLd2YAioemkrn-Qtz13oA/view" {...ext}>App showcase <ArrowUpRight size={15} /></a>}</div>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="about">
        <div className="section-head"><h2>About</h2><p>a little more about me</p></div>
        <div className="about">
          <div className="glass">
            <p>I like problems where a mathematical idea turns out to be useful in practice. At MIT, I study algorithms, machine learning, abstract algebra, probability, and statistics.</p>
            <p>Outside of code, I enjoy social deduction games, jump-roping, playing oboe, and volleyball. I also help organize the Harvard–MIT Math Tournament and MIT Informatics Tournament.</p>
          </div>
          <div className="glass">
            <dl>
              <div><dt>Education</dt><dd>MIT · B.S. Mathematics & CS<br />GPA: 5.0</dd></div>
              <div><dt>Recognition</dt><dd>USAMO & USAJMO qualifier<br />4× AIME qualifier · High score: 12<br />MIT Web.lab first place, 2026</dd></div>
              <div><dt>Tools I work with</dt><dd>Python, C++, Java, JavaScript<br />PyTorch, Docker, Kubernetes, Git<br />MongoDB, Neo4j, SQLite</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact glass">
          <p className="eyebrow">Let’s connect</p>
          <h2>Get in touch</h2>
          <p>I’d love to hear about software engineering and ML internship opportunities.</p>
          <a className="btn btn-primary" href="mailto:sopwg612@mit.edu">sopwg612@mit.edu <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <footer className="footer"><span>© 2026 Sihan Wang</span><div><a href="/Sihan-Wang-Resume.pdf" {...ext}>Résumé ↗</a><a href="https://github.com/sophiawang85" {...ext}>GitHub ↗</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  </>;
}
