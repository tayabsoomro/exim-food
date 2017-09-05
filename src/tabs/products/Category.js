
import React from 'react';
import { Row, PanelGroup, Panel } from 'react-bootstrap/lib';
import Item from './Item';
import fire from '../../util/fire';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      itemList: []
    };
    this.setState = this.setState.bind(this);
  }

  loadItems(itemNameList) {
    itemNameList.map((item) => {
      let itemRef = fire.database().ref('/assets/items/' + item);
      itemRef.once('value').then(item => {
        let loadedItem = {
          name: item.key,
          info: item.val()
        }
        this.setState({
          loading: false,
          itemList: this.state.itemList.concat([loadedItem])
        });
      })
    })
  }

  componentDidMount() {
    this.loadItems(this.props.items);
  }

  render() {
    return (
      <div>
        {
          this.state.loading && this.state.itemList != []
          ? (<div>Loading...</div>)
          : this.state.itemList.map((item) =>
              <Item
                itemInfo={item}
                className='col-sm-12 col-md-3'
                key={item.name}/>)
        }
      </div>
    );
  }
}

export default Category;