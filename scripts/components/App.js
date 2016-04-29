import React from 'react';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import Header from './Header';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://catch-of-the-day-roseak.firebaseio.com/');

@autobind
class App extends React.Component {

  constructor() {
    super();

    this.state = {
      fish: {},
      order: {}
    }
  }

  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fish', {
      context: this,
      state: 'fish'
    });

    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

    if(localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({order: this.state.order});
  }

  removeFromOrder(key) {
    delete this.state.order[key];
    this.setState({
      order: this.state.order
    });
  }

  addFish(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fish['fish-' + timestamp] = fish;
    this.setState({fish: this.state.fish});
  }

  removeFish(key) {
    if(confirm("Are you sure you want to remove this fish?")) {
      this.state.fish[key] = null;
      this.setState({
        fish: this.state.fish
      });
    }
  }

  loadSamples() {
    this.setState({
      fish: require('../sample-fish')
    });
  }

  renderFish(key) {
    return <Fish key={key} index={key} details={this.state.fish[key]} addToOrder={this.addToOrder} />
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {Object.keys(this.state.fish).map(this.renderFish)}
          </ul>
        </div>
        <Order fish={this.state.fish} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}
          fish={this.state.fish} linkState={this.linkState.bind(this)} removeFish={this.removeFish} />
      </div>
    )
  }
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
