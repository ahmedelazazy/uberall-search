import { Fragment } from "react";

export default ({ show, directories }) => {
  return (
    <Fragment>
      {show && (
        <div className="Loading">
          <div className="overlay" />
          <div className="popup-container">
            <div className="loader">Loading...</div>
            <h2>Online search for your company</h2>
            <h3>Please wait - this search can take up to 30 seconds</h3>

            <div className="directories-container">
              {directories &&
                directories.length > 0 &&
                directories.map((dir) => (
                  <div className="item" key={dir.key}>
                    <img src={dir.logo} alt={dir.name} />
                    <h4>{dir.name}</h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};
