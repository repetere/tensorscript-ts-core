import tf from '@tensorflow/tfjs';

/**
 * Base class for tensorscript models
 * @interface TensorScriptModelInterface
 * @property {Object} settings - tensorflow model hyperparameters
 * @property {Object} model - tensorflow model
 * @property {Function} getInputShape - static TensorScriptModelInterface
 * @property {Object} tf - tensorflow / tensorflow-node / tensorflow-node-gpu
 */
export class TensorScriptModelInterface {
  /**
   * @param {Object} options - tensorflow model hyperparameters
   * @param {Object} customTF - custom, overridale tensorflow / tensorflow-node / tensorflow-node-gpu
   */
  constructor(options = {}, customTF) {
    this.settings = options;
    this.tf = customTF || tf;
    this.getInputShape = TensorScriptModelInterface.getInputShape;
    this.model; //tf
    return this;
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
   * Returns prediction values from tensorflow model
   * @param {Array<Array<number>>|Array<number>} x_matrix - new test independent variables 
   * @return {Promise} tensorflow predictions
   */
  async predict(x_matrix) {
    return this.calculate(x_matrix).data();
  }
}