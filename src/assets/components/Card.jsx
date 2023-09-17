import DesktopDivider from "./DesktopDivider";
import { useState, useEffect } from "react";
import IconDice from "./IconDice";
import axios from "axios";

const Card = () => {
  const [adviceData, setAdViceData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "GET",
          url: "https://api.adviceslip.com/advice",
        });
        setAdViceData(response.data.slip);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [refresh]);
  const handleClick = () => {
    setRefresh(!refresh);
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <>
      <div id="card">
        <h1>ADVICE {adviceData.id}#</h1>
        <p>&quot;{adviceData.advice}&quot;</p>
        <DesktopDivider />
        <div id="button-dice" onClick={handleClick}>
          <IconDice />
        </div>
      </div>
    </>
  );
};

export default Card;
