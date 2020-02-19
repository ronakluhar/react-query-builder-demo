import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Query, Builder, BasicConfig, Utils as QbUtils} from 'react-awesome-query-builder';
// import 'react-awesome-query-builder/css/antd.less';
// import 'react-awesome-query-builder/css/styles.scss';
// import 'react-awesome-query-builder/css/compact_styles.scss';
import "antd/dist/antd.css";
import { Component } from 'react';

// You need to provide your own config. See below 'Config format'
const config = {
  ...BasicConfig,
  fields: {
    dateTimeOrigination: {
        label: 'Date Time Connect',
        type: 'date',
        fieldSettings: {
            min: 0,
        },
        valueSources: ['value'],
        preferWidgets: ['date'],
    },
    callingPartyNumber: {
      label: 'Calling Party Number',
      type: 'number',
      fieldSettings: {
          min: 0,
      },
      valueSources: ['value'],
      preferWidgets: ['number'],
  },
  finalCalledPartyNumber: {
    label: 'Final Called Party Number',
    type: 'number',
    fieldSettings: {
        min: 0,
    },
    valueSources: ['value'],
    preferWidgets: ['number'],
},
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = {"id": QbUtils.uuid(), "type": "group"};

class App extends Component {
  state = {
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config
  };

  render = () => (
    <div>
      <Query
          {...config}
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
      />
      {this.renderResult(this.state)}
    </div>
  )

  renderBuilder = (props) => (
    <div className="query-builder-container" style={{padding: '10px'}}>
      <div className="query-builder qb-lite">
          <Builder {...props} />
      </div>
    </div>
  )

  renderResult = ({tree: immutableTree, config}) => (
    <div className="query-builder-result">
       <div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div>
        <div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>
    </div>
  )

  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    this.setState({tree: immutableTree, config: config});

    const jsonTree = QbUtils.getTree(immutableTree);
    console.log(jsonTree);
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  }
}

export default App;
