import React from 'react'
import Loader from '../spinning-circles'

function UsersData({usersData, fetchData, inputValue, fetchLoading, isMorePresent}) {
  let observerRef = React.useRef(null)
  let parentRef = React.useRef(null)
  let previousObserver = React.useRef(null)

  let callFetchApi = (page) => {
    fetchData(inputValue, page)
  }

  let observer = React.useMemo(() => {
    let context = this;
    
    let observedComponent = null;
    let page = 1
    let observer = new IntersectionObserver(function (element){
      const entry = element[0];
      if(entry.isIntersecting && fetchLoading === false && (observerRef.current && !observerRef.current.isEqualNode(observedComponent))){
        page = page+1;
        observedComponent = observerRef.current
        observer.unobserve(observerRef.current)
        callFetchApi.call(context, page)
      }
    },{ threshold: 1 });

    if(previousObserver.current) {
      previousObserver.current.disconnect();
    }
    previousObserver.current = observer;

    return observer
  }, [usersData])

  React.useEffect(() => {
    if(parentRef.current) {
      parentRef.current.scrollTop = 0
    }
  }, [inputValue])

  React.useEffect(() => {
    if(observerRef.current && parentRef.current) {      
      observer.observe(observerRef.current)
    }
    
  }, [usersData, parentRef.current, observerRef.current])
  return (
    <div className="overflow-auto mt-[80px] w-[90vw] overflow-scroll" ref={parentRef}>
      <table className="border-collapse mx-auto">
        <thead className="sticky top-[0px]">
          <tr className="border-spacing-y-[5px] mb-[4px] h-[40px] bg-white">
            <th className="text-left px-[10px] rounded-l-md" >S No.</th>
            <th className="text-left px-[20px]">Avatar</th>
            <th className="text-left px-[20px]">Id</th>
            <th className="text-left px-[20px]">Name</th>
            <th className="text-left px-[20px]">Score</th>
            <th className="text-left px-[20px]">Type</th>
            <th className="text-left rounded-r-md px-[20px]">Profile</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user,index) => {
            let putIntersectionObserver = false
            if(usersData.length === index+5) putIntersectionObserver = true
            return (
              <React.Fragment key={index + putIntersectionObserver + user.id}>
              <tr className="border-spacing-y-[5px] h-[12px]"></tr>
              <tr className="border-spacing-y-[5px] mb-[4px] h-[80px] bg-white" ref={putIntersectionObserver? observerRef: null}>
                <td className="pl-[20px] rounded-l-md">
                  <span>{index+1}</span>
                </td>
                <td className="px-[20px]">
                  <img className='h-[40px] w-[40px] rounded-full' src={user.avatar_url} />
                </td>  
                <td className="px-[20px]">
                  <span>{user.id}</span>
                </td>
                <td className="px-[20px]  max-w-[200px] break-all">
                  <span>{user.login}</span>
                </td>          
                <td className="px-[20px]">
                  <span>{user.score}</span>
                </td>
                <td className="px-[20px]">
                  <span>{user.type}</span>
                </td>                 
                <td className="rounded-r-md px-[20px]">
                <span> 
                  <a target='_blank' href={user.html_url} className='flex justify-center'>
                    <svg width="12px" height="12px" viewBox="0 0 32.822 32.822" xmlns="http://www.w3.org/2000/svg">
                      <g id="Lager_80" dataName="Lager 80" transform="translate(0 0.822)">
                        <path id="Path_89" dataName="Path 89" d="M24,22v5a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8h5a2,2,0,0,0,2-2h0a2,2,0,0,0-2-2H3A3,3,0,0,0,0,7V29a3,3,0,0,0,3,3H25a3,3,0,0,0,3-3V22a2,2,0,0,0-2-2h0A2,2,0,0,0,24,22Z" fill="#161615"/>
                        <rect id="Rectangle_40" dataName="Rectangle 40" width="16" height="4" rx="2" transform="translate(16 0)" fill="#161615"/>
                        <rect id="Rectangle_41" dataName="Rectangle 41" width="16" height="4" rx="2" transform="translate(32 0) rotate(90)" fill="#161615"/>
                        <g id="Group_37" dataName="Group 37">
                          <rect id="Rectangle_42" dataName="Rectangle 42" width="32.296" height="3.971" rx="1.986" transform="translate(7.178 22.014) rotate(-45)" fill="#161615"/>
                        </g>
                      </g>
                    </svg>
                  </a>
                  </span>
                </td>
              </tr>
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      {/* <Loading /> */}
      <div className="w-[100%] my-[12px] flex justify-center">
        {isMorePresent ? 
          fetchLoading ? 
              <Loader/>
            :null      
        : <span className="text-[12px] text-[#d3d3d3]">No more data present!</span> }
        </div>

      {/* <img src={Loader} /> */}
    </div>
  )
}

export default UsersData