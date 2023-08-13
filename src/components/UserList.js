import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import './UserList.css'
const UserList = ({ onlineUsers, offlineUsers }) => (
  <div className="userList">
  
    <h4>User list </h4>
    <ul className="listUsersOffline">
{onlineUsers.map((user) => (
        <li key={user.google_id}>
          <FontAwesomeIcon className="iconOnline" icon={faCircle} />{" "}
          {user.first_name + " " + user.last_name}
        </li>
      ))}
      {offlineUsers.map((user) => (
        <li key={user.google_id}>
          <FontAwesomeIcon className="iconOffline" icon={faCircle} />{" "}
          {user.first_name + " " + user.last_name}
        </li>
      ))}
    </ul>
  </div>
);

export default UserList;
