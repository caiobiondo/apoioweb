import gql from 'graphql-tag';

export const MagazinesQuery = gql`
  query FetchMagazinesQuery($type: String!, $gv: Int!, $region: String!) {
    magazines(type: $type, gv: $gv, region: $region) {
      id
      title
      description
      pdfFile
      year
      period
      thumbFile
      highlightImage
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
      },
    };
  },
};
