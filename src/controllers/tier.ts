const tier = (exp: number) => {
  if (exp === 0) {
    return {
      name: 'i1',
      img: 'i1.png',
    };
  }
  if (exp < 30) {
    return {
      name: 'i2',
      img: 'i2.png',
    };
  }
  if (exp < 50) {
    return {
      name: 'b1',
      img: 'b1.png',
    };
  }
  if (exp < 100) {
    return {
      name: 'b2',
      img: 'i1.png',
    };
  }
  if (exp < 200) {
    return {
      name: 's1',
      img: 's1.png',
    };
  }
  if (exp < 300) {
    return {
      name: 's2',
      img: 's2.png',
    };
  }
  if (exp < 500) {
    return {
      name: 'g1',
      img: 'g1.png',
    };
  }
  if (exp < 1000) {
    return {
      name: 'g2',
      img: 'g2.png',
    };
  }
  if (exp < 2000) {
    return {
      name: 'p1',
      img: 'p1.png',
    };
  }
  if (exp < 3000) {
    return {
      name: 'p2',
      img: 'p2.png',
    };
  }
  if (exp < 4000) {
    return {
      name: 'd1',
      img: 'd1.png',
    };
  }
  if (exp < 8000) {
    return {
      name: 'd2',
      img: 'd2.png',
    };
  }
  if (exp < 10000) {
    return {
      name: 'm',
      img: 'm.png',
    };
  }
  if (exp < 15000) {
    return {
      name: 'gm',
      img: 'gm.png',
    };
  }
  if (exp < 20000) {
    return {
      name: 'ch',
      img: 'ch.png',
    };
  }
};

export default tier;
