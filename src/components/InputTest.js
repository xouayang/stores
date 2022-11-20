import React, { useState } from "react";

export const InputTest = () => {
  const [userName, setUserName] = useState(null);

  const [acceptData, setAcceptData] = useState([]);

  const add = () => {
    setAcceptData([...acceptData, userName]);
    setUserName("");
  };
  const remove = (index) => {
    let acceptDataCopied = [...acceptData];
    acceptDataCopied.splice(index, 1);
    setAcceptData([...acceptDataCopied]);
  };
  const addFromSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="col-4">
      <form onSubmit={addFromSubmit}>
        <input
          className="form-control"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={add}>
          Add
        </button>
      </form>
      <div>
        {acceptData.map((data, index) => (
          <div>
            <h5 className="pd-20">{data}</h5>
            <button className="btn-btn-danger" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
