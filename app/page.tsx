import { ArrowUpRight } from 'lucide-react';

const code = 'https://github.com/weblab-class/thehorseemoji';
const androidProjects = [
  { name: 'FitCheck', number: '02', label: 'ANDROID / DAILY CALORIE JOURNAL', description: 'A daily food journal that turns servings and calorie entries into a visual history. Organize meals by date, track totals, and review trends.', detail: 'I modeled dates, foods, and history records in Room, connected the screens through ViewModels and LiveData, and built line and pie charts with MPAndroidChart.', repo: 'FitCheck-Android-Studio-App', entities: ['Date', 'Food entries', 'Calorie history'], accent: 'fitcheck', outcome: 'From daily entries to clear trends.' },
  { name: 'Alpha List', number: '03', label: 'ANDROID / SHOPPING & SPENDING', description: 'A shopping organizer that connects categorized lists to purchase history. Plan what to buy, record purchases, and see where the money goes.', detail: 'I built a relational model for shopping groups, items, and transactions, with reactive lists, sortable purchase history, and spending breakdowns by category.', repo: 'Alpha-List-Android-Studio-App', entities: ['Shopping groups', 'Items', 'Transactions'], accent: 'alphalist', outcome: 'From a shopping list to a spending picture.' },
];

export default function Home() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="shell">
      <a className="logo" href="#" aria-label="Sihan Wang home">sw<span>.</span></a>
      <nav aria-label="Main navigation"><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#about">About</a><a href="/Sihan-Wang-Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a><a href="mailto:sopwg612@mit.edu">Contact ↗</a></nav>
    </header>
    <main className="shell" id="main">
      <section className="hero" aria-label="Introduction">
        <h1>Sihan Wang<span>.</span></h1>
        <div className="intro">
          <div><p>I study mathematics and computer science at MIT. Recently I’ve worked on LLM inference infrastructure, a multiplayer web game, and a couple of Android apps.</p><a className="button" href="/Sihan-Wang-Resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={17}/></a><a className="github" href="https://github.com/sophiawang85" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        </div>
        <div className="meta"><span>Cambridge, MA</span></div>
      </section>
      <section className="experience" id="experience">
        <div className="heading"><p className="eyebrow">01 / EXPERIENCE</p><h2>Where I’ve worked.</h2></div>
        <div className="job"><div><h3>DeepInfra</h3><p>Software Engineering Intern</p><span className="date">May – August 2026</span></div><div><p>Built a service-tier request scheduler for LLM inference, reducing priority-tier time to first token by approximately 50% through priority queuing in the batching and routing pipeline.</p><p>Doubled inference throughput by tuning batch sizes, KV-cache, and speculative decoding with TensorRT-LLM and vLLM.</p><div className="metrics"><div><strong>~50%</strong><span>lower priority-tier latency</span></div><div><strong>2×</strong><span>inference throughput</span></div></div></div></div>
        <div className="job"><div><h3>MIT Media Lab</h3><p>Undergraduate Researcher<br/>Multisensory Intelligence Group</p><span className="date">January – May 2026</span></div><div><p>Designed and collected a multimodal dataset of sound, image, and text using piezoelectric film sensors across 22 materials, exploring sampling rates, signal lengths, and repetition.</p></div></div>
        <div className="job"><div><h3>MIT IMES</h3><p>Undergraduate Researcher</p><span className="date">August 2025 – January 2026</span></div><div><p>Built a Neo4j graph of more than 2,000 publications to tell apart researchers who share a name, linking papers by shared co-authors, shared venues, TF-IDF title similarity, and shared keywords, a signal I added.</p><p>Clustered the graph with Leiden under the Constant Potts Model, which keeps small but real author clusters from being absorbed into larger ones, and built an OpenAlex test set of name variants, where “D. Nathan” alone maps to 976 author IDs.</p><div className="metrics"><div><strong>2,000+</strong><span>publications clustered</span></div><div><strong>976</strong><span>author IDs behind one name variant</span></div></div><a className="job-link" href="https://github.com/sophiawang85/NameDisambiguationSubgroup_Fall2025" target="_blank" rel="noreferrer">Code and write-up ↗</a></div></div>
      </section>
      <section id="projects">
        <div className="heading"><p className="eyebrow">02 / SELECTED WORK</p><h2>A few things I’ve built.</h2></div>
        <article className="featured">
          <div className="art"><span className="award">1st place · MIT Web.lab 2026</span><h3>Panic!<br/><em>at the Easel</em></h3><img src="/projects/easel-character.png" alt="The game's illustrated museum curator, panicking in a beret and blue glasses" width="1206" height="1682"/></div>
          <div className="copy"><p className="eyebrow">FEATURED / TEAM HORSEMOJI</p><h3>Panic! at the Easel</h3><p>A fast-paced drawing and matching game for up to eight players. Write a prompt, race to draw someone else’s idea, then reunite the artwork with its title.</p><p className="role">My role: Backend developer · Team of three · January 2026</p><div className="tags">JavaScript · React · Node.js · Socket.IO · MongoDB</div><a href={code} target="_blank" rel="noreferrer">Explore the code ↗</a></div>
        </article>
        <div className="gameplay-overview">
          <div><p className="eyebrow">HOW A ROUND WORKS</p><h3>Write. Draw. Match.</h3><p>Each round starts with player-written prompts and ends with a gallery of everyone’s work.</p></div>
          <ol className="gameplay-steps"><li><strong>Write a prompt</strong><span>Contribute ideas to the shared pool.</span></li><li><strong>Draw someone else’s idea</strong><span>Race against the clock to make it recognizable.</span></li><li><strong>Match art to titles</strong><span>Identify other players’ drawings and earn points.</span></li></ol>
          <p className="round-note"><strong>Three rounds:</strong> standard drawing, invisible ink, and a final chaos round with a shared prompt pool.</p>
        </div>
        <div className="case-study">
          <div className="case-heading"><p className="eyebrow">BEHIND THE GAME</p><h3>Some notes on<br/>the backend.</h3><p>Beyond getting players into the same room, the server had to hand out prompts fairly and keep everyone’s view of the game in sync.</p></div>
          <div className="engineering-points">
            <div><span>01</span><div><h4>Prompts without spoilers</h4><p>I built server-side assignment logic that shuffles prompts and distributes them to other players. Matching excludes both the prompt’s author and the artist, then favors players with fewer assigned tasks.</p><a href={`${code}/blob/main/server/api.js`} target="_blank" rel="noreferrer">Assignment logic ↗</a></div></div>
            <div><span>02</span><div><h4>Scores that reward both sides</h4><p>Server-calculated scores combine how recognizable a player’s drawings are with their matching accuracy, applying different multipliers across rounds.</p></div></div>
            <div><span>03</span><div><h4>A shared sense of time</h4><p>Socket.IO rooms carry phase changes, prompt counts, timers, and game-over events so players stay together through standard drawing, invisible ink, and the final chaos round.</p><a href={`${code}/blob/main/server/server-socket.js`} target="_blank" rel="noreferrer">Live game updates ↗</a></div></div>
          </div>
        </div>
        <div className="android-grid">
          {androidProjects.map(project => <article className="android-project" key={project.name}>
            <div className={`data-preview ${project.accent}`}><span className="eyebrow">{project.label}</span><h3>{project.outcome}</h3>{project.accent === 'alphalist' ? <figure className="app-screenshot"><img src="/projects/alpha-list-spending.png" width="484" height="280" alt="Alpha List spending chart showing the share of purchases in school, cooking, fruit, snacks, and bakery categories" loading="lazy"/><figcaption>Spending breakdown from the original app.</figcaption></figure> : <><div className="entity-flow" aria-label={`${project.name} data model`}>{project.entities.map((entity, i) => <div key={entity}><span>{entity}</span>{i < 2 && <span className="flow-arrow" aria-hidden="true">→</span>}</div>)}</div><span className="preview-caption">A look at the app’s data model</span></>}</div>
            <div className="android-copy"><div className="project-title"><h3>{project.name}</h3><span>{project.number}</span></div><p>{project.description}</p><p>{project.detail}</p><div className="tags">Java · Android Studio · Room / SQLite · LiveData</div><div className="project-actions"><a className="text-link" href={`https://github.com/sophiawang85/${project.repo}`} target="_blank" rel="noreferrer">Read the project & code <ArrowUpRight size={16}/></a>{project.accent === 'fitcheck' && <a className="text-link" href="https://drive.google.com/file/d/19OEEOyiVielvLd2YAioemkrn-Qtz13oA/view" target="_blank" rel="noreferrer">App showcase <ArrowUpRight size={16}/></a>}</div></div>
          </article>)}
        </div>
      </section>
      <section className="about" id="about"><div><p className="eyebrow">03 / A LITTLE ABOUT ME</p><h2>A bit more<br/><em>about me.</em></h2><p>I like problems where a mathematical idea turns out to be useful in practice. At MIT, I study algorithms, machine learning, abstract algebra, probability, and statistics.</p><p>Outside of code, I enjoy social deduction games, jump-roping, playing oboe, and volleyball. I also help organize the Harvard–MIT Math Tournament and MIT Informatics Tournament.</p></div><div className="background"><h3>A few more dimensions</h3><dl><div><dt>Education</dt><dd>MIT · B.S. Mathematics & CS<br/>GPA: 5.0</dd></div><div><dt>Recognition</dt><dd>USAMO & USAJMO qualifier<br/>4× AIME qualifier · High score: 12<br/>MIT Web.lab first place, 2026</dd></div><div><dt>Tools I work with</dt><dd>Python, C++, Java, JavaScript<br/>PyTorch, Docker, Kubernetes, Git<br/>MongoDB, Neo4j, SQLite</dd></div></dl></div></section>
      <footer><p className="eyebrow">LET’S CONNECT</p><h2>Get in touch.</h2><p className="footer-intro">I’d love to hear about software engineering and ML internship opportunities.</p><a className="text-link" href="mailto:sopwg612@mit.edu">sopwg612@mit.edu <ArrowUpRight size={18}/></a><div className="footer-bottom"><span>© 2026 Sihan Wang</span><a href="/Sihan-Wang-Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a><a href="https://github.com/sophiawang85" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#">Back to top ↑</a></div></footer>
    </main>
  </>;
}
