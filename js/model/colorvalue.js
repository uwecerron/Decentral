
/**
 * @class ColorValue
 *
 * @param data
 * @param data.colordef coloredcoinlib.colordef.ColorDefinition
 */
function ColorValue(data) {
  this.colordef = data.colordef
}

/**
 * @return {number}
 */
ColorValue.prototype.getColorID = function() {
  return this.colordef.getColorID()
}

/**
 * Check compatibility with other ColorValue
 *
 * @param {ColorValue} other
 * @return {boolean}
 */
ColorValue.prototype.checkCompatibility = function(other) {
  return this.getColorID() === other.getColorID()
}


/**
 * @class AdditiveColorValue
 *
 * @param data
 * @param data.colordef coloredcoinlib.colordef.ColorDefinition
 * @param data.value number
 */
function AdditiveColorValue(data) {
  ColorValue.call(this, data)
  this.value = data.value // Todo: check value is number?
}


/**
 * Get value from AdditiveColorValue
 * @return {number}
 */
AdditiveColorValue.prototype.getValue = function() {
  return this.value
}

/**
 * Add other.value to this.value if other compatibility with this
 * @param
 * @return {AdditiveColorValue}
 */
AdditiveColorValue.prototype.add = function(other) {
  if (!this.checkCompatibility(other))
    return

  this.value += other.getValue()
}


/**
 * @class SimpleColorValue
 * @param data
 * @param data.colordef coloredcoinlib.colordef.ColorDefinition
 * @param data.value number
 */
 
function SimpleColorValue(data) {
  AdditiveColorValue.call(this, data)
}

