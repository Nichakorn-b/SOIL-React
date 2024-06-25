import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

/**
 * FollowButton component allows users to follow or unfollow another user.
 * It checks the follow status and updates it accordingly.
 *
 * @param {string} user_id - The ID of the user to follow or unfollow.
 * @param {boolean} isFollowing - Indicates if the current user is already following the target user.
 * @param {function} handleFollow - Function to handle the follow action.
 * @param {function} handleUnfollow - Function to handle the unfollow action.
 * @returns
 */
const FollowButton = ({
  user_id,
  isFollowing,
  handleFollow,
  handleUnfollow,
}) => {
  const { username } = useContext(UserContext);
  const [following, setFollowing] = useState(isFollowing);
  useEffect(() => {
    setFollowing(isFollowing);
  }, [isFollowing]);

  /**
   * Handles the button click for follow/unfollow action.
   */
  const handleClick = async () => {
    if (!username) {
      handleFollow(user_id);
      return;
    }

    if (username.id === user_id) {
      handleFollow(user_id);
      return;
    }

    if (following) {
      try {
        await handleUnfollow(user_id);
        setFollowing(false);
      } catch (error) {
        console.error("Failed to unfollow user:", error);
      }
    } else {
      try {
        await handleFollow(user_id);
        setFollowing(true);
      } catch (error) {
        console.error("Failed to follow user:", error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-outline-success btn-sm"
      style={{ padding: "0.20rem 0.5rem", fontSize: "0.75rem" }}
    >
      {following ? "Unfollow" : "Follow"}
    </button>
  );

  // const { username } = useContext(UserContext);
  // const { triggerAlert } = useAlert();
  //const [isFollowing, setIsFollowing] = useState(false);

  // useEffect(() => {
  //   // Check if the user is already following the other user
  //   const checkIfFollowing = async () => {
  //     if (username && user_id && username.id !== user_id) {
  //       try {
  //         const isFollowingResponse = await isUserFollowing(
  //           username.id,
  //           user_id
  //         );
  //         setIsFollowing(isFollowingResponse);
  //       } catch (error) {
  //         console.error("Failed to check if following user:", error);
  //       }
  //     }
  //   };

  //   checkIfFollowing();
  // }, [user_id, username]);

  // //cannot follow themselves
  // //have to logged in to follow
  // const handleFollow = async () => {
  //   if (!username) {
  //     triggerAlert("Please, login to follow the user", false, 3000);
  //     return;
  //   }

  //   if (username.id === user_id) {
  //     triggerAlert("You cannot follow yourself", false, 3000);
  //     return;
  //   }
  //   try {
  //     // console.log("username.id: " + username.id);
  //     // console.log("user_id: " + user_id);
  //     await followUser(username.id, user_id);
  //     setIsFollowing(true);
  //     triggerAlert("User followed successfully!", true, 3000);
  //   } catch (error) {
  //     if (error.request.status === 400) {
  //       setIsFollowing(true);
  //       //console.error('Failed to follow user:', error);
  //       triggerAlert("You are already following this user.", false, 3000);
  //     } else {
  //       if (error.request.status) {
  //         console.error("Failed to follow user:", error);
  //         triggerAlert(error.response.data.error, false, 3000);
  //       } else console.error("Failed to unfollow user:", error);
  //       triggerAlert("Failed to unfollow user.", false, 3000);
  //     }
  //   }
  // };

  // const handleUnfollow = async () => {
  //   if (!username) {
  //     triggerAlert("Please, login to unfollow the user", false, 3000);
  //     return;
  //   }
  //   try {
  //     await unfollowUser(username.id, user_id);
  //     setIsFollowing(false);
  //     triggerAlert("User unfollowed successfully!", true, 3000);
  //   } catch (error) {
  //     console.error("Failed to unfollow user:", error);
  //     triggerAlert("Failed to unfollow user.", false, 3000);
  //   }
  // };

  // return (
  //   <button
  //     onClick={isFollowing ? handleUnfollow(user_id) : () => handleFollow(user_id)}
  //     className="btn btn-outline-success btn-sm"
  //   >
  //     {isFollowing ? "Unfollow" : "Follow"}
  //   </button>
  // );
};

export default FollowButton;
