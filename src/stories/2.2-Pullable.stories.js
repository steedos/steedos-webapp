import React from 'react';
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

import Tloader from '../components/pullable'

export default {
  title: 'Pullable',
};


class ExampleComponent extends React.Component {

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				listLen: 9,
				hasMore: 1,
				initializing: 2, // initialized
			});
		}, 2e3);
	}

	state = {
		canRefreshResolve: 1,
		listLen: 0,
		hasMore: 0,
		initializing: 1,
		refreshedAt: Date.now(),
	};

	refresh = (resolve, reject) => {
	  setTimeout(() => {
      const { canRefreshResolve } = this.state;
      if (!canRefreshResolve) reject();
      else {
        this.setState({
        listLen: 9,
        hasMore: 1,
        refreshedAt: Date.now(),
      });
  
		  resolve();
		}
	  }, 2e3);
	}
  
	loadMore = (resolve) => {
	  setTimeout(() => {
      const { listLen } = this.state;
      const l = listLen + 9;
    
      this.setState({
        listLen: l,
        hasMore: l > 0 && l < 50,
      });
    
      resolve();
	  }, 2e3);
	}
  
  
	toggleCanRefresh = () => {
		const { canRefreshResolve } = this.state;
		this.setState({ canRefreshResolve: !canRefreshResolve });
	}

	render() {
		const {
		  listLen, hasMore, initializing, refreshedAt, canRefreshResolve,
		} = this.state;
		const list = [];
	
		if (listLen) {
		  for (let i = 0; i < listLen; i++) {
			list.push((
			  <li key={i}>
				<p>{i}</p>
			  </li>
			));
		  }
		}
		return (
      <div className="slds-col slds-grid slds-grid_vertical slds-nowrap">
        {(
            <Tloader
              onRefresh={this.refresh}
              onLoadMore={this.loadMore}
              hasMore={hasMore}
              initializing={initializing}
            >
              <ul>{list}</ul>
            </Tloader>
          )}
      </div>
		);
	}
}

export const base = () => (
  <Provider store={store}>
    <Bootstrap>
      <ExampleComponent></ExampleComponent>
    </Bootstrap>
  </Provider>
)
