import React from 'react';

const PointsTracker = ({ pointsByMonth, totalPoints }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const filterPoints = Object.values(pointsByMonth).filter((val) => val);
  return (
    <div className='points-tracker'>
      <h2>Points tracker</h2>
      <div>
        {filterPoints.map((points, idx) => (
          <p key={idx}>
            {months[idx]} = {points} points
          </p>
        ))}
      </div>
      <span>Total points</span>
      <strong className='total'>{totalPoints}</strong>
    </div>
  );
};

export default PointsTracker;
