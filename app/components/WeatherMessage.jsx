var React = require('react');

var WeatherMessage = ({temp, location}) => {
  var prepLocation = location ? location[0].toUpperCase() + location.slice(1) : location;
  return (
    <div>
      <h3 className="text-center">Its {temp}&deg;C in {prepLocation}</h3>
    </div>
  );
}

module.exports = WeatherMessage;
