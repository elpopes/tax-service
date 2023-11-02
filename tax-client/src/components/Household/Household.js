import SpouseDetails from "../Spouse/SpouseDetails";
function Household({ spouse, dependents, residence }) {
  return (
    <div>
      <h2>Household</h2>

      <div>
        <h3>Spouse</h3>
        <SpouseDetails />
      </div>

      <div>
        <h3>Dependents</h3>
        {/* List of dependents or Add Dependent Button */}
      </div>

      <div>
        <h3>Residence</h3>
        {/* Residence details or Edit Residence Button */}
      </div>
    </div>
  );
}

export default Household;
