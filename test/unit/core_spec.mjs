import chai from 'chai';
import sinon from 'sinon';
import { expect, } from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import 'babel-polyfill';
import { TensorScriptModelInterface, } from '../../index.mjs';

chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('tensorscript core', () => {
  describe('constructor', () => {
    it('should export a named module class', () => {
      const TSM = new TensorScriptModelInterface();
      const TSMConfigured = new TensorScriptModelInterface({ test: 'prop', });
      expect(TensorScriptModelInterface).to.be.a('function');
      expect(TSM).to.be.instanceOf(TensorScriptModelInterface);
      expect(TSMConfigured.settings.test).to.eql('prop');
    });
  });
  describe('getInputShape', () => {
    it('should export a static method', () => {
      expect(TensorScriptModelInterface.getInputShape).to.be.a('function');
    });
    it('should return the shape of a matrix', () => {
      const matrix = [
        [1, 0,],
        [0, 1,],
      ];
      const matrix2 = [
        [1, 0,],
        [1, 0,],
        [1, 0,],
        [1, 0,],
        [1, 0,],
        [1, 0,],
        [0, 1,],
      ];
      const matrix3 = [
        [1, 0, 4, 5,],
        [1, 0, 4, 5,],
        [1, 0, 4, 5,],
        [1, 0, 4, 5,],
        [1, 0, 4, 5,],
      ];
      const matrix4 = [
        [1, 0, 4, 5,],
        [1, 0, 4,],
        [1, 0, 4, 5,],
      ];
      expect(TensorScriptModelInterface.getInputShape(matrix)).to.eql([2, 2,]);
      expect(TensorScriptModelInterface.getInputShape(matrix2)).to.eql([7, 2,]);
      expect(TensorScriptModelInterface.getInputShape(matrix3)).to.eql([5, 4,]);
      expect(TensorScriptModelInterface.getInputShape.bind(null, matrix4)).to.throw(/input must have the same length in each row/);
    });
    it('should throw an error if input is not a matrix', () => {
      expect(TensorScriptModelInterface.getInputShape.bind()).to.throw(/must be a matrix/);
    });
  });
  describe('train', () => {
    it('should throw an error if train method is not implemented', () => {
      class MLR extends TensorScriptModelInterface{
        train(x, y) {
          return true;
        }
      }
      const TSM = new TensorScriptModelInterface();
      const TSMMLR = new MLR();
      expect(TSM.train).to.be.a('function');
      expect(TSM.train.bind(null)).to.throw('train method is not implemented');
      expect(TSMMLR.train).to.be.a('function');
      expect(TSMMLR.train.bind(null)).to.be.ok;
    });
  });
  describe('calculate', () => {
    it('should throw an error if calculate method is not implemented', () => {
      class MLR extends TensorScriptModelInterface{
        calculate(x, y) {
          return true;
        }
      }
      const TSM = new TensorScriptModelInterface();
      const TSMMLR = new MLR();
      expect(TSM.calculate).to.be.a('function');
      expect(TSM.calculate.bind(null)).to.throw('calculate method is not implemented');
      expect(TSMMLR.calculate).to.be.a('function');
      expect(TSMMLR.calculate.bind(null)).to.be.ok;
    });
  });
  describe('predict', () => {
    it('should asynchronously return data', (done) => {
      const TSM = new TensorScriptModelInterface();
      class MLR extends TensorScriptModelInterface{
        calculate(x, y) {
          return {
            data: ()=>new Promise((resolve) => {
              resolve(true);
              done();
            }),
          };
        }
      }
      const TSMMLR = new MLR();
      const predictPromise = TSMMLR.predict();
      expect(TSMMLR.predict).to.be.a('function');
      expect(predictPromise).to.be.a('promise');
    });
  });
});