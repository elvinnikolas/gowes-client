import React from "react";
import { Popup as PopupMenu } from 'semantic-ui-react'

function Popup({ content, children }) {
    return <PopupMenu inverted content={content} trigger={children} />
}

export default Popup