import React from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default function GroupPicker({groups, groupId, setGroupId, isLoading, ...props })
  {
    // Is this right; it seems like I am setting state?
    function handleChange(e)
    {
      setGroupId(e.target.value);
    }

    // I am setting onChange and selected - is this correct?
    return (
    <FormGroup controlId="group">
        <ControlLabel>Group</ControlLabel>
        <FormControl componentClass="select" onChange={handleChange} value={groupId}>
            {groups.map((group) => <option key={group.groupId} value={group.groupId}>{group.groupName}</option>)}
        </FormControl>
    </FormGroup>
  );
}