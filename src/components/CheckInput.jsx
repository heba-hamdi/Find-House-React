import React from 'react'

const CheckInput = (props) => {
    const { data } = props

    return (
        <>
            <label className='text-gray-500 text-sm main'>
                <input type="checkbox" className="box" />
                <span className='geekmark'></span>
                <span className='m-3 text' >{data}</span>
            </label>
        </>
    )
}

export default CheckInput
