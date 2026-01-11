import React from "react"
import "./UserCard.css"

function UserCard({ user, onClick }) {
  return (
    <div className="user-card" onClick={onClick}>

      <div className="user-card-grid">
        
        {/* Left – Profile */}
        <div className="user-avatar">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2017%2F06%2F13%2F12%2F53%2Fprofile-2398782_960_720.png&f=1&nofb=1&ipt=3cc863969707805a51958e60119caddc4ebc57de0a188ab8c2891151a57acaba"
            alt="profile"
          />
        </div>

        {/* Right – Info */}
        <div className="user-info">
          <h4>{user?.username}</h4>
          <p>{user?.email}</p>
        </div>

      </div>

    </div>
  )
}

export default UserCard
