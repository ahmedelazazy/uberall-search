import directories from "../assets/countries_and_directories.json";
import countries from "../assets/country_names.json";
import logos from "../assets/directory_logos.json";
import { UBERALL_API_KEY, UBERALL_BASE_URL } from "../utils/constants";

const apiHeaders = {
  headers: { publicKey: UBERALL_API_KEY },
};

export const getCountries = () => {
  return countries;
};

export const getDirectories = (country) => {
  if (!country) return [];

  const countryDirectories = directories[country];

  if (!countryDirectories) return [];

  return countryDirectories.map((dir) => ({ key: dir, name: getFriendlyName(dir), logo: logos[dir] }));
};

const getFriendlyName = (str) => {
  var splitStr = str.toLowerCase().split("_");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const search = async (filter, currentDirectories) => {
  try {
    const searchResult = await searchByFilteration(filter);

    if (!searchResult) throw "API Error";

    const { id, token } = searchResult;

    const promises = [];
    // for (let i = 0; i < 3; i++) {
    for (let i = 0; i < currentDirectories.length; i++) {
      promises.push(searchById(id, token, currentDirectories[i].key));
    }

    const apiResult = await Promise.allSettled(promises);

    const mappedApiResult = apiResult.map((res) => ({
      ...res.value,
      status: res.status,
    }));

    const mappedDirectories = mappedApiResult.map((res) => ({
      ...res,
      dirLogo: logos[res.directoryType],
      dirName: getFriendlyName(res.directoryType),
    }));

    return mappedDirectories;
  } catch {
    return null;
  }
};

const searchByFilteration = async (filter) => {
  try {
    const url = `${UBERALL_BASE_URL}/search`;

    const data = {
      name: filter.companyName,
      street: filter.address,
      zip: filter.zip,
      country: filter.country,
    };

    const options = {
      ...apiHeaders,
      method: "POST",
      body: JSON.stringify(data),
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) throw "API Error";

    const apiData = await apiResponse.json();

    const { id, token } = apiData?.response?.searchData;
    return {
      id,
      token,
    };
  } catch {
    return null;
  }
};

const searchById = async (id, token, directory) => {
  try {
    const url = `${UBERALL_BASE_URL}/search/${id}?token=${token}&directory=${directory}`;

    const options = {
      ...apiHeaders,
    };

    const apiResponse = await fetch(url, options);

    if (!apiResponse.ok) throw "API Error";

    const apiData = await apiResponse.json();

    const { syncStatus, name, streetAndNo, city, phone, website, openingHoursStatus, photosStatus, directoryType, listingUrl } = apiData?.response?.result;

    return { syncStatus, name, streetAndNo, city, phone, website, openingHoursStatus, photosStatus, directoryType, listingUrl };
  } catch {
    return null;
  }
};
