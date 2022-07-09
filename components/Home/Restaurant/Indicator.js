import React, { forwardRef , useImperativeHandle , useState } from 'react'


const Indicator = forwardRef(({ ...props } , ref) => {
    const [indicatorArr, setIndicatorArr] = useState([])
    useImperativeHandle(ref , ()=> ({
        update: (update)=> {
            setIndicatorArr(update)
        }
    }))

    return (
      <div>Indicator</div>
    )
  })

export default Indicator