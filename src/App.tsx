import { useState } from "react";
import { bestRun } from "./data";

function formatMetric(value: number, digits: number) {
  return value.toFixed(digits);
}

export function App() {
  const [selectedStage, setSelectedStage] = useState(3);
  const [copied, setCopied] = useState(false);
  const stage = bestRun.stages[selectedStage];

  async function copySessionId() {
    await navigator.clipboard?.writeText(bestRun.sessionId);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#overview" aria-label="FlowState recorded run overview">
          <span className="wordmark__mark" aria-hidden="true">F</span>
          <span>FlowState</span>
        </a>
        <div className="topbar__context">
          <span className="recorded-badge"><span aria-hidden="true" /> Recorded demo</span>
          <span className="topbar__time">{bestRun.recordedAt}</span>
        </div>
      </header>

      <main id="overview" className="dashboard">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <h1 id="hero-title">The run stopped with evidence, not a guess.</h1>
            <p className="hero__copy">{bestRun.summary}</p>
          </div>
          <div className="selection-card" aria-label="Selected validation result">
            <span className="selection-card__label">VALIDATION-BEST</span>
            <strong>{formatMetric(bestRun.metrics[2].value, 6)}</strong>
            <span>Primary score</span>
            <div className="selection-card__delta">+{formatMetric(bestRun.metrics[2].delta, 6)} vs reproduced FM</div>
          </div>
        </section>

        <section className="notice" aria-label="Demo scope">
          <span className="notice__dot" aria-hidden="true" />
          <p><strong>Static session snapshot.</strong> This hosted demo contains recorded metadata only — no dataset, checkpoint, credentials, live model calls, or training controls.</p>
        </section>

        <section className="metrics-section" aria-labelledby="metrics-title">
          <div className="section-heading">
            <div>
              <h2 id="metrics-title">The selected run cleared the improvement threshold.</h2>
            </div>
            <span className="threshold">Required improvement: +0.002000</span>
          </div>
          <div className="metric-grid">
            {bestRun.metrics.map((metric, index) => (
              <article className={`metric-card ${index === 2 ? "metric-card--primary" : ""}`} key={metric.label}>
                <p>{metric.label}</p>
                <strong>{formatMetric(metric.value, metric.precision)}</strong>
                <div>
                  <span>FM {formatMetric(metric.baseline, metric.precision)}</span>
                  <span className="metric-card__delta">+{formatMetric(metric.delta, metric.precision)}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-grid" aria-label="Run audit details">
          <article className="panel timeline-panel">
            <div className="panel__heading">
              <div>
                <h2>One decision at a time.</h2>
              </div>
              <span className="count">5 recorded stages</span>
            </div>
            <ol className="timeline">
              {bestRun.stages.map((item, index) => {
                const active = index === selectedStage;
                return (
                  <li key={item.title}>
                    <button
                      className={`timeline__item ${active ? "timeline__item--active" : ""}`}
                      type="button"
                      onClick={() => setSelectedStage(index)}
                      aria-pressed={active}
                    >
                      <span className={`timeline__node timeline__node--${item.status}`} aria-hidden="true" />
                      <span className="timeline__time">{item.time}</span>
                      <span className="timeline__body"><strong>{item.title}</strong><small>{item.detail}</small></span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="stage-detail" aria-live="polite">
              <span className="stage-detail__label">SELECTED EVENT · {stage.time}</span>
              <p>{stage.detail}</p>
            </div>
          </article>

          <aside className="side-stack">
            <article className="panel facts-panel">
              <div className="panel__heading">
                <div>
                  <h2>Traceable output.</h2>
                </div>
              </div>
              <dl className="facts-list">
                <div><dt>Validation sample</dt><dd>{bestRun.evidence.validationRows} rows · {bestRun.evidence.validationUsers} users</dd></div>
                <div><dt>Prediction package</dt><dd>{bestRun.evidence.predictionRows} rows · {bestRun.evidence.predictionPasses} pass</dd></div>
                <div><dt>Schema and alignment</dt><dd className="good">{bestRun.evidence.schemaStatus}</dd></div>
                <div><dt>Event chain</dt><dd className="good">{bestRun.evidence.eventChain}</dd></div>
                <div><dt>Manual interventions</dt><dd>{bestRun.evidence.manualInterventions}</dd></div>
              </dl>
            </article>

            <article className="panel artifacts-panel">
              <div className="panel__heading">
                <div>
                  <h2>Artifacts retained.</h2>
                </div>
              </div>
              <ul className="artifact-list">
                {bestRun.artifacts.map(([kind, name, detail]) => (
                  <li key={name}><span className="artifact-list__icon" aria-hidden="true" /><span><strong>{kind}</strong><small>{name} · {detail}</small></span></li>
                ))}
              </ul>
              <button className="session-button" type="button" onClick={copySessionId}>
                {copied ? "Session ID copied" : "Copy session ID"}
              </button>
            </article>
          </aside>
        </section>

        <section className="integrity" aria-labelledby="integrity-title">
          <div className="integrity__lead">
            <h2 id="integrity-title">What the run was not allowed to do.</h2>
          </div>
          <ul>
            {bestRun.integrity.map((item) => <li key={item}><span className="integrity__check" aria-hidden="true" />{item}</li>)}
          </ul>
        </section>
      </main>

      <footer>
        <span>FlowState · best-run presentation snapshot</span>
        <span>{bestRun.experimentId}</span>
      </footer>
    </div>
  );
}
