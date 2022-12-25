import "../sass/themes/Search.scss";
import Arrow from "../assets/arrow.svg";
function Search({ setOpenSearchCard }) {

  const closeCard = () => {
    setOpenSearchCard(false)
  }

  return (
    <div className="Search-container">
      <input type="search" name="search" id="search" placeholder="Search..." />
      <p>What are you looking for?</p>
      <p id="back" onClick={closeCard}>
        <img src={Arrow} alt="back" style={{ width: "20px" }} /> Back
      </p>
    </div>
  );
}

export default Search;
