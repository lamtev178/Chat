import React from "react"

function AddUsersToChat({ allSubs, checkedState, handleChecked }) {
  return (
    <div className="users-list">
      <h2>Добавить участников</h2>
      {allSubs.length === 0 ? <h3>У вас нет подписок, которые еще не добавлены в этот чат</h3> : allSubs.map((sub, index) => {
        return (
          <div className="justifyLeft" key={sub}>
            <h3 style={{ textAlign: "center", marginBottom: "0" }}>
              {sub}
            </h3>
            <input type="checkbox" checked={checkedState[index]} onChange={() => handleChecked(index)} style={{ marginLeft: "5px" }} />
          </div>
        )
      })}
    </div>
  )
}

export default AddUsersToChat
