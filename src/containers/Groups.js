import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Groups.css";

export default function Groups(props) {
    const [group, setGroup] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadGroup() {
      return API.get("notes", `/groups/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const group = await loadGroup();
        const { groupName, description, isPublic } = group;

        setGroupName(groupName);
        setDescription(description);
        setIsPublic(isPublic);
        setGroup(group);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return groupName.length > 0;
  }
  
  function saveGroup(group) {
    return API.put("notes", `/groups/${props.match.params.id}`, {
      body: group
    });
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      await saveGroup({
        groupName,
        description,
        isPublic
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function deleteGroup() {
    return API.del("notes", `/groups/${props.match.params.id}`);
  }
  
  async function handleDelete(event) {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this group?"
    );
  
    if (!confirmed) {
      return;
    }
  
    setIsDeleting(true);
  
    try {
      await deleteGroup();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }
  
  return (
    <div className="Groups">
      {group && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="groupName">
            <ControlLabel>Group Name</ControlLabel>
            <FormControl value={groupName} componentClass="input" onChange={e => setGroupName(e.target.value)} />
          </FormGroup>
          <FormGroup controlId="description">
            <ControlLabel>Description</ControlLabel>
            <FormControl value={description} componentClass="textarea" onChange={e => setDescription(e.target.value)} />
          </FormGroup>
          <FormGroup controlId="isPublic">
            <Checkbox checked={isPublic} onChange={e => setIsPublic(e.target.checked)}>Public Group</Checkbox>
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bsSize="large"
            bsStyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}