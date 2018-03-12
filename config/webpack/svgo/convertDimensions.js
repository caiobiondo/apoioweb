'use strict';

const convertDimensions = {
  type: 'full',
  description: 'removes width and height in presence of viewBox',
  fn: function(data, params) {
    const svg = data.content[0];
    if (svg.isElem('svg')) {
      if(!svg.hasAttr('viewBox')) {
        const width = svg.attr('width') && svg.attr('width').value || '25';
        const height = svg.attr('height') && svg.attr('height').value || '25';

        svg.addAttr({
          name: 'viewBox',
          value: '0 0 ' + width + ' ' + height,
          prefix: '',
          local: 'class'
        });
      }
      svg.removeAttr('width');
      svg.removeAttr('height');
    }

    return data;
  }
}

module.exports = convertDimensions;
