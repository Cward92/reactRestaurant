import React from 'react';

function Appetizers(props) {
  let items = props.list.length ? props.list : [];
  console.log(items);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h2>Appetizers</h2>
        </div>
      </div>
      <div className="row">
        <hr />
        <div className="card-deck">
          {items.length ? props.cards(items) : []}
          {/* <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{Cards}</h5>
              <p className="card-text">{props.list.length ? props.list[0].description : ''}</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div> */}
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appetizers;