import React from 'react';
import { translate } from 'locale';
import { FlatButton, Icon } from 'natura-ui';

export default ({ magazine }) => {
  console.log(magazine);
  return (
    <div>
      <h2>{translate('currentMagazine')}</h2>
      <img src={magazine.highlightImage} alt={translate('currentMagazine')} />
      <span>
        {translate('magazineCycle')} {magazine.period}
      </span>
      <h3>{magazine.title}</h3>
      <p dangerouslySetInnerHTML={{ __html: magazine.description }} />
      <p>{translate('taxInfoTitle')}</p>
      <p>{translate('taxInfoDescription')}</p>
      <FlatButton label={translate('visualizeMagazine')} primary icon={<Icon file="ico_view" />} />
      <FlatButton
        label={translate('downloadMagazine')}
        primary
        icon={<Icon file="ico_magazine_download" />}
      />
    </div>
  );
};
