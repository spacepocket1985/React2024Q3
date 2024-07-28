import styles from './Spinner.module.css';

export const Spinner = (): JSX.Element => {
  return (
    <div className={styles.spinner} data-testid="spinner">
      <h2>Loading ...</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle
            strokeLinecap="round"
            fill="none"
            strokeDasharray="50.26548245743669 50.26548245743669"
            stroke="#ff3f42"
            strokeWidth="8"
            r="32"
            cy="50"
            cx="50"
          >
            <animateTransform
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              repeatCount="indefinite"
              dur="1.4285714285714284s"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <circle
            strokeLinecap="round"
            fill="none"
            strokeDashoffset="36.12831551628262"
            strokeDasharray="36.12831551628262 36.12831551628262"
            stroke="#fdb130"
            strokeWidth="8"
            r="23"
            cy="50"
            cx="50"
          >
            <animateTransform
              values="0 50 50;-360 50 50"
              keyTimes="0;1"
              repeatCount="indefinite"
              dur="1.4285714285714284s"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
};
