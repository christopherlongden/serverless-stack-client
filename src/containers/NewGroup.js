import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./NewGroup.css";
import { API } from "aws-amplify";

export default function NewGroup(props) {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return groupName.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      await createGroup({ groupName, description, isPublic });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }
  
  function createGroup(group) {
    return API.post("notes", "/groups", {
      body: group
    });
  }

  return (
    <div className="NewGroup">
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}