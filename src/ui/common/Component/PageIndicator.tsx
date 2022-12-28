import React, { FC } from "react";

const PageIndicator: FC<{
    page: number,
}> = ({ page }) => {
    return <div className="fixed bg-white right-4 top-20 p-2 border-2 border-main-400 rounded-3xl">
        <p>Page: {page}</p>
    </div>
}

export default PageIndicator