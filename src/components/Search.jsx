import { useState } from "react";
import "../sass/themes/Search.scss";
import Arrow from "../assets/arrow.svg";
import { auth, db } from "../../server/firebaseConnection";
import { useNavigate } from "react-router-dom";

function Search({ setOpenSearchCard }) {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedProfile, setSearchedProfile] = useState([]);
  const navigate = useNavigate()

  const closeCard = () => {
    setOpenSearchCard(false);
  };

  const searchForUser = () => {
    // await db.collection("posts")
    //   .where("username", "==", searchedValue)
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.docs.map((data) => alert(data.id));
    //   });

    db.collection("posts")
      .where("username", "==", searchedValue)
      .onSnapshot((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setSearchedProfile({
            id: doc.id,
            profile: doc.data(),
          });
        });
      });

      navigate(`/results?userName=${searchedProfile.profile.username}&image=${searchedProfile.profile.imageURL}/id=${searchedProfile.id}`)

    console.log(searchedProfile);
  };

  return (
    <div className="Search-container">
      <div className="search-header">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearchedValue(e.target.value)}
        />
        <button className="searchBtn" onClick={searchForUser}>
          Search
        </button>
      </div>
      {searchedProfile.length > 0 &&
        searchedProfile.map(({ profile }) => (
          <>
            <img src={profile.imageURL} alt="" />
            <span>{profile.username}</span>
          </>
        ))}
      {/* <p>what are you </p> */}
      <p id="back" onClick={closeCard}>
        <img src={Arrow} alt="back" style={{ width: "20px" }} /> Back
      </p>
    </div>
  );
}

export default Search;
