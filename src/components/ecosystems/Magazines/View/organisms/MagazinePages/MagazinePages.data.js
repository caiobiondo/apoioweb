import gql from 'graphql-tag';

export const MagazinePagesQuery = gql`
  query FetchMagazinesPagesQuery($type: String!, $gv: Int!, $region: String!, $id: String!) {
    magazine(type: $type, gv: $gv, region: $region, id: $id) {
      id
      title
      pageDetails {
        pageImagesPath
        pageImages {
          pageNumber
          pageFile
        }
      }
    }
  }
`;

export const MagazinePagesQueryOptions = {
  options(props) {
    return {
      variables: {
        type: props.type,
        region: props.region,
        gv: props.gv,
        id: props.id,
      },
    };
  },
};
