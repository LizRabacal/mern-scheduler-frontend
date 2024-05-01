import React from 'react'
import { spiral } from 'ldrs'

spiral.register()

// Default values shown
const Loader = () => {
    return (
        <div id='fundoLoader'>
            <l-spiral
                size="78"
                speed="1.4"
                color="#5885E0"
            ></l-spiral >


        </div>
    )
}

export default Loader


