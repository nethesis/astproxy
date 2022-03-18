/**
 * Checks if keys of the two objects are the same
 * 
 * @param {object} object 
 * @param {object} struct 
 * @returns {boolean}
 */
const hasStructure = (object, struct) => JSON.stringify(Object.keys(object).sort()) == JSON.stringify(Object.keys(struct).sort())

/**
 * Checks if the types of values of the first object are
 * equal to the corresponding values in the second array 
 * 
 * @param {object} object 
 * @param {object} struct 
 * @returns {boolean}
 */
const hasTypes = (object, struct) => {
  for (const [key, value] of Object.entries(object)) {
    if (!struct[key] || !struct[key].includes(typeof value)) return false
  }
  return true
}

exports.hasStructure = hasStructure
exports.hasTypes = hasTypes
