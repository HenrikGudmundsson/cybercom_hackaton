import "./App.css";
import firestore from "./config/firestore";
import { useEffect, useState } from "react";
import YMAL from "./YMAL";


/**
 * Switch out this const against your team name.
 * If you are team 1 and want to use the test collection: team1-test.
 * If you are team 1 and want to use the production collection: team1-prod.
 */
const TEAM_NAME = "team1-test";

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [random, setRandom] = useState(null);

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
    try {
      const querySnapshot = await firestore.collection(TEAM_NAME).get();
      querySnapshot.forEach((fetchedReview) => {
        setReviews((reviews) => [
          ...reviews,
          { docId: fetchedReview.id, data: fetchedReview.data() },
        ]);
      });
      console.log("Retrieved the reviews successfully");
    } catch (error) {
      console.error("Something went wrong with fetching the reviews: ", error);
    }
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
      console.error("Something went wrong with adding the review: ", error);
    }
  };

  /**
   * Update a review.
   */
  const updateReview = async (docId) => {
    try {
      const ref = firestore.collection(TEAM_NAME).doc(docId);
      await ref.update({
        name: "Something amazing",
      });
      console.log("Review was updated successfully");
    } catch (error) {
      console.error("Something went wrong with the update: ", error);
    }
  };

  /**
   * Removes a review from a collection.
   */
  const removeReview = async (docId) => {
    try {
      await firestore.collection(TEAM_NAME).doc(docId).delete();

      console.log("The review was removed successfully");
    } catch (error) {
      console.error("Something went wrong with removing the review: ", error);
    }
  };

  return (
    <div className="App">
      <YMAL />
      {reviews.map((review, index) => {
        const { data } = review;
        return (
          <div key={index}>
            <p>Namse: {data.name}</p>
            <p>IMG: {data.img}</p>
            <p>Description: {data.description}</p>
            <p>Rating {data.rating} / 10</p>
            <button onClick={() => removeReview(review.docId)}>
              Remove me
            </button>
          </div>
        );
      })}

      <button onClick={createReview}>Create review</button>
    </div>
  );
};

export default App;
