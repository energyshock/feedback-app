import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect";
import Card from "./shared/Card"
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const {addFeedback, feedbackEdit} = useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    let value = e.target.value;
    setText(value);
    
    if (value === '') {
      setBtnDisabled(true)
      setMessage('')
    } else if (value !== '' && value.trim().length < 10) {
      setBtnDisabled(true)
      setMessage('Text must be at least 10 characters')
    } else {
      setMessage('')
      setBtnDisabled(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating
      }

      addFeedback(newFeedback);
      setText('');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={setRating} selected={rating}/>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm