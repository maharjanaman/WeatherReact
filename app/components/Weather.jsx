var React = require('react');

var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var ErrorModal = require('ErrorModal');

var OpenWeatherMap = require('OpenWeatherMap');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      errorMessage: undefined
    };
  },

  handleSearch: function (location) {
    var me = this;

    this.setState({
      isLoading: true,
      errorMessage: undefined,
      location: undefined,
      temp: undefined
    });

    OpenWeatherMap.getTemp(location)
      .then(function (temp) {
        me.setState({
          location: location,
          temp: temp,
          isLoading: false
        })
      }, function (error) {
        me.setState({
          isLoading: false,
          errorMessage: error.message
        });
      });
  },

  componentDidMount: function () {
    var location = this.props.location.query.location;
    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },

  componentWillReceiveProps: function (newProps) {
    var location = newProps.location.query.location;
    if (location && location.length > 0) {
      this.handleSearch(location);
      window.location.hash = '#/';
    }
  },

  render: function () {
    var {isLoading, location, temp, errorMessage} = this.state;

    function renderMessage() {
      if (isLoading) {
        return (<h4 className="text-center">fetching weather...</h4>);
      } else if (temp && location) {
        return (<WeatherMessage location={location} temp={temp} />);
      }
    }

    function renderError() {
      if (typeof errorMessage === 'string') {
        return (
          // Response gives bad error
          <ErrorModal />
        );
      }
    }

    return (
      <div>
        <h1 className="text-center page-title">Get Weather</h1>
        <WeatherForm onSearch={this.handleSearch} />
        {renderMessage()}
        {renderError()}
      </div>
    );
  }
});

module.exports = Weather;
