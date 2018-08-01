import React from 'react';
import styled from 'styled-components';

import Spinner from '../spinner';

const StyledGallery = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 150px;
  grid-auto-flow: row dense;
  list-style: none;
  padding: 2rem;
`;

const StyledGalleryItem = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  background: #0c9a9a;
  color: #fff;
  grid-column-start: auto;
  grid-row-start: auto;
  color: #fff;
  box-shadow: -2px 2px 10px 0px rgba(0, 0, 0, 0.4);
  background: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`;

const StyledGalleryItemLabel = styled.div`
  position: relative;
  z-index: 1;
  padding: 15px;
  color: #444;
  background: #fff;
  text-transform: lowercase;
  letter-spacing: 1px;
  color: #828282;
`;

export function Gallery(props) {
  return (
    <StyledGallery>
      {props.addresses.map(anime => (
        <StyledGalleryItem
          imageUrl={anime.imageUrl}
          key={anime.malId}
          href={anime.url}
          target="blank"
        >
          <StyledGalleryItemLabel>{anime.title}</StyledGalleryItemLabel>
        </StyledGalleryItem>
      ))}
    </StyledGallery>
  );
}

export default function GalleryWithCondition(props) {
  if (!props.fetched) return (
<p>
Select an anime
</p>
);

  if (!props.isFetching && props.fetched && props.addresses.length === 0)
    return (
<p>
No anime found
</p>
);

  if (props.isFetching) return <Spinner />;

  return <Gallery {...props} />;
}
