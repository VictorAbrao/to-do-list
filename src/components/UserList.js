import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const UserList = ({ onlineUsers, offlineUsers }) => (
  <div>
    <h2>Online Users</h2>
    <ul className="listUsersOnline">
      {onlineUsers.map((user) => (
        <li key={user.google_id}>
          <FontAwesomeIcon className="iconOnline" icon={faCircle} />{" "}
          {user.first_name + " " + user.last_name}
        </li>
      ))}
    </ul>
    <h2>Offline Users</h2>
    <ul className="listUsersOffline">
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
