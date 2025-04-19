const FilterSelector = ({ selected }: { selected: string }) => {
  const options = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];

  return (
    <select name="filter" defaultValue={selected}>
      {options.map((opt) => (
        <option value={opt} key={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export default FilterSelector