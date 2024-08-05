export const PrevArrow = ({ ...arrowProps }) => (
  <button {...arrowProps} style={{ background: "none", border: "none" }}>
    <i className="fas fa-angle-left"></i>
  </button>
);

export const NextArrow = ({ ...arrowProps }) => (
  <button {...arrowProps} style={{ background: "none", border: "none" }}>
    <i className="fas fa-angle-right"></i>
  </button>
);
