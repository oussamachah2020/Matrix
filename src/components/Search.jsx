import { useEffect, useState } from "react";
import "../sass/themes/Search.scss";
import Arrow from "../assets/arrow.svg";
import { auth, db } from "../../server/firebaseConnection";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Search({ setOpenSearchCard }) {
  const [searchedValue, setSearchedValue] = useState("");
  const [searchedProfile, setSearchedProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [found, setFound] = useState(false);

  const navigate = useNavigate();

  const closeCard = () => {
    setOpenSearchCard(false);
  };

  const searchForUser = async () => {
    setLoading(true);
    try {
      const snapshot = await db
        .collection("posts")
        .where("username", "==", searchedValue)
        .get();
      if (!snapshot.empty) {
        setLoading(false);
        const doc = snapshot.docs[0];
        setSearchedProfile({
          id: doc.id,
          profile: doc.data(),
        });
        navigate(
          `/results?userName=${searchedProfile.profile.username}&image=${searchedProfile.profile.imageURL}/id=${searchedProfile.id}`
        );
      } else {
        setLoading(false);
        navigate("/404-notFound");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  if (loading) {
    return <Spinner />;
  }

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
      {found ? (
        <>
          <img src={Robot} alt="404" width={250} />
          <p>Sorry, content not found!</p>
        </>
      ) : null}
      <p id="back" onClick={closeCard}>
        <img src={Arrow} alt="back" style={{ width: "20px" }} /> Back
      </p>
    </div>
  );
}

export default Search;
