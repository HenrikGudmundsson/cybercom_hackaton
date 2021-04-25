import "./App.css";
import firestore from "./config/firestore";
import { useEffect, useState } from "react";

/**
 * Switch out this const against your team name.
 * If you are team 1 and want to use the test collection: team1-test.
 * If you are team 1 and want to use the production collection: team1-prod.
 */
const TEAM_NAME = "team1-test";

const App = () => {
  const [reviews, setReviews] = useState([]);

  /**
   * Updates reviews on load.
   * TIP: Update review after every added review.
   */
  useEffect(() => {
    getReviews();
  }, []);

  /**
   * Retrieves reviews.
   */
  const getReviews = async () => {
    const querySnapshot = await firestore.collection(TEAM_NAME).get();
    querySnapshot.forEach((fetchedReview) => {
      setReviews((reviews) => [...reviews, fetchedReview.data()]);
    });
  };

  /**
   * Sets a review with dummy data.
   * TIP: Switch it out for user input.
   */
  const createReview = async () => {
    try {
      await firestore.collection(TEAM_NAME).add({
        name: "test2",
        img: "test2",
        description: "test2",
        rating: "3",
      });
      console.log("New review has been added");
    } catch (error) {
      console.log("Something went wrong with adding the review: ", error);
    }
  };

  return (
    <div className="App">
      {reviews.map((review, index) => {
        return (
          <div key={index}>
            <p>Namse: {review.name}</p>
            <p>IMG: {review.img}</p>
            <p>Description: {review.description}</p>
            <p>Rating {review.rating} / 10</p>
          </div>
        );
      })}

      <button onClick={createReview}>Create review</button>
    </div>
  );
};

export default App;
