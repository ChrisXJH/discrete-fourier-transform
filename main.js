function freq1(x) {
  return Math.sin(2 * Math.PI * 40 * x);
}

function freq2(x) {
  return Math.cos(2 * Math.PI * 20 * x);
}

function freq3(x) {
  return Math.sin(30 * 2 * Math.PI * x) + Math.cos(50 * 2 * Math.PI * x);
}

class ComplexNumber {
  real;
  imaginary;

  constructor(real, imaginary = 0) {
    this.real = real;
    this.imaginary = imaginary;
  }

  add(c) {
    return new ComplexNumber(c.real + this.real, c.imaginary + this.imaginary);
  }

  conjugate() {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  }
}

class Omega {
  theta;
  factor;

  constructor(N, factor = 1) {
    this.theta = (2 * Math.PI) / N;
    this.factor = factor;
  }

  power(num) {
    return new Omega(num * this.theta, Math.pow(this.factor, num));
  }

  multiply(num) {
    return new Omega(this.theta, this.factor + num);
  }

  toComplex() {
    return new ComplexNumber(
      this.factor * Math.cos(this.theta),
      this.factor * Math.sin(this.theta)
    );
  }
}

function dft(y) {
  const N = y.length;
  const K = N / 2;
  const F = [];
  const w = new Omega(N);
  for (let k = 0; k <= K; k++) {
    const fs = [];
    for (let n = 0; n < N; n++) {
      fs.push(
        w
          .power(-n * k)
          .multiply(y[n])
          .toComplex()
      );
    }
    F.push(
      fs
        .reduce((prev, curr) => prev.add(curr), new ComplexNumber(0))
        .conjugate() / N
    );
  }
  return {
    x: Object.keys(F).map(k => k - 0),
    y: F
  };
}

function main() {
  const min = 0;
  const max = 4 * Math.PI;
  const N = 2000;
  const intv = (max - min) / (N - 1);
  const xs = [];
  const ys = [];
  for (let x = min; x <= max; x += intv) {
    xs.push(x);
    ys.push(freq1(x) + freq2(x) + freq3(x) + Math.random());
  }
  const F = dft(ys);
  return {
    x: F.x.map(val => val / (intv * N)),
    y: F.y
  };
}
