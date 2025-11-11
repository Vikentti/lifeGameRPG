import React, {useEffect, useState} from "react";

function HydrationTasks({children} : {children: React.ReactNode}) {

  const[isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])


  if (!isHydrated) {
    return (
      <div className="tasks-columns">
        <div>Loading</div>
      </div>
    )
  }


  return <> {children} </>

}

export default HydrationTasks
   