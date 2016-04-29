import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';

@autobind
class Inventory extends React.Component {

  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fish.' + key + '.name')} />
        <input type="text" valueLink={linkState('fish.' + key + '.price')} />
        <select valueLink={linkState('fish.' + key + '.status')}>
          <option value="unavailable">Sold Out!</option>
          <option value="available">Fresh!</option>
        </select>
        <textarea valueLink={linkState('fish.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fish.' + key + '.image')} />
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fish).map(this.renderInventory)}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fish</button>
      </div>
    )
  }

}

Inventory.propTypes = {
  fish: React.PropTypes.object.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  linkState: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired
}

export default Inventory;
