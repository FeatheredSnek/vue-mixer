export default function(data) {
  // proper structure template
  const template = {
    bottles: [
      {
        id: 0,
        type: "type",
        description: "description",
        image: "image"
      }
    ],
    essences: [
      {
        id: 0,
        name: "name",
        description: "description",
        image: "image"
      }
    ],
    ingredients: [
      {
        id: 0,
        name: "name",
        description: "description",
        image: "image"
      }
    ]
  }
  // more general errors detected first
  // check if general data structure matches the template
  for (let prop in template) {
    if (!data.hasOwnProperty(prop)) {
      console.error('Data error! Invalid database structure');
      return null
    }
    // check if every category is an Array
    else if (!(data[prop] instanceof Array)) {
      console.error('Data error! Database entry is not an array');
      return null
    }
    // check if every category's structure matches
    for (let subprop in template[prop][0]) {
      if (!data[prop][0].hasOwnProperty(subprop)) {
        console.error('Data error! Database subentry structure is invalid');
        return null
      }
    }
  }
  // when no errors have been thrown - return the data
  console.log('Data OK');
  return data
}
