export const getCityData = async () => {
  try {
    const countryData = await fetch("https://provinces.open-api.vn/api/p").then(
      (data) => data.json()
    );
    return countryData;
  } catch (error) {
    console.log(error);
  }
};

export const getDistrictData = async (code) => {
  try {
    const districtData = await fetch(
      `https://provinces.open-api.vn/api/p/${code}?depth=2`
    ).then((data) => data.json());
    return districtData.districts;
  } catch (error) {
    console.log(error);
  }
};
export const getWardData = async (code) => {
  try {
    const wardData = await fetch(
      `https://provinces.open-api.vn/api/d/${code}?depth=2`
    ).then((data) => data.json());
    return wardData.wards;
  } catch (error) {
    console.log(error);
  }
};
