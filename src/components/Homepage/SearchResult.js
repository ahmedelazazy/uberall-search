import { Fragment } from "react";
import { FaCheck, FaExclamation, FaTimes } from "react-icons/fa";

export default ({ directories }) => {
  console.log(directories);

  return (
    <div className="SearchResult">
      <h3>Results</h3>
      {directories && (
        <div className="grid">
          <div className="header">Directory</div>
          <div className="header">Business Info</div>
          <div className="header">Hours</div>
          <div className="header">Photos</div>
          {directories.map((dir) => (
            <Fragment key={dir.key}>
              <div>
                <img src={dir.dirLogo} alt={dir.dirName} />
                <a href={dir.listingUrl}>{dir.dirName}</a>
              </div>

              {dir.syncStatus === "NOT_FOUND" && (
                <Fragment>
                  <div className="red">Listing not found</div>
                  <div />
                  <div />
                </Fragment>
              )}
              {dir.syncStatus !== "NOT_FOUND" && (
                <Fragment>
                  <div>
                    <div className="red">{dir.name}</div>
                    <div>
                      {dir.streetAndNo}, {dir.city}
                    </div>
                    <div>{dir.phone}</div>
                    <div>{dir.website}</div>
                  </div>

                  {dir.photosStatus === "PRESENT" && (
                    <div>
                      <FaCheck color="green" />
                    </div>
                  )}
                  {dir.photosStatus === "MISSING" && (
                    <div>
                      <FaTimes color="red" />
                    </div>
                  )}
                  {dir.photosStatus === "NOT_APPLICABLE" && (
                    <div>
                      <FaExclamation color="orange" />
                    </div>
                  )}

                  {dir.photosStatus === "PRESENT" && (
                    <div>
                      <FaCheck color="green" />
                    </div>
                  )}
                  {dir.photosStatus === "MISSING" && (
                    <div>
                      <FaTimes color="red" />
                    </div>
                  )}
                  {dir.photosStatus === "NOT_APPLICABLE" && (
                    <div>
                      <FaExclamation color="orange" />
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

// FaCheck
// FaTimes
