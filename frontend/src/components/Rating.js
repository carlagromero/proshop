import React from 'react';
import PropTypes from 'prop-types';

const getIconClass = (rating, index) =>
  rating >= index
    ? 'fas fa-star'
    : rating >= index - 0.5
    ? 'fas fa-star-half-alt'
    : 'far fa-star';

const Rating = ({ rating, numReviews, color }) => {
  return (
    <>
      <div className='my-3'>
        {Array.from(Array(5), (_, i) => i + 1).map(index => (
          <span key={index}>
            <i
              style={{ color: color }}
              className={getIconClass(rating, index)}
            ></i>
          </span>
        ))}
        {numReviews && ` ${numReviews} reviews`}
      </div>
    </>
  );
};

Rating.defaultProps = {
  color: '#f8e825'
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string
};

export default Rating;
