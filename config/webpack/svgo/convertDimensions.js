'use strict';

const convertDimensions = {
  type: 'full',
  description: 'removes width and height in presence of viewBox',
  fn: function(data, params) {
    const svg = data.content[0];
    if (svg.isElem('svg')) {
      svg.addAttr({
        name: 'viewBox',
        value: '0 0 ' + svg.attr('width').value + ' ' + svg.attr('height').value,
        prefix: '',
        local: 'class'
      });

      svg.removeAttr('width');
      svg.removeAttr('height');
    }

    return data;
  }
}

module.exports = convertDimensions;
