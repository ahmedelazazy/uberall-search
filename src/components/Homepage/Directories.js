export default ({ directories }) => {
  return (
    <div className="Directories">
      <h3>Is your company listed accurately in these online directories?</h3>
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
      {(!directories || directories.length == 0) && <div className="no-directories">No directories found for the selected country</div>}
    </div>
  );
};
