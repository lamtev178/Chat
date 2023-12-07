import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiChat } from "react-icons/bi";
import MySider from "../components/MySider";
import { Input } from "@mui/material";
import useSWR from "swr";
import axios from "axios";

function Topics() {
  const [search, setSearch] = useState("");
  const { data: topics } = useSWR(["topics"], async () => {
    return await axios.get("alltopics/topic");
  });
  return (
    <>
      <Input value={search} title="Поиск темы" onChange={(e) => setSearch(e.target.value)} />
      {topics.map((topic) => {
        return (
          <Link to={`/${topic._id}`} key={topic._id} style={{ textDecoration: "none" }}>
            <div>
              <h3>{topic.title}</h3>
              <div className="comments-info">
                <p style={{ wordBreak: "break-all" }}>{topic.description}</p>
                <p>
                  <BiChat />
                  Обсуждения : {comments.filter((c) => topic._id === c.postId).length}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
      <MySider />
    </>
  );
}
export default Topics;
