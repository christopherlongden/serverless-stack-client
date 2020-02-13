import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import config from "../config";

export default function Home({groups, ...props}) {
  const [notes, setNotes] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }
  
      try {
        const notes = await loadNotes();
        setNotes(notes);
        
      } catch (e) {
        alert(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [props.isAuthenticated]);
  
  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function getValue(obj, key, value) {
    return obj.find(function(v){ return v[key] === value});
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            { "Created: " + new Date(note.createdAt).toLocaleString() + " [" + getValue(groups, "groupId", note.groupId).groupName + "]" }
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderGroupsList(groups) {
    return [{}].concat(groups).map((group, i) =>
      i !== 0 ? (
        <LinkContainer key={group.groupId} to={`/groups/${group.groupId}`}>
          <ListGroupItem header={group.groupName}>
            {"Created: " + new Date(group.createdAt).toLocaleString() + " Public: " + group.isPublic}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/groups/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new group
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
        <div>Current Environment: { config.Environment_Name } </div>
      </div>
    );
  }

  function renderPage() {
    return (
      <>
        <div className="content">
          <PageHeader>Your Groups</PageHeader>
          <ListGroup>
            {!isLoading && renderGroupsList(groups)}
          </ListGroup>
        </div>
        <div className="content">
          <PageHeader>Your Notes</PageHeader>
          <ListGroup>
            {!isLoading && renderNotesList(notes)}
          </ListGroup>
        </div>
      </>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderPage() : renderLander()}
    </div>
  );
}