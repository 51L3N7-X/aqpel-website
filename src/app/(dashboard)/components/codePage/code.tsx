import React from 'react'

export default function Code({code , data , onCodeSubmit , setData} : any) {
  return (
    <div>
      <h1>PLEASE ENTER THE CODE</h1>
      <p>hint code is : {code}</p>
      <form onSubmit={onCodeSubmit}>
        <label>Code : </label>
        <input
          type="text"
          placeholder="enter the code"
          onChange={(e) => setData({ ...data, code: e.target.value })}
        ></input>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}
