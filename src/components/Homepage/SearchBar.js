import { useEffect, useState } from "react";
import { getCountries } from "../../services/search";

export default ({ onCountryChange, onSearchSubmitted }) => {
  const [values, setValues] = useState({
    country: null,
    companyName: null,
    address: null,
    zip: null,
  });

  const mandatoryFields = ["country", "companyName", "address", "zip"];
  const [countries, setCountries] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState();

  useEffect(() => {
    const countries = getCountries();
    setCountries(countries);
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === "country") {
      onCountryChange(value);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    onSearchSubmitted(values);

    //Sample POST
    // await fetch("https://example.com", { method: "POST", body: JSON.stringify(values) });

    // setSubmitted(true);
  };

  const validate = () => {
    setErrors({});
    let hasError;

    //I am only doing very basic validation. In real world will use a library for validation. Here I am just showcasing basic validation.
    for (const key in values) {
      if (mandatoryFields.includes(key)) {
        if (!values[key]) {
          setErrors((currentErrors) => ({
            ...currentErrors,
            [key]: "This field is required.",
          }));
          hasError = true;
        }
      }
    }

    return !hasError;
  };

  return (
    <div className="SearchBar">
      <h2>COMPANY PRESENCE CHECK</h2>

      <form noValidate onSubmit={(e) => submitHandler(e)}>
        <div className={`control ${errors["country"] ? "error" : ""}`}>
          {/* <label className="required" htmlFor="country">
            Country
          </label> */}
          <select id="country" name="country" placeholder="Country" onChange={(e) => inputHandler(e)} defaultValue="">
            <option value="" disabled>
              Country
            </option>

            {Object.keys(countries).map((key) => (
              <option key={key} value={key}>
                {countries[key]}
              </option>
            ))}
          </select>
          {errors["country"] && <span className="error-text">{errors["country"]}</span>}
        </div>

        <div className={`control ${errors["companyName"] ? "error" : ""}`}>
          {/* <label className="required" htmlFor="companyName">
            Company Name
          </label> */}
          <input type="text" id="companyName" name="companyName" placeholder="Company Name" onChange={(e) => inputHandler(e)} />

          {errors["companyName"] && <span className="error-text">{errors["companyName"]}</span>}
        </div>

        <div className={`control ${errors["address"] ? "error" : ""}`}>
          {/* <label className="required" htmlFor="address">
            Street and Number
          </label> */}
          <input type="text" id="address" name="address" placeholder="Street and Number" onChange={(e) => inputHandler(e)} />

          {errors["address"] && <span className="error-text">{errors["address"]}</span>}
        </div>

        <div className={`control ${errors["zip"] ? "error" : ""}`}>
          {/* <label className="required" htmlFor="zip">
            ZIP/Postcode
          </label> */}
          <input type="number" id="zip" name="zip" placeholder="ZIP/Postcode" onChange={(e) => inputHandler(e)} />

          {errors["zip"] && <span className="error-text">{errors["zip"]}</span>}
        </div>

        <button className="btn" type="submit">
          Check Now
        </button>
      </form>
    </div>
  );
};
