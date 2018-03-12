import gql from 'graphql-tag';

export const MagazinesQuery = gql`
  query FetchMagazinesQuery($type: String!, $gv: Int!, $region: Int!, $cycle: String!) {
    magazines(type: $type, gv: $gv, region: $region, cycle: $cycle) {
      currentMagazine {
        id
        title
        description
        pdfFile
        year
        period
        highlightImage
      }
      previousMagazines {
        id
        title
        year
        period
        thumbFile
      }
    }
  }
`;

export const MagazinesQueryOptions = {
  options(props) {
    return {
      variables: {
        type: props.type,
        region: props.region,
        gv: props.gv,
        cycle: props.cycle,
      },
    };
  },
};
