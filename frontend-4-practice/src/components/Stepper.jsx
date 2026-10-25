const STEPS = [
  { label: 'Мастер', status: 'done' },
  { label: 'Услуга', status: 'done' },
  { label: 'Дата и время', status: 'current' },
  { label: 'Контакты', status: 'todo' },
  { label: 'Подтверждение', status: 'todo' }
];

function stepClass(status) {
  if (status === 'done') return 'step step--done';
  if (status === 'current') return 'step step--current';
  return 'step';
}

function Stepper() {
  return (
    <nav className="stepper" aria-label="Шаги записи">
      <div className="container stepper__inner">
        <ol className="stepper__list">
          {STEPS.map((step, index) => (
            <li
              className={stepClass(step.status)}
              key={step.label}
              aria-current={step.status === 'current' ? 'step' : undefined}
            >
              <span className="step__head">
                <span className="step__marker" aria-hidden="true">
                  {step.status === 'done' ? '✓' : index + 1}
                </span>
                <span className="step__label">{step.label}</span>
              </span>
              <span className="step__line" aria-hidden="true"></span>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default Stepper;
