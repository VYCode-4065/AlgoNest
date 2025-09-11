import testVideo from "../assets/videos/testVideo.mp4";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaArrowLeft, FaShare } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Comment from "../components/Comments";
import { useLocation } from "react-router-dom";

const PlayCourse = () => {
  const location = useLocation();
  const { title, courseId } = location?.state;
  const comments = [
    {
      avatarUrl: "https://i.pravatar.cc/100?img=1",
      username: "Aarav Sharma",
      timestamp: "2 hours ago",
      text: "This lesson was really helpful! Thanks for the clear explanations.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=2",
      username: "Priya Verma",
      timestamp: "5 hours ago",
      text: "I enjoyed this lesson a lot, it made complex topics simple.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=3",
      username: "Rohan Gupta",
      timestamp: "1 hour ago",
      text: "Great teaching style, looking forward to the next one!",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=4",
      username: "Simran Kaur",
      timestamp: "8 hours ago",
      text: "Clear and easy to understand, thank you!",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=5",
      username: "Arjun Yadav",
      timestamp: "3 hours ago",
      text: "This was explained very nicely. Kudos!",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=6",
      username: "Neha Singh",
      timestamp: "7 hours ago",
      text: "It really helped me revise the concepts quickly.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=7",
      username: "Vikram Patel",
      timestamp: "4 hours ago",
      text: "Good pacing and examples, loved it!",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=8",
      username: "Ishita Mehra",
      timestamp: "6 hours ago",
      text: "Very engaging session, explained so well.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=9",
      username: "Kunal Joshi",
      timestamp: "9 hours ago",
      text: "This made a difficult topic easy to understand.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=10",
      username: "Ananya Mishra",
      timestamp: "30 minutes ago",
      text: "Perfectly explained! Thanks a lot.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=11",
      username: "Siddharth Rao",
      timestamp: "11 hours ago",
      text: "Really enjoyed the way you taught this.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=12",
      username: "Pooja Nair",
      timestamp: "4 hours ago",
      text: "Clear, concise and very useful lesson!",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=13",
      username: "Rahul Reddy",
      timestamp: "6 hours ago",
      text: "Very well structured, I learned a lot.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=14",
      username: "Sneha Iyer",
      timestamp: "2 hours ago",
      text: "Thanks for simplifying the tough parts.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=15",
      username: "Aditya Kulkarni",
      timestamp: "10 hours ago",
      text: "Detailed explanation, I really appreciate it.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=16",
      username: "Meera Das",
      timestamp: "1 hour ago",
      text: "Good session! Looking forward to more.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=17",
      username: "Varun Choudhary",
      timestamp: "7 hours ago",
      text: "This was exactly what I needed right now.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=18",
      username: "Kavya Menon",
      timestamp: "5 hours ago",
      text: "Very useful and easy to follow.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=19",
      username: "Manish Kumar",
      timestamp: "3 hours ago",
      text: "Loved the way you explained step by step.",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100?img=20",
      username: "Aishwarya Jain",
      timestamp: "9 hours ago",
      text: "Nicely explained! This cleared my doubts.",
    },
  ];

  return (
    <div className="container px-5 bg-purple-50 dark:bg-slate-800 text-purple-900 dark:text-slate-300">
      <div className="flex items-center gap-5 py-5">
        <button
          className="flex items-center gap-1 text-s text-slate-200 border border-slate-200 rounded-full bg-purple-700 px-5 py-1 group cursor-pointer"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft
            className="group-hover:-translate-x-1 transition duration-200"
            size={15}
          />
          Back
        </button>
        <h1 className=" text-lg font-bold">{title}</h1>
      </div>
      <div className="grid lg:grid-cols-3 w-full h-full gap-10">
        <div className="play-lecture  lg:col-span-2 lg:max-h-[80vh] overflow-y-scroll">
          <video
            src={testVideo}
            preload="hello"
            muted
            controls
            className="w-full object-center overflow-hidden rounded-lg relative"
          ></video>
          <div className="py-4 lg:px-10 grid lg:grid-cols-3 gap-2">
            <div className=" flex items-start flex-col gap-2 col-span-2">
              <h1 className=" font-semibold text-xl  h-full">
                Lecture 1. Introduction to Operating System
              </h1>
              <p className="text-sm ">
                In this lecture you will learn what is operating system and what
                is it's role in computer.
              </p>
            </div>
            <div className="flex items-center justify-end gap-4  font-semibold">
              <div className="flex item-center gap-1 hover:scale-95 transition duration-300 cursor-pointer">
                <AiFillLike size={25} />
                <span>Like</span>
              </div>
              <div className="flex item-center gap-1 hover:scale-95 transition duration-300 cursor-pointer">
                <AiFillDislike size={25} />
                <span>Dislike</span>
              </div>
              <div className="flex item-center gap-1 hover:scale-95 transition duration-300 cursor-pointer">
                <FaShare size={25} />
                <span>Share</span>
              </div>
            </div>
          </div>
          <div className="py-3 px-2">
            <h1 className="text-lg font-semibold">200 Comments :</h1>
            {comments.map((comment) => {
              return (
                <div className="py-5 px-3">
                  <Comment
                    avatarUrl={comment.avatarUrl}
                    username={comment.username}
                    timestamp={comment.timestamp}
                    text={comment.text}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="max-h-[80vh]  border shadow-2xl border-purple-700 rounded-lg pb-5 mx-2 text-slate-200  overflow-y-auto mb-20 bg-gradient-to-b from-purple-700 to-purple-800">
          <div className="flex items-center gap-4 px-5 py-2  bg-purple-950 h-">
            <h1 className="">Course Progress :</h1>
            <div className=" flex-1 w-full h-3 rounded-full bg-slate-200">
              <div className="h-full bg-purple-800 rounded-full w-[50%] "></div>
            </div>
          </div>

          <h1 className="text-lg font-bold px-5 py-3">More Videos</h1>
          <hr />
          <div className="px-5 space-y-3 py-3">
            <p className="px-4 py-2 rounded-full shadow-2xl shadow-purple-400 bg-purple-800 flex items-center gap-2 cursor-pointer hover:bg-purple-900 transition duration-200 border border-slate-200">
              <FaPlayCircle className="rounded-full" size={20} /> Lecture 1.
              Introduction to Operating System
            </p>
            <p className="px-4 py-2 rounded-full shadow-2xl shadow-purple-400 bg-purple-800 flex items-center gap-2 cursor-pointer hover:bg-purple-900 transition duration-200 border border-slate-200">
              <FaPlayCircle className="rounded-full" size={20} /> Lecture 2.
              Types of Operating System
            </p>
            <p className="px-4 py-2 rounded-full shadow-2xl shadow-purple-400 bg-purple-800 flex items-center gap-2 cursor-pointer hover:bg-purple-900 transition duration-200 border border-slate-200">
              <FaPlayCircle className="rounded-full" size={20} /> Lecture 3.
              Threads in Operating System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayCourse;
