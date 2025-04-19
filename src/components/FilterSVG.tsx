const FilterSVG = () => {
  // TODO: add level of colour blindness - https://www.inf.ufrgs.br/%7Eoliveira/pubs_files/CVD_Simulation/CVD_Simulation.html
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <filter id="protanopia" color-interpolation-filters="linearRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.567 0.433 0     0 0
              0.558 0.442 0     0 0
              0     0.242 0.758 0 0
              0     0     0     1 0"
          />
        </filter>

        <filter id="deuteranopia" color-interpolation-filters="linearRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.625 0.375 0     0 0
              0.7   0.3   0     0 0
              0     0.3   0.7   0 0
              0     0     0     1 0"
          />
        </filter>

        <filter id="tritanopia" color-interpolation-filters="linearRGB">
          <feColorMatrix
            type="matrix"
            values="
              0.95  0.05  0     0 0
              0     0.433 0.567 0 0
              0     0.475 0.525 0 0
              0     0     0     1 0"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default FilterSVG