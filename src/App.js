import "./App.css";
import firestore from "./config/firestore";
import YMAL from "./YMAL";
import { useEffect, useState, useRef } from "react";

/**
 * Switch out this const against your team name.
 * If you are team 1 and want to use the test collection: team1-test.
 * If you are team 1 and want to use the production collection: team1-prod.
 */
const TEAM_NAME = "team1-test";

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [created, setCreated] = useState(false);

  /**
   * Updates reviews on load.
   * TIP: Update review after every added review.
   */
  useEffect(() => {
    getReviews();
  }, []);

  const [ratingState, setRatingState] = useState();

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

  const inputName = useRef(null);
  const inputImg = useRef(null);
  const inputDescription = useRef(null);
  const ratings = useRef(null);

  /**
   * Sets a review with dummy data.
   * TIP: Switch it out for user input.
   */
  const createReview = async () => {
    console.log(inputName);

    const formData = {
      name: inputName.current.value,
      img: inputImg.current.value,
      description: inputDescription.current.value,
      rating: ratingState,
    };

    try {
      await firestore.collection(TEAM_NAME).add(formData);
      console.log(formData);
      console.log("New review has been added");
      setCreated(true);
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

  const setRating = (rating) => {
    console.log(rating);
    setRatingState(rating);

    [...ratings.current.children].forEach((cur, i) => {
      if (i < rating) {
        cur.classList.add("active");
      }
    });
  };

  const CreateReviewForm = () => {
    return (
      <>
        <div className="form--wrapper">
          <div className="form--row">
            Name:
            <input type="text" ref={inputName}></input>
          </div>
          <div className="form--row">
            Image: <input type="file" ref={inputImg}></input>
          </div>
          <div className="form--row">
            Description: <input type="text" ref={inputDescription}></input>
          </div>
          <div className="form--row">
            Rating:{" "}
            <span ref={ratings}>
              <span
                className="rating-point rating-1"
                onClick={() => {
                  setRating(1);
                }}
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(2);
                }}
                className="rating-point rating-2"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(3);
                }}
                className="rating-point rating-3"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(4);
                }}
                className="rating-point rating-4"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(5);
                }}
                className="rating-point rating-5"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(6);
                }}
                className="rating-point rating-6"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(7);
                }}
                className="rating-point rating-7"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(8);
                }}
                className="rating-point rating-8"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(9);
                }}
                className="rating-point rating-9"
              >
                🍺
              </span>
              <span
                onClick={() => {
                  setRating(10);
                }}
                className="rating-point rating-10"
              >
                🍺
              </span>
            </span>
          </div>
        </div>
        <button onClick={createReview}>Create review</button>
      </>
    );
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
      <CreateReviewForm />
      {created && <YMAL />}
      {reviews.map((review, index) => {
        const { data } = review;
        return (
          <div key={index}>
            <p>Name: {data.name}</p>
            <p>IMG: {data.img}</p>
            <p>Description: {data.description}</p>
            <p>Rating {data.rating} / 10</p>
            <button onClick={() => removeReview(review.docId)}>
              Remove me
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
