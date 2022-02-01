import React from "react";

import { Item, Image } from "./ImageGalleryItem.styled";

const ImageGalleryItem = ({url, largeImgUrl, query, id, onClick}) => {
    return (
        <Item>
            <Image
                src={url}
                alt={query}
                id={id}
                onClick={() => onClick(largeImgUrl)}
            />
        </Item>
    )
}

export default ImageGalleryItem;