import React, { FC } from "react";

const PageIndicator: FC<{
    page: number,
}> = ({ page }) => {
    return <div className="center-child outlinebtn" style={{
        position: 'fixed',
        backgroundColor: 'white',
        top: '100px',
        right: '40px',
        height: '40px',
    }}>
        <h3>Page: <span>{page}</span></h3>
    </div>
}

export default PageIndicator