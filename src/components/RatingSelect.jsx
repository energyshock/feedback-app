import { useState } from "react"

function RatingSelect({select, selected}) {
  const handleChange = (e) => {
    // + changes string to number
    select(+e.currentTarget.value);
  }

  return (
    <ul className='rating'>
      {/*Sequence generator (range) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#examples */}
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type='radio'
            id={`num${i + 1}`}
            name='rating'
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  )
}
export default RatingSelect