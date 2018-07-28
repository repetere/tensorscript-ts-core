import tf from '@tensorflow/tfjs';

/**
 * Base class for tensorscript models
 * @interface TensorScriptModelInterface
 * @property {Object} settings - tensorflow model hyperparameters
 * @property {Object} model - tensorflow model
 * @property {Object} tf - tensorflow / tensorflow-node / tensorflow-node-gpu
 * @property {Function} reshape - static reshape array function
 * @property {Function} getInputShape - static TensorScriptModelInterface
 */
export class TensorScriptModelInterface {
  /**
   * @param {Object} options - tensorflow model hyperparameters
   * @param {Object} customTF - custom, overridale tensorflow / tensorflow-node / tensorflow-node-gpu
   * @param {{model:Object,tf:Object,}} properties - extra instance properties
   */
  constructor(options = {}, properties = {}) {
    this.settings = options;
    this.model = properties.model; //tf
    this.tf = properties.tf || tf;
    this.reshape = TensorScriptModelInterface.reshape;
    this.getInputShape = TensorScriptModelInterface.getInputShape;
    return this;
  }
  /**
   * Reshapes an array
   * @function
   * @example 
   * const array = [ 0, 1, 1, 0, ];
   * const shape = [2,2];
   * TensorScriptModelInterface.reshape(array,shape) // => 
   * [
   *   [ 0, 1, ],
   *   [ 1, 0, ],
   * ];
   * @param {Array<number>} array - input array 
   * @param {Array<number>} shape - shape array 
   * @return {Array<Array<number>>} returns a matrix with the defined shape
   */
  static reshape(array, shape) {
    const rows = shape[ 0 ];
    const cols = shape[ 1 ];
    const shapedArray = array.reduce((result, val, i) => { 
      const index = Math.floor(i / cols);
      if (Array.isArray(result[ index ])) {
        result[ index ].push(val);
      } else {
        result[ index ] = [val,];
      }
      return result;
    }, []);
    if (shapedArray.length !== rows) throw new SyntaxError(`specified shape (${shape}) is compatible with input array or length (${array.length})`);
    return shapedArray;
  }
  /**
   * Returns the shape of an input matrix
   * @function
   * @example 
   * const input = [
   *   [ 0, 1, ],
   *   [ 1, 0, ],
   * ];
   * TensorScriptModelInterface.getInputShape(input) // => [2,2]
   * @param {Array<Array<number>>} matrix - input matrix 
   * @return {Array<number>} returns the shape of a matrix (e.g. [2,2])
   */
  static getInputShape(matrix=[]) {
    if (Array.isArray(matrix) === false || !matrix[ 0 ] || !matrix[ 0 ].length || Array.isArray(matrix[ 0 ]) === false) throw new TypeError('input must be a matrix');
    const x_dimensions = matrix[ 0 ].length;
    matrix.forEach(vector => {
      if (vector.length !== x_dimensions) throw new SyntaxError('input must have the same length in each row');
    });
    return [
      matrix.length, x_dimensions,
    ];
  }
  /**
   * Asynchronously trains tensorflow model, must be implemented by tensorscript class
   * @abstract 
   * @param {Array<Array<number>>} x_matrix - independent variables
   * @param {Array<Array<number>>} y_matrix - dependent variables
   * @return {Object} returns trained tensorflow model 
   */
  train(x_matrix, y_matrix) {
    throw new ReferenceError('train method is not implemented');
  }
  /**
   * Predicts new dependent variables
   * @abstract 
   * @param {Array<Array<number>>|Array<number>} matrix - new test independent variables
   * @return {{data: Promise}} returns tensorflow prediction 
   */
  calculate(matrix) {
    throw new ReferenceError('calculate method is not implemented');
  }
  /**
   * Loads a saved tensoflow / keras model
   * @param {Object} options - tensorflow load model options
   * @return {Object} tensorflow model
   */
  async loadModel(options) {
    this.model = await this.tf.loadModel(options);
    return this.model;
  }
  /**
   * Returns prediction values from tensorflow model
   * @param {Array<Array<number>>|Array<number>} input_matrix - new test independent variables 
   * @param {Boolean} [options.json=true] - return object instead of typed array
   * @param {Boolean} [options.probability=true] - return real values instead of integers
   * @return {Array<number>|Array<Array<number>>} predicted model values
   */
  async predict(input_matrix, options = {}) {
    if (!input_matrix || Array.isArray(input_matrix)===false) throw new Error('invalid input matrix');
    const x_matrix = (Array.isArray(input_matrix[ 0 ]))
      ? input_matrix
      : [
        input_matrix,
      ];
    const config = Object.assign({
      json: true,
      probability: true,
    }, options);
    return this.calculate(x_matrix)
      .data()
      .then(predictions => {
        if (config.json === false) {
          return predictions;
        } else {
          const shape = [x_matrix.length, this.yShape[ 1 ],];
          const predictionValues = (options.probability === false) ? Array.from(predictions).map(Math.round) : Array.from(predictions);
          return this.reshape(predictionValues, shape);
        }
      })
      .catch(e => {
        throw e; 
      });
  }
}