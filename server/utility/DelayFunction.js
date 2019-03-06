exports.resolveAftermilliSeconds = function resolveAftermilliSeconds(milisec) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, milisec);
    });
  }