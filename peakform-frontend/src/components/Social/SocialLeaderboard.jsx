"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Trophy,
  UserPlus,
  UserMinus,
  Medal,
  Calendar,
  User,
} from "lucide-react";
import Sidebar from "./Sidebar";
import { LocaleRouteNormalizer } from "next/dist/server/normalizers/locale-route-normalizer";
import { API_URL } from "@/config";

// API Configuration
const API_BASE_URL = `${API_URL}`;

// Real API functions
const api = {
  searchUsers: async (username) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/user/search?username=${encodeURIComponent(username)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed for auth
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; // assuming the backend returns an array of user objects
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  },

  getFollowers: async (userUuid) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/followers?userUuid=${userUuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for session management
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching followers:", error);
      throw error;
    }
  },

  getFollowing: async (userUuid) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/followings?userUuid=${userUuid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for session management
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching following:", error);
      throw error;
    }
  },

  followUser: async (followerUuid, followingEmail) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/follow?followerUuid=${followerUuid}&followingEmail=${followingEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include", // Include cookies for session management
          body: new URLSearchParams({
            username: "", // These seem to be unused based on your API
            password: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error following user:", error);
      throw error;
    }
  },

  unfollowUser: async (followerUuid, followingEmail) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/unfollow?followerUuid=${followerUuid}&followingEmail=${followingEmail}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include", // Include cookies for session management
          body: new URLSearchParams({
            username: "", // These seem to be unused based on your API
            password: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error unfollowing user:", error);
      throw error;
    }
  },

  getUserProfile: async (viewerUuid, targetEmail) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/social/profile?user1Uuid=${viewerUuid}&user2Email=${targetEmail}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for session management
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  getLeaderboard: async () => {
    try {
      const response = await fetch(`${API_URL}/records/top`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Normalize data to match frontend expectations
      const normalizeUsers = (users, prField) =>
        users.map((user) => ({
          uuid: user.username,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          pr: user[prField],
        }));

      return {
        benchPress: normalizeUsers(data.topBenchPressUsers, "benchPressPr"),
        squat: normalizeUsers(data.topSquatUsers, "squatPr"),
        deadlift: normalizeUsers(data.topDeadliftUsers, "deadliftPr"),
      };
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      return {
        benchPress: [],
        deadlift: [],
        squat: [],
      };
    }
  },
};

// Reusable Components
const SearchBar = ({ onSearch, placeholder = "Search users..." }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Auto-search as user types
    if (value.length === 0) {
      onSearch(value);
    }
  };

  return (
    <div className="relative mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-[#05A31D] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#05A31D]"
        />
      </div>
    </div>
  );
};

const UserCard = ({
  user,
  onProfileClick,
  showFollowButton = false,
  isFollowing = false,
  onFollowToggle,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#1C1C1C] border border-[#05A31D] rounded-lg hover:bg-gray-800 transition-colors">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => onProfileClick(user.email)}
      >
        <img
          src={user.profilePictureUrl || "/api/placeholder/40/40"}
          alt={user.username}
          className="w-10 h-10 rounded-full border-2 border-[#05A31D]"
        />
        <div>
          <p className="text-white font-medium">{user.username}</p>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>
      </div>
      {showFollowButton && (
        <FollowButton
          isFollowing={isFollowing}
          onClick={() => onFollowToggle(user)}
        />
      )}
    </div>
  );
};

const FollowButton = ({ isFollowing, onClick, loading = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        isFollowing
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-[#05A31D] hover:bg-green-700 text-white"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {isFollowing ? (
            <UserMinus className="w-4 h-4" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </>
      )}
    </button>
  );
};

const ProfileDetails = ({ profile, onFollowToggle, followLoading }) => {
  return (
    <div className="bg-[#1C1C1C] border border-[#05A31D] rounded-lg p-6">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        <img
          src={profile.profilePictureUrl || "/api/placeholder/100/100"}
          alt={profile.username}
          className="w-24 h-24 rounded-full border-4 border-[#05A31D]"
        />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {profile.username}
              </h1>
              <p className="text-gray-400">{profile.email}</p>
            </div>
            <FollowButton
              isFollowing={profile.isFollowing}
              onClick={() => onFollowToggle(profile)}
              loading={followLoading}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-[#05A31D]">
                {profile.followersCount || 0}
              </p>
              <p className="text-gray-400 text-sm">Followers</p>
            </div>
            <div className="text-center p-3 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-[#05A31D]">
                {profile.followingCount || 0}
              </p>
              <p className="text-gray-400 text-sm">Following</p>
            </div>
          </div>
          <div className="text-sm text-gray-300 mb-4">
            <p>
              <span className="text-gray-400">Gender:</span>{" "}
              {profile.gender || "N/A"}
            </p>
            <p>
              <span className="text-gray-400">Age:</span> {profile.age || "N/A"}
            </p>
          </div>
          <p className="text-white">{profile.bio || "No bio available"}</p>
        </div>
      </div>
    </div>
  );
};

const AchievementBadge = ({ achievement }) => {
  const achievementImages = {
    "Target Weight Reached": "/Target_Weight_Reached.png",
    "10 Workout Completed": "/Workouts_Completed_10.png",
    "50 Workout Completed": "/Workouts_Completed_50.png",
    "100 Workout Completed": "/Workouts_Completed_100.png",
    "10 Water Intake Target Reached": "/Water_Intake_10.png",
    "50 Water Intake Target Reached": "/Water_Intake_50.png",
    "100 Water Intake Target Reached": "/Water_Intake_100.png",
  };

  // Get the appropriate badge image for this achievement
  const badgeImage = achievementImages[achievement.achievementName];

  return (
    <div className="bg-[#1C1C1C] border border-[#05A31D] rounded-lg p-4 flex items-center space-x-3">
      {badgeImage ? (
        <img
          src={badgeImage}
          alt={`${achievement.achievementName} badge`}
          className="w-32 h-32 object-contain"
        />
      ) : (
        // Fallback icon if no image is found
        <div className="w-6 h-6 bg-[#05A31D]/20 rounded-full flex items-center justify-center">
          <span className="text-[#05A31D] text-xs font-bold">?</span>
        </div>
      )}
      <div>
        <p className="text-white font-medium">{achievement.achievementName}</p>
        <div className="flex items-center space-x-1 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{new Date(achievement.achievedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

const LeaderboardEntry = ({ user, rank, category }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#1C1C1C] border border-[#05A31D] rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="text-2xl font-bold text-[#05A31D] w-12 text-center">
          {getRankIcon(rank)}
        </div>
        <img
          src={user.profilePicture || "/api/placeholder/40/40"}
          alt={user.username}
          className="w-12 h-12 rounded-full border-2 border-[#05A31D]"
        />
        <div>
          <p className="text-white font-medium">{user.username}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-[#05A31D]">{user.pr}kg</p>
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="w-8 h-8 border-4 border-[#05A31D] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-400 py-8">
    <p>Error: {message}</p>
  </div>
);

// Main App Component
const SocialLeaderboardApp = () => {
  const [currentPage, setCurrentPage] = useState("social");
  const [selectedUser, setSelectedUser] = useState(null);

  // Social page state
  const [searchResults, setSearchResults] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [followersLoading, setFollowersLoading] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const [followStates, setFollowStates] = useState({});
  const [socialError, setSocialError] = useState(null);

  // Profile page state
  const [profileData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  // Leaderboard state
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState(null);

  useEffect(() => {
    if (currentPage === "social") {
      loadSocialData();
    } else if (currentPage === "leaderboard") {
      loadLeaderboard();
    }
  }, [currentPage]);

  const loadSocialData = async () => {
    setFollowersLoading(true);
    setFollowingLoading(true);
    setSocialError(null);

    try {
      const [followersData, followingData] = await Promise.all([
        api.getFollowers(localStorage.getItem("user_uuid")),
        api.getFollowing(localStorage.getItem("user_uuid")),
      ]);
      setFollowers(followersData);
      setFollowing(followingData);
    } catch (error) {
      console.error("Error loading social data:", error);
      setSocialError("Failed to load social data. Please try again.");
    } finally {
      setFollowersLoading(false);
      setFollowingLoading(false);
    }
  };

  const handleSearch = async (username) => {
    if (!username.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const results = await api.searchUsers(username);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleFollowToggle = async (user) => {
    const isCurrentlyFollowing = followStates[user.email] ?? false;
    setFollowStates((prev) => ({ ...prev, [user.email]: "loading" }));

    try {
      if (isCurrentlyFollowing) {
        await api.unfollowUser(localStorage.getItem("user_uuid"), user.email);
        setFollowStates((prev) => ({ ...prev, [user.email]: false }));
      } else {
        await api.followUser(localStorage.getItem("user_uuid"), user.email);
        setFollowStates((prev) => ({ ...prev, [user.email]: true }));
      }
      // Refresh social data to update counts
      loadSocialData();
    } catch (error) {
      console.error("Follow/unfollow error:", error);
      setFollowStates((prev) => ({
        ...prev,
        [user.email]: isCurrentlyFollowing,
      }));
    }
  };

  const handleProfileFollowToggle = async (profile) => {
    setFollowLoading(true);
    try {
      if (profile.isFollowing) {
        await api.unfollowUser(localStorage.getItem("user_uuid"), selectedUser);
        setProfileData((prev) => ({ ...prev, isFollowing: false }));
      } else {
        await api.followUser(localStorage.getItem("user_uuid"), selectedUser);
        setProfileData((prev) => ({ ...prev, isFollowing: true }));
      }
    } catch (error) {
      console.error("Profile follow/unfollow error:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  const loadProfile = async (email) => {
    setProfileLoading(true);
    setProfileError(null);

    try {
      const targetEmail = email;
      const profile = await api.getUserProfile(
        localStorage.getItem("user_uuid"),
        targetEmail
      );
      console.log("hi", profile);
      setProfileData(profile);
      setSelectedUser(email);
      setCurrentPage("profile");
    } catch (error) {
      console.error("Error loading profile:", error);
      setProfileError("Failed to load profile. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  const loadLeaderboard = async () => {
    setLeaderboardLoading(true);
    setLeaderboardError(null);

    try {
      const data = await api.getLeaderboard();
      setLeaderboardData(data);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
      setLeaderboardError("Failed to load leaderboard. Please try again.");
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const Navigation = () => (
    <nav className="bg-[#1C1C1C] border-b border-[#05A31D] p-4 mb-6">
      <div className="flex space-x-6">
        <button
          onClick={() => setCurrentPage("social")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === "social"
              ? "bg-[#05A31D] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Social</span>
        </button>
        <button
          onClick={() => setCurrentPage("leaderboard")}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === "leaderboard"
              ? "bg-[#05A31D] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span>Leaderboard</span>
        </button>
        {currentPage === "profile" && (
          <button
            onClick={() => setCurrentPage("social")}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-400 hover:text-white transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Profile: {selectedUser}</span>
          </button>
        )}
      </div>
    </nav>
  );

  const SocialPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Social Connections</h1>

      <SearchBar onSearch={handleSearch} />

      {searchLoading && <LoadingSpinner />}

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Search Results</h2>
          {searchResults.map((user) => (
            <UserCard
              key={user.uuid}
              user={user}
              onProfileClick={loadProfile}
              showFollowButton={true}
              isFollowing={followStates[user.email] === true}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}

      {socialError && <ErrorMessage message={socialError} />}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Followers ({followers.length})
          </h2>
          {followersLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-3">
              {followers.map((user) => (
                <UserCard
                  key={user.uuid}
                  user={user}
                  onProfileClick={loadProfile}
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Following ({following.length})
          </h2>
          {followingLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-3">
              {following.map((user) => (
                <UserCard
                  key={user.uuid}
                  user={user}
                  onProfileClick={loadProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div className="space-y-6">
      {profileLoading ? (
        <LoadingSpinner />
      ) : profileError ? (
        <ErrorMessage message={profileError} />
      ) : profileData ? (
        <>
          <ProfileDetails
            profile={profileData.userProfile}
            onFollowToggle={handleProfileFollowToggle}
            followLoading={followLoading}
          />

          {profileData.achievements && profileData.achievements.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Achievements
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {profileData.achievements.map((achievement, index) => (
                  <AchievementBadge key={index} achievement={achievement} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <p>Profile not found</p>
        </div>
      )}
    </div>
  );

  const LeaderboardPage = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6">Leaderboard</h1>

      {leaderboardLoading ? (
        <LoadingSpinner />
      ) : leaderboardError ? (
        <ErrorMessage message={leaderboardError} />
      ) : leaderboardData ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#05A31D]" />
              <span>Bench Press</span>
            </h2>
            <div className="space-y-3">
              {leaderboardData.benchPress.map((user, index) => (
                <LeaderboardEntry
                  key={user.uuid}
                  user={user}
                  rank={index + 1}
                  category="Bench Press"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#05A31D]" />
              <span>Deadlift</span>
            </h2>
            <div className="space-y-3">
              {leaderboardData.deadlift.map((user, index) => (
                <LeaderboardEntry
                  key={user.uuid}
                  user={user}
                  rank={index + 1}
                  category="Deadlift"
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#05A31D]" />
              <span>Squat</span>
            </h2>
            <div className="space-y-3">
              {leaderboardData.squat.map((user, index) => (
                <LeaderboardEntry
                  key={user.uuid}
                  user={user}
                  rank={index + 1}
                  category="Squat"
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 py-8">
          <p>No leaderboard data available</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-screen flex min-h-screen">
      <div className="max-w-[240px]">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col bg-black">
        <Navigation />
        <div className="flex-1 max-w-6xl mx-auto px-4 pb-8 w-full">
          {currentPage === "social" && <SocialPage />}
          {currentPage === "profile" && <ProfilePage />}
          {currentPage === "leaderboard" && <LeaderboardPage />}
        </div>
      </div>
    </div>
  );
};

export default SocialLeaderboardApp;
