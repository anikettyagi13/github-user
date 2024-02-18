import React from 'react';
import InputField from '../InputField/InputField';
import { Octokit } from 'octokit';
import UsersData from '../UsersData/UsersData';
import "./index.css";

export default function App () {
  let [usersData, setUsersData] = React.useState([])
  let [inputValue, setInputValue] = React.useState("")
  let [fetchLoading, setFetchLoading] = React.useState(false)
  let [isMorePresent, setIsMorePresent] = React.useState(true)
  let [error, setError] = React.useState({show:false})
  const timeoutHandler = React.useRef(null);

  const debounce = (fn, delay) => {
      return function () {
        let context = this,
          args = arguments;
        clearTimeout(timeoutHandler.current);
        timeoutHandler.current = setTimeout(() => fn.apply(context, args), delay);
      };
    };

  let onInputFieldChange = async (value, page=0) => {
    if(!isMorePresent || value.length === 0) return;
    setFetchLoading(_ => true)
    try{
    let searchString = value.replace(" ", "+")
    const octokit = new Octokit({
        auth: process.env.REACT_APP_GITHUB_AUTH_KEY
      })
        let users = await octokit.request(`GET /search/users?q=${searchString}+in%3Aname&sort=followers&order=desc&type=Users&page=${page}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        if(users.data.items.length < 30) {
          setIsMorePresent(false);
        } 
        
        setUsersData(prev => {
          let arr = [];
          if (page===1) {
            arr=users.data.items
          } else{
            arr=[...prev, ...users.data.items]
          }
          return arr
        })
    }catch(e) {
      setError({
        error: e.message,
        heading: "Error",
        show: true
      })
    } finally{
      setFetchLoading(_ => false)
    }
  }

  React.useEffect(() => {
    if(error.show) {
      setTimeout(() => {
        setError({...error,show: false})
      }, 3000)
    }
  }, [error])

  React.useEffect(() => {
    setIsMorePresent(true)
  }, [inputValue])

  const delayQuery = debounce((val,page) => onInputFieldChange(val,page), 300);

  return (
    <div className="flex-1 flex-col items-center flex">
        <div className="text-[#ba0c0c] text-[16px] mt-[10px] logo">Aniket</div>
      <div className="mt-[10px] flex">
        <InputField fetchData={delayQuery} inputValue={inputValue} setInputValue={setInputValue} usersData={usersData} />
      </div>
      {
        usersData.length > 0 ?
        <UsersData usersData={usersData} fetchData={delayQuery} inputValue={inputValue} fetchLoading={fetchLoading} isMorePresent={isMorePresent} />
        : null
      }
      
      <div className={`flex items-start p-[8px] bg-[#ba0c0c] text-[#e4e4e4] rounded error ${error.show ? "show-error" : ""}`}>
        <div>
          <div className="text-[16px] font-bold">
            {error.heading}
          </div> 
          <div className="text-[12px] font-normal">
            {error.error}
          </div>
        </div>
        <div onClick={_ => setError({...error,show: false})}>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="16px" height="16px" fill="#e4e4e4">
            <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"/></svg>
        </div>
      </div>
    </div>
    
  )
}